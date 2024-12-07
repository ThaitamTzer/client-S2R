import dynamic from 'next/dynamic'
import { navLink } from '@/types/navTypes'
import { Suspense } from 'react'

const NavigationWithBg = dynamic(() => import('@/components/navWithBg'), { ssr: false })

const navLinks: navLink[] = [
  {
    href: '/packet',
    label: 'Gói nạp',
  },
]

export default function PacketLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <NavigationWithBg navLink={navLinks} />
        {children}
      </Suspense>
    </>
  )
}
