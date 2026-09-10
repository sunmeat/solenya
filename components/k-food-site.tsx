'use client'

import { useMemo, useState, useCallback, MouseEvent } from 'react'
import {
  ArrowRight,
  Banknote,
  Check,
  ClipboardCopy,
  Clock,
  MapPin,
  Minus,
  Music2,
  Package,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  Wallet,
  X,
} from 'lucide-react'

const VIBER_PHONE_DISPLAY = '+380 96 898 46 26'
const VIBER_RAW_NUMBER = '380968984626'
const SITE_URL = 'https://uviktorii.vercel.app'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Доброго ранку, Вікторіє!'
  if (hour >= 12 && hour < 18) return 'Добрий день, Вікторіє!'
  return 'Добрий вечір, Вікторіє!'
}
const TIKTOK_LINK = 'https://www.tiktok.com/@u_vicktorii'
const TIKTOK_LINK1 = 'https://www.tiktok.com/@u_vicktorii/video/7640838699357523208'
const TIKTOK_LINK2 = 'https://www.tiktok.com/@u_vicktorii/video/7575846178714111244'
const TIKTOK_LINK3 = 'https://www.tiktok.com/@u_vicktorii/video/7646693130430975252'

const CHEREMUSHKY_MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Ринок Черьомушки, Одеса')}`
const NORTHERN_MARKET_MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Північний ринок, Одеса')}`
const CHEREMUSHKY_MAP_IMAGE = 'https://staticmap.openstreetmap.de/staticmap.php?center=46.4360,30.7590&zoom=14&size=600x400&maptype=mapnik&markers=46.4360,30.7590,red-pushpin'
const NORTHERN_MARKET_MAP_IMAGE = 'https://staticmap.openstreetmap.de/staticmap.php?center=46.4950,30.7100&zoom=14&size=600x400&maptype=mapnik&markers=46.4950,30.7100,red-pushpin'

const getViberInstallUrl = () => {
  if (typeof navigator === 'undefined') return 'https://www.viber.com/download/'
  const ua = navigator.userAgent || ''

  if (/android/i.test(ua)) {
    return 'https://play.google.com/store/apps/details?id=com.viber.voip'
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    return 'https://apps.apple.com/app/viber-messenger/id382617920'
  }

  return 'https://www.viber.com/download/'
}

const topTiktokVideos = [
  { url: TIKTOK_LINK1, title: 'Ринок Черьомушки' },
  { url: TIKTOK_LINK2, title: 'Північний ринок' },
  { url: TIKTOK_LINK3, title: 'Асортимент' },
]

const categories = ['Всі', 'Овочі', 'Гриби', 'Морепродукти', 'Гострі']

const products = [
  { id: 1, category: 'Овочі', name: 'Морква по-корейськи', description: 'Хрустка морква, часник, коріандр та гаряча олія.', price: 35, unit: '100 г', image: '/images/korean-carrot.png', tag: 'Хіт' },
  { id: 2, category: 'Овочі', name: 'Баклажани по-корейськи', description: 'Сині баклажани з перцем, зеленню та пряним маринадом.', price: 45, unit: '100 г', image: '/images/eggplant.png', tag: 'Радимо' },
  { id: 3, category: 'Гострі', name: 'Кімчі', description: 'Пекінська капуста, червоний перець, часник та соєвий соус.', price: 50, unit: '100 г', image: '/images/kimchi.png', tag: 'Гостро' },
  { id: 4, category: 'Овочі', name: 'Цвітна капуста', description: 'Хрусткі суцвіття у пряно-кислому маринаді.', price: 40, unit: '100 г', image: '/images/korean-pickles-hero.png', tag: 'Свіжа партія' },
  { id: 5, category: 'Гриби', name: 'Шампіньйони по-корейськи', description: 'Цілі гриби з цибулею, зеленню та ароматною олією.', price: 55, unit: '100 г', image: '/images/eggplant.png', tag: 'Ніжні' },
  { id: 6, category: 'Морепродукти', name: 'Кальмари по-корейськи', description: 'Ніжна соломка кальмара у пряному перцевому маринаді.', price: 120, unit: '100 г', image: '/images/kimchi.png', tag: 'Морепродукти' },
  { id: 7, category: 'Овочі', name: 'Пелюстка з буряком', description: 'Капуста, буряк та часник — яскраво, соковито й хрустко.', price: 30, unit: '100 г', image: '/images/korean-pickles-hero.png', tag: 'Класика' },
  { id: 8, category: 'Гострі', name: 'Огірки по-корейськи', description: 'Свіжі огірки, кунжут та перцева олія.', price: 40, unit: '100 г', image: '/images/korean-carrot.png', tag: 'Хрускіт' },
  { id: 9, category: 'Морепродукти', name: 'Скумбрія по-корейськи', description: 'Соковита скумбрія з морквою, часником та пряною олією.', price: 90, unit: '100 г', image: '/images/kimchi.png', tag: 'Новинка' },
  { id: 10, category: 'Гриби', name: 'Мариновані опеньки', description: 'Лісові опеньки з часником, кропом та олією.', price: 50, unit: '100 г', image: '/images/eggplant.png', tag: 'Лісові' },
  { id: 11, category: 'Овочі', name: 'Капуста по-корейськи гостра', description: 'Білокачанна капуста з червоним перцем і часником.', price: 35, unit: '100 г', image: '/images/korean-carrot.png', tag: 'Гостро' },
  { id: 12, category: 'Гострі', name: 'Перець по-корейськи', description: 'Солодкий перець у гострому маринаді з кунжутом.', price: 45, unit: '100 г', image: '/images/korean-pickles-hero.png', tag: 'Пікантно' },
  { id: 13, category: 'Морепродукти', name: 'Мідії по-корейськи', description: 'Мідії з морквою, цибулею та соєвим соусом.', price: 110, unit: '100 г', image: '/images/kimchi.png', tag: 'Морепродукти' },
  { id: 14, category: 'Овочі', name: 'Дайкон по-корейськи', description: 'Хрусткий дайкон з часником та кунжутною олією.', price: 40, unit: '100 г', image: '/images/korean-carrot.png', tag: 'Хрумкий' },
  { id: 15, category: 'Гриби', name: 'Гриби ерингі по-корейськи', description: 'Ерингі з цибулею, соєвим соусом та перцем чилі.', price: 60, unit: '100 г', image: '/images/eggplant.png', tag: 'Соковиті' },
  { id: 16, category: 'Гострі', name: 'Кімчі з редькою', description: 'Гостра редька кактегі у традиційному маринаді.', price: 45, unit: '100 г', image: '/images/korean-pickles-hero.png', tag: 'Гостро' },
];

// Умови доставки по кожному напрямку — редагуйте суми/терміни тут, вони підтягнуться в секцію "Доставка і оплата"
const deliveryOptions = [
  {
    icon: Truck,
    zone: 'По Одесі',
    price: 'від 70 ₴',
    priceNote: 'безкоштовно від 700 ₴ замовлення',
    time: 'сьогодні–завтра',
    minOrder: '300 ₴',
    payment: 'готівка кур\u2019єру або переказ на карту',
  },
  {
    icon: Package,
    zone: 'По Україні',
    price: 'за тарифом перевізника',
    priceNote: 'Нова пошта / Укрпошта, склад або відділення',
    time: '1–3 дні',
    minOrder: '500 ₴',
    payment: 'передоплата на карту',
  },
  {
    icon: MapPin,
    zone: 'До Європи',
    price: 'за тарифом перевізника',
    priceNote: 'Meest або інша міжнародна служба',
    time: '5–10 днів',
    minOrder: '1000 ₴',
    payment: 'передоплата на карту',
  },
  {
    icon: Banknote,
    zone: 'Самовивіз з ринку',
    price: 'безкоштовно',
    priceNote: 'Черьомушки або Північний ринок',
    time: 'у дні роботи ринку',
    minOrder: 'без мінімуму',
    payment: 'готівка або картка на місці',
  },
]

const primaryButton = 'inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]'
const outlineButton = 'inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold transition-all duration-200 hover:border-primary hover:bg-secondary hover:text-primary active:scale-[0.98]'
const viberButton = 'inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#7360f2] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#5d4bd9] hover:shadow-md active:scale-[0.98]'

export function KFoodSite() {
  const [active, setActive] = useState('Всі')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [orderCopied, setOrderCopied] = useState(false)

  const filtered = active === 'Всі' ? products : products.filter((p) => p.category === active)
  const totalItems = Object.values(cart).reduce((s, n) => s + n, 0)
  const total = useMemo(() => products.reduce((s, p) => s + p.price * (cart[p.id] ?? 0), 0), [cart])

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
  const remove = (id: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }))

  const handleViberClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const selectedProducts = products.filter((p) => cart[p.id] && cart[p.id] > 0)

    let messageText = 'Вітаю! Хочу уточнити замовлення:'
    if (selectedProducts.length > 0) {
      const itemsList = selectedProducts
        .map((p) => `• ${p.name} — ${cart[p.id]} x ${p.unit} (${p.price * cart[p.id]} ₴)`)
        .join('\n')
      messageText = `Вітаю! Хочу зробити замовлення:\n\n${itemsList}\n\nЗагалом: ${total} ₴`
    }

    const viberAppUrl = `viber://chat?number=%2B${VIBER_RAW_NUMBER}&text=${encodeURIComponent(messageText)}`

    let appLikelyOpened = false
    const markOpened = () => {
      appLikelyOpened = true
    }

    document.addEventListener('visibilitychange', markOpened)
    window.addEventListener('blur', markOpened)
    window.addEventListener('pagehide', markOpened)

    window.location.href = viberAppUrl

    setTimeout(() => {
      document.removeEventListener('visibilitychange', markOpened)
      window.removeEventListener('blur', markOpened)
      window.removeEventListener('pagehide', markOpened)

      if (!appLikelyOpened && !document.hidden) {
        const wantsInstall = window.confirm(
          'Схоже, додаток Viber не встановлено.\nВстановити Viber зараз?'
        )
        if (wantsInstall) {
          window.open(getViberInstallUrl(), '_blank')
        }
      }
    }, 1200)
  }, [cart, total])

  const handleCopyOrder = useCallback(async () => {
    const selectedProducts = products.filter((p) => cart[p.id] && cart[p.id] > 0)

    const itemsList = selectedProducts
      .map((p) => `${p.name} - ${cart[p.id]} x ${p.unit} - ${p.price * cart[p.id]} ₴`)
      .join('\n')

    const orderText = [
      getGreeting(),
      '',
      `Хочу зробити замовлення з сайту ${SITE_URL}:`,
      '',
      itemsList,
      '',
      `Загальна вартість: ${total} ₴`,
      '',
      "Підкажіть, будь ласка, деталі доставки кур'єром на таку адресу:",
    ].join('\n')

    try {
      await navigator.clipboard.writeText(orderText)
      setOrderCopied(true)
      setTimeout(() => setOrderCopied(false), 2500)
    } catch {

      const textarea = document.createElement('textarea')
      textarea.value = orderText
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setOrderCopied(true)
      setTimeout(() => setOrderCopied(false), 2500)
    }
  }, [cart, total])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          <a href="#top" className="font-sans text-2xl font-black tracking-[-0.08em]">
            У <span className="text-primary">Вікторії</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#menu" className="transition-colors duration-200 hover:text-primary">
              Асортимент
            </a>
            <a href="#delivery" className="transition-colors duration-200 hover:text-primary">
              Доставка і оплата
            </a>
            <a href="#markets" className="transition-colors duration-200 hover:text-primary">
              Де купити
            </a>
            <a href="#about" className="transition-colors duration-200 hover:text-primary">
              Про нас
            </a>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            aria-label="Відкрити кошик"
          >
            <ShoppingBag size={16} /> Кошик {totalItems > 0 && `(${totalItems})`}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-20">
          <div>
            <h1 className="max-w-xl font-sans text-5xl font-black leading-[0.94] tracking-[-0.06em] text-balance sm:text-7xl">
              Корейські
              <br />
              <span className="text-primary">соління:</span>
              <br />
              соковито,
              <br />
              гостро,
              <br />
              смачно!
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
              Корейські салати, кімчі та свіжі морепродукти по-домашньому. З любов&apos;ю та щедрою ложкою!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className={primaryButton}>
                Обрати соління <ArrowRight size={17} />
              </a>
              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className={outlineButton}>
                Дивитись TikTok
              </a>
              <a href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`} onClick={handleViberClick} className={viberButton}>
                <Phone size={16} /> Замовлення у Viber: {VIBER_PHONE_DISPLAY}
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3 text-sm">
              <div className="flex gap-1 text-primary">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className="text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline">
                12K+ підписників у @u_vicktorii
              </a>
            </div>
            <a
              href="#delivery"
              className="mt-6 flex max-w-md items-center gap-4 rounded-2xl border border-border px-5 py-4 text-sm transition-colors duration-200 hover:border-primary hover:bg-secondary"
            >
              <Truck size={20} className="shrink-0 text-primary" />
              <span>
                Мін. замовлення від <b>300 ₴</b>, по Одесі — від <b>70 ₴</b>, безкоштовно від 700 ₴.{' '}
                <span className="font-bold text-primary">Умови доставки →</span>
              </span>
            </a>
          </div>
          <a href="#menu" className="group relative block">
            <div className="aspect-[1.05] overflow-hidden rounded-[2rem] bg-secondary">
              <img
                src="/images/korean-pickles-hero.png"
                alt="Асорті домашніх корейських солень"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-card p-4 shadow-xl transition-colors duration-200 group-hover:bg-secondary sm:-left-6">
              <p className="font-mono text-xs font-bold uppercase text-muted-foreground">Сьогодні на вітрині</p>
              <p className="mt-1 text-lg font-black">свіжа партія</p>
            </div>
            <div className="absolute -right-2 top-6 rounded-full bg-accent px-4 py-3 font-mono text-xs font-black uppercase tracking-wider sm:-right-5">
              гостренько
            </div>
          </a>
        </section>

        <section className="border-y border-border bg-primary py-5 text-primary-foreground">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 font-mono text-xs font-bold uppercase tracking-widest sm:justify-between lg:px-10">
            <span>Вагові соління</span>
            <span className="hidden sm:inline">✦</span>
            <span>Зберемо асорті</span>
            <span className="hidden sm:inline">✦</span>
            <span>Доставка по Одесі, Україні та Європі</span>
            <span className="hidden sm:inline">✦</span>
            <span>Запитайте Вікторію</span>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Вітрина</p>
              <h2 className="mt-3 font-sans text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Набирайте
                <br />
                скільки хочеться.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground"><b>Ціни вказані за 100 г</b> · можна зібрати свій мікс</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 cursor-pointer ${
                    active === c ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border hover:bg-secondary'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => (
              <article key={p.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase">{p.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-black leading-tight">{p.name}</h3>
                    <span className="whitespace-nowrap font-mono text-sm font-bold">{p.price} ₴</span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-5 text-muted-foreground">{p.description}</p>
                  <button
                    onClick={() => add(p.id)}
                    className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-bold transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Plus size={16} /> Додати
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="delivery" className="border-t border-border bg-secondary/40 px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Доставка і оплата</p>
                <h2 className="mt-3 font-sans text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                  Доставимо так,
                  <br />
                  як вам зручно.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Обирайте зручний спосіб отримання — кур&apos;єром по Одесі, поштою по Україні чи в Європу,
                або самовивіз просто з ринку.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {deliveryOptions.map((d) => (
                <div key={d.zone} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <d.icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-black leading-tight">{d.zone}</h3>
                  <p className="mt-1 font-mono text-xl font-black text-primary">{d.price}</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">{d.priceNote}</p>

                  <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 text-sm">
                    <div className="flex items-start gap-2.5">
                      <Clock size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <span>
                        Термін: <b>{d.time}</b>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShoppingBag size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <span>
                        Мін. замовлення: <b>{d.minOrder}</b>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Wallet size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <span>Оплата: {d.payment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
              <p className="text-sm leading-6 text-muted-foreground">
                Точну вартість доставки та строки для вашого міста Вікторія підкаже особисто у Viber —
                це займе хвилину.
              </p>
              <a href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`} onClick={handleViberClick} className={viberButton}>
                <Phone size={16} /> Уточнити доставку у Viber
              </a>
            </div>
          </div>
        </section>

        <section id="markets" className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Забирайте або замовляйте</p>
            <h2 className="mt-3 font-sans text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Де знайти наші соління
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <a
                href={CHEREMUSHKY_MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                  style={{ backgroundImage: `url(${CHEREMUSHKY_MAP_IMAGE})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/85 to-card/40" />
                <div className="relative flex flex-1 flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin size={20} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black underline-offset-4 group-hover:underline">Черьомушки</h3>
                  <p className="mt-2 flex-1 leading-6 text-muted-foreground">
                    Одеса, ринок на Черьомушках
                    <br />
                    Свіжі салати та морепродукти
                  </p>
                  <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wide text-primary">
                    Пт, сб, нд · 09:00–17:00
                  </p>
                </div>
              </a>

              <a
                href={NORTHERN_MARKET_MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                  style={{ backgroundImage: `url(${NORTHERN_MARKET_MAP_IMAGE})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/85 to-card/40" />
                <div className="relative flex flex-1 flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin size={20} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black underline-offset-4 group-hover:underline">Північний ринок</h3>
                  <p className="mt-2 flex-1 leading-6 text-muted-foreground">
                    Одеса, Північний ринок
                    <br />
                    Заходьте за соліннями до обіду
                  </p>
                  <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wide text-primary">
                    Пн–чт · 09:00–18:00
                  </p>
                </div>
              </a>

              <a
                href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
                onClick={handleViberClick}
                className="group relative flex min-h-[240px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-[#7360f2] p-7 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5d4bd9] hover:shadow-lg"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Phone size={20} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black">Доставка</h3>
                  <p className="mt-2 leading-6 text-white/80">
                    По Одесі, по всій Україні
                    <br />
                    та до Європи
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-mono text-base font-bold">{VIBER_PHONE_DISPLAY}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold underline-offset-4 group-hover:underline">
                    Написати у Viber <ArrowRight size={15} />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-2 lg:px-10">
          <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-12">
            <Music2 size={30} />
            <p className="mt-12 max-w-lg text-3xl font-black leading-tight tracking-[-0.04em]">
              «Домашні маринади та свіжі морепродукти — щодня для Одеси і не тільки».
            </p>
            <div className="mt-8 font-mono text-xs font-bold uppercase tracking-widest">@u_vicktorii · 170.3K лайків</div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {topTiktokVideos.map((v, i) => (
                <a
                  key={i}
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-2 rounded-2xl bg-primary-foreground/10 p-4 text-center transition-colors duration-200 hover:bg-primary-foreground/20"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Music2 size={18} />
                  </span>
                  <span className="text-xs font-bold">{v.title}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] border border-border p-8 sm:p-12">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">На зв&apos;язку</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">
              Є питання щодо
              <br />
              асорті чи доставки?
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Напишіть Вікторії у Viber або TikTok — підкажемо, що сьогодні найсмачніше. Доставляємо по Одесі, по всій Україні та до Європи.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`} onClick={handleViberClick} className={viberButton}>
                <Phone size={16} /> Viber: {VIBER_PHONE_DISPLAY}
              </a>
              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className={outlineButton}>
                Відкрити TikTok <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/40 px-5 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">TikTok</p>
              <h2 className="mt-3 font-sans text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Свіжі TikTok-відео від Вікторії
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Нові соління та кулінарні моменти
              </p>
            </div>

            <div className="flex justify-center">
              <div
                className="elfsight-app-87f8bb85-a6f2-4f8e-b87e-40bcd4e1e50f w-full max-w-5xl"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className="font-sans text-xl font-black tracking-[-0.08em] transition-colors duration-200 hover:text-primary">
            У <span className="text-primary">Вікторії</span>
          </a>
          <div className="flex flex-col items-center gap-3 text-muted-foreground sm:flex-row sm:gap-5">
            <a href="#delivery" className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary">
              <Truck size={15} /> Доставка і оплата
            </a>
            <a
              href={CHEREMUSHKY_MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
            >
              <MapPin size={15} /> Черьомушки
            </a>
            <a
              href={NORTHERN_MARKET_MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
            >
              <MapPin size={15} /> Північний ринок
            </a>
            <a href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`} onClick={handleViberClick} className="inline-flex items-center gap-2 font-semibold text-[#7360f2] transition-colors duration-200 hover:text-[#5d4bd9]">
              <Phone size={15} /> {VIBER_PHONE_DISPLAY}
            </a>
            <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" aria-label="TikTok" className="transition-colors duration-200 hover:text-primary">
              <Music2 size={17} />
            </a>
          </div>
          <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
            © 2026 У Вікторії
          </a>
        </div>
      </footer>

      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 z-30 flex cursor-pointer items-center gap-3 rounded-full bg-primary px-5 py-4 text-sm font-bold text-primary-foreground shadow-2xl transition-colors duration-200 hover:bg-primary/90"
        >
          <ShoppingBag size={18} /> У кошику {totalItems} · {total} ₴
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-foreground/40 sm:items-stretch">
          <button className="absolute inset-0 cursor-default" onClick={() => setCartOpen(false)} aria-label="Закрити кошик" />
          <aside className="relative flex h-[80vh] w-full flex-col rounded-t-3xl bg-card p-6 sm:h-full sm:max-w-md sm:rounded-none">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Ваш кошик</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Закрити" className="cursor-pointer transition-colors duration-200 hover:text-primary">
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              {totalItems === 0 && <p className="text-sm text-muted-foreground">Кошик поки порожній. Додайте товари з асортименту.</p>}
              {products
                .filter((p) => cart[p.id])
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 border-b border-border py-4">
                    <div>
                      <p className="font-bold">{p.name}</p>
                      <p className="font-mono text-sm text-muted-foreground">
                        {p.price} ₴ / {p.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => remove(p.id)}
                        className="cursor-pointer rounded-full border p-1 transition-colors duration-200 hover:border-primary hover:text-primary"
                        aria-label={`Зменшити ${p.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-mono text-sm">{cart[p.id]}</span>
                      <button
                        onClick={() => add(p.id)}
                        className="cursor-pointer rounded-full border p-1 transition-colors duration-200 hover:border-primary hover:text-primary"
                        aria-label={`Збільшити ${p.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="border-t border-border pt-5">
              <div className="flex justify-between text-lg font-black">
                <span>Разом</span>
                <span>{total} ₴</span>
              </div>
              {totalItems > 0 && total < 300 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Мінімальне замовлення для доставки — 300 ₴. Додайте ще на {300 - total} ₴ або оберіть самовивіз.
                </p>
              )}

              <button
                onClick={handleCopyOrder}
                disabled={totalItems === 0}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-bold transition-all duration-200 hover:border-primary hover:bg-secondary hover:text-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-inherit"
              >
                {orderCopied ? (
                  <>
                    <Check size={16} /> Скопійовано!
                  </>
                ) : (
                  <>
                    <ClipboardCopy size={16} /> Скопіювати список замовлення
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Вставте скопійований текст у Viber або TikTok
              </p>

              <a href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`} onClick={handleViberClick} className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7360f2] py-4 font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#5d4bd9] hover:shadow-md active:scale-[0.98]">
                <Check size={18} /> Уточнити замовлення у Viber
              </a>

              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-bold transition-all duration-200 hover:border-primary hover:bg-secondary hover:text-primary active:scale-[0.98]">
                Уточнити замовлення у TikTok
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default KFoodSite
