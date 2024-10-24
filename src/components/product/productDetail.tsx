'use client'
import { Product } from '@/types/users/productTypes'
import Image from 'next/image'
import { Carousel } from '@mantine/carousel'
import classes from '@/styles/product.module.css'
import { formatPrice } from '@/helper/format'
import { useState } from 'react'
import { Button } from 'antd'

export const ProductDetail = ({ product }: { product: Product }) => {
  const [count, setCount] = useState(1)

  return (
    <>
      <div className="container mx-auto px-24 mt-48">
        <div className="product-overview">
          <div className="flex flex-row justify-between">
            <div className="product-image w-[55%] flex justify-between flex-row min-h-[675px] max-h-[675px]">
              <div className="relative w-full max-w-[calc(100%-160px)] h-full overflow-hidden rounded-lg">
                <Image
                  src={product.imgUrls[0]}
                  alt={product.productName}
                  width={500}
                  height={500}
                  className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                />
              </div>
              <div className="list-image h-full min-w-[95px] mr-10">
                <Carousel
                  withIndicators={false}
                  orientation="vertical"
                  height={600}
                  align="start"
                  classNames={classes}
                >
                  {product.imgUrls.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full min-h-[120px] max-h-[120px] my-2"
                    >
                      <Image
                        src={imgUrl}
                        alt={product.productName}
                        width={100}
                        height={100}
                        className="rounded-lg absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="product-info w-[50%]">
              <div className="h-full w-full flex flex-col gap-5">
                <h1 className="text-4xl font-bold text-green-900">{product.productName}</h1>
                <p className="text-lg  text-green-700">{product.description}</p>
                <p className="text-2xl  text-green-700">{formatPrice(product.price)}đ</p>
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Màu sắc: </p>
                  <div className="flex flex-row ml-2">
                    {product.sizeVariants.map((variant) => (
                      <div
                        key={variant._id}
                        className="mr-2 w-8 h-8 rounded-full bg-[color]"
                        style={{ backgroundColor: variant.colors }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Kích cỡ: </p>
                  <div className="flex flex-row ml-2">
                    {product.sizeVariants.map((variant) => (
                      <div
                        key={variant._id}
                        className="mr-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                      >
                        {variant.size}
                      </div>
                    ))}
                  </div>
                </div>
                {/* add amount */}
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Số lượng: </p>
                  <div className="flex flex-row items-center ml-2">
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg mr-4"
                      onClick={() => setCount(count - 1)}
                    >
                      -
                    </button>
                    <p className="text-lg bg-white px-6 py-2 rounded-xl border text-center">
                      {count}
                    </p>
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg ml-4"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-row">
                  <Button
                    type="primary"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      marginRight: '16px',
                      width: '200px',
                      height: '55px',
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>

                  <Button
                    variant="outlined"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      color: '#000',
                      width: '200px',
                      height: '55px',
                    }}
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
