'use client'
import useSWR from 'swr'
import orderService from '@/services/order/order.service'
import { Orders } from '@/types/orderTypes'
import { useState } from 'react'
import { formatDate } from '@/components/product-management/column'
import { formatPrice } from '@/helper/format'
import { useRouter } from 'next/navigation'
import { Tooltip } from '@mantine/core'

export default function OrderManagement() {
  const [orders, setOrders] = useState<Orders>()
  const router = useRouter()

  useSWR('/order/user', () => orderService.getAllOrders(), {
    onSuccess(data) {
      if (data) {
        setOrders(data)
      }
    },
    revalidateOnFocus: false,
    revalidateOnMount: true,
  })

  console.log(orders?.data)

  return (
    <div className="container px-1 md:px-10 mx-auto">
      <div className="title text-black text-2xl font-semibold">
        <h2>Đơn hàng của tôi</h2>
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-center text-sm md:text-xl font-light border-b border-gray-200 ">
              <th className="py-3 font-medium">Mã đơn hàng</th>
              <th className="py-3 font-medium">Ngày tạo</th>
              <th className="py-3 font-medium">Tổng tiền</th>
              <th className="py-3 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order) => (
              <tr key={order._id} className="text-center text-sm md:text-xl">
                <td className="py-3 text-green-900 flex justify-center">
                  <Tooltip label="Xem chi tiết">
                    <div
                      className="text-center truncate max-w-[200px] cursor-pointer hover:text-green-500"
                      onClick={() => router.push(`/checkout/${order._id}?callback=orders-management`)}
                    >
                      {order._id}
                    </div>
                  </Tooltip>
                </td>
                <td className="py-3">{formatDate(order.createdAt)}</td>
                <td className="py-3">{formatPrice(order.totalAmount) + 'đ'}</td>
                <td className="py-3">
                  {order.paymentStatus === 'paid' ? (
                    <p className="text-green-500">Đã thanh toán</p>
                  ) : (
                    <p className="text-red-500">Chưa thanh toán</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
