'use client'

import { Avatar, Menu, rem, Text, UnstyledButton, TextInput, ScrollArea } from '@mantine/core'
import { notification } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import {
  IconSettings,
  IconTruck,
  IconLogout,
  IconShoppingCart,
  IconBell,
  IconBellFilled,
  IconSearch,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useLoginModal } from '@/zustand/loginModal'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import IconifyIcon from '@/components/icons'
import { useExchange } from '@/zustand/exchange'
import useSWR from 'swr'
import notificationService from '@/services/notification/notification.service'
import { useSocket } from '@/hooks/useSocket'
import { NotificationType } from '@/types/notificationType'

export default function Header() {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [api, contextHolder] = notification.useNotification()
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [searchKey, setSearchKey] = useState('')
  const { openModal } = useLoginModal()
  const { logout, user } = useAuth()
  const router = useRouter() // Using the router to handle navigation
  const { toogleExchangeModal } = useExchange()
  const { socket } = useSocket()

  const { mutate } = useSWR('/notifications', () => notificationService.getNotifications(), {
    onSuccess: (data) => {
      setNotifications(data)
    },
    revalidateOnFocus: true,
    refreshInterval: 0,
    dedupingInterval: 10000,
    errorRetryCount: 3,
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false) // Scrolling down
      } else {
        setShowHeader(true) // Scrolling up
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  useEffect(() => {
    if (socket) {
      socket.on('generalNotification', () => {
        mutate()
        api.open({
          message: 'Thông báo trao đổi',
          description: 'Bạn có một yêu cầu trao đổi mới ',
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
      })

      socket.on('authenticatedNotification', () => {
        api.open({
          message: 'Thông báo trao đổi',
          description: 'Bạn có một yêu cầu trao đổi mới ',
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
        mutate()
      })
    }
  }, [socket, mutate, api])

  const pathName = usePathname()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = (event: any) => {
    event.preventDefault()
    if (searchKey.trim()) {
      // Redirect to a search results page or handle the search
      router.push(`/shop?searchKey=${searchKey}`)
      setSearchKey('')
    }
  }

  const handleViewNotification = async (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    await notificationService.updateNotification(notificationId)
    setTimeout(() => {
      mutate()
    }, 1000)
  }

  const unreadCount = notifications?.filter((notification) => !notification.isViewed).length || 0

  return (
    <>
      {contextHolder}
      <header
        id="header"
        className={clsx('fixed top-0 z-50 bg-white w-full transition-transform duration-300', {
          '-translate-y-full': !showHeader,
          'translate-y-0': showHeader,
        })}
      >
        <div className="main-nav container mx-auto px-24 pt-0 ">
          <div className="flex items-center justify-between">
            {/* Left section: Logo and Navigation */}
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
                <Link href="/">
                  <h1>
                    Share
                    <span style={{ color: 'salmon' }}>2</span>
                    Receive
                  </h1>
                </Link>
              </div>
              <div className="nav ml-6">
                <ul className="nav-list flex flex-row uppercase">
                  <li>
                    <Link
                      className={clsx(
                        'block nav-item px-4 py-5 font-bold text-green-900 cursor-pointer hover:bg-green-200',
                        {
                          'bg-green-100': pathName === '/',
                        },
                      )}
                      href="/"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={clsx(
                        'block nav-item px-4 py-5 font-bold text-green-900 cursor-pointer hover:bg-green-200',
                        {
                          'bg-green-100': pathName === '/shop',
                        },
                      )}
                      href="/shop"
                    >
                      Cửa hàng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Middle section: Search bar */}
            <div className="flex-1 mx-4">
              <form onSubmit={handleSearchSubmit}>
                <TextInput
                  value={searchKey}
                  onChange={(event) => setSearchKey(event.currentTarget.value)}
                  placeholder="Tìm kiếm..."
                  rightSection={<IconSearch size={16} />}
                  size="md"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSearchSubmit(event)
                    }
                  }}
                  styles={(theme) => ({
                    input: {
                      borderColor: theme.colors.green[7], // Dark green border
                      '&:focus': {
                        borderColor: theme.colors.green[7], // Border color on focus
                      },
                    },
                  })}
                />
              </form>
            </div>

            {/* Right section: Icons and User Menu */}
            <div className="flex items-center space-x-4">
              <Menu shadow="md" width={300} closeOnItemClick={false}>
                <Menu.Target>
                  <UnstyledButton className="relative">
                    {unreadCount > 0 ? (
                      <IconBellFilled
                        className="text-green-900"
                        style={{
                          width: rem(30),
                          height: rem(30),
                        }}
                      />
                    ) : (
                      <IconBell
                        className="text-green-900"
                        style={{
                          width: rem(30),
                          height: rem(30),
                        }}
                      />
                    )}
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Thông báo</Menu.Label>
                  <ScrollArea h={400}>
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Menu.Item
                          key={notification._id}
                          // className={clsx({
                          //   'bg-gray-50': !notification.isViewed,
                          // })}
                          onClick={(event) => handleViewNotification(notification._id, event)}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Text size="sm" fw={500}>
                                  Thông báo trao đổi
                                </Text>
                                {!notification.isViewed && (
                                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                )}
                              </div>
                              {notification.isViewed && (
                                <Text size="xs" c="dimmed">
                                  Đã xem
                                </Text>
                              )}
                            </div>
                            <Text size="xs" c="dimmed">
                              {notification.content}
                            </Text>
                          </div>
                        </Menu.Item>
                      ))
                    ) : (
                      <Menu.Item>Chưa có thông báo nào</Menu.Item>
                    )}
                  </ScrollArea>
                </Menu.Dropdown>
              </Menu>
              <UnstyledButton onClick={() => api.info({ message: 'Chức năng đang phát triển' })}>
                <IconShoppingCart
                  className="text-green-900"
                  style={{
                    width: rem(30),
                    height: rem(30),
                  }}
                />
              </UnstyledButton>
              <UnstyledButton onClick={() => toogleExchangeModal()}>
                <IconifyIcon
                  icon="carbon:ibm-data-product-exchange"
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
                        leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                      >
                        Thông tin tài khoản
                      </Menu.Item>
                    </Link>
                    <Link href="/product-management">
                      <Menu.Item
                        leftSection={<IconTruck style={{ width: rem(14), height: rem(14) }} />}
                      >
                        Quản lý sản phẩm
                      </Menu.Item>
                    </Link>
                    <Menu.Item
                      onClick={() => logout()}
                      color="red"
                      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Text
                  className="font-bold text-green-900 cursor-pointer"
                  onClick={() => openModal()}
                >
                  Đăng nhập/Đăng ký
                </Text>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
