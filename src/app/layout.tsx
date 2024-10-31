import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import { Montserrat } from 'next/font/google'
import './globals.css'
import '@/styles/style.css'
import '@mantine/carousel/styles.css'
import Header from '@/partials/header'
import ScrollingUp from '@/partials/up'
import Footer from '@/partials/footer'
import LoginModal from '@/components/loginModal'
import { Suspense } from 'react'
import ExChangeDrawer from '@/components/exchange/exchange'
import { Providers } from '@/providers/providers'

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Trang chủ',
    template: '%s | Share2Receive',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className="scroll-smooth [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-green-700"
      lang="en"
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased relative ${montserrat.className}`}>
        <Suspense>
          <Providers>
            <Header />
            <ExChangeDrawer />
            <main
              className={`relative mt-16 h-full min-h-screen scroll-smooth ${montserrat.className}`}
            >
              <LoginModal />
              {children}
              <ScrollingUp />
            </main>
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
