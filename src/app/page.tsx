import { HomePageTitle } from '@/components/homepage/HomepageTitle'
import { HomePageHero } from '@/components/homepage/HomepageHero'
import { HomePageFavorate } from '@/components/homepage/HomePageFavorite'
import { HomePagePickPrice } from '@/components/homepage/HomePagePickPrice'
import { HomePageSamePrice } from '@/components/homepage/HomePageSamePrice'
import { HomePageCategory } from '@/components/homepage/HomePageCategory'
import { HomePageTogetherSection } from '@/components/homepage/HomePageTogetherSection'
import { HomePageManFashion } from '@/components/homepage/HomePageMaleFashion'

export default function Home() {
  return (
    <>
      <HomePageTitle />
      <HomePageHero />
      <HomePagePickPrice />
      <HomePageManFashion />
      <div className="relative mt-10">
        <h2 className="text-2xl font-bold text-center">Đồ Nữ</h2>
        <div className="relative overflow-hidden w-full h-full min-h-[500px] container px-24 mx-auto flex">
          <div
            className="w-[25%] h-full min-h-[500px] bg-cover bg-no-repeat rounded-md"
            style={{
              backgroundImage: 'url(/images/do_nu.png)',
              backgroundPosition: 'center 0px',
            }}
          ></div>
          <div className=""></div>
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
