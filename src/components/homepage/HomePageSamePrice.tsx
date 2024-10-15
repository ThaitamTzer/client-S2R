"use client";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import homepage from "@/styles/homepage.module.css";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

export const HomePageSamePrice = () => {
  const autoplay3 = useRef(Autoplay({ delay: 5000 }));

  return (
    <>
      <div className="container mx-auto px-24 mt-10">
        <div className="discount mb-10">
          <p className="text-2xl font-bold text-center mb-2">
            Các sản phẩm đồng giá <span className="text-orange-600">19k</span>
          </p>
          <p className="text-lg font-medium text-center">
            Luôn có những sản phẩm đồng giá dành cho bạn
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
                      <Image
                        src={item.src}
                        width={300}
                        height={300}
                        alt={item.title}
                        loading="lazy"
                        className="w-full relative overflow-clip"
                      />
                      <div className="discount-price absolute flex flex-col items-center justify-center z-10 top-[-22px] right-0 bg-[#f25ae3] w-24 h-24 rounded-full text-white">
                        <span className="text-sm">Đồng giá</span>
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
                Đồng giá <span className="text-green-500">19k</span> Các loại
                sản phẩm
              </h2>
              <p>
                &#40;Xem ngay để nhận ưu đãi lớn nhất từ Share2Receive &#41;
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
