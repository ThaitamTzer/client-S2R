import NavigationWithBg from '@/components/navWithBg'
import { TypeCategory } from '@/metadata/category'
import { Suspense } from 'react'

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <NavigationWithBg navLink={TypeCategory} />
      {children}
    </Suspense>
  )
}
