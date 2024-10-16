'use client'
import { Carousel } from '@mantine/carousel'
import { Badge } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useRef } from 'react'

const donam = [
  {
    id: 1,
    productName: 'Áo thun giữ nhiệt đen',
    size: 'M',
    price: '100.000',
    src: '/images/donam_1.png',
  },
  {
    id: 2,
    productName: 'Áo thun giữ nhiệt trắng',
    size: 'L',
    price: '120.000',
    src: '/images/donam_2.png',
  },
  {
    id: 4,
    productName: 'Áo thun tay ngắn Nam',
    size: 'M',
    price: '100.000',
    src: '/images/donam_4.png',
    tag: 'Trao đổi',
  },
  {
    id: 5,
    productName: 'Áo sơ mi Nam',
    size: 'L',
    price: '120.000',
    src: '/images/donam_5.png',
    tag: 'Trao đổi',
  },
  {
    id: 6,
    productName: 'Áo sơ mi nam cách điệu',
    size: 'S',
    price: '150.000',
    src: '/images/donam_7.png',
    tag: 'Trao đổi',
  },
]

export const HomePageManFashion = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }))

  return (
    <div className="relative mt-10">
      <h2 className="text-2xl font-bold text-center">Đồ Nam</h2>
      <div
        className="overflow-hidden relative mx-auto w-full h-full min-h-[500px] bg-cover bg-no-repeat rounded-md flex justify-between mt-4"
        style={{
          backgroundImage: 'url(/images/do_nam.png)',
          backgroundPosition: 'center 0px',
        }}
      >
        <div className="container mx-auto px-24">
          <div className="slider py-10">
            <div className="flex w-full h-full">
              <div className="w-[55%]">
                <div className="slider">
                  <Carousel
                    withIndicators={false}
                    height={500}
                    translate="yes"
                    slideGap="sm"
                    slideSize="40%"
                    loop
                    align="start"
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                  >
                    {donam.map((item) => (
                      <>
                        <Carousel.Slide key={item.id}>
                          <div className="card w-full h-full bg-white shadow-md rounded-md">
                            <div className="relative card-image w-full h-[340px] overflow-hidden rounded-t-md">
                              {item?.tag === 'Trao đổi' && (
                                <div className="absolute top-5 right-5 z-overlay">
                                  <Badge color="blue">{item.tag}</Badge>
                                </div>
                              )}
                              <div className="absolute w-full h-full">
                                <Image
                                  src={item.src}
                                  alt={item.productName}
                                  width={500}
                                  height={350}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div className="container p-3 mx-auto">
                              <div className="card-title w-full">
                                <h1 className="text-xl font-semibold text-wrap hover:text-green-800 transition-all hover:">
                                  {item.productName}
                                </h1>
                              </div>
                              <div className="text-base font-medium">
                                Kích thước: {item.size}
                              </div>
                              <div className="text-xl font-semibold text-green-800">
                                {item.tag === 'Trao đổi' ? (
                                  <>
                                    <p>Trao đổi</p>
                                    <p className="text-sm underline">
                                      Xem ngay
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p>{item.price}</p>
                                    <p className="text-sm underline">
                                      Xem ngay
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Carousel.Slide>
                      </>
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="w-[45%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
