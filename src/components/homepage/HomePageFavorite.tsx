/* eslint-disable @next/next/no-img-element */
"use client";

import { rem } from "@mantine/core";
import { IconDiamond, IconRefresh, IconTag } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import homepage from "@/styles/homepage.module.css";

export const HomePageFavorate = () => {
  const autoplay2 = useRef(Autoplay({ delay: 2000 }));

  return (
    <>
      <div className="relative mt-10">
        <div className="fashion-brand">
          <p className="text-2xl font-bold text-center mb-5">
            Thương hiệu bạn <span className="text-orange-600">yêu thích</span>
          </p>
          <div className="fashion-subtext container mx-auto px-16 grid grid-cols-3 mb-7">
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
        <div className="absolute h-[400px] w-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/2hDQMGys4Wg?autoplay=1&mute=1&loop=1"
            title="Timelapse  Clouds Travel Across Sky on Green Screen Background | HD"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
            style={{
              position: "absolute",
              width: "100%",
              height: "919px",
              left: 0,
              top: "-300px",
            }}
          ></iframe>
        </div>
        <div className="container mx-auto px-24">
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
              <Carousel.Slide key={i}>
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
      </div>
    </>
  );
};
