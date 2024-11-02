import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { themeAntProvider } from '@/components/themeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ClientProvider } from '@/contexts/ClientContext'
import { MantineProvider } from '@mantine/core'
import { Toaster } from 'react-hot-toast'
import { Montserrat } from 'next/font/google'
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'
import { SocketProvider } from '@/contexts/SocketContext'

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    fontFamily: montserrat.style.fontFamily,
    fontFamilyMonospace: montserrat.style.fontFamily,
  }),
)

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        <ClientProvider>
          <ConfigProvider theme={themeAntProvider}>
            <AntdRegistry>
              <MantineProvider theme={theme}>
                <Toaster position="top-right" />
                {children}
              </MantineProvider>
            </AntdRegistry>
          </ConfigProvider>
        </ClientProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
