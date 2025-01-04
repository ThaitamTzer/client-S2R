// import NavigationWithBg from '@/components/navWithBg'
import SideBar from '@/components/terms/sidebar'
// import { navLink } from '@/types/navTypes'
import { Suspense } from 'react'

// const navLinks: navLink[] = [
//   {
//     href: '/terms-condition',
//     label: 'Điều khoản',
//   },
//   {
//     href: '/privacy-policy',
//     label: 'Chính sách bảo mật',
//   },
//   {
//     href: '/purchase-donation-conditions',
//     label: 'Điều khoản góp đồ thời trang',
//   },
// ]

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        {/* <NavigationWithBg navLink={navLinks} /> */}
        <div className="mt-48 container mx-auto px-4 md:px-24 mb-10">
          <div className="flex md:flex-row flex-col gap-10">
            <div className="md:w-1/3 w-full">
              {/* Sidebar */}
              <SideBar />
            </div>
            <div className="md:w-2/3 w-full">
              {/* Content */}
              {children}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}
