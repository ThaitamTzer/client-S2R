import { fetchAllProdClient } from '@/action/shop'
import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

interface SearchParams {
  page?: string
  limit?: string
  filterCategory?: string | string[]
  filterBrand?: string | string[]
  filterStartPrice?: string
  filterEndPrice?: string
  filterSize?: string | string[]
  filterColor?: string | string[]
  filterMaterial?: string | string[]
  filterCondition?: string | string[]
  filterType?: string | string[]
  filterStyle?: string | string[]
  filterTypeCategory?: string | string[]
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

  // Helper function to safely parse filter parameters
  const parseFilterParam = (param: string | string[] | undefined): string[] | undefined => {
    if (!param) return undefined
    if (Array.isArray(param)) return param
    return param.split(',')
  }

  // Parse filter arrays từ URL string
  const filterCategory = parseFilterParam(searchParams.filterCategory)
  const filterBrand = parseFilterParam(searchParams.filterBrand)
  const filterSize = parseFilterParam(searchParams.filterSize)
  const filterColor = parseFilterParam(searchParams.filterColor)
  const filterMaterial = parseFilterParam(searchParams.filterMaterial)
  const filterCondition = parseFilterParam(searchParams.filterCondition)
  const filterType = parseFilterParam(searchParams.filterType)
  const filterStyle = parseFilterParam(searchParams.filterStyle)
  const filterTypeCategory = parseFilterParam(searchParams.filterTypeCategory)

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
