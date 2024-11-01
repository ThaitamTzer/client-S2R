'use client'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import { useState } from 'react'
import { Card } from 'antd'
import { useSearchParams } from 'next/navigation'
import { FilterFilled } from '@ant-design/icons'
import dynamic from 'next/dynamic'

const ProductCard = dynamic(() => import('./productCard'), { ssr: false })
const FilterTag = dynamic(() => import('./filterTag'), { ssr: false })
const FilterSide = dynamic(() => import('./filter'), { ssr: false })

const Shop = () => {
  const { products, setProducts } = useProductClient()
  const [total, setTotal] = useState<number>(0)
  const param = useSearchParams()

  const page = param.get('page') ? Number(param.get('page')) : 1
  const limit = param.get('limit') ? Number(param.get('limit')) : 10
  const filterCategory = param.getAll('filterCategory') || undefined
  const filterBrand = param.getAll('filterBrand') || undefined
  const filterStartPrice = param.getAll('filterStartPrice')
    ? Number(param.getAll('filterStartPrice'))
    : undefined
  const filterEndPrice = param.getAll('filterEndPrice')
    ? Number(param.getAll('filterEndPrice'))
    : undefined
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
      page,
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
        page,
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
        setProducts(data.data)
        setTotal(data.total)
      },
    },
  )

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
      <div className="container mx-auto mt-40">
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
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} isLoading={isLoading} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
