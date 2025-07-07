'use client'
import { useCallback, useState, useEffect } from 'react'
import { Divider } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useUserAction } from '@/zustand/user'
import IconifyIcon from '../icons'
import { ProductsClient } from '@/types/users/productTypes'
import { motion, AnimatePresence } from 'framer-motion'

const ProductCard = dynamic(() => import('./productCard'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-full w-full rounded" />,
})
const FilterTag = dynamic(() => import('./filterTag'), {
  ssr: false,
  loading: () => <div className="h-10 bg-gray-100 animate-pulse" />,
})
const FilterSide = dynamic(() => import('./filter'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-gray-100 animate-pulse" />,
})
const FilterDrawer = dynamic(() => import('./filterDrawer'), { ssr: false, loading: () => <div /> })

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

interface ShopProps {
  products: ProductsClient[] | null
  total: number
  currentPage: number
  limit: number
  searchParams: SearchParams
}

const Shop = ({ products, total, currentPage, limit, searchParams }: ShopProps) => {
  const { setOpenFilterDrawer } = useUserAction()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const totalPages = Math.ceil(total / limit)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  // Tạo URL mới khi thay đổi page
  const createPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams()

      // Thêm tất cả search params hiện tại
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && key !== 'page') {
          params.set(key, value)
        }
      })

      // Set page mới
      params.set('page', page.toString())
      params.set('limit', limit.toString())

      return `/shop?${params.toString()}`
    },
    [searchParams, limit],
  )

  // Navigation handlers
  const handleNextPage = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setIsLoading(true)
      router.push(createPageUrl(currentPage + 1))
    }
  }, [hasNextPage, isLoading, currentPage, createPageUrl, router])

  const handlePrevPage = useCallback(() => {
    if (hasPrevPage && !isLoading) {
      setIsLoading(true)
      router.push(createPageUrl(currentPage - 1))
    }
  }, [hasPrevPage, isLoading, currentPage, createPageUrl, router])

  const handlePageClick = useCallback(
    (page: number) => {
      if (page !== currentPage && !isLoading) {
        setIsLoading(true)
        router.push(createPageUrl(page))
      }
    },
    [currentPage, isLoading, createPageUrl, router],
  )

  // Reset loading state khi products thay đổi
  useEffect(() => {
    setIsLoading(false)
  }, [products])

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  // Tạo danh sách page numbers để hiển thị
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxPagesToShow - 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
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
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold">{total} Kết quả</p>
                <p className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </p>
              </div>

              <motion.div className="container mx-auto mt-3" layout>
                <AnimatePresence mode="wait">
                  <motion.div
                    className="flex flex-wrap gap-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    layout
                  >
                    {products?.map((product, index) => (
                      <motion.div
                        layout
                        layoutId={product._id}
                        variants={item}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.3,
                          delay: index < 20 ? index * 0.05 : 0,
                          layout: {
                            duration: 0.2,
                          },
                        }}
                        className="w-[48%] md:w-[24%] h-[420px] md:h-[500px]"
                        key={product._id}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <motion.div className="flex justify-center items-center mt-8 space-x-2" layout>
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevPage}
                      disabled={!hasPrevPage || isLoading}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        hasPrevPage && !isLoading
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      ← Trước
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          page === currentPage
                            ? 'bg-green-600 text-white'
                            : isLoading
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={handleNextPage}
                      disabled={!hasNextPage || isLoading}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        hasNextPage && !isLoading
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Sau →
                    </button>
                  </motion.div>
                )}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div className="flex justify-center items-center mt-4" layout>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    <span className="ml-2 text-gray-600">Đang tải...</span>
                  </motion.div>
                )}

                {/* No results message */}
                {products && products.length === 0 && (
                  <motion.div className="text-center mt-8 py-8" layout>
                    <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
