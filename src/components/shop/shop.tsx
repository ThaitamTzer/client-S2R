'use client'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import { useState } from 'react'
import { Card } from 'antd'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilterFilled } from '@ant-design/icons'
import { FilterTag } from '@/components/shop/filterTag'
import { FilterSide } from '@/components/shop/filter'

export const Shop = () => {
  const { products, setProducts } = useProductClient()
  const [total, setTotal] = useState<number>(0)
  const { Meta } = Card
  const router = useRouter()
  const param = useSearchParams()

  const page = param.get('page') ? Number(param.get('page')) : 1
  const limit = param.get('limit') ? Number(param.get('limit')) : 10
  const filterCategory = param.get('filterCategory') || undefined
  const filterBrand = param.get('filterBrand') || undefined
  const filterStartPrice = param.get('filterStartPrice')
    ? Number(param.get('filterStartPrice'))
    : undefined
  const filterEndPrice = param.get('filterEndPrice')
    ? Number(param.get('filterEndPrice'))
    : undefined
  const filterSize = param.get('filterSize') || undefined
  const filterColor = param.get('filterColor') || undefined
  const filterMaterial = param.get('filterMaterial') || undefined
  const filterCondition = param.get('filterCondition') || undefined
  const filterType = param.get('filterType') || undefined
  const filterStyle = param.get('filterStyle') || undefined
  const filterTypeCategory = param.get('filterTypeCategory') || undefined
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
      <div className="container mx-auto px-10 mt-40">
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
                <div className="grid grid-cols-4 gap-5">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        router.push(`shop/${product.slug}`)
                      }}
                    >
                      <Card
                        key={product._id}
                        hoverable={true}
                        loading={isLoading}
                        className="shadow-sm"
                        style={{
                          width: '100%',
                          border: '2px solid #f0f0f0',
                        }}
                        cover={
                          <div
                            style={{
                              width: '100%', // Fixed width for the image container
                              height: '300px', // Fixed height for the image container
                              overflow: 'hidden', // Ensures the image fits the container without overflow
                              position: 'relative',
                            }}
                          >
                            {product.type === 'barter' && (
                              <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1">
                                Trao đổi
                              </div>
                            )}
                            {product.condition === 'new' && (
                              <div className="absolute top-0 right-0 text-white bg-red-500 px-2 py-1">
                                Mới
                              </div>
                            )}
                            <Image
                              src={product.imgUrls?.[0]}
                              alt={product.productName}
                              width={240} // Matches the container width
                              height={200} // Matches the container height
                              className="object-cover"
                              style={{
                                width: '100%', // Ensures the image covers the container
                                height: '100%', // Ensures the image covers the container
                              }}
                            />
                          </div>
                        }
                      >
                        <Meta title={<p className="text-xl">{product.productName}</p>} />
                        <Meta
                          title={
                            <p className="text-lg font-normal">
                              Kích thước:{' '}
                              {product.sizeVariants.slice(0, 3).map((size, index) => (
                                <span key={size._id}>
                                  {size.size}
                                  {index < product.sizeVariants.slice(0, 3).length - 1 && ', '}
                                </span>
                              ))}
                              {product.sizeVariants.length > 3 && ',...'}
                            </p>
                          }
                        />
                        <Meta
                          title={
                            <p className="text-xl font-semibold text-green-800">
                              {product.type === 'barter' ? (
                                <>
                                  <p>Liên hệ</p>
                                  <p className="text-sm underline">Xem ngay</p>
                                </>
                              ) : (
                                <>
                                  <p>{formatPrice(product.price) + 'đ'}</p>
                                  <p className="text-sm underline">Xem ngay</p>
                                </>
                              )}
                            </p>
                          }
                        />
                        <Meta
                          style={{
                            marginTop: '15px',
                          }}
                          title={
                            <div className="flex">
                              <div className="w-5 h-5 overflow-hidden rounded-full mr-2">
                                <Image
                                  src={product.userId?.avatar}
                                  alt={product.userId?.firstname + ' ' + product.userId?.lastname}
                                  width={50}
                                  height={50}
                                  className="object-cover "
                                />
                              </div>
                              <div className="flex justify-center items-center">
                                <p className="text-sm font-semibold">
                                  {product.userId?.firstname + ' ' + product.userId?.lastname}
                                </p>
                              </div>
                            </div>
                          }
                        />
                      </Card>
                    </div>
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
