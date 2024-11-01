import Loading from '@/app/loading'
import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

const ProductManagement = lazy(() => import('@/components/product-management/productManagement'))

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm',
  description: 'Quản lý sản phẩm',
}

const ProductManagementPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductManagement />
    </Suspense>
  )
}

export default ProductManagementPage
