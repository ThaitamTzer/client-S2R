'use client'

import ChangeAddressModal from '@/components/checkout/changeAddressModal'
import CheckoutPage from '@/components/checkout/checkoutPage'
import orderService from '@/services/order/order.service'
import { Order } from '@/types/orderTypes'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import useSWR from 'swr'

const NavigationWithBgAlways = dynamic(() => import('@/components/navWithBgAlway'), {
  ssr: false,
})

export default function CheckoutPageId({ params }: { params: { orderId: string } }) {
  const navLinks = {
    href: `/checkout/${params.orderId}`,
    label: 'Thanh toán',
  }

  const [order, setOrder] = useState<Order>()

  useSWR(['/order/id', params.orderId], () => orderService.getOrderById(params.orderId), {
    onSuccess(data) {
      if (data) {
        setOrder(data)
      }
    },
  })

  if (!order) return null

  return (
    <>
      <NavigationWithBgAlways navLink={navLinks} />
      <ChangeAddressModal />
      <CheckoutPage order={order} />
    </>
  )
}
