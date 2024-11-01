'use client'

import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef, useState } from 'react'
import Link from 'next/link'
import style from '@/styles/card.module.css'
import productService from '@/services/product/product.service'
import useSWR from 'swr'
import { ProductsClient } from '@/types/users/productTypes'
import { useProductClient } from '@/zustand/productClient'
import ProductCard from '../shop/productCard'

const HomePageFemale = () => {
  const [donus, setDonus] = useState<ProductsClient[]>([])
  const {} = useProductClient()

  useSWR(
    'femaleFashion',
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
        ['female'],
      ),
    {
      onSuccess(data) {
        setDonus(data.data)
      },
    },
  )

  const autoplay = useRef(Autoplay({ delay: 2000 }))

  return (
    <>
      <div className="relative mt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-[50%] items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <Link href="shop?filterTypeCategory=female">
              <h2 className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
                Thời trang dành cho nữ
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              </h2>
            </Link>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        <div className="relative overflow-hidden w-full h-full min-h-[580px] container px-24 mx-auto">
          <div className="flex justify-between items-center w-full h-full py-10 overflow-hidden">
            <div className={`banner_tab w-[24.3%] h-full overflow-hidden`}>
              <Link href="/shop/do-nu" className={style.card} title="Đồ nữ">
                <div
                  className=" h-full min-h-[500px] bg-cover bg-no-repeat rounded-md"
                  style={{
                    backgroundImage: 'url(/images/do_nu.png)',
                    backgroundPosition: 'center 0px',
                  }}
                ></div>
              </Link>
            </div>
            <div className="relative z-[2] ml-5 w-[75%] h-full overflow-hidden">
              <div className="container overflow-hidden">
                <Carousel
                  withIndicators={false}
                  height={500}
                  translate="yes"
                  slideGap="lg"
                  slideSize="25%"
                  loop
                  align="start"
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={autoplay.current.reset}
                >
                  {donus.map((item) => (
                    <>
                      <Carousel.Slide>
                        <ProductCard product={item} isLoading={false} />
                      </Carousel.Slide>
                    </>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageFemale
