import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import style from '@/styles/card.module.css'
import axios from 'axios'

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

export const HomePageFemale = () => {
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
        setDonus(res.data.data?.items)
      })
  }, ['https://api.theciu.vn/api/products/paginate?pageSize=12&type=on_sale'])

  const autoplay = useRef(Autoplay({ delay: 2000 }))

  return (
    <>
      <div className="relative mt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-[50%] items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <h2 className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
              Thời trang dành cho nữ
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
            </h2>
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
                  slideGap="sm"
                  slideSize="29.7%"
                  loop
                  align="start"
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={autoplay.current.reset}
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
    </>
  )
}
