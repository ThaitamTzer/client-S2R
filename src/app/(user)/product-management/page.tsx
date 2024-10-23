import ProductManagement from '@/components/product-management/productManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm',
  description: 'Quản lý sản phẩm',
}

const ProductManagementPage = () => {
  return (
    <div>
      <ProductManagement />
    </div>
  )
}

export default ProductManagementPage
