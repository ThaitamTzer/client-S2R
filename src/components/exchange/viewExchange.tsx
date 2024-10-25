import { Modal, Form, Image, Tooltip, Select, Button } from 'antd'
import { useExchange } from '@/zustand/exchange'
import { Avatar, rem } from '@mantine/core'
import { ExchangeType } from '@/types/exchangeTypes'
import IconifyIcon from '../icons'
import { truncateText } from '@/helper/format'
import { useState } from 'react'
import exChangeService from '@/services/exchange/exchange.service'
import { mutate } from 'swr'
import toast from 'react-hot-toast'

export const ViewExchangeModal = () => {
  const { openViewExchangeModal, setOpenViewExchangeModal, exchange, setExchange } = useExchange()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const onClose = () => {
    setOpenViewExchangeModal(false)
    setExchange({} as ExchangeType)
  }

  const onFinish = () => {
    setLoading(true)
    exChangeService
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(exchange?._id, status as any)
      .then(() => {
        mutate('exchanges')
        setLoading(false)
        setStatus('')
        toast.success('Cập nhật trạng thái trao đổi thành công')
      })
      .catch(() => {
        setLoading(false)
        toast.error('Cập nhật trạng thái trao đổi thất bại')
      })
  }

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
    >
      <>
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col gap-5">
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
                src={exchange?.requestProduct?.requesterProductId.imgUrls?.[0]}
                alt={exchange?.requestProduct?.requesterProductId.productName}
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
                  title={exchange?.requestProduct?.requesterProductId.productName}
                  placement="top"
                  color="#2f9e44"
                  key={exchange?.requestProduct?.requesterProductId._id}
                >
                  <h1 className="text-2xl font-semibold text-green-800">
                    {truncateText(exchange?.requestProduct?.requesterProductId.productName, 20)}
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
              </div>
            </div>
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
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-lg font-medium">Ghi chú:</h1>
              <p className="text-base">{exchange?.note}</p>
            </div>
            <Form
              form={form}
              initialValues={{
                status: exchange?.requesterExchangeStatus,
              }}
              onFinish={onFinish}
              size="large"
              layout="vertical"
            >
              <Form.Item label="Cập nhật trạng thái" name="status">
                <Select
                  placeholder="Chọn trạng thái"
                  style={{ width: '100%' }}
                  onChange={(value) => {
                    setStatus(value)
                    form.setFieldsValue({ status: value })
                  }}
                  options={[
                    {
                      label: 'Đang chờ xử lý',
                      value: 'pending',
                      disabled:
                        exchange?.requesterExchangeStatus === 'pending' ||
                        exchange?.requesterExchangeStatus === 'shipping' ||
                        exchange?.requesterExchangeStatus === 'delivered' ||
                        exchange?.requesterExchangeStatus === 'canceled',
                    },
                    {
                      label: 'Đang giao hàng',
                      value: 'shipping',
                      disabled:
                        exchange?.requesterExchangeStatus === 'shipping' ||
                        exchange?.requesterExchangeStatus === 'delivered' ||
                        exchange?.requesterExchangeStatus === 'canceled',
                    },
                    {
                      label: 'Đã hoàn thành',
                      value: 'delivered',
                      disabled:
                        exchange?.requesterExchangeStatus === 'delivered' ||
                        exchange?.requesterExchangeStatus === 'canceled' ||
                        exchange?.requesterExchangeStatus === 'pending',
                    },
                    {
                      label: 'Đã hủy',
                      value: 'canceled',
                      disabled:
                        exchange?.requesterExchangeStatus === 'canceled' ||
                        exchange?.requesterExchangeStatus === 'delivered' ||
                        exchange?.requesterExchangeStatus === 'pending' ||
                        exchange?.requesterExchangeStatus === 'shipping',
                    },
                  ]}
                />
              </Form.Item>
              {status && (
                <Form.Item rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Cập nhật trạng thái
                  </Button>
                </Form.Item>
              )}
            </Form>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center">
              <IconifyIcon icon="bi:arrow-right" className="text-2xl text-gray-500" />
              {exchange?.exchangeStatus === 'pending' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-yellow-500 text-white capitalize rounded-md shadow-sm">
                    Đang chờ xử lý
                  </p>
                </div>
              )}
              {exchange?.exchangeStatus === 'canceled' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-red-500 text-white capitalize rounded-md shadow-sm">
                    Đã hủy
                  </p>
                </div>
              )}
              {exchange?.exchangeStatus === 'accepted' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-blue-500 text-white capitalize rounded-md shadow-sm">
                    Đã chấp nhận
                  </p>
                </div>
              )}
              {exchange?.exchangeStatus === 'completed' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-green-500 text-white capitalize rounded-md shadow-sm">
                    Đã hoàn thành
                  </p>
                </div>
              )}
              {exchange?.exchangeStatus === 'rejected' && (
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-lg font-medium">Trạng thái đơn hàng:</h1>
                  <p className="text-base px-2 py-1 bg-red-800 text-white capitalize rounded-md shadow-sm">
                    Đã từ chối
                  </p>
                </div>
              )}
            </div>
          </div>
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
          </div>
        </div>
      </>
    </Modal>
  )
}
