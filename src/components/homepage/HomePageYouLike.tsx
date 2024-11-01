'use client'
import { Carousel } from '@mantine/carousel'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import Image from 'next/image'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { Card } from 'antd'
import { formatPrice } from '@/helper/format'
import IconifyIcon from '../icons'

const HomePageYouLike = () => {
  const { productsPropose, setProductsPropose } = useProductClient()
  const { Meta } = Card

  useSWR('product/propose', productService.getProductUserWillLike, {
    onSuccess: (data) => {
      setProductsPropose(data.data.data)
    },
  })

  const autoplay = useRef(Autoplay({ delay: 2000 }))

  console.log(productsPropose)

  if (!productsPropose || productsPropose.length === 0) {
    return <></>
  }

  return (
    <>
      <div className="container mx-auto px-24 pt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-[50%] items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <div className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
              <h1 className="flex items-center gap-2">
                Các sản phẩm bạn có thể thích <IconifyIcon icon="twemoji:fire" width={30} />
              </h1>
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
            </div>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        <div className="">
          <div className="relative z-[2] ml-5 h-full overflow-hidden">
            <div className="container overflow-hidden">
              <Carousel
                withIndicators={false}
                height={500}
                translate="yes"
                slideGap="sm"
                slideSize="25%"
                loop
                align="start"
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
              >
                {productsPropose.map((product) => {
                  return (
                    <>
                      <Carousel.Slide key={product._id}>
                        {/* <div className="card w-full h-full bg-white shadow-md rounded-md">
                          <div className="relative card-image w-full h-[340px] overflow-hidden rounded-t-md">
                            {item?.type === 'barter' && (
                              <div className="absolute top-5 right-5 z-overlay">
                                <Badge color="blue">Trao đổi</Badge>
                              </div>
                            )}
                            <div className="absolute w-full h-full">
                              <Image
                                src={item.imgUrls[0]}
                                alt={item.imgUrls[0]}
                                width={500}
                                height={350}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="container p-3 mx-auto">
                            <div className="card-title w-full">
                              <h1 className="text-xl font-semibold text-wrap hover:text-green-800 transition-all hover:">
                                {item?.productName.split(' THE C.I.U')[0]}
                              </h1>
                            </div>
                            <div className="text-base font-medium">Kích thước: S</div>
                            <div className="text-xl font-semibold text-green-800">
                              {item.type === 'sale' ? (
                                <span>{formatter.format(item.price)} đ</span>
                              ) : (
                                <p>Trao đổi</p>
                              )}
                              <p className="text-sm underline">Xem ngay</p>
                            </div>
                          </div>
                        </div> */}
                        <Link href={`/shop/${product.slug}`} key={product._id} prefetch={true}>
                          <Card
                            key={product._id}
                            hoverable={true}
                            // loading={isLoading}
                            className="shadow-sm"
                            size="default"
                            style={{
                              width: '265px',
                              border: '2px solid #f0f0f0',
                              height: '100%',
                            }}
                            cover={
                              <div
                                style={{
                                  width: '100%', // Fixed width for the image container
                                  height: '330px', // Fixed height for the image container
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
                                  width={400}
                                  height={300}
                                  loading="lazy"
                                  className="object-cover w-full h-full"
                                  priority={false}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  quality={70}
                                />
                              </div>
                            }
                          >
                            <Meta title={<p className="text-xl">{product.productName}</p>} />
                            <Meta
                              title={
                                <p className="text-lg font-normal">
                                  Kích thước:{' '}
                                  {Array.from(
                                    new Set(product.sizeVariants.map((variant) => variant.size)),
                                  )
                                    .slice(0, 3)
                                    .map((size, index) => (
                                      <span key={index}>
                                        {size}
                                        {index < product.sizeVariants.slice(0, 3).length - 1 &&
                                          ', '}
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
                            {/* <Meta
                              style={{
                                marginTop: '15px',
                              }}
                              title={
                                <div className="flex">
                                  <div className="w-5 h-5 overflow-hidden rounded-full mr-2">
                                    <Image
                                      src={product.userId}
                                      alt={
                                        product.userId?.firstname + ' ' + product.userId?.lastname
                                      }
                                      width={20}
                                      height={20}
                                      className="object-cover w-full h-full"
                                      priority={false}
                                      sizes="40px"
                                      quality={20}
                                    />
                                  </div>
                                  <div className="flex justify-center items-center">
                                    <p className="text-sm font-semibold">
                                      {product.userId?.firstname + ' ' + product.userId?.lastname}
                                    </p>
                                  </div>
                                </div>
                              }
                            /> */}
                          </Card>
                        </Link>
                      </Carousel.Slide>
                    </>
                  )
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageYouLike
