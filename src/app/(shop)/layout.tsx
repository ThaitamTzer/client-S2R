import NavigationWithBg from '@/components/navWithBg'
import { TypeCategory } from '@/metadata/category'
import { Suspense } from 'react'
import Loading from '../loading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Cửa hàng',
    template: '%s | Share2Receive',
  },
  description:
    'Share2Receive - Nền tảng trao đổi đồ dùng thời trang hàng đầu Việt Nam, giúp tủ đồ gọn gàng và bảo vệ môi trường',
  keywords: ['trao đổi đồ', 'thời trang bền vững', 'second hand', 'tủ đồ thông minh', 'share2receive'],
  authors: [{ name: 'Share2Receive Team' }],
  creator: 'Share2Receive',
  publisher: 'Share2Receive',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://share2receive.com/shop',
  },
}

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <NavigationWithBg navLink={TypeCategory} />
      {children}
    </Suspense>
  )
}
