'use client'

import {
  Avatar,
  Menu,
  rem,
  Text,
  UnstyledButton,
  TextInput,
} from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  IconSettings,
  IconTruck,
  IconLogout,
  IconShoppingCart,
  IconBell,
  IconSearch,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useLoginModal } from '@/zustand/loginModal'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

export default function Header() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { openModal } = useLoginModal()
  const { logout, user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false)
      } else {
        // Scrolling up
        setShowHeader(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const pathName = usePathname()

  return (
    <header
      id="header"
      className={clsx(
        'fixed top-0 z-50 bg-white w-full transition-transform duration-300 ',
        {
          '-translate-y-full': !showHeader,
          'translate-y-0': showHeader,
        },
      )}
    >
      <div className="main-nav container mx-auto px-24 pt-0">
        <div className="flex items-center justify-between">
          {/* Phần trái: Logo và Navigation */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Share2Receive"
              loading="lazy"
              className="mr-1 p-1"
            />
            <div className="text-green-800 text-3xl font-semibold">
              <Link href="/">Share2Receive</Link>
            </div>
            <div className="nav ml-6">
              <ul className="nav-list flex flex-row">
                <li
                  className={clsx(
                    'nav-item px-4 py-3 font-bold text-green-900 cursor-pointer hover:bg-green-200',
                    {
                      'bg-green-100': pathName === '/',
                    },
                  )}
                >
                  <Link href="/">Trang chủ</Link>
                </li>
                <li
                  className={clsx(
                    'nav-item px-4 py-3 font-bold text-green-900 cursor-pointer hover:bg-green-200',
                    {
                      'bg-green-100': pathName === '/shop',
                    },
                  )}
                >
                  <Link href="/shop">Cửa hàng</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Phần giữa: Thanh tìm kiếm */}
          <div className="flex-1 mx-4">
            <TextInput
              placeholder="Tìm kiếm..."
              rightSection={<IconSearch size={16} />}
              size="md"
              styles={(theme) => ({
                input: {
                  borderColor: theme.colors.green[7], // Màu xanh lá đậm
                  '&:focus': {
                    borderColor: theme.colors.green[7], // Màu viền khi focus
                  },
                },
              })}
            />
          </div>

          {/* Phần phải: Icon và User Menu */}
          <div className="flex items-center space-x-4">
            <UnstyledButton>
              <IconBell
                className="text-green-900"
                style={{
                  width: rem(30),
                  height: rem(30),
                }}
              />
            </UnstyledButton>
            <UnstyledButton>
              <IconShoppingCart
                className="text-green-900"
                style={{
                  width: rem(30),
                  height: rem(30),
                }}
              />
            </UnstyledButton>
            {user ? (
              <Menu shadow="md" width={250}>
                <Menu.Target>
                  <div className="flex items-center cursor-pointer">
                    <Avatar
                      src={user.avatar}
                      alt={user.firstname}
                      radius={rem(24)}
                      size={rem(35)}
                    />
                    <Text className="ml-3" size="xl" fw={500}>
                      {user.firstname + ' ' + user.lastname}
                    </Text>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Link href="/profile">
                    <Menu.Item
                      leftSection={
                        <IconSettings
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Thông tin tài khoản
                    </Menu.Item>
                  </Link>
                  <Link href="/product-management">
                    <Menu.Item
                      leftSection={
                        <IconTruck
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Quản lý sản phẩm
                    </Menu.Item>
                  </Link>
                  <Menu.Item
                    onClick={() => logout()}
                    color="red"
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Text
                className="font-bold text-green-800 cursor-pointer"
                onClick={() => openModal()}
              >
                Đăng nhập/Đăng ký
              </Text>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
