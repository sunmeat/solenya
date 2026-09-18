'use client'
import { useMemo, useState, useCallback, MouseEvent } from 'react'
import {
  ArrowRight,
  Banknote,
  Check,
  ClipboardCopy,
  Clock,
  MapPin,
  MessageCircle,
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

const CHEREMUSHKY_MAP_IMAGE =
  'https://staticmap.openstreetmap.de/staticmap.php?center=46.4360,30.7590&zoom=14&size=600x400&maptype=mapnik&markers=46.4360,30.7590,red-pushpin'
const NORTHERN_MARKET_MAP_IMAGE =
  'https://staticmap.openstreetmap.de/staticmap.php?center=46.4950,30.7100&zoom=14&size=600x400&maptype=mapnik&markers=46.4950,30.7100,red-pushpin'

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

const categories = ['Всі', 'Овочі', 'Гриби', 'Морепродукти', 'М’ясні', 'Водорості', 'Закуски', 'Гострі']

const products = [
  {
    id: 1,
    category: 'Овочі',
    name: 'Морква по-корейськи',
    description: 'Хрустка морква з часником, коріандром та ароматною олією.',
    price: 20,
    unit: '100 г',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Korean-style_carrot.jpg',
    tag: 'Хіт',
  },
  {
    id: 2,
    category: 'М’ясні',
    name: 'Вуха варені',
    description: 'Ніжні свинячі вуха, приготовані до м’якості.',
    price: 50,
    unit: '100 г',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Marinated_pork_ears.jpg',
    tag: 'Класика',
  },
  {
    id: 3,
    category: 'М’ясні',
    name: 'Копчені вуха',
    description: 'Ароматні копчені свинячі вуха з насиченим смаком.',
    price: 50,
    unit: '100 г',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Smoked_pig%27s_ears_with_mustard.JPG',
    tag: 'Копчені',
  },
  {
    id: 4,
    category: 'Морепродукти',
    name: 'Кальмар',
    description: 'Ніжний кальмар у пряному маринаді по-корейськи.',
    price: 100,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2017/11/13/20/41/calamari-2942624_1280.jpg',
    tag: 'Морепродукти',
  },
  {
    id: 5,
    category: 'Морепродукти',
    name: 'Мідії',
    description: 'Соковиті мідії з прянощами та ароматною олією.',
    price: 80,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85',
    tag: 'Популярне',
  },
  {
    id: 6,
    category: 'Морепродукти',
    name: 'Рапани',
    description: 'Морські рапани з виразним смаком та пряним маринадом.',
    price: 200,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85',
    tag: 'Делікатес',
  },
  {
    id: 7,
    category: 'Морепродукти',
    name: 'Восьминоги',
    description: 'Ніжні шматочки восьминога у фірмовому маринаді.',
    price: 150,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/octopus-1238258_1280.jpg',
    tag: 'Морепродукти',
  },
  {
    id: 8,
    category: 'Морепродукти',
    name: 'Креветки',
    description: 'Соковиті креветки з пряними спеціями.',
    price: 150,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=85',
    tag: 'Популярне',
  },
  {
    id: 9,
    category: 'Морепродукти',
    name: 'Сурімі',
    description: 'Ніжні палички сурімі у фірмовому приготуванні.',
    price: 100,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85',
    tag: 'Морепродукти',
  },
  {
    id: 10,
    category: 'Овочі',
    name: 'Жовта квасоля',
    description: 'Хрустка жовта квасоля з пряним маринадом.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/beans-1549397_1280.jpg',
    tag: 'Овочі',
  },
  {
    id: 11,
    category: 'Овочі',
    name: 'Зелена квасоля',
    description: 'Соковита зелена квасоля з ароматними спеціями.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/green-beans-1549396_1280.jpg',
    tag: 'Овочі',
  },
  {
    id: 12,
    category: 'Овочі',
    name: 'Броколі',
    description: 'Ніжні суцвіття броколі у пряному маринаді.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_1280.jpg',
    tag: 'Овочі',
  },
  {
    id: 13,
    category: 'Овочі',
    name: 'Декоративна морква',
    description: 'Мініатюрна морква з хрусткою текстурою та спеціями.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=800&q=85',
    tag: 'Овочі',
  },
  {
    id: 14,
    category: 'Овочі',
    name: 'Кукурудза',
    description: 'Солодка кукурудза з легким пряним смаком.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/corn-1238251_1280.jpg',
    tag: 'Овочі',
  },
  {
    id: 15,
    category: 'Овочі',
    name: 'Цвітна капуста',
    description: 'Хрусткі суцвіття цвітної капусти у пряному маринаді.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/cauliflower-1238252_1280.jpg',
    tag: 'Популярне',
  },
  {
    id: 16,
    category: 'Овочі',
    name: 'Корінь селери',
    description: 'Ароматний корінь селери з пряними спеціями.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=85',
    tag: 'Овочі',
  },
  {
    id: 17,
    category: 'Закуски',
    name: 'Соєва спаржа',
    description: 'Ніжна соєва спаржа з часником та пряною олією.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85',
    tag: 'Популярне',
  },
  {
    id: 18,
    category: 'Закуски',
    name: 'Соєві стейки',
    description: 'Пружні соєві стейки у насиченому маринаді.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85',
    tag: 'Закуски',
  },
  {
    id: 19,
    category: 'Гриби',
    name: 'Деревний гриб муер білий',
    description: 'Хрусткі білі деревні гриби з пряним смаком.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=800&q=85',
    tag: 'Гриби',
  },
  {
    id: 20,
    category: 'Гриби',
    name: 'Муер чорний',
    description: 'Хрусткі чорні деревні гриби у фірмовому маринаді.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=800&q=85',
    tag: 'Гриби',
  },
  {
    id: 21,
    category: 'Гриби',
    name: 'Кораловий гриб',
    description: 'Ніжний кораловий гриб з цікавою текстурою.',
    price: 80,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=85',
    tag: 'Гриби',
  },
  {
    id: 22,
    category: 'Водорості',
    name: 'Морська капуста',
    description: 'Морська капуста з легкою кислинкою та пряними спеціями.',
    price: 30,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=85',
    tag: 'Морські',
  },
  {
    id: 23,
    category: 'Водорості',
    name: 'Рожева капуста',
    description: 'Яскрава рожева капуста з хрусткою текстурою.',
    price: 30,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85',
    tag: 'Яскраве',
  },
  {
    id: 24,
    category: 'Водорості',
    name: 'Чука',
    description: 'Ніжний салат чука з кунжутом та ароматною заправкою.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2019/07/17/21/06/salad-4343738_1280.jpg',
    tag: 'Популярне',
  },
  {
    id: 25,
    category: 'Гострі',
    name: 'Аджика',
    description: 'Гостра ароматна аджика для м’яса, овочів та гарнірів.',
    price: 80,
    unit: 'баночка',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85',
    tag: 'Гостро',
  },
  {
    id: 26,
    category: 'Гострі',
    name: 'Перець чилі',
    description: 'Пікантний перець чилі у фірмовому маринаді.',
    price: 70,
    unit: 'баночка',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=85',
    tag: 'Гостро',
  },
  {
    id: 27,
    category: 'Закуски',
    name: 'Рисова локшина',
    description: 'Ніжна рисова локшина для легких азійських закусок.',
    price: 40,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85',
    tag: 'Закуски',
  },
  {
    id: 28,
    category: 'Закуски',
    name: 'Овочеві голубці',
    description: 'Ніжні овочеві голубці з ароматною начинкою.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=85',
    tag: 'Популярне',
  },
  {
    id: 29,
    category: 'Закуски',
    name: 'Баклажанні рулети з сиром',
    description: 'Ніжні рулети з баклажана з сирною начинкою.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=85',
    tag: 'Закуски',
  },
  {
    id: 30,
    category: 'Закуски',
    name: 'Баклажанні рулети з морквою',
    description: 'Баклажанні рулети з хрусткою морквяною начинкою.',
    price: 50,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=85',
    tag: 'Закуски',
  },
  {
    id: 31,
    category: 'Закуски',
    name: 'Перчики з фетою',
    description: 'Солодкі перчики з ніжною сирною начинкою.',
    price: 100,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=85',
    tag: 'Радимо',
  },
  {
    id: 32,
    category: 'Закуски',
    name: 'Імбир',
    description: 'Тонко нарізаний маринований імбир з легкою кислинкою.',
    price: 40,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/ginger-1238263_1280.jpg',
    tag: 'Класика',
  },
  {
    id: 33,
    category: 'Гриби',
    name: 'Опеньки',
    description: 'Ароматні мариновані опеньки з пряними спеціями.',
    price: 80,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=800&q=85',
    tag: 'Гриби',
  },
  {
    id: 34,
    category: 'Гриби',
    name: 'Печериці',
    description: 'Ніжні печериці з часником та ароматною олією.',
    price: 50,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/mushrooms-1238265_1280.jpg',
    tag: 'Гриби',
  },
  {
    id: 35,
    category: 'Гриби',
    name: 'Гриби шиїтаке',
    description: 'Ароматні гриби шиїтаке з насиченим смаком.',
    price: 80,
    unit: '100 г',
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/shiitake-1238266_1280.jpg',
    tag: 'Гриби',
  },
  {
    id: 36,
    category: 'Гострі',
    name: 'Смажені баклажани «Вогник»',
    description: 'Смажені баклажани з гострим перцем та часником.',
    price: 30,
    unit: '100 г',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=85',
    tag: 'Гостро',
  },
  {
    id: 37,
    category: 'Гострі',
    name: 'Кімчі',
    description: 'Пекінська капуста, червоний перець, часник та пряний маринад.',
    price: 50,
    unit: '100 г',
    image: 'https://images.pexels.com/photos/32087651/pexels-photo-32087651.jpeg',
    tag: 'Хіт',
  },
]

const popularAssortmentIds = [1, 3, 5, 15, 12, 24, 28, 37]

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

const primaryButton =
  'inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]'
const outlineButton =
  'inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold transition-all duration-200 hover:border-primary hover:bg-secondary hover:text-primary active:scale-[0.98]'
const viberButton =
  'inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#7360f2] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#5d4bd9] hover:shadow-md active:scale-[0.98]'
const telegramButton =
  'inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#229ED9] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#1b8bc4] hover:shadow-md active:scale-[0.98]'

export function KFoodSite() {
  const [active, setActive] = useState('Всі')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [orderCopied, setOrderCopied] = useState(false)

  const [assortSize, setAssortSize] = useState<1 | 2 | 3>(1)
  const [selectedAssort, setSelectedAssort] = useState<number[]>([1, 2, 3, 7]) // за замовчуванням популярні
  const [wishes, setWishes] = useState('')
  const [assortAdded, setAssortAdded] = useState(false)

  const filtered = active === 'Всі' ? products : products.filter((p) => p.category === active)
  const totalItems = Object.values(cart).reduce((s, n) => s + n, 0)
  const total = useMemo(
    () => products.reduce((s, p) => s + p.price * (cart[p.id] ?? 0), 0),
    [cart]
  )

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
  const remove = (id: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }))

  const assortPrice = useMemo(() => {
    if (selectedAssort.length === 0) return 0
    const avgPricePer100g =
      selectedAssort.reduce((sum, id) => {
        const p = products.find((pr) => pr.id === id)
        return sum + (p?.price ?? 0)
      }, 0) / selectedAssort.length
    return Math.round(avgPricePer100g * 10 * assortSize) 
  }, [selectedAssort, assortSize])

  const toggleAssortItem = (id: number) => {
    setSelectedAssort((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const addAssortmentToCart = () => {
    if (selectedAssort.length === 0) return

    const totalUnits = assortSize * 10 
    const perItem = Math.floor(totalUnits / selectedAssort.length)
    const remainder = totalUnits % selectedAssort.length

    setCart((prev) => {
      const next = { ...prev }
      selectedAssort.forEach((id, index) => {
        const qty = perItem + (index < remainder ? 1 : 0)
        next[id] = (next[id] ?? 0) + qty
      })
      return next
    })

    setAssortAdded(true)
    setTimeout(() => setAssortAdded(false), 2500)
  }

  const buildOrderMessage = useCallback(
    (forCopy = false) => {
      const selectedProducts = products.filter((p) => cart[p.id] && cart[p.id] > 0)
      if (selectedProducts.length === 0) {
        return forCopy
          ? `${getGreeting()}\n\nХочу уточнити асортимент / зробити замовлення з сайту ${SITE_URL}`
          : 'Вітаю! Хочу уточнити замовлення / асортимент'
      }
      const itemsList = selectedProducts
        .map(
          (p) =>
            `• ${p.name} — ${cart[p.id]} × ${p.unit} (${p.price * (cart[p.id] ?? 0)} ₴)`
        )
        .join('\n')

      const wishesText = wishes.trim() ? `\n\nПобажання: ${wishes.trim()}` : ''

      if (forCopy) {
        return [
          getGreeting(),
          '',
          `Хочу зробити замовлення з сайту ${SITE_URL}:`,
          '',
          itemsList,
          '',
          `Загальна вартість: ${total} ₴`,
          wishesText,
          '',
          "Підкажіть, будь ласка, деталі доставки кур'єром на таку адресу:",
        ].join('\n')
      }
      return `Вітаю! Хочу зробити замовлення:\n\n${itemsList}\n\nЗагалом: ${total} ₴${wishesText}`
    },
    [cart, total, wishes]
  )

  const handleViberClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const messageText = buildOrderMessage(false)
      const viberAppUrl = `viber://chat?number=%2B${VIBER_RAW_NUMBER}&text=${encodeURIComponent(
        messageText
      )}`
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
    },
    [buildOrderMessage]
  )

  const handleTelegramClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const messageText = buildOrderMessage(false)
      const tgUrl = `https://t.me/+${VIBER_RAW_NUMBER}?text=${encodeURIComponent(messageText)}`
      window.open(tgUrl, '_blank')
    },
    [buildOrderMessage]
  )

  const handleCopyOrder = useCallback(async () => {
    const orderText = buildOrderMessage(true)
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
  }, [buildOrderMessage])

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
            <a href="#assort" className="transition-colors duration-200 hover:text-primary">
              Зібрати асорті
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
          <div className="flex items-center gap-2">
            <a
              href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
              onClick={handleViberClick}
              className="hidden sm:inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#7360f2] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#5d4bd9]"
              aria-label="Написати у Viber"
            >
              <Phone size={14} />
              <span className="hidden lg:inline">Viber</span>
            </a>
            <a
              href={`https://t.me/+${VIBER_RAW_NUMBER}`}
              onClick={handleTelegramClick}
              className="hidden sm:inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#229ED9] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1b8bc4]"
              aria-label="Написати у Telegram"
            >
              <MessageCircle size={14} />
              <span className="hidden lg:inline">Telegram</span>
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              aria-label="Відкрити кошик"
            >
              <ShoppingBag size={16} /> Кошик {totalItems > 0 && `(${totalItems})`}
            </button>
          </div>
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
              Корейські салати, кімчі та свіжі морепродукти по-домашньому. З любов&apos;ю та щедрою
              ложкою!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className={primaryButton}>
                Обрати соління <ArrowRight size={17} />
              </a>
              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" className={outlineButton}>
                Дивитись TikTok
              </a>
              <a
                href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
                onClick={handleViberClick}
                className={viberButton}
              >
                <Phone size={16} /> Замовлення у Viber
              </a>
              <a
                href={`https://t.me/+${VIBER_RAW_NUMBER}`}
                onClick={handleTelegramClick}
                className={telegramButton}
              >
                <MessageCircle size={16} /> Telegram
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
              <a
                href={TIKTOK_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
              >
                12K+ підписників @u_vicktorii
              </a>
            </div>
            <a
              href="#delivery"
              className="mt-6 flex max-w-md items-center gap-4 rounded-2xl border border-border px-5 py-4 text-sm transition-colors duration-200 hover:border-primary hover:bg-secondary"
            >
              <Truck size={20} className="shrink-0 text-primary" />
              <span>
                Доставка: мін. замовлення від <b>300 ₴</b>, по Одесі — від <b>70 ₴</b>, безкоштовно від 700 ₴.{' '}
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
              <p className="font-mono text-xs font-bold uppercase text-muted-foreground">
                Сьогодні на вітрині
              </p>
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
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                Вітрина
              </p>
              <h2 className="mt-3 font-sans text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Набирайте
                <br />
                скільки хочеться.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                <b>Ціни вказані за 100 г</b> · можна зібрати свій мікс
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 cursor-pointer ${
                    active === c
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border hover:bg-secondary'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-black leading-tight">{p.name}</h3>
                    <span className="whitespace-nowrap font-mono text-sm font-bold">
                      {p.price} грн. / {p.unit}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-5 text-muted-foreground">
                    {p.description}
                  </p>
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

        <section id="assort" className="border-t border-border bg-secondary/30 px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                Конструктор
              </p>
              <h2 className="mt-3 font-sans text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Швидке оформлення
                <br />
                асорті
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Оберіть вагу, відмітьте улюблені позиції — ми рівномірно розподілимо вагу між ними.
                Можна додати побажання (більше гострого, менше часнику тощо).
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      
              <div className="space-y-8">
    
                <div>
                  <p className="mb-3 text-sm font-bold">Вага асорті</p>
                  <div className="flex flex-wrap gap-3">
                    {([1, 2, 3] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setAssortSize(size)}
                        className={`rounded-full px-6 py-3 text-sm font-bold transition-all cursor-pointer ${
                          assortSize === size
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'border border-border bg-card hover:border-primary hover:bg-secondary'
                        }`}
                      >
                        {size} кг
                      </button>
                    ))}
                  </div>
                </div>

      
                <div>
                  <p className="mb-3 text-sm font-bold">
                    Що покласти в асорті{' '}
                    <span className="font-normal text-muted-foreground">
                      (обрано {selectedAssort.length})
                    </span>
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {products
                      .filter((p) => popularAssortmentIds.includes(p.id))
                      .map((p) => {
                        const checked = selectedAssort.includes(p.id)
                        return (
                          <label
                            key={p.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                              checked
                                ? 'border-primary bg-primary/5'
                                : 'border-border bg-card hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAssortItem(p.id)}
                              className="h-4 w-4 accent-primary"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold leading-tight truncate">{p.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {p.price} ₴ / 100 г
                              </p>
                            </div>
                          </label>
                        )
                      })}
                  </div>
                </div>


                <div>
                  <p className="mb-3 text-sm font-bold">Побажання (необовʼязково)</p>
                  <textarea
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    placeholder="Наприклад: більше гострого, менше часнику, без цибулі..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="lg:sticky lg:top-28 h-fit">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    Ваше асорті
                  </p>
                  <p className="mt-2 text-3xl font-black">
                    {assortSize} кг
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedAssort.length > 0
                      ? `≈ ${Math.round((assortSize * 1000) / selectedAssort.length)} г кожної позиції`
                      : 'Оберіть хоча б одну позицію'}
                  </p>

                  <div className="my-5 border-t border-border" />

                  <div className="flex items-end justify-between">
                    <span className="text-sm text-muted-foreground">Орієнтовно</span>
                    <span className="text-2xl font-black text-primary">
                      {assortPrice > 0 ? `${assortPrice} ₴` : '—'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Точну вартість підтвердить Вікторія
                  </p>

                  <button
                    onClick={addAssortmentToCart}
                    disabled={selectedAssort.length === 0}
                    className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {assortAdded ? (
                      <>
                        <Check size={18} /> Додано в кошик!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} /> Додати асорті в кошик
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Після додавання можете відредагувати кількість у кошику
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="border-t border-border bg-secondary/40 px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  Доставка і оплата
                </p>
                <h2 className="mt-3 font-sans text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                  Доставимо так,
                  <br />
                  як вам зручно.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Обирайте зручний спосіб отримання — кур&apos;єром по Одесі, поштою по Україні чи в
                Європу, або самовивіз просто з ринку.
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
                Точну вартість доставки та строки для вашого міста Вікторія підкаже особисто у
                Viber або Telegram — це займе хвилину.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
                  onClick={handleViberClick}
                  className={viberButton}
                >
                  <Phone size={16} /> Viber
                </a>
                <a
                  href={`https://t.me/+${VIBER_RAW_NUMBER}`}
                  onClick={handleTelegramClick}
                  className={telegramButton}
                >
                  <MessageCircle size={16} /> Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="markets" className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Забирайте або замовляйте
            </p>
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
                  <h3 className="mt-6 text-2xl font-black underline-offset-4 group-hover:underline">
                    Черьомушки
                  </h3>
                  <p className="mt-2 flex-1 leading-6 text-muted-foreground">
                    Одеса, ринок на Черьомушках
                    <br />
                    Свіжі салати та морепродукти
                  </p>
                  <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wide text-primary">
                    Пт, сб, нд · 09:00–16:00
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
                  <h3 className="mt-6 text-2xl font-black underline-offset-4 group-hover:underline">
                    Північний ринок
                  </h3>
                  <p className="mt-2 flex-1 leading-6 text-muted-foreground">
                    Одеса, Північний ринок
                    <br />
                    Заходьте за соліннями до обіду
                  </p>
                  <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wide text-primary">
                    Кожен день · 08:00–16:00
                  </p>
                </div>
              </a>
              <div className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#7360f2] to-[#229ED9] p-7 text-white shadow-sm">
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
                <div className="mt-6 flex flex-col gap-2">
                  <p className="font-mono text-base font-bold">{VIBER_PHONE_DISPLAY}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
                      onClick={handleViberClick}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold transition hover:bg-white/30"
                    >
                      <Phone size={14} /> Viber
                    </a>
                    <a
                      href={`https://t.me/+${VIBER_RAW_NUMBER}`}
                      onClick={handleTelegramClick}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold transition hover:bg-white/30"
                    >
                      <MessageCircle size={14} /> Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-2 lg:px-10">
          <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-12">
            <Music2 size={30} />
            <p className="mt-12 max-w-lg text-3xl font-black leading-tight tracking-[-0.04em]">
              «Домашні маринади та свіжі морепродукти — щодня для Одеси і не тільки».
            </p>
            <div className="mt-8 font-mono text-xs font-bold uppercase tracking-widest">
              @u_vicktorii · 170.3K лайків
            </div>
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
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              На зв&apos;язку
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">
              Є питання щодо
              <br />
              асорті чи доставки?
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Напишіть Вікторії у Viber, Telegram або TikTok — підкажемо, що сьогодні найсмачніше.
              Доставляємо по Одесі, по всій Україні та до Європи.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
                onClick={handleViberClick}
                className={viberButton}
              >
                <Phone size={16} /> Viber: {VIBER_PHONE_DISPLAY}
              </a>
              <a
                href={`https://t.me/+${VIBER_RAW_NUMBER}`}
                onClick={handleTelegramClick}
                className={telegramButton}
              >
                <MessageCircle size={16} /> Telegram
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
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                TikTok
              </p>
              <h2 className="mt-3 font-sans text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Свіжі TikTok-відео від Вікторії
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Нові соління та кулінарні моменти
              </p>
            </div>
            <div className="flex justify-center">
              <div className="elfsight-app-87f8bb85-a6f2-4f8e-b87e-40bcd4e1e50f w-full max-w-5xl" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <a
            href={TIKTOK_LINK}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xl font-black tracking-[-0.08em] transition-colors duration-200 hover:text-primary"
          >
            У <span className="text-primary">Вікторії</span>
          </a>
          <div className="flex flex-col items-center gap-3 text-muted-foreground sm:flex-row sm:gap-5">
            <a
              href="#delivery"
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
            >
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
            <a
              href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
              onClick={handleViberClick}
              className="inline-flex items-center gap-2 font-semibold text-[#7360f2] transition-colors duration-200 hover:text-[#5d4bd9]"
            >
              <Phone size={15} /> Viber
            </a>
            <a
              href={`https://t.me/+${VIBER_RAW_NUMBER}`}
              onClick={handleTelegramClick}
              className="inline-flex items-center gap-2 font-semibold text-[#229ED9] transition-colors duration-200 hover:text-[#1b8bc4]"
            >
              <MessageCircle size={15} /> Telegram
            </a>
            <a
              href={TIKTOK_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="transition-colors duration-200 hover:text-primary"
            >
              <Music2 size={17} />
            </a>
          </div>
          <a
            href={TIKTOK_LINK}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            © 2026 У Вікторії
          </a>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => setCartOpen(true)}
          className="flex cursor-pointer items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-2xl transition-all duration-200 hover:bg-primary/90 active:scale-95"
          aria-label="Відкрити кошик"
        >
          <ShoppingBag size={18} />
          {totalItems > 0 ? (
            <span>
              {totalItems} · {total} ₴
            </span>
          ) : (
            <span>Кошик</span>
          )}
        </button>
        <a
          href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
          onClick={handleViberClick}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#7360f2] px-5 py-3.5 text-sm font-bold text-white shadow-2xl transition-all duration-200 hover:bg-[#5d4bd9] active:scale-95"
          aria-label="Написати у Viber"
        >
          <Phone size={18} />
          <span className="hidden sm:inline">Viber</span>
        </a>
        <a
          href={`https://t.me/+${VIBER_RAW_NUMBER}`}
          onClick={handleTelegramClick}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#229ED9] px-5 py-3.5 text-sm font-bold text-white shadow-2xl transition-all duration-200 hover:bg-[#1b8bc4] active:scale-95"
          aria-label="Написати у Telegram"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Telegram</span>
        </a>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-foreground/40 sm:items-stretch">
          <button
            className="absolute inset-0 cursor-default"
            onClick={() => setCartOpen(false)}
            aria-label="Закрити кошик"
          />
          <aside className="relative flex h-[85vh] w-full flex-col rounded-t-3xl bg-card p-6 sm:h-full sm:max-w-md sm:rounded-none">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Ваш кошик</h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Закрити"
                className="cursor-pointer transition-colors duration-200 hover:text-primary"
              >
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              {totalItems === 0 && (
                <p className="text-sm text-muted-foreground">
                  Кошик поки порожній. Додайте товари з асортименту.
                </p>
              )}
              {products
                .filter((p) => cart[p.id])
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 border-b border-border py-4"
                  >
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
                  Мінімальне замовлення для доставки — 300 ₴. Додайте ще на {300 - total} ₴ або
                  оберіть самовивіз.
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
                Вставте скопійований текст у Viber або Telegram
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={`viber://chat?number=%2B${VIBER_RAW_NUMBER}`}
                  onClick={handleViberClick}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7360f2] py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#5d4bd9] active:scale-[0.98]"
                >
                  <Phone size={16} /> Viber
                </a>
                <a
                  href={`https://t.me/+${VIBER_RAW_NUMBER}`}
                  onClick={handleTelegramClick}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#229ED9] py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#1b8bc4] active:scale-[0.98]"
                >
                  <MessageCircle size={16} /> Telegram
                </a>
              </div>
              <a
                href={TIKTOK_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-bold transition-all duration-200 hover:border-primary hover:bg-secondary hover:text-primary active:scale-[0.98]"
              >
                Уточнити у TikTok
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default KFoodSite
