'use client'

import { navLink } from '@/types/navTypes'
import { Avatar, Layout, Menu } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { IconUserCircle } from '@tabler/icons-react'
import { useProfileLinks } from '@/navigation/profile/type'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import NavigationWithBg from '@/components/navWithBg'

const { Content, Sider } = Layout

const navLinks: navLink[] = [
  {
    href: '/profile',
    label: 'Thông tin tài khoản',
  },
]

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useAuth()
  const pathname = usePathname()
  const selectedKey = pathname.split('/')[1] || 'profile'
  const profileLinks = useProfileLinks()

  return (
    <>
      <Suspense>
        <Suspense>
          <NavigationWithBg navLink={navLinks} />
        </Suspense>
        <div className="container mx-auto bg-white mt-40 mb-10">
          <Layout className="h-[120%]">
            <Sider
              width={350}
              breakpoint="lg"
              collapsedWidth="0"
              style={{
                backgroundColor: 'white',
                borderRight: '1px solid #f0f0f0',
              }}
            >
              <div className="profile-avatar bg-white flex items-center gap-3 justify-start pb-6">
                <div className="avatar ">
                  <Avatar
                    src={user?.avatar}
                    alt="avatar"
                    size={80}
                    icon={<IconUserCircle size={30} />}
                  />
                </div>
                <div className="infor flex flex-col justify-start items-start">
                  <p className="text-lg">Tài khoản</p>
                  <p className="text-lg">Share2Receive của</p>
                  <h2 className="text-left text-2xl font-semibold">
                    {user?.firstname + ' ' + user?.lastname}
                  </h2>
                </div>
              </div>
              <Menu
                mode="inline"
                defaultSelectedKeys={['profile']}
                style={{ height: 'auto', backgroundColor: 'white' }}
                selectedKeys={[selectedKey]}
                items={profileLinks}
              />
            </Sider>
            <Layout>
              <Content style={{ height: 'auto' }}>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Suspense>
    </>
  )
}
