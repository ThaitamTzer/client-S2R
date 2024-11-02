/* eslint-disable @next/next/no-img-element */
'use client'

import { rem } from '@mantine/core'
import { IconDiamond, IconRefresh, IconTag } from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import homepage from '@/styles/homepage.module.css'
import { useClient } from '@/hooks/useClient'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePageFavorate() {
  const autoplay2 = useRef(Autoplay({ delay: 2000 }))
  const { brands } = useClient()

  return (
    <>
      <div className="relative mt-6 wrapper">
        <div className="fashion-brand">
          <p className="text-2xl font-bold text-center mb-5">
            Thương hiệu bạn <span className="text-orange-600">yêu thích</span>
          </p>
          <div className="fashion-subtext container mx-auto px-16 grid grid-cols-3 mb-7">
            <div className="subtext_content flex items-center justify-center text-green-700 font-semibold text-lg">
              <IconRefresh className="mr-2" style={{ width: rem(26), height: rem(26) }} />
              <p>Cập nhật mỗi ngày</p>
            </div>
            <div className="subtext_content flex items-center justify-center text-green-700 font-semibold text-lg">
              <IconDiamond className="mr-2" style={{ width: rem(26), height: rem(26) }} />
              <p>Hàng trăm thương hiệu</p>
            </div>
            <div className="subtext_content flex items-center justify-center text-green-700 font-semibold text-lg">
              <IconTag className="mr-2" style={{ width: rem(26), height: rem(26) }} />
              <p>Giá cả hấp dẫn</p>
            </div>
          </div>
        </div>
        <section className="relative w-full h-[400px] bg-transparent">
          <div className="wrapper z-30 absolute top-0 w-full h-full bg-transparent pointer-events:none ">
            <div className="w-full relative left-0 top-0  opacity-100 before:absolute before:top-0 before:left-0 h-full bg-transparent overflow-hidden">
              <div className="relative h-full bg-transparent">
                <div className="absolute w-full h-full block bg-transparent overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute w-screen h-screen -top-[25%] -bottom-[10%]">
                        <div className="responsive-iframe">
                          <iframe
                            src="https://www.youtube.com/embed/i-S9dcmegZo?playlist=i-S9dcmegZo&loop=1&autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&start=10&end=70"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share; loop;"
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-40">
            <div className="container mx-auto px-24 pointer-events-auto">
              <Carousel
                classNames={{
                  slide: homepage.slidecard,
                  control: homepage.controlCard,
                }}
                withControls
                slideSize="25%"
                slideGap="md"
                loop
                align="start"
                plugins={[autoplay2.current]}
                onMouseEnter={autoplay2.current.stop}
                onMouseLeave={autoplay2.current.reset}
              >
                {brands?.map((brand) => (
                  <Carousel.Slide
                    key={brand._id}
                    style={{
                      maxHeight: '380px',
                      maxWidth: '340px',
                    }}
                  >
                    <Link href={`/shop?filterBrand=${brand._id}`} prefetch={false}>
                      <Image
                        className={homepage.slidecontent}
                        loading="lazy"
                        src={brand.imgUrl}
                        alt={brand.name}
                        width={340}
                        height={380}
                        quality={80}
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          objectFit: 'cover',
                        }}
                      />
                    </Link>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
