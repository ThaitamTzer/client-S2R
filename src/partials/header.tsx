'use client'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import notificationService from '@/services/notification/notification.service'
import { useSocket } from '@/hooks/useSocket'
import { useNotificationStore } from '@/zustand/notification'
import dynamic from 'next/dynamic'
import { useAuth } from '@/hooks/useAuth'
import { mutate as getData } from 'swr'

const LeftSection = dynamic(() => import('@/components/header/leftSection'), {
  ssr: false,
})
const MiddleSection = dynamic(() => import('@/components/header/middleSection'), {
  ssr: false,
})
const RightSection = dynamic(() => import('@/components/header/rightSection'), {
  ssr: false,
})

export default function Header() {
  const { notifications, setNotifications } = useNotificationStore()
  const [api, contextHolder] = notification.useNotification()
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const scrollThreshold = 5 // Minimum scroll amount to trigger header hide
  const [searchKey, setSearchKey] = useState('')
  const router = useRouter() // Using the router to handle navigation
  const { socket } = useSocket()
  const { user } = useAuth()

  const { mutate } = useSWR(
    // Only fetch if user exists
    user ? '/notifications' : null,
    () => notificationService.getNotifications(),
    {
      onSuccess: (data) => {
        setNotifications(data)
      },
      revalidateOnFocus: true,
      refreshInterval: 0,
      dedupingInterval: 10000,
      errorRetryCount: 3,
    },
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show header when at top
      if (currentScrollY <= 0) {
        setShowHeader(true)
        return
      }

      // Only hide/show header if scroll amount exceeds threshold
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & not at top
          setShowHeader(false)
        } else {
          // Scrolling up
          setShowHeader(true)
        }
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (socket) {
      socket.on('generalNotification', (newNotification) => {
        mutate()
        getData('/api/notifications')
        api.open({
          message: newNotification.title,
          description: newNotification.message,
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
      })

      socket.on('messageNotification', (newNotification) => {
        getData('/api/messages/get-room')
        api.info({
          message: newNotification.title,
          description: (
            <div className="flex flex-row items-center">
              <p>{newNotification.receiver}: </p>
              <p>{newNotification.message}</p>
            </div>
          ),
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
        mutate()
      })

      socket.on('authenticatedNotification', (newNotification) => {
        api.info({
          message: newNotification.title,
          description: newNotification.message,
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
        mutate()
      })
    }
  }, [socket, mutate, api])

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

    // Immediately update UI
    useNotificationStore.getState().updateSingleNotification(notificationId)

    // Make API call in background
    setTimeout(async () => {
      notificationService.updateNotification(notificationId)
    }, 500)
  }

  return (
    <>
      {contextHolder}
      <header
        id="header"
        className={clsx('fixed top-0 z-50 bg-white w-full transition-all duration-300 ease-in-out', {
          '-translate-y-full shadow-none': !showHeader,
          'translate-y-0 shadow-md': showHeader,
        })}
      >
        <div className="main-nav md:container mx-auto y-2 pt-3 md:pt-0 md:py-0 lg:px-0 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center ">
            {/* Left section: Logo and Navigation have mobile in there */}
            <LeftSection handleViewNotification={handleViewNotification} notifications={notifications} />

            {/* Middle section: Search bar */}
            <MiddleSection handleSearchSubmit={handleSearchSubmit} searchKey={searchKey} setSearchKey={setSearchKey} />

            {/* Right section: Icons and User Menu */}
            <RightSection handleViewNotification={handleViewNotification} notifications={notifications} />
          </div>
        </div>
      </header>
    </>
  )
}
