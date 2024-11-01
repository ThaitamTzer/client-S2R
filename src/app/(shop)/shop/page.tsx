import Loading from '@/app/loading'
import Breadcrumb from '@/components/Breadcrumb'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Shop = dynamic(() => import('@/components/shop/shop'), { ssr: false })

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description: 'Cửa hàng của chúng tôi cung cấp các sản phẩm chất lượng, giá cả phải chăng',
}

const ShopPage = () => {
  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Cửa hàng', link: '/shop' },
  ]

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-36">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Shop />
    </Suspense>
  )
}

export default ShopPage
