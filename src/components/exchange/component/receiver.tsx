'use client'
import { rem, Avatar } from '@mantine/core'
import { truncateText } from '@/helper/format'
import { ExchangeType } from '@/types/exchangeTypes'
import { Image, Tooltip, Steps } from 'antd'
import { IconCircleCheck, IconCircleDot, IconTruckDelivery } from '@tabler/icons-react'

export const Receiver = ({ exchange }: { exchange: ExchangeType }) => {
  const getStepStatus = (currentStatus: string, targetStatus: string) => {
    const statusOrder = ['pending', 'shipping', 'delivered', 'canceled']
    const currentIndex = statusOrder.indexOf(currentStatus)
    const targetIndex = statusOrder.indexOf(targetStatus)

    if (currentStatus === 'canceled') return 'error'
    if (targetIndex < currentIndex) return 'finish'
    if (targetIndex === currentIndex) return 'process'
    return 'wait'
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center">
          <Avatar
            size={rem(50)}
            src={exchange?.receiverId?.avatar}
            alt={exchange?.receiverId?.firstname + ' ' + exchange?.receiverId?.lastname}
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-medium">
              {exchange?.receiverId?.firstname +
                ' ' +
                exchange?.receiverId?.lastname +
                ' (người nhận đề xuất)'}
            </h1>
            <p className="text-sm text-gray-500">{exchange?.receiverId?.email}</p>
          </div>
        </div>
        <div className="flex flex-row justify-start items-start gap-2">
          <Image
            width={200}
            src={exchange?.receiveProduct?.receiverProductId.imgUrls?.[0]}
            alt={exchange?.receiveProduct?.receiverProductId.productName}
            sizes="(max-width: 200px) 100vw, 200px"
            loading="lazy"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '8px',
            }}
          />
          <div className="flex flex-col gap-2 text-base">
            <Tooltip
              title={exchange?.receiveProduct?.receiverProductId.productName}
              placement="top"
              color="#2f9e44"
              key={exchange?.receiveProduct?.receiverProductId._id}
            >
              <h1 className="text-2xl font-semibold text-green-800">
                {truncateText(exchange?.receiveProduct?.receiverProductId.productName, 20)}
              </h1>
            </Tooltip>
            <div className="flex items-center gap-2">
              <span>Màu sắc: </span>
              <p className="text-green-800 text-xl font-semibold">
                {exchange?.receiveProduct?.colors}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>Size: </span>
              <p className="text-green-800 text-xl font-semibold">
                {exchange?.receiveProduct?.size}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>Số lượng: </span>
              <p className="text-green-800 text-xl font-semibold">
                {exchange?.receiveProduct?.amount}
              </p>
            </div>
          </div>
        </div>
        {exchange?.receiverExchangeStatus === 'pending' && (
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-lg font-medium">Trạng thái:</h1>
            <p className="text-base px-2 py-1 bg-yellow-500 text-white capitalize rounded-md shadow-sm">
              Đang chờ xử lý
            </p>
          </div>
        )}
        {exchange?.receiverExchangeStatus === 'canceled' && (
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-lg font-medium">Trạng thái:</h1>
            <p className="text-base px-2 py-1 bg-red-500 text-white capitalize rounded-md shadow-sm">
              Đã hủy
            </p>
          </div>
        )}
        {exchange?.receiverExchangeStatus === 'shipping' && (
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-lg font-medium">Trạng thái:</h1>
            <p className="text-base px-2 py-1 bg-blue-500 text-white capitalize rounded-md shadow-sm">
              Đang giao hàng
            </p>
          </div>
        )}
        {exchange?.receiverExchangeStatus === 'delivered' && (
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-lg font-medium">Trạng thái:</h1>
            <p className="text-base px-2 py-1 bg-green-500 text-white capitalize rounded-md shadow-sm">
              Đã hoàn thành
            </p>
          </div>
        )}
        <div className="flex flex-col justify-center items-center gap-4">
          <Steps
            direction="horizontal"
            current={['pending', 'shipping', 'delivered', 'canceled'].indexOf(
              exchange?.receiverExchangeStatus || 'pending',
            )}
            size="small"
            status={exchange?.receiverExchangeStatus === 'canceled' ? 'error' : 'process'}
            items={[
              {
                title: 'Chờ xử lý',
                icon: <IconCircleDot />,
                status: getStepStatus(exchange?.receiverExchangeStatus || 'pending', 'pending'),
              },
              {
                title: <span className="cursor-pointer">Đang giao</span>,
                icon: <IconTruckDelivery />,
                status: getStepStatus(exchange?.receiverExchangeStatus || 'pending', 'shipping'),
              },
              {
                title: <span className="cursor-pointer">Hoàn thành</span>,
                icon: <IconCircleCheck />,
                status: getStepStatus(exchange?.receiverExchangeStatus || 'pending', 'delivered'),
              },
            ]}
            style={{ maxWidth: 400 }}
          />
          {exchange?.receiverExchangeStatus === 'canceled' && (
            <p className="text-red-500 font-medium">Đơn hàng đã bị hủy</p>
          )}
        </div>
      </div>
    </>
  )
}
