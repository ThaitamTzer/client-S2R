import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Shop = dynamic(() => import('@/components/shop/shop'), { ssr: false })

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description: 'Cửa hàng của chúng tôi cung cấp các sản phẩm chất lượng, giá cả phải chăng',
}

const ShopPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Shop />
    </Suspense>
  )
}

export default ShopPage
