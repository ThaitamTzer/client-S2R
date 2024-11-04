'use client'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import homepage from '@/styles/homepage.module.css'
import { useRef, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { ProductsClient } from '@/types/users/productTypes'
import ProductCard from '../shop/productCard'

export default function HomePageSamePrice() {
  const autoplay3 = useRef(Autoplay({ delay: 5000 }))
  const [samePrice, setSamePrice] = useState<ProductsClient[]>([])

  useSWR(
    'samePriceFashion',
    () =>
      productService.getAllProdClient(
        1,
        10,
        ['670a21cad47ec9342aedcdac'],
        undefined,
        19000,
        19000,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ),
    {
      onSuccess(data) {
        setSamePrice(data.data)
      },
    },
  )
  if (samePrice.length === 0) return null
  return (
    <>
      <div className="container mx-auto px-24 mt-10">
        <div className="discount mb-10">
          <Link href="/shop?filterCategory=670a21cad47ec9342aedcdac">
            <p className="text-2xl font-bold text-center mb-2 uppercase">
              Các sản phẩm <span className="text-orange-600">Đầm</span>
            </p>
          </Link>
        </div>
        <div
          className="discount-content relative w-full h-[500px] bg-contain bg-no-repeat rounded-md flex justify-between"
          style={{
            background: 'url("/images/category-brand-bg.png") no-repeat 100% 100% #ecd5ea',
          }}
        >
          <div className="Carousel-discount w-[70%] py-4 pl-4 h-full">
            <Carousel
              slideSize="25%"
              align="start"
              loop
              slideGap="md"
              slidesToScroll={1}
              withControls={false}
              plugins={[autoplay3.current]}
              onMouseEnter={autoplay3.current.stop}
              onMouseLeave={autoplay3.current.reset}
              className="h-full"
              classNames={{
                container: homepage.container,
                viewport: homepage.viewport,
              }}
            >
              {samePrice.map((item) => (
                <Carousel.Slide key={item._id} className="min-h-full">
                  <ProductCard product={item} isLoading={false} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="mt-4 mr-5">
            <Link href="/shop?filterCategory=670a21cad47ec9342aedcdact" className="text-end">
              <h2 className="font-bold text-3xl">
                Đồng giá <span className="text-green-500">19k</span> Các loại sản phẩm đầm
              </h2>
              <p>&#40;Xem ngay để nhận ưu đãi lớn nhất từ Share2Receive &#41;</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
