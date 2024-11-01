'use client'

import Image from 'next/image'
import Link from 'next/link'

const category = [
  {
    id: 1,
    title: 'Đầm nữ',
    src: '/images/dress-icon-v2.png',
  },
  {
    id: 2,
    title: 'Áo thun',
    src: '/images/tshirt-icon-v2.png',
  },
  {
    id: 3,
    title: 'Chân váy',
    src: '/images/skirt-icon-v2.png',
  },
  {
    id: 4,
    title: 'Giày các loại',
    src: '/images/shoes-icon-v2.png',
  },
  {
    id: 5,
    title: 'Quần jeans',
    src: '/images/jean-icon-v2.png',
  },
  {
    id: 6,
    title: 'Áo sơ mi',
    src: '/images/shirt-icon-v2.png',
  },
  {
    id: 7,
    title: 'Áo khoác',
    src: '/images/coat-icon-v2.png',
  },
  {
    id: 8,
    title: 'Túi xách',
    src: '/images/hand-bag-v2.png',
  },
]

export default function HomePageCategory() {
  return (
    <>
      <div className="category-section mt-8 bg-green-100 w-full h-full">
        <div className="container mx-auto px-24 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Hàng trăm sản phẩm các loại</h1>
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
                <Image
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  width={100}
                  height={100}
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
            backgroundSize: 'cover',
            backgroundPosition: 'center -120px',
            backgroundRepeat: 'no-repeat',
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
                Rác thải thời trang,{' '}
                <span className="text-white text-2xl">tính đến ngày 27/11/2024</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
