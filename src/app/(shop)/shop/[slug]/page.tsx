import productService from '@/services/product/product.service'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from '@/app/loading'

const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'))
const ProductDetail = dynamic(() => import('@/components/product/productDetail'))

export async function generateStaticParams() {
  const products = await productService.getAllProdClient(1, 999)

  if (!products) {
    return []
  }

  return products.data.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await productService.getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: product.productName,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await productService.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Cửa hàng', link: '/shop' },
    { label: product.productName, link: `/shop/${product.productName}` },
  ]

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-40 px-2 md:px-0 md:mt-36">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ProductDetail product={product} />
    </Suspense>
  )
}
