'use client'

import { useRouter } from 'next/navigation'
import { Order } from '@/types/orderTypes'
import { Tooltip, UnstyledButton } from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import { formatDate } from '../product-management/column'
import { formatPrice } from '@/helper/format'
import IconifyIcon from '../icons'

export const useOrderColumns = () => {
  const router = useRouter()

  const columns: DataTableColumn<Order>[] = [
    {
      accessor: 'orderUUID',
      title: 'Mã đơn hàng',
      render: ({ orderUUID }) => <p>{orderUUID}</p>,
      sortable: true,
    },
    {
      accessor: 'createdAt',
      title: 'Ngày tạo',
      render: ({ createdAt }) => formatDate(createdAt),
      sortable: true,
    },
    {
      accessor: 'totalAmount',
      title: 'Tổng tiền',
      render: ({ totalAmount }) => formatPrice(totalAmount) + 'đ',
      sortable: true,
    },
    {
      accessor: 'paymentStatus',
      title: 'Trạng thái thanh toán',
      render: ({ paymentStatus }) =>
        paymentStatus === 'paid' ? (
          <p className="text-green-500">Đã thanh toán</p>
        ) : (
          <p className="text-red-500">Chưa thanh toán</p>
        ),
      sortable: true,
    },
    {
      accessor: '_id',
      title: 'Hành động',
      textAlign: 'center',
      render: ({ _id }) => (
        <>
          <Tooltip label="Xem chi tiết" position="bottom" withArrow>
            <UnstyledButton
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => router.push(`/checkout/${_id}?callback=orders-management`)}
            >
              <IconifyIcon icon="weui:eyes-on-outlined" />
            </UnstyledButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return columns
}
