'use client'

import { OrderById } from '@/types/orderTypes'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { mutate } from 'swr'
import orderService from '@/services/order/order.service'
import toast from 'react-hot-toast'
import ModalCancel from './modalCancel'
import { useGetName } from '@/helper/getName'
import ModalCancelSubOrder from './modalCancelSubOrder'

export default function PurchasedPage({ order }: { order: OrderById }) {
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback')
  const [status, setStatus] = useState('')
  const [openModalCancel, setOpenModalCancel] = useState(false)
  const [subOrderId, setSubOrderId] = useState('')
  const [openModalCancelSubOrder, setOpenModalCancelSubOrder] = useState(false)
  const { getOrderStatusName } = useGetName()

  useEffect(() => {
    order.data.subOrders.forEach((subOrder) => {
      if (subOrder.status === 'pending') {
        setStatus('pending')
      } else if (subOrder.status === 'canceled') {
        setStatus('canceled')
      }
    })
  }, [order.data.subOrders])

  const handleCancelOrder = () => {
    orderService.cancelOrder(
      order.data._id,
      () => {
        toast.success('Đơn hàng đã được hủy thành công')
        mutate(['/order/id', order.data._id])
        setOpenModalCancel(false)
      },
      () => {
        toast.error('Đã có lỗi xảy ra khi hủy đơn hàng vui lòng thử lại sau')
        setOpenModalCancel(false)
      },
    )
  }

  const handleOpenModalCancel = () => {
    setOpenModalCancel(true)
  }

  const handleOpenModalCancelSubOrder = () => {
    setOpenModalCancelSubOrder(true)
  }

  return (
    <>
      <ModalCancel
        title="Xác nhận hủy tất cả đơn hàng"
        subtitle="Bạn có chắc chắn muốn hủy tất cả đơn hàng này không?"
        openModalCancel={openModalCancel}
        setOpenModalCancel={setOpenModalCancel}
        handleCancelOrder={handleCancelOrder}
      />
      <ModalCancelSubOrder
        subOrderId={subOrderId}
        title="Thực hiện hủy đơn hàng này?"
        openModalCancelSubOrder={openModalCancelSubOrder}
        setOpenModalCancelSubOrder={setOpenModalCancelSubOrder}
      />
      <div className="container mx-auto px-2 md:px-36 py-10 md:pt-20">
        <div className="flex flex-col items-center justify-center space-y-6">
          {status === 'canceled' ? (
            <>
              <h1 className="text-4xl font-bold text-red-500">Đơn hàng của bạn đã được hủy!</h1>
              <p className="text-lg text-gray-700">
                Cảm ơn bạn đã mua sắm cùng chúng tôi. Đơn hàng của bạn đã được hủy.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-green-900">Đơn hàng của bạn đã được thanh toán thành công!</h1>
              <p className="text-lg text-gray-700">
                Cảm ơn bạn đã mua sắm cùng chúng tôi. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao.
              </p>
            </>
          )}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
            <p className="text-lg">
              <span className="font-semibold">Mã đơn hàng:</span> {order.data.orderUUID}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Địa chỉ giao hàng:</span> {order.data.address}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Số điện thoại giao hàng:</span> {order.data.phone}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Ngày thanh toán:</span> {new Date().toLocaleDateString()}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Tổng tiền:</span> {formatPrice(order.data.totalAmount + 22000) + 'đ'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm</h2>
            {order.data.subOrders.map((subOrder) => (
              <div key={subOrder._id} className="border-b pb-4">
                {subOrder.products.map((product) => (
                  <div key={product.productId._id} className="flex flex-row justify-between py-2 ">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={product.productId.imgUrls[0]}
                          alt={product.productName}
                          layout="fill"
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-wrap max-w-[300px]">{product.productName}</p>
                        <p className="text-sm text-gray-500">Số lượng: {product.quantity}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-green-900">{formatPrice(product.price) + 'đ'}</p>
                  </div>
                ))}
                <p className="text-md font-semibold text-green-900">
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold text-green-900">
                      <span className="font-semibold text-gray-700">Mã đơn:</span> {subOrder.subOrderUUID}
                    </p>
                  </div>
                  {subOrder.requestRefund && subOrder.requestRefund.status === 'pending' && (
                    <>
                      <p className="text-md font-semibold text-green-900">Đã yêu cầu hoàn tiền chờ xử lý</p>
                    </>
                  )}
                  {!subOrder.requestRefund && (
                    <>
                      <span className="font-semibold text-gray-700">Trạng thái đơn:</span>{' '}
                      {getOrderStatusName(subOrder.status)}
                    </>
                  )}
                </p>
                {!subOrder.requestRefund && subOrder.status === 'pending' && (
                  <div className="flex justify-center">
                    <span
                      onClick={() => {
                        setSubOrderId(subOrder._id)
                        handleOpenModalCancelSubOrder()
                      }}
                      className="font-semibold text-red-700 hover:underline cursor-pointer"
                    >
                      Hủy đơn hàng
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link href="/shop" className="text-green-900 text-lg font-semibold hover:underline">
            Tiếp tục mua sắm
          </Link>
          {callback === 'orders-management' && (
            <Link href="/orders-management" className="text-green-900 text-lg font-semibold hover:underline">
              Quay lại trang đơn hàng của bạn
            </Link>
          )}
          {/* cancel order */}
          {status === 'pending' && (
            <button onClick={handleOpenModalCancel} className="text-red-500 text-lg font-semibold hover:underline">
              Hủy tất cả đơn hàng
            </button>
          )}
        </div>
      </div>
    </>
  )
}
