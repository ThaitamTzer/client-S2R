'use client'
import { rem, Avatar, Divider } from '@mantine/core'
import { truncateText } from '@/helper/format'
import { Exchange } from '@/types/exchangeTypes'
import { Image, Tooltip, Button, Popconfirm, Steps } from 'antd'
import { useState } from 'react'
import exChangeService from '@/services/exchange/exchange.service'
import toast from 'react-hot-toast'
import { useExchange } from '@/zustand/exchange'
import { IconCircleCheck, IconCircleDot, IconTruckDelivery } from '@tabler/icons-react'

export const Requester = ({ exchange }: { exchange: Exchange }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setExchange } = useExchange()

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

  return (
    <>
      <div className="flex flex-col gap-5 max-w-[500px]">
        {/* Requester */}
        <div className="flex flex-row items-center">
          <Avatar
            size={rem(50)}
            src={exchange?.requesterId?.avatar}
            alt={exchange?.requesterId?.firstname + ' ' + exchange?.requesterId?.lastname}
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-medium">
              {exchange?.requesterId?.firstname +
                ' ' +
                exchange?.requesterId?.lastname +
                ' (đề xuất trao đổi)'}
            </h1>
            <p className="text-sm text-gray-500">{exchange?.requesterId?.email}</p>
          </div>
        </div>
        <div className="flex flex-row justify-start items-start gap-2">
          <Image
            width={200}
            src={exchange?.requestProduct?.requesterProductId?.imgUrls?.[0]}
            alt={exchange?.requestProduct?.requesterProductId?.productName}
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
              title={exchange?.requestProduct?.requesterProductId?.productName}
              placement="top"
              color="#2f9e44"
              key={exchange?.requestProduct?.requesterProductId?._id}
            >
              <h1 className="text-2xl font-semibold text-green-800">
                {truncateText(exchange?.requestProduct?.requesterProductId?.productName, 20)}
              </h1>
            </Tooltip>
            <div className="flex items-center gap-2">
              <span>Màu sắc: </span>
              <p className="text-green-800 text-xl font-semibold">
                {exchange?.requestProduct?.colors}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>Size: </span>
              <p className="text-green-800 text-xl font-semibold">
                {exchange?.requestProduct?.size}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>Số lượng: </span>
              <p className="text-green-800 text-xl font-semibold">
                {exchange?.requestProduct?.amount}
              </p>
            </div>
            <div className="flex flex-row items-center whitespace-nowrap">
              <span>Ghi chú: </span>
              <p className="text-base ml-1">{truncateText(exchange?.note, 20)}</p>
            </div>
          </div>
        </div>
        {/* Status */}
        {/* <div>
          {exchange?.requesterExchangeStatus === 'pending' && (
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-lg font-medium">Trạng thái:</h1>
              <p className="text-base px-2 py-1 bg-yellow-500 text-white capitalize rounded-md shadow-sm">
                Đang chờ xử lý
              </p>
            </div>
          )}
          {exchange?.requesterExchangeStatus === 'canceled' && (
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-lg font-medium">Trạng thái:</h1>
              <p className="text-base px-2 py-1 bg-red-500 text-white capitalize rounded-md shadow-sm">
                Đã hủy
              </p>
            </div>
          )}
          {exchange?.requesterExchangeStatus === 'shipping' && (
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-lg font-medium">Trạng thái:</h1>
              <p className="text-base px-2 py-1 bg-blue-500 text-white capitalize rounded-md shadow-sm">
                Đang giao hàng
              </p>
            </div>
          )}
          {exchange?.requesterExchangeStatus === 'delivered' && (
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-lg font-medium">Trạng thái:</h1>
              <p className="text-base px-2 py-1 bg-green-500 text-white capitalize rounded-md shadow-sm">
                Đã hoàn thành
              </p>
            </div>
          )}
        </div> */}
        {/* Change status */}
        {exchange?.allExchangeStatus !== 'pending' && (
          <div className="flex flex-col justify-start items-center gap-4 max-w-[900px]">
            {exchange?.allExchangeStatus !== 'canceled' && (
              // <Stepper
              //   active={active}
              //   onStepClick={setActive}
              //   size="sm"
              //   iconSize={25}
              //   style={{
              //     maxWidth: '900px',
              //   }}
              // >
              //   <Stepper.Step
              //     label="Đang xử lý"
              //     disabled={
              //       exchange?.requestStatus?.exchangeStatus === 'canceled' ||
              //       exchange?.requestStatus?.exchangeStatus === 'completed' ||
              //       exchange?.requestStatus?.exchangeStatus === 'shipping'
              //     }
              //     icon={<IconifyIcon icon="system-uicons:box-open" />}
              //     completedIcon={<IconifyIcon icon="system-uicons:box" />}
              //     title="Đang xử lý"
              //   >
              //     <div className="w-full h-full bg-white shadow-sm rounded-sm">
              //       <div className="container mx-auto p-3 flex flex-col justify-start">
              //         <p className="text-base font-medium">Đơn hàng của bạn đã sẵn sàng ?</p>
              //         <div className="flex items-center gap-3 mt-2">
              //           <p className="text-xs ">
              //             (Cập nhật trạng thái đơn hàng của bạn thành đang giao)
              //           </p>
              //           <Button
              //             variant="solid"
              //             color="primary"
              //             onClick={() => handleUpdateStatus(exchange._id, 'shipping')}
              //             loading={isLoading}
              //           >
              //             Cập nhật
              //           </Button>
              //         </div>
              //         <Divider my="sm" />
              //         <div className="flex items-center justify-start gap-1 mt-2">
              //           <p className="text-sm ">Bạn muốn dừng trao đổi ?</p>
              //           <Popconfirm
              //             title="Bạn muốn dừng trao đổi ?"
              //             onConfirm={() => handleUpdateStatus(exchange._id, 'canceled')}
              //             showCancel={false}
              //             okText="Đồng ý"
              //           >
              //             <span className="text-sm underline text-red-500 cursor-pointer">Hủy</span>
              //           </Popconfirm>
              //         </div>
              //       </div>
              //     </div>
              //   </Stepper.Step>
              //   <Stepper.Step
              //     label="Đang giao"
              //     title="Đang giao"
              //     disabled={
              //       exchange?.requestStatus?.exchangeStatus === 'pending' ||
              //       exchange?.requestStatus?.exchangeStatus === 'canceled' ||
              //       exchange?.requestStatus?.exchangeStatus === 'completed'
              //     }
              //   >
              //     <div className="w-full h-full bg-white shadow-sm rounded-sm">
              //       <div className="container mx-auto p-3 flex flex-col justify-start gap-2">
              //         <p className="text-base font-medium">Bạn đã giao hàng cho người trao đổi ?</p>
              //         <div className="flex items-center gap-3 mt-2">
              //           <p className="text-xs ">
              //             (Cập nhật trạng thái đơn hàng của bạn thành đang giao)
              //           </p>
              //           <Button
              //             variant="solid"
              //             color="primary"
              //             onClick={() => handleUpdateStatus(exchange._id, 'completed')}
              //             loading={isLoading}
              //           >
              //             Cập nhật
              //           </Button>
              //         </div>
              //       </div>
              //     </div>
              //   </Stepper.Step>
              //   <Stepper.Step
              //     label="Hoàn thành"
              //     title="Đã hoàn thành"
              //     disabled={
              //       exchange?.requestStatus?.exchangeStatus === 'pending' ||
              //       exchange?.requestStatus?.exchangeStatus === 'shipping' ||
              //       exchange?.requestStatus?.exchangeStatus === 'canceled'
              //     }
              //   >
              //     <div className="container mx-auto p-3 w-full h-full bg-white shadow-sm rounded-sm flex justify-between items-center">
              //       <div className=" flex justify-start items-center gap-2">
              //         <p className="text-base font-medium">Hoàn thành trao đổi</p>
              //         <IconifyIcon
              //           icon="ic:round-check-box"
              //           style={{
              //             color: 'green',
              //           }}
              //         />
              //       </div>
              //       <p className="text-sm font-medium">Mời bạn đánh giá đối phương</p>
              //       <Button variant="solid" color="primary" onClick={() => setActive(3)}>
              //         Đánh giá
              //       </Button>
              //     </div>
              //   </Stepper.Step>
              //   <Stepper.Step label="Đánh giá">
              //     <div className="container mx-auto p-3 w-full h-full bg-white shadow-sm rounded-sm">
              //       <div className="flex flex-col justify-start gap-2">
              //         <p className="text-base font-medium">Đánh giá trao đổi</p>
              //       </div>
              //     </div>
              //   </Stepper.Step>
              // </Stepper>
              <>
                <Steps
                  direction="horizontal"
                  current={getCurrentStep(exchange?.requestStatus?.exchangeStatus)}
                  size="small"
                  status={
                    exchange?.requestStatus?.exchangeStatus === 'canceled' ? 'error' : undefined
                  }
                  items={[
                    {
                      title: 'Đang xử lý',
                      icon: <IconCircleDot />,
                      status: getStepStatus(exchange?.requestStatus?.exchangeStatus, 'pending'),
                    },
                    {
                      title: 'Đang giao',
                      icon: <IconTruckDelivery />,
                      status: getStepStatus(exchange?.requestStatus?.exchangeStatus, 'shipping'),
                    },
                    {
                      title: 'Hoàn thành',
                      icon: <IconCircleCheck />,
                      status: getStepStatus(exchange?.requestStatus?.exchangeStatus, 'completed'),
                    },
                  ]}
                />
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
                        <p className="text-sm ">Mời bạn đánh giá đối phương</p>
                        <Button variant="solid" color="primary">
                          Đánh giá
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {exchange?.requestStatus?.exchangeStatus === 'canceled' && (
              <p className="text-red-500 font-medium text-center">Đơn hàng đã bị hủy</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
