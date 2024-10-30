'use client'
import { Modal } from 'antd'
import { useExchange } from '@/zustand/exchange'
import IconifyIcon from '../icons'
import { Requester } from './component/requester'
import { Receiver } from './component/receiver'

export const ViewExchangeModal = () => {
  const {
    openViewExchangeModal,
    setOpenViewExchangeModal,
    exchange,
    setOpenPopconfirmDelivered,
    setOpenPopconfirmShipping,
    setExchangeId,
    loading,
  } = useExchange()

  const onClose = () => {
    setOpenViewExchangeModal(false)
    setOpenPopconfirmDelivered(false)
    setOpenPopconfirmShipping(false)
    setExchangeId('')
  }

  if (exchange)
    return (
      <Modal
        centered
        title={
          <>
            <h2 className="font-medium text-2xl mb-2">Chi tiết trao đổi</h2>
          </>
        }
        open={openViewExchangeModal}
        onCancel={onClose}
        getContainer={false}
        footer={false}
        loading={loading}
        width="95%"
      >
        <>
          <div className="flex flex-row justify-between items-start gap-1 h-full">
            <Requester exchange={exchange} />
            <div className="h-full flex flex-col justify-center items-center">
              {/* <div className='absolute top-0 left-0 right-0 bottom-0'></div> */}
              <div className="flex flex-col justify-center items-center max-h-full min-h-[300px]">
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
