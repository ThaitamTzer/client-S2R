'use client'

import { truncateText } from '@/helper/format'
import { Exchange } from '@/types/exchangeTypes'
import { rem, Avatar, Badge, ActionIcon, Tooltip, Text } from '@mantine/core'
import Image from 'next/image'
import { getAllExchangeStatusName } from '@/helper/getName'
import IconifyIcon from '@/components/icons'
import { useExchange } from '@/zustand/exchange'

export const columns = [
  {
    accessor: 'index',
    title: 'STT',
    width: 80,
    render: (record: any) => <Text size="sm">{record.index}</Text>,
  },
  {
    accessor: 'allExchangeStatus',
    title: 'Trạng thái',
    width: 120,
    render: (record: Exchange) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'canceled':
          case 'rejected':
            return 'red'
          case 'pending':
            return 'yellow'
          case 'completed':
            return 'green'
          case 'accepted':
            return 'blue'
          default:
            return 'gray'
        }
      }

      return (
        <Badge color={getStatusColor(record.allExchangeStatus)} variant="light" size="md" radius="sm">
          {getAllExchangeStatusName(record.allExchangeStatus)}
        </Badge>
      )
    },
  },
  {
    accessor: 'receiver',
    title: 'Người nhận yêu cầu',
    width: 200,
    render: (record: Exchange) => {
      const receiver = record.role === 'requester' ? record.receiverId : record.requesterId
      return (
        <div className="flex items-center gap-2">
          <Avatar size={rem(36)} src={receiver.avatar} alt={receiver.firstname + ' ' + receiver.lastname} />
          <div className="flex flex-col">
            <h1 className="font-medium text-sm">{receiver.firstname + ' ' + receiver.lastname}</h1>
            <p className="text-xs text-gray-500">{truncateText(receiver.email, 20)}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessor: 'yourProduct',
    title: 'Sản phẩm của bạn',
    width: 180,
    render: (record: Exchange) => {
      const product =
        record.role === 'requester' ? record.requestProduct.requesterProductId : record.receiveProduct.receiverProductId

      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-center">{truncateText(product.productName, 20)}</div>
          {product.imgUrls?.[0] && (
            <div className="relative w-20 h-20">
              <Image
                src={product.imgUrls[0]}
                alt={product.productName}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 80px, 80px"
              />
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessor: 'otherProduct',
    title: 'Sản phẩm cần đổi',
    width: 180,
    render: (record: Exchange) => {
      const product =
        record.role === 'requester' ? record.receiveProduct.receiverProductId : record.requestProduct.requesterProductId

      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-center">{truncateText(product.productName, 20)}</div>
          {product.imgUrls?.[0] && (
            <div className="relative w-20 h-20">
              <Image
                src={product.imgUrls[0]}
                alt={product.productName}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 80px, 80px"
              />
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessor: 'actions',
    title: '',
    width: 60,
    render: (record: Exchange) => (
      <Tooltip label="Xem chi tiết">
        <ActionIcon
          variant="subtle"
          color="blue"
          onClick={() => {
            setTimeout(() => {
              useExchange.getState().setOpenViewExchangeModal(true)
            }, 200)
            useExchange.getState().setExchangeId(record._id)
          }}
        >
          <IconifyIcon icon="weui:eyes-on-filled" className="text-lg" />
        </ActionIcon>
      </Tooltip>
    ),
  },
]
