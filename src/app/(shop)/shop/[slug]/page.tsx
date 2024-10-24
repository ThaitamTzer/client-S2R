import { ProductDetail } from '@/components/product/productDetail'
import productService from '@/services/product/product.service'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const products = await productService.getAllProdClient(1, 999)

  return products.data.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await productService.getProductById(params.slug)

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

  return (
    <>
      <ProductDetail product={product} />
    </>
  )
}
