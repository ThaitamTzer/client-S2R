'use client'
import homepage from '@/styles/homepage.module.css'

export default function HomePagePickPrice() {
  return (
    <>
      <div
        className="choose-price_section relative mt-14 w-full h-[250px] bg-contain bg-[center_96px] bg-no-repeat "
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
    </>
  )
}
