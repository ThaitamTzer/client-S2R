"use client";

import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Group,
  rem,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Carousel } from "@mantine/carousel";
import homepage from "@/styles/homepage.module.css";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { IconDiamond, IconRefresh, IconTag } from "@tabler/icons-react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
});

const banner = [
  {
    id: 1,
    src: "/images/home-banner-2.png",
    alt: "Home banner 2",
  },
  {
    id: 2,
    src: "/images/home-banner-4.jpg",
    alt: "Home banner 4",
  },
  {
    id: 3,
    src: "/images/home-banner-7.jpg",
    alt: "Home banner 7",
  },
  {
    id: 4,
    src: "/images/home-banner-8.jpg",
    alt: "Home banner 8",
  },
  {
    id: 5,
    src: "/images/home-banner-9.jpg",
    alt: "Home banner 9",
  },
];

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const autoplay2 = useRef(Autoplay({ delay: 2000 }));
  return (
    <>
      <div className="container mx-auto px-24 pt-14 grid gap-10">
        <div className="homepage_title container ">
          <Title
            style={{
              fontFamily: spaceGrotesk.style.fontFamily,
              fontSmooth: "auto",
              textTransform: "uppercase",
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "30px",
              letterSpacing: ".9px",
            }}
            className="text-green-800 "
            fw={500}
          >
            “Tại Share2Receive, chúng tôi tin rằng mặc đồ gì giúp bạn luôn sáng
            tạo và giúp môi trường XANH hơn. Bạn có thể cùng chúng tôi xây dựng
            tương lai bền vững hơn.” - Xuân Nguyễn, Founder
          </Title>
        </div>
        <div className="relative slider">
          <Carousel
            withIndicators
            loop
            align="center"
            height={380}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            classNames={homepage}
          >
            {banner.map((item) => (
              <Carousel.Slide key={item.id}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1080}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
      <div
        className="choose-price_section relative mt-10 w-full h-[250px] bg-contain bg-[center_96px] bg-no-repeat "
        style={{
          backgroundImage: 'url("/images/choose-price-bg.png")',
        }}
      >
        <div>
          <div className="price_section-title text-center mb-14 text-2xl font-bold h-fit">
            Chọn mức giá mua sắm
          </div>
          <div className="price_section-price container mx-auto px-44 flex flex-row justify-around">
            <div className={homepage.price_content}>
              <span className="text-lg h-fit">Dưới</span>
              <span className="text-[44px] font-bold">19k</span>
            </div>
            <div className={homepage.price_content}>
              <span className="text-lg h-fit">Dưới</span>
              <span className="text-[44px] font-bold">19k</span>
            </div>
            <div className={homepage.price_content}>
              <span className="text-lg h-fit">Dưới</span>
              <span className="text-[44px] font-bold">19k</span>
            </div>
            <div className={homepage.price_content}>
              <span className="text-lg h-fit">Dưới</span>
              <span className="text-[44px] font-bold">19k</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative mx-auto px-36 pt-14 ">
        <div className="banner-home mt-3 mb-10 relative flex">
          <div className="banner-home_left relative w-[60%] px-[100px] py-[50px]">
            <img
              loading="lazy"
              src="/images/banner-1-style-home.png"
              alt="homepage"
              className="absolute top-0 left-0 w-full h-full"
            />
            <h1 className="relative z-10 text-4xl">
              Cùng Share2Receive phối đồ cực phong cách
            </h1>
            <p className="relative z-10 mt-4">
              Share2Receive mang đến cho bạn những phong cách phối đồ đa dạng
              phong cách tuỳ theo sở thích của từng cá nhân bạn
            </p>
            <Button
              className="mt-12 px-12 rounded-md bg-green-700 text-lg"
              fw={700}
            >
              Xem ngay
            </Button>
          </div>
          <div
            className="banner-home_right w-[40%] block relative bg-no-repeat"
            style={{
              backgroundSize: "100% 100%",
              backgroundImage: 'url("/images/banner-2-style-home.png")',
            }}
          ></div>
        </div>
      </div>
      <div className="container mx-auto px-28">
        <div className="fashion-brand">
          <p className="text-2xl font-bold text-center mb-5">
            Thương hiệu bạn <span className="text-orange-600">yêu thích</span>
          </p>
          <div className="fashion-subtext container px-16 grid grid-cols-3 mb-7">
            <div className="subtext_content flex items-center justify-center text-green-700 font-semibold text-lg">
              <IconRefresh
                className="mr-2"
                style={{ width: rem(26), height: rem(26) }}
              />
              <p>Cập nhật mỗi ngày</p>
            </div>
            <div className="subtext_content flex items-center justify-center text-green-700 font-semibold text-lg">
              <IconDiamond
                className="mr-2"
                style={{ width: rem(26), height: rem(26) }}
              />
              <p>Hàng trăm thương hiệu</p>
            </div>
            <div className="subtext_content flex items-center justify-center text-green-700 font-semibold text-lg">
              <IconTag
                className="mr-2"
                style={{ width: rem(26), height: rem(26) }}
              />
              <p>Giá cả hấp dẫn</p>
            </div>
          </div>
        </div>
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
          {Array.from({ length: 13 }).map((_, i) => (
            <Carousel.Slide>
              <img
                className={homepage.slidecontent}
                loading="lazy"
                src={`/images/image_brand_${i + 1}.jpg`}
                alt={`Brand ${i + 1}`}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </>
  );
}
