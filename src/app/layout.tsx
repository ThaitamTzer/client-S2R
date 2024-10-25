import type { Metadata } from 'next'
import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
} from '@mantine/core'
import { Montserrat } from 'next/font/google'
import './globals.css'
import '@/styles/style.css'
import '@mantine/carousel/styles.css'
import Header from '@/partials/header'
import ScrollingUp from '@/partials/up'
import Footer from '@/partials/footer'
import LoginModal from '@/components/loginModal'
import { AuthProvider } from '@/contexts/AuthContext'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { themeAntProvider } from '@/components/themeProvider'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import { ClientProvider } from '@/contexts/ClientContext'
import ExChangeDrawer from '@/components/exchange/exchange'

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

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    fontFamily: montserrat.style.fontFamily,
    fontFamilyMonospace: montserrat.style.fontFamily,
  }),
)

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
          <AuthProvider>
            <ClientProvider>
              <ConfigProvider theme={themeAntProvider}>
                <AntdRegistry>
                  <MantineProvider theme={theme}>
                    <Header />
                    <ExChangeDrawer />
                    <main
                      className={`relative mt-16 h-full min-h-screen scroll-smooth  ${montserrat.className}`}
                    >
                      <LoginModal />
                      <Toaster position="top-right" />
                      {children}
                      <ScrollingUp />
                    </main>
                    <Footer />
                  </MantineProvider>
                </AntdRegistry>
              </ConfigProvider>
            </ClientProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
