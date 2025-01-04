'use client'

import { OrderById } from '@/types/orderTypes'
import IconifyIcon from '../icons'
import { useState } from 'react'
// import { useOrderStore } from '@/zustand/order'
import NavigateToMomo from './navigateToMomo'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
// import { useAuth } from '@/hooks/useAuth'
// import orderService from '@/services/order/order.service'
// import { mutate } from 'swr'
import dynamic from 'next/dynamic'

const ProductPayment = dynamic(() => import('./detail/productPayment'), { ssr: false })
const AddressBuying = dynamic(() => import('./detail/address_Buying'), { ssr: false })

export default function CheckoutPage({ order }: { order: OrderById }) {
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback')
  const [paymentMethod, setPaymentMethod] = useState('2')
  // const { setAddress, setPhone } = useOrderStore()
  const [payUrl, setPayUrl] = useState('')
  // const { user } = useAuth()

  // useEffect(() => {
  //   if (user?.address && user?.phone && !order.data.address && !order.data.phone) {
  //     console.log('update address')
  //     orderService.updateAddressOrder(
  //       order.data._id,
  //       {
  //         address: user?.address || '',
  //         phone: user?.phone || '',
  //         type: 'momo_wallet',
  //       },
  //       () => {
  //         setAddress(user?.address || '')
  //         setPhone(user?.phone || '')
  //         mutate(['/order/id', order.data._id])
  //       },
  //     )
  //   }
  // }, [user])

  return (
    <>
      <NavigateToMomo payUrl={payUrl} setPayUrl={setPayUrl} />
      <div className="w-full md:container md:mx-auto px-2 md:px-36 py-10 md:pt-20">
        {callback === 'orders-management' && (
          <Link
            href="/orders-management"
            className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center"
          >
            <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" /> Quay lại trang đơn hàng của bạn
          </Link>
        )}

        <div className="flex md:flex-row flex-col-reverse justify-between md:space-x-6">
          {/* Section 1 */}
          <ProductPayment
            order={order}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            setPayUrl={setPayUrl}
          />
          {/* Section 2 */}
          <AddressBuying order={order} paymentMethod={paymentMethod} setPayUrl={setPayUrl} />
        </div>
      </div>
    </>
  )
}
