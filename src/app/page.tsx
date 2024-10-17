'use client'
import { HomePageTitle } from '@/components/homepage/HomepageTitle'
import { HomePageHero } from '@/components/homepage/HomepageHero'
import { HomePageFavorate } from '@/components/homepage/HomePageFavorite'
import { HomePagePickPrice } from '@/components/homepage/HomePagePickPrice'
import { HomePageSamePrice } from '@/components/homepage/HomePageSamePrice'
import { HomePageCategory } from '@/components/homepage/HomePageCategory'
import { HomePageTogetherSection } from '@/components/homepage/HomePageTogetherSection'
import { HomePageManFashion } from '@/components/homepage/HomePageMaleFashion'
import { HomePageFemale } from '@/components/homepage/HomePageFemale'
import Navigation from '@/components/authpage/nav'
import { TypeCategory } from '@/metadata/category'
import { HomePageUnisex } from '@/components/homepage/HomePageUnisex'
import FormStyleUser from '@/components/homepage/FormStyle'

export default function Home() {
  return (
    <>
      <FormStyleUser />
      <Navigation navLink={TypeCategory} />
      <HomePageTitle />
      {/* <HomePageHero /> */}
      <HomePagePickPrice />
      <HomePageManFashion />
      <HomePageFemale />
      <HomePageUnisex />
      {/* <HomePageFavorate /> */}
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
