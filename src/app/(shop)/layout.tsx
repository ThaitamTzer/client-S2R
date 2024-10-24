import Navigation from '@/components/nav'
import { TypeCategory } from '@/metadata/category'
import { Suspense } from 'react'

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Navigation navLink={TypeCategory} />
      {children}
    </Suspense>
  )
}
