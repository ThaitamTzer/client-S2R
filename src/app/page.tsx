import { TypeCategory } from '@/metadata/category'
import FormStyleUser from '@/components/homepage/FormStyle'
import { Metadata } from 'next'
import { lazy, Suspense } from 'react'
import Loading from './loading'

// Chuyển sang dùng React.lazy
const HomePageHero = lazy(() => import('@/components/homepage/HomepageHero'))
const HomePageFavorate = lazy(() => import('@/components/homepage/HomePageFavorite'))
const HomePagePickPrice = lazy(() => import('@/components/homepage/HomePagePickPrice'))
const HomePageSamePrice = lazy(() => import('@/components/homepage/HomePageSamePrice'))
const HomePageCategory = lazy(() => import('@/components/homepage/HomePageCategory'))
const HomePageTogetherSection = lazy(() => import('@/components/homepage/HomePageTogetherSection'))
const HomePageManFashion = lazy(() => import('@/components/homepage/HomePageMaleFashion'))
const HomePageFemale = lazy(() => import('@/components/homepage/HomePageFemale'))
const HomePageUnisex = lazy(() => import('@/components/homepage/HomePageUnisex'))
const HomePageYouLike = lazy(() => import('@/components/homepage/HomePageYouLike'))
const Navigation = lazy(() => import('@/components/nav'))
const HomePageTitle = lazy(() => import('@/components/homepage/HomepageTitle'))

export const metadata: Metadata = {
  title: 'Share2Receive',
  description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
}

export default function Home() {
  return (
    <>
      <FormStyleUser />
      <Suspense fallback={<Loading />}>
        <Navigation navLink={TypeCategory} />
        <HomePageHero />
        <HomePageTitle />
        <HomePageYouLike />
        <HomePagePickPrice />
        <HomePageManFashion />
        <HomePageFemale />
        <HomePageUnisex />
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
      </Suspense>
    </>
  )
}
