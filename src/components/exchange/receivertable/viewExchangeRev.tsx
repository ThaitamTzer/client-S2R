'use client'
import { Modal } from 'antd'
import { useExchange } from '@/zustand/exchange'
import IconifyIcon from '../../icons'
import { Requester } from '../component/requester'
import { Receiver } from '../component/receiver'

export const ViewExchangeModalRev = () => {
  const {
    openViewExchangeModalRev,
    setOpenViewExchangeModalRev,
    exchangeRev,
    setOpenPopconfirmDelivered,
    setOpenPopconfirmShipping,
    setExchangeIdRev,
    loading,
  } = useExchange()

  const onClose = () => {
    setOpenViewExchangeModalRev(false)
    setOpenPopconfirmDelivered(false)
    setOpenPopconfirmShipping(false)
    setExchangeIdRev('')
  }

  const statusConfig = {
    pending: {
      label: 'Đang chờ xử lý',
      bgColor: 'bg-yellow-500',
    },
    canceled: {
      label: 'Đã hủy',
      bgColor: 'bg-red-500',
    },
    accepted: {
      label: 'Đã chấp nhận',
      bgColor: 'bg-blue-500',
    },
    completed: {
      label: 'Đã hoàn thành',
      bgColor: 'bg-green-500',
    },
    rejected: {
      label: 'Đã từ chối',
      bgColor: 'bg-red-800',
    },
  }

  if (exchangeRev)
    return (
      <Modal
        centered
        title={
          <>
            <h2 className="font-medium text-2xl mb-2">Chi tiết trao đổi</h2>
          </>
        }
        open={openViewExchangeModalRev}
        onCancel={onClose}
        getContainer={false}
        footer={false}
        loading={loading}
        width="95%"
      >
        <>
          <div className="flex flex-row justify-between items-start gap-1 h-full">
            <Receiver exchange={exchangeRev} />
            <div className="h-full flex flex-col justify-center items-center">
              {/* <div className='absolute top-0 left-0 right-0 bottom-0'></div> */}
              <div className="flex flex-col justify-center items-center max-h-full min-h-[300px]">
                <IconifyIcon icon="bi:arrow-right" className="text-2xl text-gray-500" />
                {exchangeRev?.allExchangeStatus && (
                  <div className="flex flex-row items-center gap-3">
                    <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                    <p
                      className={`text-base px-2 py-1 ${statusConfig[exchangeRev.allExchangeStatus].bgColor} text-white capitalize rounded-md shadow-sm`}
                    >
                      {statusConfig[exchangeRev.allExchangeStatus].label}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Requester exchange={exchangeRev} />
          </div>
        </>
      </Modal>
    )
}
