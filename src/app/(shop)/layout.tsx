import NavigationWithBg from '@/components/navWithBg'
import { TypeCategory } from '@/metadata/category'
import { Suspense } from 'react'
import Loading from '../loading'

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <NavigationWithBg navLink={TypeCategory} />
      {children}
    </Suspense>
  )
}
