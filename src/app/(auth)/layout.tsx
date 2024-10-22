import Navigation from '@/components/nav'
import { Suspense } from 'react'

const navLinks = [
  {
    href: '/login',
    label: 'Đăng nhập',
  },
  {
    href: '/register',
    label: 'Đăng ký',
  },
  {
    href: '/forgot-password',
    label: 'Quên mật khẩu',
  },
]

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <Navigation navLink={navLinks} />
        <div className="mt-24">{children}</div>
      </Suspense>
    </>
  )
}
