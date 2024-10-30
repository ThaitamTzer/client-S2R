'use client'
import { rem, Avatar, Divider } from '@mantine/core'
import { truncateText } from '@/helper/format'
import { Exchange } from '@/types/exchangeTypes'
import { Image, Tooltip, Steps, Button, Popconfirm } from 'antd'
import { IconCircleCheck, IconCircleDot, IconTruckDelivery } from '@tabler/icons-react'
import { useExchange } from '@/zustand/exchange'
import { useState } from 'react'
import exChangeService from '@/services/exchange/exchange.service'
import toast from 'react-hot-toast'

export const Receiver = ({ exchange }: { exchange: Exchange }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setExchange } = useExchange()

  const getStepStatus = (currentStatus: string, targetStatus: string) => {
    const statusOrder = ['pending', 'shipping', 'completed', 'canceled']
    const currentIndex = statusOrder.indexOf(currentStatus)
    const targetIndex = statusOrder.indexOf(targetStatus)

    if (currentStatus === 'canceled') return 'error'
    if (targetIndex < currentIndex) return 'finish'
    if (targetIndex === currentIndex) return 'process'
    return 'wait'
  }

  const getCurrentStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 0
      case 'shipping':
        return 1
      case 'completed':
        return 2
      case 'canceled':
        return 3
      default:
        return 0
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateStatus = async (id: string, status: any) => {
    setIsLoading(true)
    try {
      await exChangeService
        .update(id, status)
        .then(() => {
          exChangeService.getById(id).then((res) => {
            setExchange(res)
          })
          toast.success('Cập nhật trạng thái thành công')
          setIsLoading(false)
        })
        .catch(() => {
          toast.error('Cập nhật trạng thái thất bại')
          setIsLoading(false)
        })
    } catch {
      toast.error('Cập nhật trạng thái thất bại')
      setIsLoading(false)
    }
  }

  console.log(exchange)

  return (
    <>
      <div className="flex flex-col gap-5 max-w-[500px]">
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
        {exchange?.allExchangeStatus === 'accepted' && (
          <div className="flex flex-col justify-center items-center gap-4">
            <Steps
              direction="horizontal"
              current={getCurrentStep(exchange?.receiverStatus?.exchangeStatus)}
              size="small"
              status={exchange?.receiverStatus?.exchangeStatus === 'canceled' ? 'error' : undefined}
              items={[
                {
                  title: 'Chờ xử lý',
                  icon: <IconCircleDot />,
                  status: getStepStatus(exchange?.receiverStatus?.exchangeStatus, 'pending'),
                },
                {
                  title: 'Đang giao',
                  icon: <IconTruckDelivery />,
                  status: getStepStatus(exchange?.receiverStatus?.exchangeStatus, 'shipping'),
                },
                {
                  title: 'Hoàn thành',
                  icon: <IconCircleCheck />,
                  status: getStepStatus(exchange?.receiverStatus?.exchangeStatus, 'completed'),
                },
              ]}
            />
            {exchange.role === 'receiver' && (
              <div className="w-full h-full bg-white shadow-sm rounded-sm container mx-auto p-3 flex flex-col justify-start">
                {exchange?.requestStatus?.exchangeStatus === 'pending' && (
                  <>
                    <p className="text-base font-medium">Đơn hàng của bạn đã sẵn sàng ?</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs ">
                        (Cập nhật trạng thái đơn hàng của bạn thành đang giao)
                      </p>
                      <Button
                        variant="solid"
                        color="primary"
                        onClick={() => handleUpdateStatus(exchange._id, 'shipping')}
                        loading={isLoading}
                      >
                        Cập nhật
                      </Button>
                    </div>
                    <Divider my="sm" />
                    <div className="flex items-center justify-start gap-1 mt-2">
                      <p className="text-sm ">Bạn muốn dừng trao đổi ?</p>
                      <Popconfirm
                        title="Bạn muốn dừng trao đổi ?"
                        onConfirm={() => handleUpdateStatus(exchange._id, 'canceled')}
                        showCancel={false}
                        okText="Đồng ý"
                      >
                        <span className="text-sm underline text-red-500 cursor-pointer">Hủy</span>
                      </Popconfirm>
                    </div>
                  </>
                )}
                {exchange?.requestStatus?.exchangeStatus === 'shipping' && (
                  <>
                    <p className="text-base font-medium">Bạn đã giao hàng cho yêu cầu ?</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs ">
                        (Cập nhật trạng thái đơn hàng của bạn thành đã giao)
                      </p>
                      <Button
                        variant="solid"
                        color="primary"
                        onClick={() => handleUpdateStatus(exchange._id, 'completed')}
                        loading={isLoading}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </>
                )}
                {exchange?.requestStatus?.exchangeStatus === 'completed' && (
                  <>
                    <p className="text-base font-medium">Hoàn thành trao đổi</p>
                    <div className="flex items-center justify-between gap-1 mt-2">
                      <p className="text-sm ">
                        Bạn sẽ được đánh giá người nhận của bạn sau khi người nhận của bạn và bạn
                        xác nhận đã nhận được hàng của nhau
                      </p>
                    </div>
                    <Button variant="solid" color="primary" disabled>
                      Đánh giá
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {exchange?.receiverStatus?.exchangeStatus === 'canceled' && (
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-red-500 font-medium">Đơn hàng đã bị hủy</p>
          </div>
        )}
      </div>
    </>
  )
}
