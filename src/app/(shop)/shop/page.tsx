import { fetchAllProdClient } from '@/action/shop'
import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

interface SearchParams {
  page?: string
  limit?: string
  filterCategory?: string
  filterBrand?: string
  filterStartPrice?: string
  filterEndPrice?: string
  filterSize?: string
  filterColor?: string
  filterMaterial?: string
  filterCondition?: string
  filterType?: string
  filterStyle?: string
  filterTypeCategory?: string
  searchKey?: string
}

const Shop = dynamic(() => import('@/components/shop/shop'), { ssr: false, loading: () => <div /> })
const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'), { ssr: false, loading: () => <div /> })

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description: 'Cửa hàng của chúng tôi cung cấp các sản phẩm chất lượng, giá cả phải chăng',
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Cửa hàng', link: '/shop' },
  ]

  // Parse search params
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 50

  // Parse filter arrays từ URL string
  const filterCategory = searchParams.filterCategory ? searchParams.filterCategory.split(',') : undefined
  const filterBrand = searchParams.filterBrand ? searchParams.filterBrand.split(',') : undefined
  const filterSize = searchParams.filterSize ? searchParams.filterSize.split(',') : undefined
  const filterColor = searchParams.filterColor ? searchParams.filterColor.split(',') : undefined
  const filterMaterial = searchParams.filterMaterial ? searchParams.filterMaterial.split(',') : undefined
  const filterCondition = searchParams.filterCondition ? searchParams.filterCondition.split(',') : undefined
  const filterType = searchParams.filterType ? searchParams.filterType.split(',') : undefined
  const filterStyle = searchParams.filterStyle ? searchParams.filterStyle.split(',') : undefined
  const filterTypeCategory = searchParams.filterTypeCategory ? searchParams.filterTypeCategory.split(',') : undefined

  // Parse price filters
  const filterStartPrice = searchParams.filterStartPrice ? parseInt(searchParams.filterStartPrice) : undefined
  const filterEndPrice = searchParams.filterEndPrice ? parseInt(searchParams.filterEndPrice) : undefined

  // Fetch data với SSR
  const productData = await fetchAllProdClient(
    currentPage,
    limit,
    filterCategory,
    filterBrand,
    filterStartPrice,
    filterEndPrice,
    filterSize,
    filterColor,
    filterMaterial,
    filterCondition,
    filterType,
    filterStyle,
    filterTypeCategory,
    searchParams.searchKey ?? '',
  )

  const total = productData?.total ?? 0
  const products = productData?.data ?? []

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-40 px-2 md:px-0 md:mt-36">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Shop products={products} total={total} currentPage={currentPage} limit={limit} searchParams={searchParams} />
    </Suspense>
  )
}
