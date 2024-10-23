import { Shop } from '@/components/shop/shop'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description: 'Cửa hàng của chúng tôi cung cấp các sản phẩm chất lượng, giá cả phải chăng',
}

const ShopPage = () => {
  return (
    <>
      <Shop />
    </>
  )
}

export default ShopPage
