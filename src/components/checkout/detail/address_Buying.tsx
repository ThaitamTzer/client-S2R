'use client'
import { OrderById } from '@/types/orderTypes'
import { Button } from '@mantine/core'
import { useOrderStore } from '@/zustand/order'
import checkoutService from '@/services/checkout/checkout.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import dynamic from 'next/dynamic'

const InforPayment = dynamic(() => import('./inforPayment'), { ssr: false })

type OrderDetailProps = {
  order: OrderById
  paymentMethod: string
  setPayUrl: (value: string) => void
}

export default function AddressBuying({ order, paymentMethod, setPayUrl }: OrderDetailProps) {
  const { toggleChangeAddressModal, setIdOrder, setAddress, setPhone } = useOrderStore()

  const handleConfirmPayment = async () => {
    await checkoutService.confirmPayment(
      order.data._id,
      () => {
        mutate(['/order/id', order.data._id])
      },
      () => {
        toast.error('Cập nhật trạng thái thanh toán thất bại, vui lòng liên hệ với chúng tôi qua mail')
      },
    )
  }

  return (
    <div className="md:w-1/3 w-full flex flex-col gap-4 mb-5 md:mb-0">
      {/* Địa chỉ nhận hàng */}
      <div className="bg-white p-4 md:p-8  md:rounded-lg rounded-sm shadow-md flex flex-col gap-4">
        <h1 className="md:text-2xl md:font-bold text-lg font-medium">Địa chỉ nhận hàng</h1>
        <div className="w-full flex flex-col gap-2">
          <p className="md:text-xl text-base font-semibold">
            {order.data.userId.firstname + ' ' + order.data.userId.lastname}
          </p>

          {order.data.phone && <p className="md:text-xl text-base">{order.data.phone}</p>}
          {order.data.address && <p className="md:text-xl text-base text-wrap max-w-full">{order.data.address}</p>}
          {order.data.address && order.data.phone && (
            <>
              <div className="flex flex-row justify-end ">
                <span
                  onClick={() => {
                    toggleChangeAddressModal()
                    setIdOrder(order.data._id)
                    setAddress(order.data.address)
                    setPhone(order.data.phone)
                  }}
                  className="text-md text-gray-500 cursor-pointer hover:text-green-900"
                >
                  Sửa địa chỉ nhận hàng
                </span>
              </div>
            </>
          )}

          {!order.data.address && (
            <>
              <Button
                type="button"
                style={{
                  backgroundColor: '#16a34a',
                  color: '#fff',
                }}
                onClick={() => {
                  toggleChangeAddressModal()
                  setIdOrder(order.data._id)
                }}
              >
                Nhập địa chỉ nhận hàng
              </Button>
            </>
          )}
          {!order.data.phone && (
            <>
              <Button
                type="button"
                style={{
                  backgroundColor: '#16a34a',
                  color: '#fff',
                }}
                onClick={() => {
                  toggleChangeAddressModal()
                  setIdOrder(order.data._id)
                }}
              >
                Nhập số điện thoại
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Thông tin thanh toán */}
      <InforPayment order={order} paymentMethod={paymentMethod} setPayUrl={setPayUrl} classname="md:flex hidden" />

      {/* Caution */}
      {order.data.transactionId && order.data.paymentStatus === 'pending' && (
        <>
          <p className="text-green-900 text-center">Bạn đã thanh toán đơn hàng này?</p>
          <p className="text-green-900 text-center">
            Hãy nhấn vào nút xác minh đã toán để cập nhật trạng thái thanh toán hoặc liên hệ với chúng tôi qua mail{' '}
            <a className="underline" href="mailto:share2recieve.support@gmail.com">
              share2recieve.support@gmail.com{' '}
            </a>
            để được hỗ trợ
          </p>
          <Button
            type="button"
            disabled={!order.data.address || !order.data.phone}
            onClick={handleConfirmPayment}
            style={{
              backgroundColor: !order.data.address || !order.data.phone ? '#ccc' : '#0A97B0',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '20px',
              width: '100%',
              height: '50px',
            }}
          >
            Xác nhận đã thanh toán
          </Button>
        </>
      )}
      {!order.data.address && <p className="text-red-500 text-center">Vui lòng điền địa chỉ nhận hàng</p>}
      {!order.data.phone && <p className="text-red-500 text-center">Vui lòng điền số điện thoại</p>}
    </div>
  )
}
