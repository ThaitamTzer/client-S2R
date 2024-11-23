'use client'
import useSWR from 'swr'
import orderService from '@/services/order/order.service'
import { Sell } from '@/types/sellType'
import { useState } from 'react'
import { formatDate } from '../product-management/column'
import { formatPrice } from '@/helper/format'
import { Tooltip } from '@mantine/core'
import { useGetName } from '@/helper/getName'
import ViewDetail from './viewDetail'

export default function SellPage() {
  const { getOrderPaymentName, getOrderStatusName } = useGetName()
  const [sells, setSells] = useState<Sell[]>()
  const [opened, setOpened] = useState(false)
  const [sell, setSell] = useState<Sell>()

  useSWR('/sell/user', () => orderService.getAllOrdersByUser(), {
    onSuccess(data) {
      if (data) {
        setSells(data.data)
      }
    },
  })

  const handleOpen = (sell: Sell) => {
    setSell(sell)
    setOpened(true)
  }

  console.log(sells)

  return (
    <>
      <ViewDetail opened={opened} onClose={() => setOpened(false)} sell={sell} />
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
                <th className="py-3 font-medium">Trạng thái thanh toán</th>
                <th className="py-3 font-medium">Trạng thái đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {sells?.map((sell) => (
                <tr key={sell._id} className="text-center text-sm md:text-xl">
                  <td className="py-3 text-green-900 flex justify-center">
                    <Tooltip label="Xem chi tiết" onClick={() => handleOpen(sell)}>
                      <div className="text-center  cursor-pointer hover:text-green-500">{sell.orderUUID}</div>
                    </Tooltip>
                  </td>
                  <td className="py-3 text-black">{formatDate(sell.createdAt)}</td>
                  <td className="py-3 text-black">{formatPrice(sell.subTotal) + 'đ'}</td>
                  <td className="py-3 text-black">{getOrderPaymentName(sell.orderId.paymentStatus)}</td>
                  <td className="py-3 text-black">{getOrderStatusName(sell.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
