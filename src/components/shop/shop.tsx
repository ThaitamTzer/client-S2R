'use client'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import { useState } from 'react'
import { Divider } from 'antd'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useUserAction } from '@/zustand/user'
import IconifyIcon from '../icons'

const ProductCard = dynamic(() => import('./productCard'))
const FilterTag = dynamic(() => import('./filterTag'), { ssr: false })
const FilterSide = dynamic(() => import('./filter'), { ssr: false })
const FilterDrawer = dynamic(() => import('./filterDrawer'), { ssr: false })

const Shop = () => {
  const { setProducts } = useProductClient()
  const { setOpenFilterDrawer } = useUserAction()
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
          setLoadedProducts(data?.data)
        } else {
          setLoadedProducts((prev) => [...prev, ...data?.data])
        }
        setProducts(loadedProducts)
        setTotal(data?.total)
      },
    },
  )

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <>
      <FilterDrawer />
      <div className="container mx-auto mt-5">
        <p className="md:px-0 px-2 text-xl md:text-2xl font-semibold uppercase flex items-center">
          <IconifyIcon icon="tabler:filter" className="text-xl font-semibold md:text-3xl md:font-bold" /> Bộ lọc tìm
          kiếm
        </p>
        <div className="container md:px-0 px-2 mx-auto mt-2 md:mt-5">
          <FilterTag />
        </div>
        <Divider
          className="md:hidden block"
          style={{
            borderColor: '#000',
            padding: '0 8px',
            margin: '10px 8px',
          }}
        />
        <p className="md:hidden md:px-0 px-2 text-blue-600 underline" onClick={() => setOpenFilterDrawer(true)}>
          Lọc kết quả
        </p>
        <div className="flex mt-3">
          <div className="w-[22%] h-full hidden md:block">
            <FilterSide />
          </div>
          <div className="w-full md:w-[75%] h-full md:ml-5">
            <div className="container mx-auto px-2 md:px-5 mb-10">
              <p className="text-xl font-semibold">{total} Kết quả</p>
              <div className="container mx-auto mt-3">
                <div className="flex flex-wrap gap-3">
                  {loadedProducts.map((product) => (
                    <div className="w-[48%] md:w-[24%] h-[420px] md:h-[500px]" key={product._id}>
                      <ProductCard product={product} isLoading={isLoading} />
                    </div>
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
