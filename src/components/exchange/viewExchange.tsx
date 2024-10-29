import { Modal } from 'antd'
import { useExchange } from '@/zustand/exchange'
import { ExchangeType } from '@/types/exchangeTypes'
import IconifyIcon from '../icons'
import { Requester } from './component/requester'
import { Receiver } from './component/receiver'
// import { useState } from 'react'
// import exChangeService from '@/services/exchange/exchange.service'
// import { mutate } from 'swr'
// import toast from 'react-hot-toast'

export const ViewExchangeModal = () => {
  const {
    openViewExchangeModal,
    setOpenViewExchangeModal,
    exchange,
    setExchange,
    setOpenPopconfirmDelivered,
    setOpenPopconfirmShipping,
  } = useExchange()
  // const [loading, setLoading] = useState(false)

  const onClose = () => {
    setOpenViewExchangeModal(false)
    setExchange({} as ExchangeType)
    setOpenPopconfirmDelivered(false)
    setOpenPopconfirmShipping(false)
  }

  // const onFinish = () => {
  //   setLoading(true)
  //   exChangeService
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     .update(exchange?._id, status as any)
  //     .then(() => {
  //       mutate('exchanges')
  //       setLoading(false)
  //       setStatus('')
  //       toast.success('Cập nhật trạng thái trao đổi thành công')
  //     })
  //     .catch(() => {
  //       setLoading(false)
  //       toast.error('Cập nhật trạng thái trao đổi thất bại')
  //     })
  // }

  return (
    <Modal
      centered
      title={
        <>
          <h2 className="font-medium text-2xl mb-2 text-center">Chi tiết trao đổi</h2>
        </>
      }
      open={openViewExchangeModal}
      onCancel={onClose}
      footer={false}
      width="90%"
      destroyOnClose
    >
      <>
        <div className="flex flex-row justify-between items-start gap-1">
          <Requester exchange={exchange} />
          <div>
            <div className="flex flex-col justify-center items-center">
              <IconifyIcon icon="bi:arrow-right" className="text-2xl text-gray-500" />
              {exchange?.allExchangeStatus === 'pending' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-yellow-500 text-white capitalize rounded-md shadow-sm">
                    Đang chờ xử lý
                  </p>
                </div>
              )}
              {exchange?.allExchangeStatus === 'canceled' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-red-500 text-white capitalize rounded-md shadow-sm">
                    Đã hủy
                  </p>
                </div>
              )}
              {exchange?.allExchangeStatus === 'accepted' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-blue-500 text-white capitalize rounded-md shadow-sm">
                    Đã chấp nhận
                  </p>
                </div>
              )}
              {exchange?.allExchangeStatus === 'completed' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-green-500 text-white capitalize rounded-md shadow-sm">
                    Đã hoàn thành
                  </p>
                </div>
              )}
              {exchange?.allExchangeStatus === 'rejected' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-red-800 text-white capitalize rounded-md shadow-sm">
                    Đã từ chối
                  </p>
                </div>
              )}
            </div>
          </div>
          <Receiver exchange={exchange} />
        </div>
      </>
    </Modal>
  )
}
