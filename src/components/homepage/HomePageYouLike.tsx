'use client'
import { Carousel } from '@mantine/carousel'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import Image from 'next/image'
import { Badge } from '@mantine/core'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

const HomePageYouLike = () => {
  const { productsPropose, setProductsPropose } = useProductClient()

  useSWR('product/propose', productService.getProductUserWillLike, {
    onSuccess: (data) => {
      setProductsPropose(data.data.data)
    },
  })

  const autoplay = useRef(Autoplay({ delay: 2000 }))

  console.log(productsPropose)
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
  })

  if (!productsPropose || productsPropose.length === 0) {
    return <></>
  }

  return (
    <>
      <div className="container mx-auto px-24 pt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-[50%] items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <h2 className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
              Các sản phẩm bạn có thể thích
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
            </h2>
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
                {productsPropose.map((item) => {
                  return (
                    <>
                      <Carousel.Slide key={item._id}>
                        <div className="card w-full h-full bg-white shadow-md rounded-md">
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
                        </div>
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
