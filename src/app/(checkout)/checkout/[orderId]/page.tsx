'use client'

import ChangeAddressModal from '@/components/checkout/changeAddressModal'
import CheckoutPage from '@/components/checkout/checkoutPage'
import PurchasedPage from '@/components/checkout/purchasedPage'
import orderService from '@/services/order/order.service'
import { Order } from '@/types/orderTypes'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import useSWR from 'swr'
import Loading from '@/app/loading'
import Link from 'next/link'
import IconifyIcon from '@/components/icons'
const NavigationWithBgAlways = dynamic(() => import('@/components/navWithBgAlway'), {
  ssr: false,
})

export default function CheckoutPageId({ params }: { params: { orderId: string } }) {
  const navLinks = {
    href: `/checkout/${params.orderId}`,
    label: 'Thanh toán',
  }

  const [order, setOrder] = useState<Order | undefined>()

  const { isLoading } = useSWR(['/order/id', params.orderId], () => orderService.getOrderById(params.orderId), {
    onSuccess(data) {
      if (data) {
        setOrder(data)
      }
    },
    compare(a, b) {
      if (a !== b) {
        setOrder(b)
      }
      return false
    },
    revalidateOnFocus: false,
    revalidateOnMount: true,
  })

  console.log(order?.summary)

  if (isLoading) return <Loading />

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Đơn hàng không tồn tại</h1>
        <Link href="/" className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center">
          <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" />
          Quay lại trang chủ
        </Link>
        <Link
          href="/orders-management"
          className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center"
        >
          <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" />
          Quay lại trang đơn hàng của tôi
        </Link>
      </div>
    )
  }

  return (
    <>
      <NavigationWithBgAlways navLink={navLinks} />
      <ChangeAddressModal />
      {order.data.paymentStatus === 'paid' ? <PurchasedPage order={order} /> : <CheckoutPage order={order} />}
    </>
  )
}
