import { TypeCategory } from '@/metadata/category'
import FormStyleUser from '@/components/homepage/FormStyle'
import { Metadata } from 'next'
import { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from './loading'
import { fetchProducts } from '@/action/homepage'
import { fetchBrand } from '@/action/brand'
import { fetchCategories } from '@/action/category'

// Chuyển sang dùng React.lazy
const HomePageHero = dynamic(() => import('@/components/homepage/HomepageHero'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageFavorate = dynamic(() => import('@/components/homepage/HomePageFavorite'), {
  ssr: false,
  loading: () => <Loading />,
})
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
  title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
  description:
    'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng ',
  keywords: [
    'trao đổi đồ',
    'thời trang bền vững',
    'second hand',
    'tủ đồ thông minh',
    'share2receive',
    'Share2Receive, trao đổi đồ dùng thời trang, tủ đồ gọn gàng',
  ],
  robots: 'index, follow',
  authors: [{ name: 'Share2Receive', url: 'https://share2receive-client.vercel.app' }],
  creator: 'Share2Receive',
  publisher: 'Share2Receive',
  metadataBase: new URL('https://share2receive-client.vercel.app'),
  alternates: {
    canonical: 'https://share2receive-client.vercel.app',
  },
  openGraph: {
    title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
    description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
    url: 'https://share2receive-client.vercel.app',
    siteName: 'Share2Receive',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
    description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
  },
}

export default async function Home() {
  const productsMale = await fetchProducts('male')
  const productsFemale = await fetchProducts('female')
  const brands = await fetchBrand()
  const categories = await fetchCategories()
  const getVideoSrc = () => {
    return 'https://www.youtube.com/embed/uyHgY2O__fY?playlist=uyHgY2O__fY&loop=1&autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&start=5&end=179?loading=lazy'
  }

  const src = getVideoSrc()

  return (
    <>
      <FormStyleUser />
      <Suspense fallback={<Loading />}>
        <Navigation navLink={TypeCategory} />
        <div className="mt-[105px] md:mt-0">
          <HomePageHero src={src} />
          <HomePageTitle />
          <HomePageYouLike />
          <HomePageManFashion products={productsMale.data} />
          <HomePageFemale donus={productsFemale.data} />
          <HomePageUnisex />
          <HomePageFavorate brands={brands} />
          <HomePageSamePrice />
          <div className="container mx-auto px-2 md:px-32 text-center text-lg md:text-2xl font-medium text-green-800 uppercase mt-8">
            <h1>
              <span className="font-bold">Share2Receive </span>
              &#45; Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng
            </h1>
          </div>
          <HomePageCategory categories={categories} />
          <HomePageTogetherSection />
        </div>
      </Suspense>
    </>
  )
}
