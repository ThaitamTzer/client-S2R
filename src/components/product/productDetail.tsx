'use client'
import { ProductsClient } from '@/types/users/productTypes'
import Image from 'next/image'
import { Carousel } from '@mantine/carousel'
import classes from '@/styles/product.module.css'
import { formatPrice } from '@/helper/format'
import { useState } from 'react'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useGetName } from '@/helper/getName'

export const ProductDetail = ({ product }: { product: ProductsClient }) => {
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState(product.imgUrls[0]) // New state for the main image
  const { getMaterialName, getConditionName } = useGetName()

  return (
    <>
      <div className="container mx-auto px-24 mt-48">
        <div className="product-overview">
          <div className="flex flex-row justify-between">
            <div className="product-image w-[55%] flex justify-between flex-row min-h-[675px] max-h-[675px]">
              <div className="relative w-full max-w-[calc(100%-160px)] h-full overflow-hidden rounded-lg">
                {product.type === 'barter' && (
                  <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1 z-10">
                    Trao đổi
                  </div>
                )}
                {/* Display the main image */}
                <Image
                  src={mainImage} // Use mainImage state
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
                  slideGap={2}
                  slideSize="25%"
                  classNames={classes}
                  slidesToScroll={1}
                >
                  {product.imgUrls.map((imgUrl, index) => (
                    <Carousel.Slide key={index}>
                      <div
                        className="relative w-full h-full min-h-[120px] max-h-[120px] my-2 overflow-hidden rounded-lg"
                        onClick={() => setMainImage(imgUrl)} // Update mainImage when clicked
                        style={{
                          border: mainImage === imgUrl ? '2px solid #179d49' : '1px solid #fff',
                        }}
                      >
                        <Image
                          src={imgUrl}
                          alt={product.productName}
                          width={100}
                          height={100}
                          className=" absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover cursor-pointer"
                        />
                      </div>
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="product-info w-[50%]">
              <div className="h-full w-full flex flex-col gap-5">
                <h1 className="text-4xl font-bold text-green-900">{product.productName}</h1>
                <p className="text-lg  text-green-700">{product.description}</p>
                {product.type === 'barter' ? (
                  <div className="flex flex-row items-center">
                    <p className="text-2xl font-semibold text-green-800">Liên hệ</p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center">
                    <p className="text-2xl font-semibold text-green-800">
                      {formatPrice(product.price)}đ
                    </p>
                  </div>
                )}
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
                    {product.sizeVariants.slice(0, 3).map((variant, index) => (
                      <div
                        key={variant._id}
                        className="rounded-full text-lg font-semibold flex justify-center items-center"
                      >
                        {variant.size}
                        {index < product.sizeVariants.slice(0, 3).length - 1 && ', '}
                      </div>
                    ))}
                    {product.sizeVariants.length > 3 && (
                      <div className="rounded-full text-lg font-semibold flex justify-center items-center">
                        ...
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Khối lượng: </p>
                  <p className="text-lg ml-2">{product.weight} (gram)</p>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Chất liệu: </p>
                  <p className="text-lg ml-2">{getMaterialName(product.material)}</p>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Tình trạng: </p>
                  <p className="text-lg ml-2">{getConditionName(product.condition)}</p>
                </div>

                {/* add amount */}
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Số lượng: </p>
                  <div className="flex flex-row items-center ml-2">
                    <Button
                      icon={
                        <PlusOutlined
                          style={{
                            fontSize: '16px',
                            color: '#000',
                          }}
                        />
                      }
                      onClick={() => setCount(count - 1)}
                      disabled={count === 1}
                    />
                    <p className="text-lg bg-white px-6 py-2 rounded-xl  text-center">{count}</p>
                    <Button
                      icon={
                        <MinusOutlined
                          style={{
                            fontSize: '16px',
                            color: '#000',
                          }}
                        />
                      }
                      onClick={() => setCount(count + 1)}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <Button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      marginRight: '16px',
                      width: '200px',
                      height: '55px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      backgroundColor: '#b2e5be',
                      color: '#179d49',
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>

                  <Button
                    variant="outlined"
                    type="primary"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      marginRight: '16px',
                      width: '200px',
                      height: '55px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      backgroundColor: '#179d49',
                      color: '#fff',
                    }}
                  >
                    Mua ngay
                  </Button>
                </div>
                <div className="flex flex-row items-center">
                  <p className="mr-2">Hashtag: </p>
                  {product.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-green-200 text-green-800 px-2 py-1 rounded-sm mr-2"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex flex-row justify-start items-center">
                  <p className="text-lg">Người bán: </p>
                  <div className="flex flex-row items-center ml-2">
                    <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
                      <Image
                        src={product.userId.avatar}
                        alt={product.userId.firstname + ' ' + product.userId.lastname}
                        width={50}
                        height={50}
                        className="object-cover "
                      />
                    </div>
                    <p className="text-lg font-semibold">
                      {product.userId.firstname + ' ' + product.userId.lastname}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
