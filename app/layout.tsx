import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from "next/script";

const geist = Geist({ subsets: ['latin', 'cyrillic'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'У Вікторії — корейські соління в Одесі',
  description: 'Корейські салати, кімчі та морепродукти на Черьомушках (пʼятниця-неділя) і Північному ринку (понеділок-четвер) в Одесі. Доставка по Одесі, Україні та Європі. Viber: +380968984626.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="uk" className="bg-background">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
      {children}
      <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="afterInteractive"
      />
      {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
      </html>
  )
}
