import { Suspense, lazy } from 'react'
const NavigationWithBgAlways = lazy(() => import('@/components/navWithBgAlway'))

const navLinks = {
  href: '/checkout/[orderId]',
  label: 'Thanh toán',
}

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-28">{children}</div>
      </Suspense>
    </>
  )
}
