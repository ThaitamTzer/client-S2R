'use client'
import { useExchange } from '@/zustand/exchange'
import useSWR from 'swr'
import exChangeService from '@/services/exchange/exchange.service'
import { Tabs, Tooltip } from 'antd'
import { Avatar, rem } from '@mantine/core'
import IconifyIcon from '../icons'
import { ExchangeType } from '@/types/exchangeTypes'
import { ViewExchangeModal } from './viewExchange'

export const ExchangePage = () => {
  const { exchanges, setExchanges, setExchange, setOpenViewExchangeModal } = useExchange()

  useSWR('exchanges', exChangeService.getAll, {
    onSuccess: (data) => {
      setExchanges(data)
      console.log(data)
    },
    revalidateOnFocus: true,
  })

  const handleOpenViewExchangeModal = (exchange: ExchangeType) => {
    setExchange(exchange)
    setOpenViewExchangeModal(true)
  }

  return (
    <>
      <ViewExchangeModal />
      <div className="container mx-auto px-10">
        <div className="title text-black text-2xl font-semibold">
          <h2>Quản lý trao đổi</h2>
        </div>
        <Tabs
          items={[
            {
              key: '1',
              label: 'Yêu cầu trao đổi',
              children: (
                <>
                  <div className="container mx-auto px-1 mt-5">
                    <div className="card bg-white shadow-2xl rounded-md w-full h-auto p-3">
                      {exchanges?.map((exchange) => {
                        if (exchange.role === 'requester')
                          return (
                            <>
                              <Tooltip title="Click để xem chi tiết">
                                <div
                                  className="form p-5 m-2 flex justify-between rounded-sm items-center hover:bg-slate-100 hover:cursor-pointer"
                                  key={exchange._id}
                                  onClick={() => handleOpenViewExchangeModal(exchange)}
                                >
                                  <div className="flex flex-row items-center">
                                    <Avatar
                                      size={rem(50)}
                                      src={exchange?.requesterId.avatar}
                                      alt={
                                        exchange?.requesterId.firstname +
                                        ' ' +
                                        exchange?.requesterId.lastname
                                      }
                                    />
                                    <div className="flex flex-col ml-4">
                                      <h1 className="text-lg font-medium">
                                        {exchange?.requesterId.firstname +
                                          ' ' +
                                          exchange?.requesterId.lastname +
                                          ' (đề xuất trao đổi)'}
                                      </h1>
                                      <p className="text-sm text-gray-500">
                                        {exchange?.requesterId?.email}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <IconifyIcon
                                      icon="bi:arrow-right"
                                      className="text-2xl text-gray-500"
                                    />
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <Avatar
                                      size={rem(50)}
                                      src={exchange?.receiverId.avatar}
                                      alt={
                                        exchange?.receiverId.firstname +
                                        ' ' +
                                        exchange?.receiverId.lastname
                                      }
                                    />
                                    <div className="flex flex-col ml-4">
                                      <h1 className="text-lg font-medium">
                                        {exchange?.receiverId.firstname +
                                          ' ' +
                                          exchange?.receiverId.lastname +
                                          ' (người nhận đề xuất)'}
                                      </h1>
                                      <p className="text-sm text-gray-500">
                                        {exchange?.receiverId?.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Tooltip>
                            </>
                          )
                      })}
                    </div>
                  </div>
                </>
              ),
            },
            {
              key: '2',
              label: 'Nhận yêu cầu trao đổi',
              children: (
                <>
                  <div className="container mx-auto px-1 mt-5">
                    <div className="card bg-white shadow-2xl rounded-md w-full h-auto p-3">
                      {exchanges?.map((exchange) => {
                        if (exchange.role === 'receiver')
                          return (
                            <>
                              <Tooltip title="Click để xem chi tiết">
                                <div className="form p-5 m-2 flex justify-between rounded-sm items-center hover:bg-slate-100 hover:cursor-pointer">
                                  <div className="flex flex-row items-center">
                                    <Avatar
                                      size={rem(50)}
                                      src={exchange?.receiverId?.avatar}
                                      alt={
                                        exchange?.receiverId?.firstname +
                                        ' ' +
                                        exchange?.receiverId?.lastname
                                      }
                                    />
                                    <div className="flex flex-col ml-4">
                                      <h1 className="text-lg font-medium">
                                        {exchange?.receiverId?.firstname +
                                          ' ' +
                                          exchange?.receiverId?.lastname +
                                          ' (người nhận đề xuất)'}
                                      </h1>
                                      <p className="text-sm text-gray-500">
                                        {exchange?.receiverId?.email}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <IconifyIcon
                                      icon="bi:arrow-left"
                                      className="text-2xl text-gray-500"
                                    />
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <Avatar
                                      size={rem(50)}
                                      src={exchange?.requesterId?.avatar}
                                      alt={
                                        exchange?.requesterId?.firstname +
                                        ' ' +
                                        exchange?.requesterId?.lastname
                                      }
                                    />
                                    <div className="flex flex-col ml-4">
                                      <h1 className="text-lg font-medium">
                                        {exchange?.requesterId?.firstname +
                                          ' ' +
                                          exchange?.requesterId?.lastname +
                                          ' (đề xuất trao đổi)'}
                                      </h1>
                                      <p className="text-sm text-gray-500">
                                        {exchange?.requesterId?.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Tooltip>
                            </>
                          )
                      })}
                    </div>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
