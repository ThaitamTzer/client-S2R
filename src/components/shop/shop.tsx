'use client'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import { useState } from 'react'
import { Card } from 'antd'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'

export const Shop = () => {
  const { products, setProducts } = useProductClient()
  const [total, setTotal] = useState<number>(0)
  const { Meta } = Card

  const { isLoading } = useSWR('shop', () => productService.getAllProdClient(1, 10), {
    onLoadingSlow: () => {
      setProducts([])
    },
    onSuccess: (data) => {
      setProducts(data.data)
      setTotal(data.total)
    },
  })

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

  return (
    <>
      <div className="container mx-auto px-5">
        <p className="text-xl font-semibold">{total} sản phẩm</p>
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-5">
            {products.map((product) => (
              <Card
                key={product._id}
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
                  >
                    <Image
                      src={product.imgUrls[0]}
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
                      {product.sizeVariants.map((size) => {
                        return size.size
                      })}{' '}
                    </p>
                  }
                />
                <Meta
                  title={
                    <p className="text-xl font-semibold text-green-800">
                      {product.type === 'barter' ? (
                        <>
                          <p>Trao đổi</p>
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
                    marginTop: '10px',
                  }}
                  title={
                    <div className="flex">
                      <div className="w-5 h-5 overflow-hidden rounded-full mr-2">
                        <Image
                          src={product.userId.avatar}
                          alt={product.userId.firstname + ' ' + product.userId.lastname}
                          width={50}
                          height={50}
                          className="object-cover "
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="text-sm font-semibold">
                          {product.userId.firstname + ' ' + product.userId.lastname}
                        </p>
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
