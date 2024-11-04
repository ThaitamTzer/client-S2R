'use client'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import { useState } from 'react'
import { Card } from 'antd'
import { useSearchParams } from 'next/navigation'
import { FilterFilled } from '@ant-design/icons'
import dynamic from 'next/dynamic'

const ProductCard = dynamic(() => import('./productCard'))
const FilterTag = dynamic(() => import('./filterTag'), { ssr: false })
const FilterSide = dynamic(() => import('./filter'), { ssr: false })

const Shop = () => {
  const { setProducts } = useProductClient()
  const [total, setTotal] = useState<number>(0)
  const param = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(param.get('page') ? Number(param.get('page')) : 1)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loadedProducts, setLoadedProducts] = useState<any[]>([])

  const limit = param.get('limit') ? Number(param.get('limit')) : 50
  const filterCategory = param.getAll('filterCategory') || undefined
  const filterBrand = param.getAll('filterBrand') || undefined
  const filterStartPrice = param.getAll('filterStartPrice') ? Number(param.getAll('filterStartPrice')) : undefined
  const filterEndPrice = param.getAll('filterEndPrice') ? Number(param.getAll('filterEndPrice')) : undefined
  const filterSize = param.getAll('filterSize') || undefined
  const filterColor = param.getAll('filterColor') || undefined
  const filterMaterial = param.getAll('filterMaterial') || undefined
  const filterCondition = param.getAll('filterCondition') || undefined
  const filterType = param.getAll('filterType') || undefined
  const filterStyle = param.getAll('filterStyle') || undefined
  const filterTypeCategory = param.getAll('filterTypeCategory') || undefined
  const searchKey = param.get('searchKey') || undefined

  const { isLoading } = useSWR(
    [
      '/shop',
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
      searchKey,
    ],
    () =>
      productService.getAllProdClient(
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
        searchKey,
      ),
    {
      onLoadingSlow: () => {
        setProducts([])
      },
      onSuccess: (data) => {
        if (currentPage === 1) {
          setLoadedProducts(data.data)
        } else {
          setLoadedProducts((prev) => [...prev, ...data.data])
        }
        setProducts(loadedProducts)
        setTotal(data.total)
      },
    },
  )

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const SekeletonCard = () => {
    if (isLoading) {
      const loadingPlaceholders = Array.from({ length: 8 })

      return (
        <>
          <div className="container mx-auto px-5">
            <div className="container mx-auto">
              <div className="grid grid-cols-4 gap-5">
                {loadingPlaceholders.map((_, index) => (
                  <Card
                    key={index}
                    hoverable
                    loading={isLoading}
                    style={{
                      width: '100%',
                    }}
                    cover={
                      <div
                        style={{
                          width: '100%', // Fixed width for the image container
                          height: '300px', // Fixed height for the image container
                          overflow: 'hidden', // Ensures the image fits the container without overflow
                        }}
                      ></div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-semibold uppercase">
          <FilterFilled size={30} /> Bộ lọc tìm kiếm
        </h1>
        <div className="container mx-auto mt-5">
          <FilterTag />
        </div>
        <div className="flex mt-3">
          <div className="w-[22%] h-full">
            <FilterSide />
          </div>
          <div className="w-[75%] h-full ml-5">
            <div className="container mx-auto px-5">
              <p className="text-xl font-semibold">{total} sản phẩm</p>
              <div className="container mx-auto mt-3">
                <SekeletonCard />
                <div className="flex flex-wrap gap-3">
                  {loadedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} isLoading={isLoading} />
                  ))}
                </div>
                {loadedProducts.length < total && (
                  <div className="text-center mt-5">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {isLoading ? 'Đang tải...' : 'Xem thêm'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
