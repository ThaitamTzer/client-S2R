'use client'

import { Order } from '@/types/orderTypes'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import { useGetName } from '@/helper/getName'
import IconifyIcon from '../icons'
import { Button, Radio, Stack } from '@mantine/core'
import { useState } from 'react'
import { useOrderStore } from '@/zustand/order'
import checkoutService, { Success } from '@/services/checkout/checkout.service'
import NavigateToMomo from './navigateToMomo'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutPage({ order }: { order: Order }) {
  const { getColorName } = useGetName()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback')
  const [checked, setChecked] = useState('2')
  const [paymentMethod, setPaymentMethod] = useState('2')
  const { toggleChangeAddressModal, setIdOrder, setAddress, setPhone } = useOrderStore()
  const [payUrl, setPayUrl] = useState('')
  const renderDeliveryContent = () => {
    if (checked === '1') {
      return (
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-lg font-semibold">Địa chỉ cửa hàng:</p>
          <p className="text-md">123 Đường ABC, Quận XYZ, TP.HCM</p>
          <p className="text-md">Thời gian: 8h00 - 22h00 các ngày trong tuần</p>
        </div>
      )
    }

    if (checked === '2') {
      return (
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-lg font-semibold">Thời gian giao hàng dự kiến từ 2 - 7 ngày</p>
          <div className="flex flex-row items-center gap-3">
            <p className="text-lg font-semibold text-green-900">22.000đ</p>
            <div className="w-16 h-10 relative">
              <Image
                src="/misc/giao-hang-nhanh-icon.png"
                alt="delivery"
                width={70}
                height={70}
                loading="lazy"
                quality={70}
                className="object-cover absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="w-16 h-10 relative">
              <Image
                src="/misc/vn-post-icon.png"
                alt="delivery"
                width={70}
                height={70}
                loading="lazy"
                quality={70}
                className="object-cover absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )
    }
  }

  const handleMomoPayment = async () => {
    if (!order.address || !order.phone) {
      toast.error('Vui lòng điền địa chỉ nhận hàng')
      return
    }
    await checkoutService.momoPayment(order._id, (res: Success) => {
      setPayUrl(res.response.payUrl)
    })
  }

  console.log(order)

  return (
    <>
      <NavigateToMomo payUrl={payUrl} setPayUrl={setPayUrl} />
      <div className="container mx-auto px-2 md:px-36 py-10 md:pt-20">
        {callback === 'orders-management' && (
          <Link
            href="/orders-management"
            className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center"
          >
            <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" /> Quay lại trang đơn hàng của bạn
          </Link>
        )}

        <div className="flex flex-row justify-between space-x-6">
          <div className="w-2/3 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">1. Sản phẩm thanh toán</h1>
              <div className="w-full">
                {/* make a table */}
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="col-span-4"></th>
                      <th className="text-gray-500 text-lg font-normal">Số lượng</th>
                      <th className="text-gray-500 text-lg font-normal">Thành tiền</th>
                      <th className="text-gray-500 text-lg font-normal">Hủy bỏ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.subOrders.map((subOrder) =>
                      subOrder.products.map((product) => (
                        <tr key={product._id} className="border-b border-gray-200">
                          <td className="py-4">
                            <div className="flex flex-row gap-4">
                              <div className="w-[90px] h-[130px] relative rounded-md overflow-hidden">
                                <Image
                                  src={product.productId.imgUrls[0]}
                                  alt={product.productName}
                                  width={100}
                                  height={100}
                                  loading="lazy"
                                  quality={70}
                                  className="object-cover absolute top-0 left-0 w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col gap-3 max-w-[320px]">
                                <div className="text-lg text-green-900 font-semibold text-wrap">
                                  {product.productName}
                                </div>
                                <div>
                                  <p className="text-md">Kích thước: {product.size}</p>
                                  <p className="text-md">Màu sắc: {getColorName(product.color)}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-4">{product.quantity}</td>
                          <td className="text-center py-4">{formatPrice(product.price) + 'đ'}</td>
                          <td className="text-center py-4">
                            <button className="text-red-500">
                              <IconifyIcon icon="iconamoon:trash" className="w-6 h-6 text-red-900" />
                            </button>
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">2. Chọn hình thức vận chuyển</h1>
              <div className="w-full">
                <div className="flex flex-col space-y-4">
                  <Radio.Group name="deliveryMethod" withAsterisk value={checked} onChange={setChecked}>
                    <Stack mt="xs">
                      <Radio size="lg" color="green" value="1" label="Nhận hàng tại cửa hàng" />
                      <Radio size="lg" color="green" value="2" label="Giao hàng tận nơi" />
                    </Stack>
                  </Radio.Group>
                  {renderDeliveryContent()}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">3. Chọn hình thức thanh toán</h1>
              <div className="w-full">
                <Radio.Group name="paymentMethod" withAsterisk value={paymentMethod} onChange={setPaymentMethod}>
                  <Stack mt="xs">
                    <Radio
                      disabled
                      size="lg"
                      color="green"
                      value="1"
                      label={
                        <div className="flex flex-row gap-3 items-center">
                          <Image
                            src="/misc/cod-icon.svg"
                            alt="cod"
                            width={30}
                            height={30}
                            loading="lazy"
                            quality={70}
                          />
                          <p className="text-lg font-semibold">Thanh toán khi nhận hàng</p>
                        </div>
                      }
                    />
                    <Radio
                      size="lg"
                      color="green"
                      value="2"
                      label={
                        <div className="flex flex-row gap-3 items-center">
                          <Image
                            src="/misc/momo-icon.svg"
                            alt="momo"
                            width={30}
                            height={30}
                            loading="lazy"
                            quality={70}
                          />
                          <p className="text-lg font-semibold">Thanh toán qua ví điện tử Momo</p>
                        </div>
                      }
                    />
                  </Stack>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <div className="bg-white p-8  rounded-lg shadow-md flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Địa chỉ nhận hàng</h1>
              <div className="w-full flex flex-col gap-2">
                <p className="text-xl font-semibold">{order.userId.firstname + ' ' + order.userId.lastname}</p>
                {order.address && order.phone ? (
                  <>
                    <p className="text-xl">{order.phone}</p>
                    <p className="text-xl text-wrap max-w-full">{order.address}</p>
                    <div className="flex flex-row justify-end ">
                      <span
                        onClick={() => {
                          toggleChangeAddressModal()
                          setIdOrder(order._id)
                          setAddress(order.address)
                          setPhone(order.phone)
                        }}
                        className="text-md text-gray-500 cursor-pointer hover:text-green-900"
                      >
                        Sửa địa chỉ nhận hàng
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      style={{
                        backgroundColor: '#16a34a',
                        color: '#fff',
                      }}
                      onClick={() => {
                        toggleChangeAddressModal()
                        setIdOrder(order._id)
                      }}
                    >
                      Điền địa chỉ nhận hàng
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Thông tin thanh toán</h1>
              <div className="w-full flex flex-col gap-2">
                <p className="text-xl font-normal flex justify-between">
                  Tổng tiền hàng:{' '}
                  <span className="font-semibold text-green-900">{formatPrice(order.totalAmount) + 'đ'}</span>
                </p>
                <p className="text-xl font-normal flex justify-between">
                  Phí vận chuyển: <span className="font-semibold text-green-900">22.000đ</span>
                </p>
                <p className="text-xl font-normal flex justify-between">
                  Tổng tiền thanh toán:{' '}
                  <span className="font-semibold text-green-900">{formatPrice(order.totalAmount + 22000) + 'đ'}</span>
                </p>
              </div>
            </div>
            <Button
              type="button"
              disabled={!order.address || !order.phone}
              onClick={handleMomoPayment}
              style={{
                backgroundColor: !order.address || !order.phone ? '#ccc' : '#16a34a',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '30px',
                width: '100%',
                height: '80px',
              }}
            >
              Đặt mua
            </Button>
            {(!order.address || !order.phone) && (
              <p className="text-red-500 text-center">Vui lòng điền địa chỉ nhận hàng</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
