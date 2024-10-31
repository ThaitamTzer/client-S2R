'use client'
import { Drawer, Divider, Image as AntdImage, Button, Tooltip, notification } from 'antd'
import { useExchange } from '@/zustand/exchange'
import { useAuth } from '@/hooks/useAuth'
import { Login } from './login'
import exChangeService from '@/services/exchange/exchange.service'
import useSWR, { mutate } from 'swr'
import { Avatar, rem } from '@mantine/core'
import IconifyIcon from '../icons'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const ExChangeDrawer = () => {
  const { user } = useAuth()
  const { openExchangeModal, toogleExchangeModal, listExchange, setListExchange } = useExchange()
  const param = useSearchParams()
  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const filterUserIds = param.getAll('filterUserId')

  const { data, mutate: refresh } = useSWR('listExchange', () =>
    exChangeService.getAll(1, 1000, ''),
  )

  useEffect(() => {
    if (data) {
      setListExchange(data.data)
    }
  }, [data, setListExchange])

  const [api, contextHolder] = notification.useNotification()

  if (!user) {
    return <Login open={openExchangeModal} close={toogleExchangeModal} />
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const handleAcceptExchange = (exchangeId: string) => {
    exChangeService
      .approve(exchangeId, 'accepted')
      .then(async () => {
        api.success({
          message: 'Chấp nhận trao đổi thành công',
          placement: 'topLeft',
        })
        setTimeout(() => {
          refresh()
          mutate(['exchangesRev', page, limit, ...filterUserIds])
          mutate(['exchanges', page, limit, ...filterUserIds])
        }, 1000)
      })
      .catch(() => {
        api.error({
          message: 'Chấp nhận trao đổi thất bại',
          description: 'Vui lòng thử lại sau',
          placement: 'topLeft',
        })
      })
  }

  const handleRejectExchange = (exchangeId: string) => {
    exChangeService
      .approve(exchangeId, 'rejected')
      .then(async () => {
        api.success({
          message: 'Từ chối trao đổi thành công',
          placement: 'topLeft',
        })
        setTimeout(() => {
          refresh()
          mutate(['exchangesRev', page, limit, ...filterUserIds])
          mutate(['exchanges', page, limit, ...filterUserIds])
        }, 1000)
      })
      .catch(() => {
        api.error({
          message: 'Từ chối trao đổi thất bại',
          description: 'Vui lòng thử lại sau',
          placement: 'topLeft',
        })
      })
  }

  return (
    <>
      {contextHolder}
      <Drawer
        title="Các sản phẩm trao đổi"
        placement="right"
        width={800}
        onClose={toogleExchangeModal}
        open={openExchangeModal}
      >
        <div className="container mx-auto">
          <div className="w-full">
            <div className="text-center text-3xl font-medium text-green-900">
              <h1>Danh sách các sản phẩm trao đổi</h1>
            </div>
            <div className="flex flex-col justify-between">
              {[...(listExchange || [])]?.reverse()?.map((exchange) => {
                if (exchange.role === 'receiver')
                  return (
                    <>
                      <Divider
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          marginTop: 10,
                        }}
                      />
                      <div className="flex flex-col items-start my-4">
                        <div className="flex flex-row items-center">
                          <Avatar
                            size={rem(50)}
                            src={exchange?.requesterId.avatar}
                            alt={
                              exchange?.requesterId.firstname + ' ' + exchange?.requesterId.lastname
                            }
                          />
                          <div className="flex flex-col ml-4">
                            <h1 className="text-lg font-medium">
                              {exchange?.requesterId.firstname +
                                ' ' +
                                exchange?.requesterId.lastname +
                                ' (đề xuất trao đổi)'}
                            </h1>
                            <p className="text-sm text-gray-500">{exchange?.requesterId?.email}</p>
                          </div>
                        </div>
                        <p className="mt-3">Sản phẩm muốn trao đổi: </p>
                        <div className="flex justify-between items-center w-full">
                          <div className="flex flex-row items-start justify-between gap-3">
                            <div className="relative h-full min-h-[120px] max-h-[120px] my-2 overflow-hidden ">
                              <AntdImage
                                src={exchange?.requestProduct?.requesterProductId.imgUrls[0]}
                                alt={exchange?.requestProduct?.requesterProductId.productName}
                                width={100}
                                height={120}
                                style={{
                                  objectFit: 'cover',
                                  width: '100%',
                                  height: '100%',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  borderRadius: 10,
                                  border: '1px solid #000',
                                }}
                              />
                            </div>
                            <div className="p-3">
                              <h1 className="text-base text-green-800 font-medium">
                                {truncateText(
                                  exchange?.requestProduct?.requesterProductId.productName,
                                  20,
                                )}
                              </h1>
                              <div className="flex items-center gap-2">
                                <p>Size: </p>
                                <p className="text-base text-green-800 font-medium">
                                  {exchange?.requestProduct?.size}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p>Màu sắc: </p>
                                <p className="text-base text-green-800 font-medium">
                                  {exchange?.requestProduct?.size}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p>Số lượng: </p>
                                <p className="text-base text-green-800 font-medium">
                                  {exchange?.requestProduct?.amount}
                                </p>
                              </div>
                            </div>
                          </div>
                          {exchange?.allExchangeStatus === 'pending' && (
                            <div className="flex flex-col gap-2">
                              <Tooltip title="Chấp nhận">
                                <Button
                                  type="primary"
                                  icon={<IconifyIcon icon="iconamoon:check-bold" />}
                                  onClick={() => handleAcceptExchange(exchange._id)}
                                />
                              </Tooltip>
                              <Tooltip placement="bottom" title="Từ chối">
                                <Button
                                  danger
                                  icon={<IconifyIcon icon="iconamoon:close-bold" />}
                                  onClick={() => handleRejectExchange(exchange._id)}
                                />
                              </Tooltip>
                            </div>
                          )}
                          {exchange?.allExchangeStatus === 'accepted' && (
                            <div className="">
                              <p className="text-green-800 font-medium text-base py-1 px-2 bg-green-200 rounded-sm">
                                Đã chấp nhận
                              </p>
                            </div>
                          )}
                          {exchange?.allExchangeStatus === 'rejected' && (
                            <div className="">
                              <p className="text-red font-medium text-base py-1 px-2 bg-red-200 rounded-sm">
                                Đã từ chối
                              </p>
                            </div>
                          )}
                          {exchange?.allExchangeStatus === 'completed' && (
                            <div className="">
                              <p className="text-blue font-medium text-base py-1 px-2 bg-blue-200 rounded-sm">
                                Hoàn thành
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <Divider />
                    </>
                  )
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default ExChangeDrawer
