'use client'

import { HomePageTitle } from '@/components/homepage/HomepageTitle'
import { HomePageHero } from '@/components/homepage/HomepageHero'
import { HomePageFavorate } from '@/components/homepage/HomePageFavorite'
import { HomePagePickPrice } from '@/components/homepage/HomePagePickPrice'
import { HomePageSamePrice } from '@/components/homepage/HomePageSamePrice'
import { HomePageCategory } from '@/components/homepage/HomePageCategory'
import { HomePageTogetherSection } from '@/components/homepage/HomePageTogetherSection'
import { HomePageManFashion } from '@/components/homepage/HomePageMaleFashion'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import style from '@/styles/card.module.css'
import { Carousel } from '@mantine/carousel'
import Image from 'next/image'
import axios from 'axios'
import { Badge } from '@mantine/core'

type Image = {
  small: string
  large: string
}

type Item = {
  id: number
  name: string
  image: string
  lazy_image: string
  promotion_price: number
  images: Image[]
  original_price: number
  slug: string
  discount_percent: number
  discount_amount: number
}

export default function Home() {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
  })
  const [donus, setDonus] = useState<Item[]>([])

  useEffect(() => {
    axios
      .get(
        'https://api.theciu.vn/api/products/paginate?pageSize=12&type=on_sale',
      )
      .then((res) => {
        setDonus(res.data.data.items)
      })
  }, ['https://api.theciu.vn/api/products/paginate?pageSize=12&type=on_sale'])

  console.log(donus)

  return (
    <>
      <HomePageTitle />
      <HomePageHero />
      <HomePagePickPrice />
      <HomePageManFashion />
      <div className="relative mt-10">
        <h2 className="text-2xl font-bold text-center">Đồ Nữ</h2>
        <div className="relative overflow-hidden w-full h-full min-h-[580px] container px-24 mx-auto">
          <div className="flex justify-between items-center w-full h-full py-10">
            <div className={`banner_tab w-[24.3%] h-full`}>
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
            <div className="relative ml-5 w-[75%] h-full">
              <div className="container">
                <Carousel
                  withIndicators={false}
                  height={500}
                  translate="yes"
                  slideGap="sm"
                  slideSize="29.7%"
                  loop
                  align="start"
                >
                  {donus.map((item) => (
                    <>
                      <Carousel.Slide key={item.id}>
                        <div className="card w-full h-full bg-white shadow-md rounded-md">
                          <div className="relative card-image w-full h-[340px] overflow-hidden rounded-t-md">
                            <div className="absolute w-full h-full">
                              <Image
                                src={item.image}
                                alt={item.slug}
                                width={500}
                                height={350}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="container p-3 mx-auto">
                            <div className="card-title w-full">
                              <h1 className="text-xl font-semibold text-wrap hover:text-green-800 transition-all hover:">
                                {item?.name.split(' THE C.I.U')[0]}
                              </h1>
                            </div>
                            <div className="text-base font-medium">
                              Kích thước: S
                            </div>
                            <div className="text-xl font-semibold text-green-800">
                              <p>{formatter.format(item.original_price)}đ</p>
                              <p className="text-sm underline">Xem ngay</p>
                            </div>
                            {/* <div className="text-xl font-semibold text-green-800">
                              {item.tag === 'Trao đổi' ? (
                                <>
                                  <p>Trao đổi</p>
                                  <p className="text-sm underline">Xem ngay</p>
                                </>
                              ) : (
                                <>
                                  <p>{item.price}</p>
                                  <p className="text-sm underline">Xem ngay</p>
                                </>
                              )}
                            </div> */}
                          </div>
                        </div>
                      </Carousel.Slide>
                    </>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomePageFavorate />
      <HomePageSamePrice />
      <div className="container mx-auto px-32 text-center text-2xl font-medium text-green-800 uppercase mt-8">
        <h1>
          <span className="font-bold">Share2Receive </span>
          &#45; Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng
        </h1>
      </div>
      <HomePageCategory />
      <HomePageTogetherSection />
    </>
  )
}
