import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { themeAntProvider } from '@/components/themeProvider'
import { MantineProvider } from '@mantine/core'
import { Toaster } from 'react-hot-toast'
import { Montserrat } from 'next/font/google'
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'
import { lazy, Suspense, memo, useMemo } from 'react'

// Lazy load heavy context providers
const AuthProvider = lazy(() => import('@/contexts/AuthContext').then(m => ({ default: m.AuthProvider })))
const ClientProvider = lazy(() => import('@/contexts/ClientContext').then(m => ({ default: m.ClientProvider })))
const SocketProvider = lazy(() => import('@/contexts/SocketContext').then(m => ({ default: m.SocketProvider })))
const QueryClientProvider = lazy(() => import('@/contexts/QueryClientContext').then(m => ({ default: m.Providers })))

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
  fallback: ['Inter', 'system-ui', 'sans-serif'],
})

interface ProvidersProps {
  children: React.ReactNode
}

// Loading fallback component
const ProvidersLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
  </div>
)

// Optimized providers with lazy loading
export const Providers = memo(({ children }: ProvidersProps) => {
  // Memoize theme creation
  const theme = useMemo(() => mergeMantineTheme(
    DEFAULT_THEME,
    createTheme({
      fontFamily: montserrat.style.fontFamily,
      fontFamilyMonospace: montserrat.style.fontFamily,
      // Add performance optimizations
      respectReducedMotion: true,
      // Reduce bundle size by limiting colors
      colors: {
        // Keep only essential colors
        green: DEFAULT_THEME.colors.green,
        red: DEFAULT_THEME.colors.red,
        blue: DEFAULT_THEME.colors.blue,
        gray: DEFAULT_THEME.colors.gray,
      },
    }),
  ), [])

  return (
    <Suspense fallback={<ProvidersLoading />}>
      <AuthProvider>
        <Suspense fallback={<ProvidersLoading />}>
          <SocketProvider>
            <Suspense fallback={<ProvidersLoading />}>
              <QueryClientProvider>
                <Suspense fallback={<ProvidersLoading />}>
                  <ClientProvider>
                    <ConfigProvider theme={themeAntProvider}>
                      <AntdRegistry>
                        <MantineProvider theme={theme}>
                          <Toaster 
                            position="top-center"
                            toastOptions={{
                              // Reduce animation complexity
                              duration: 3000,
                              style: {
                                borderRadius: '8px',
                                fontSize: '14px',
                              },
                            }}
                          />
                          {children}
                        </MantineProvider>
                      </AntdRegistry>
                    </ConfigProvider>
                  </ClientProvider>
                </Suspense>
              </QueryClientProvider>
            </Suspense>
          </SocketProvider>
        </Suspense>
      </AuthProvider>
    </Suspense>
  )
})

Providers.displayName = 'Providers'
