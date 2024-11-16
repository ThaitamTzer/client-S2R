import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import { Montserrat } from 'next/font/google'
import './globals.css'
import '@/styles/style.css'
import '@mantine/carousel/styles.css'
import { Suspense, lazy } from 'react'
import { Providers } from '@/providers/providers'
import Loading from './loading'
import Header from '@/partials/header'
import Footer from '@/partials/footer'
import Chat from '@/components/chat/chat'

const ExChangeDrawer = lazy(() => import('@/components/exchange/exchange'))
const LoginModal = lazy(() => import('@/components/loginModal'))

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Share2Receive',
    template: '%s | Share2Receive',
  },
  description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
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
        <Suspense fallback={<Loading />}>
          <Providers>
            <Header />
            <ExChangeDrawer />
            <main className={`relative mt-16 h-full min-h-screen scroll-smooth ${montserrat.className}`}>
              <LoginModal />
              {children}
            </main>
            <Chat />
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
