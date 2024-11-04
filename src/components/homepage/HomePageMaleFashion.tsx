'use client'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { ProductsClient } from '@/types/users/productTypes'
import ProductCard from '../shop/productCard'
import IconifyIcon from '../icons'

const HomePageManFashion = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }))

  const [products, setProducts] = useState<ProductsClient[]>([])

  const shouldAutoplay = products.length > 3

  useSWR(
    'maleFashion',
    () =>
      productService.getAllProdClient(
        1,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ['male'],
      ),
    {
      onSuccess(data) {
        setProducts(data.data)
      },
      revalidateOnFocus: true,
      refreshInterval: 10000,
    },
  )

  return (
    <div className="relative mt-10">
      <div className="text-center flex justify-center">
        <div className="flex w-[50%] items-center rounded-full">
          <div className="flex-1 border-b border-gray-300"></div>
          <Link href="shop?filterTypeCategory=male">
            <div className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
              <h1 className="flex items-center gap-2">
                Thời trang dành cho nam <IconifyIcon icon="ic:twotone-male" width={30} />
              </h1>
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
            </div>{' '}
          </Link>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>
      </div>
      <div
        className="overflow-hidden relative mx-auto w-full h-full min-h-[500px] bg-cover bg-no-repeat rounded-md flex justify-between mt-6"
        style={{
          backgroundImage: 'url(/images/do_nam.png)',
          backgroundPosition: 'center 0px',
        }}
      >
        <div className="container mx-auto px-24">
          <div className="slider py-10">
            <div className="flex w-full h-full">
              <div className="w-[62%]">
                <div className="slider">
                  <Carousel
                    withIndicators={false}
                    withControls={products.length > 3 ? true : false}
                    height={500}
                    translate="yes"
                    slideGap="sm"
                    slideSize="33.33%"
                    loop
                    align="start"
                    plugins={shouldAutoplay ? [autoplay.current] : []}
                    onMouseEnter={shouldAutoplay ? autoplay.current.stop : undefined}
                    onMouseLeave={shouldAutoplay ? autoplay.current.reset : undefined}
                  >
                    {products.map((item) => (
                      <>
                        <Carousel.Slide>
                          <ProductCard product={item} isLoading={false} />
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

export default HomePageManFashion
