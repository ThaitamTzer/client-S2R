import Navigation from '@/components/nav'
import { FilterSide } from '@/layout/shop/filter'
import { TypeCategory } from '@/metadata/category'
import { FilterFilled } from '@ant-design/icons'
import { Suspense } from 'react'

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Navigation navLink={TypeCategory} />
      <div className="container mx-auto px-10 mt-40">
        <h1 className="text-2xl font-semibold uppercase">
          <FilterFilled size={30} /> Bộ lọc tìm kiếm
        </h1>
        <div className="flex mt-3">
          <div className="w-[22%] h-full">
            <FilterSide />
          </div>
          <div className="w-[75%] h-full ml-5">{children}</div>
        </div>
      </div>
    </Suspense>
  )
}
