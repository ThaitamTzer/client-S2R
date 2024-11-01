'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useClient } from '@/hooks/useClient'

const priorityOrder = {
  veryHigh: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export default function HomePageCategory() {
  const { categories } = useClient()

  const sortedCategories = categories?.sort((a, b) => {
    return (
      priorityOrder[b.priority as keyof typeof priorityOrder] -
      priorityOrder[a.priority as keyof typeof priorityOrder]
    )
  })

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
            {sortedCategories?.slice(0, 8)?.map((item) => (
              <Link href={`/shop?filterCategory=${item._id}`} key={item._id}>
                <div className="category-item relative bg-white rounded-md shadow-md flex items-center justify-around overflow-hidden">
                  <div className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] relative">
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      loading="lazy"
                      width={100}
                      height={100}
                      quality={60}
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-lg ">{item.name}</p>
                  </div>
                </div>
              </Link>
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
