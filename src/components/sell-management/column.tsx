'use client'

import { Tooltip, UnstyledButton } from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import { formatDate } from '../product-management/column'
import { formatPrice } from '@/helper/format'
import IconifyIcon from '../icons'
import { Sell } from '@/types/sellType'
import { useGetName } from '@/helper/getName'
import { useOrderStore } from '@/zustand/order'

export const useSellColumns = () => {
  const { getOrderPaymentName, getOrderStatusName } = useGetName()
  const { toggleDetailModal, setSell } = useOrderStore()

  const columns: DataTableColumn<Sell>[] = [
    {
      accessor: 'subOrderUUID',
      title: 'Mã đơn hàng',
      sortable: true,
    },
    {
      accessor: 'createdAt',
      title: 'Ngày tạo',
      render: ({ createdAt }) => formatDate(createdAt),
      sortable: true,
    },
    {
      accessor: 'subTotal',
      title: 'Tổng tiền',
      render: ({ subTotal }) => formatPrice(subTotal) + 'đ',
      sortable: true,
    },

    {
      accessor: 'status',
      title: 'Trạng thái đơn hàng',
      render: ({ status }) => getOrderStatusName(status),
      sortable: true,
    },
    {
      accessor: 'paymentStatus',
      title: 'Trạng thái thanh toán',
      render: ({ orderId }) => getOrderPaymentName(orderId?.paymentStatus) || '-',
    },
    {
      accessor: '_id',
      title: 'Hành động',
      textAlign: 'center',
      render: (sell) => (
        <>
          <Tooltip label="Xem chi tiết" position="bottom" withArrow>
            <UnstyledButton
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => {
                setSell(sell)
                toggleDetailModal()
              }}
            >
              <IconifyIcon icon="mdi:eye" />
            </UnstyledButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return columns
}
