'use client'
import { useExchange } from '@/zustand/exchange'
import useSWR from 'swr'
import exChangeService from '@/services/exchange/exchange.service'
import { Tabs } from 'antd'
import { ViewExchangeModal } from './viewExchange'
import { TableDataReq } from './component/tableDataReq'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

export const ExchangePage = () => {
  const { setExchange, exchangeId, setLoading } = useExchange()

  useEffect(() => {
    if (exchangeId) {
      setLoading(true)
      exChangeService
        .getById(exchangeId)
        .then((data) => {
          if (data) {
            setExchange(data)
            setLoading(false)
          }
        })
        .catch(() => {
          toast.error('Lấy thông tin trao đổi thất bại')
          setLoading(false)
        })
    }
  }, [exchangeId])

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
              label: 'Yêu cầu trao đổi của bạn',
              children: (
                <>
                  <TableDataReq />
                </>
              ),
            },
            {
              key: '2',
              label: 'Yêu cầu trao đổi từ người khác',
              children: <></>,
            },
          ]}
        />
      </div>
    </>
  )
}
