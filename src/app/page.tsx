/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, rem, Title } from "@mantine/core";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Carousel } from "@mantine/carousel";
import homepage from "@/styles/homepage.module.css";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { IconDiamond, IconRefresh, IconTag } from "@tabler/icons-react";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
});

const banner = [
  {
    id: 1,
    src: "/images/home-banner-9.jpg",
    alt: "Home banner 2",
  },
  {
    id: 2,
    src: "/images/home-banner-9.jpg",
    alt: "Home banner 4",
  },
  {
    id: 3,
    src: "/images/home-banner-9.jpg",
    alt: "Home banner 7",
  },
  {
    id: 4,
    src: "/images/home-banner-9.jpg",
    alt: "Home banner 8",
  },
  {
    id: 5,
    src: "/images/home-banner-9.jpg",
    alt: "Home banner 9",
  },
];

const discountCard = [
  {
    id: 1,
    title: "Mặc đẹp đi làm",
    desc: "Mặc đồ công sở chuẩn chỉnh và thanh lịch với giá siêu mềm",
    src: "/images/CategoryThumb1.png",
  },
  {
    id: 2,
    title: "Mặc đẹp đi chơi",
    desc: "Thỏa sức phối đồ với những items hợp trend",
    src: "/images/CategoryThumb2.png",
  },
  {
    id: 3,
    title: "Mặc đẹp đi tiệc",
    desc: "Mặc đồ dự tiệc chuẩn chỉnh với giá cả phải chăng",
    src: "/images/CategoryThumb3.png",
  },
  {
    id: 4,
    title: "Mặc đẹp đi làm",
    desc: "Mặc đồ công sở chuẩn chỉnh và thanh lịch với giá siêu mềm",
    src: "/images/CategoryThumb1.png",
  },
  {
    id: 5,
    title: "Mặc đẹp đi chơi",
    desc: "Thỏa sức phối đồ với những items hợp trend",
    src: "/images/CategoryThumb2.png",
  },
  {
    id: 6,
    title: "Mặc đẹp đi tiệc",
    desc: "Mặc đồ dự tiệc chuẩn chỉnh với giá cả phải chăng",
    src: "/images/CategoryThumb3.png",
  },
];

const category = [
  {
    id: 1,
    title: "Đầm nữ",
    src: "/images/dress-icon-v2.png",
  },
  {
    id: 2,
    title: "Áo thun",
    src: "/images/tshirt-icon-v2.png",
  },
  {
    id: 3,
    title: "Chân váy",
    src: "/images/skirt-icon-v2.png",
  },
  {
    id: 4,
    title: "Giày các loại",
    src: "/images/shoes-icon-v2.png",
  },
  {
    id: 5,
    title: "Quần jeans",
    src: "/images/jean-icon-v2.png",
  },
  {
    id: 6,
    title: "Áo sơ mi",
    src: "/images/shirt-icon-v2.png",
  },
  {
    id: 7,
    title: "Áo khoác",
    src: "images/coat-icon-v2.png",
  },
  {
    id: 8,
    title: "Túi xách",
    src: "images/hand-bag-v2.png",
  },
];

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const autoplay2 = useRef(Autoplay({ delay: 2000 }));
  const autoplay3 = useRef(Autoplay({ delay: 5000 }));

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
            classNames={{
              ...homepage,
              indicators: homepage.indicators,
            }}
          >
            {banner.map((item) => (
              <Carousel.Slide key={item.id}>
                <img src={item.src} alt={item.alt} />
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
      <div className="container mx-auto px-20 mt-10">
        <div className="discount mb-10">
          <p className="text-2xl font-bold text-center mb-2">
            Đồng giá <span className="text-orange-600">19k</span> khi mua sản phẩm
          </p>
          <p className="text-lg font-medium text-center">
            Tiết kiệm hơn khi mua sắm !
          </p>
        </div>
        <div
          className="discount-content relative w-full h-[500px] bg-contain bg-no-repeat rounded-md flex justify-between"
          style={{
            background:
              'url("/images/category-brand-bg.png") no-repeat 100% 100% #ecd5ea',
          }}
        >
          <div className="Carousel-discount w-[70%] py-4 pl-4 h-full">
            <Carousel
              slideSize="33.33%"
              align="start"
              loop
              slideGap="lg"
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
              {discountCard.map((item) => (
                <Carousel.Slide key={item.id} className="min-h-full">
                  <div className="card bg-white w-full min-h-full relative rounded-md flex flex-col p-8 shadow-md overflow-hidden">
                    <div className="card-title">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                    <div className="card-desc text-sm">
                      <p>{item.desc}</p>
                    </div>
                    <Link
                      className="text-xl font-semibold text-green-700 underline tracking-tighter"
                      href={`/category/${item.id}`}
                    >
                      Xem thêm
                    </Link>
                    <div
                      className="card-image w-10/12 absolute bottom-[-16px] left-1/2"
                      style={{
                        transform: "translateX(-50%)",
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full relative overflow-clip"
                      />
                      <div className="discount-price absolute flex flex-col items-center justify-center z-10 top-[-22px] right-0 bg-[#f25ae3] w-24 h-24 rounded-full text-white">
                        <span className="text-sm">Chỉ từ</span>
                        <p className="text-2xl font-bold">19k</p>
                      </div>
                    </div>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="mt-4 mr-5">
            <Link href="/discount" className="text-end">
              <h2 className="font-bold text-3xl">
                Tất cả đồng giá <span className="text-green-500">19k</span> các loại
              </h2>
              <p>
                &#40;Xem ngay các sản phẩm đồng giá &#41;
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-32 text-center text-2xl font-medium text-green-800 uppercase mt-8">
        <h1>
          <span className="font-bold">Share2Receive </span>
          &#45; Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng
        </h1>
      </div>
      <div className="category-section mt-8 bg-green-100 w-full h-full">
        <div className="container mx-auto px-52 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">
              Hàng trăm trăm sản phẩm các loại
            </h1>
            <p className="text-base font-medium mt-3">
              Được kiểm duyệt kỹ càng sẵn sàng đến tay bạn!
            </p>
          </div>
          <div className="text-end mt-2">
            <Link
              href={`/category`}
              className="text-lg font-bold text-green-900 underline tracking-tighter"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="category-list grid grid-cols-4 gap-3">
            {category.map((item) => (
              <div
                key={item.id}
                className="category-item relative bg-white rounded-md shadow-md flex items-center justify-around overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-1/3 mx-2"
                />
                <div>
                  <p className="text-lg ">
                    <Link href={`/category/${item.id}`}>{item.title}</Link>
                  </p>
                </div>
                <div className="absolute top-0 right-0 bg-red-300 w-16 flex justify-center items-center rounded-bl-md">
                  <p className="text-sm">Hot</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="statictis-item flex-row h-[390px] w-full flex"
          style={{
            backgroundImage:
              'url("/images/crystal-ball-on-moss-in-green-forest-environment-2023-11-27-05-05-51-utc.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center -120px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="overlay-statistic relative w-[38%] ml-72 my-20">
            <div className="absolute backdrop-blur-sm bg-white/70 text-white top-0 left-0 right-0 bottom-0 rounded-md p-5">
              <div className="content-title text-5xl font-semibold uppercase mb-1">
                <h1>Giảm thiểu</h1>
              </div>
              <p className="mb-1 text-5xl font-bold text-green-900 bg-white w-fit px-3 py-2 rounded-sm">
                1200 <span>Kilogram</span>
              </p>
              <p className="mb-1 text-2xl font-semibold ">
                Rác thải thời trang,{" "}
                <span className="text-white text-2xl">
                  tính đến ngày 27/11/2024
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="together-section relative mt-10 mb-20 w-full h-[250px] bg-contain bg-[center_96px] bg-no-repeat "
        style={{
          backgroundImage: 'url("/images/choose-price-bg.png")',
        }}
      >
        <div className="container mx-auto h-full w-[1200px] md:w-[1000px]">
          <div className="together_title text-2xl font-bold text-green-800 uppercase text-center ">
            <h1>Hãy cùng Share2Receive</h1>
          </div>
          <div className="together_desc text-sm font-bold text-center mt-2 mb-10">
            Tuần hoàn và kéo dài vòng đời của các sản phẩm thời trang đã qua sử
            dụng.
          </div>
          <div className="card-container flex justify-evenly items-center">
            <div className="together-card flex flex-col justify-center items-center w-[15%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-36 w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/packet.png"
                  alt="packet"
                  loading="lazy"
                  className="w-auto h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-sm ">
                Đồ cũ không có nghĩa là phải vứt đi
              </p>
            </div>
            <div className="together-card flex flex-col justify-center items-center w-[13%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-36 w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/shirt.svg"
                  alt="shirt"
                  loading="lazy"
                  className="w-auto h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-sm ">
              “Cũ người, mới ta”
              hãy cho đồ cũ cuộc đời mới
              </p>
            </div>
            <div className="together-card flex flex-col justify-center items-center w-[13%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-36 w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/replace.png"
                  alt="replace"
                  loading="lazy"
                  className="w-auto h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-sm ">
              Giảm thiểu được lượng lớn
              rác thải ra môi trường
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
