import { Sell } from '@/types/sellType'
import { Button, Modal, Select } from '@mantine/core'
import { formatDate } from '../product-management/column'
import { useGetName } from '@/helper/getName'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import orderService from '@/services/order/order.service'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'

export default function ViewDetail({ opened, onClose, sell }: { opened: boolean; onClose: () => void; sell: Sell }) {
  const { getColorName, getOrderPaymentName } = useGetName()
  const [status, setStatus] = useState('')

  useEffect(() => {
    setStatus(sell?.status || '')
  }, [sell])

  // Danh sách trạng thái hợp lệ
  const statuses = [
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'shipping', label: 'Đang giao hàng' },
    { value: 'delivered', label: 'Đã giao hàng' },
  ]

  // Lọc trạng thái hợp lệ (chỉ trạng thái sau trạng thái hiện tại)
  const availableStatuses = statuses.filter(
    (s) => statuses.findIndex((item) => item.value === s.value) >= statuses.findIndex((item) => item.value === status),
  )

  const handleUpdateStatus = async (newStatus: string) => {
    if (!sell) return

    orderService.changeStatusOrder(
      sell._id,
      newStatus,
      () => {
        setStatus(newStatus)
        sell.status = newStatus
        toast.success('Cập nhật trạng thái thành công')
        mutate('/sell/user')
        onClose()
      },
      () => {
        toast.error('Cập nhật trạng thái thất bại')
        setStatus(sell.status)
        onClose()
      },
    )
  }

  console.log(sell)

  if (!sell) return null
  return (
    <Modal title="Chi tiết đơn hàng" size="lg" centered opened={opened} onClose={onClose}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-row gap-10 flex-wrap">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Mã đơn hàng</p>
            <p className="text-sm">{sell.subOrderUUID}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Ngày tạo</p>
            <p className="text-sm">{formatDate(sell.createdAt)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Trạng thái thanh toán</p>
            <p className="text-sm">{getOrderPaymentName(sell?.orderId?.paymentStatus) || '-'}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Địa chỉ giao hàng</p>
            <p className="text-sm">{sell?.orderId?.address || '-'}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Số điện thoại</p>
            <p className="text-sm">{sell?.orderId?.phone || '-'}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Tên người nhận</p>
            <p className="text-sm">{sell?.orderId?.userId?.firstname + ' ' + sell?.orderId?.userId?.lastname || '-'}</p>
          </div>
          {sell?.status === 'completed' && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Trạng thái đơn hàng</p>
              <p className="text-sm">Đã nhận được hàng</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Tổng giá trị đơn hàng</p>
          <p className="text-sm">{formatPrice(sell.subTotal)} đ</p>
        </div>
        {sell?.status !== 'canceled' && sell?.status !== 'completed' && sell?.orderId?.paymentStatus === 'paid' && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Cập nhật trạng thái đơn hàng</p>
            <Select data={availableStatuses} value={status} onChange={(value) => setStatus(value || '')} />
            <Button
              onClick={() => handleUpdateStatus(status)}
              style={{
                backgroundColor: '#166534',
                color: '#fff',
              }}
            >
              Cập nhật
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">Sản phẩm</p>
          {sell?.products?.map((product) => (
            <div key={product._id} className="flex flex-row gap-2">
              <div className="w-24 h-32 relative">
                <Image
                  src={product.productId.imgUrls[0]}
                  alt={product.productName}
                  objectFit="cover"
                  className="object-cover rounded-md absolute top-0 left-0 w-full h-full"
                  quality={70}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm max-w-full truncate">{product.productName}</p>
                <div className="flex flex-row gap-2 flex-wrap">
                  <p className="text-sm">
                    <span className="font-medium">Số lượng:</span> {product.quantity}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Màu sắc:</span> {getColorName(product.color)}
                  </p>
                  <p className="text-sm flex items-center gap-1">
                    <span className="font-medium ">Kích thước:</span> <p className="uppercase">{product.size}</p>
                  </p>
                </div>
                <p className="text-sm">
                  <span className="font-medium">Giá:</span> {formatPrice(product.price)} đ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
