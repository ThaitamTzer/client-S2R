'use client'

import { OrderById } from '@/types/orderTypes'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import IconifyIcon from '../../icons'
import { Divider, Popover, ActionIcon } from '@mantine/core'
import { useOrderStore } from '@/zustand/order'
import { Descriptions } from 'antd'
import { useCheckoutStore } from '@/zustand/checkout'
import { useGetName } from '@/helper/getName'
import orderService from '@/services/order/order.service'
import { mutate } from 'swr'
import toast from 'react-hot-toast'

type ProductInforProps = {
  order: OrderById
}

export default function ProductInfor({ order }: ProductInforProps) {
  const { toggleEdit, toggleEditNote } = useCheckoutStore()
  const { setIdOrder, setSubOrder } = useOrderStore()
  const { getColorName } = useGetName()
  const isMobile = window.innerWidth < 768

  const handleDeleteSubOrder = async (subOrderId: string) => {
    await orderService.deleteSubOrder(
      subOrderId,
      () => {
        mutate(['/order/id', order.data._id])
        toast.success('Xóa đơn hàng thành công')
      },
      () => {
        toast.error('Xóa đơn hàng thất bại, vui lòng liên hệ với chúng tôi qua mail')
      },
    )
  }

  const handleDeleteOrderProduct = async (subOrderId: string, productId: string) => {
    await orderService.deleteOrderProduct(
      subOrderId,
      productId,
      () => {
        mutate(['/order/id', order.data._id])
        toast.success('Xóa sản phẩm thành công')
      },
      () => {
        toast.error('Xóa sản phẩm thất bại, vui lòng liên hệ với chúng tôi qua mail')
      },
    )
  }

  return (
    <div className="bg-white p-4 md:p-8 md:rounded-lg rounded-sm shadow-md w-full">
      <h1 className="md:text-2xl text-lg font-medium  md:font-bold">1. Sản phẩm thanh toán</h1>
      <div className="w-full">
        {/* make a table */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="md:col-span-4 col-span-1"></th>
              <th className="text-gray-500 md:text-lg md:font-normal text-[12px] font-extralight">Số lượng</th>
              <th className="text-gray-500 md:text-lg md:font-normal text-[12px] font-extralight">Thành tiền</th>
              <th className="text-gray-500 md:text-lg md:font-normal text-[12px] font-extralight">Hủy bỏ</th>
            </tr>
          </thead>
          <tbody>
            {order.data.subOrders.map((subOrder) => (
              <>
                <tr className="bg-white">
                  <td colSpan={1} className="py-2 ">
                    <div className="flex md:flex-row flex-col gap-2 md:items-center">
                      <span className="md:text-base text-xs">Người bán:</span>
                      <span className="flex flex-row gap-2 items-center">
                        <Image
                          src={subOrder.sellerId.avatar}
                          alt={subOrder.sellerId.firstname + ' ' + subOrder.sellerId.lastname}
                          width={25}
                          height={25}
                          loading="lazy"
                          quality={70}
                          className="rounded-full md:w-8 md:h-8 w-6 h-6"
                        />
                        <p className="text-xs font-semibold md:text-base md:font-medium">
                          {subOrder.sellerId.firstname + ' ' + subOrder.sellerId.lastname}
                        </p>
                      </span>
                    </div>
                  </td>
                  <td colSpan={2}></td>
                  <td className="text-center py-4">
                    <button onClick={() => handleDeleteSubOrder(subOrder._id)} className="text-red-500">
                      <IconifyIcon icon="iconamoon:trash" className="w-6 h-6 text-red-900" />
                    </button>
                  </td>
                </tr>
                {subOrder.products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="flex flex-row md:gap-4 gap-2">
                        <div className="md:w-[90px] md:h-[130px] w-[40px] h-[50px] relative rounded-md overflow-hidden">
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
                        <div className="flex flex-col gap-3 max-w-[140px] md:max-w-[320px]">
                          <div className="text-[11px] md:text-lg text-green-900 font-semibold text-wrap">
                            {product.productName}
                          </div>
                          <div>
                            <p className="text-[10px] md:text-md">Kích thước: {product.size}</p>
                            <p className="text-[10px] md:text-md">Màu sắc: {getColorName(product.color)}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 md:text-base text-[11px] ">{product.quantity}</td>
                    <td className="text-center py-4 md:text-base text-[11px] ">{formatPrice(product.price) + 'đ'}</td>
                    <td className="text-center py-4 md:text-base text-[11px] ">
                      <button
                        onClick={() => handleDeleteOrderProduct(subOrder._id, product._id)}
                        className="text-red-500"
                      >
                        <IconifyIcon icon="iconamoon:trash" className="w-6 h-6 text-red-900" />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-gray-200">
                  <td colSpan={4}>
                    <Descriptions
                      bordered
                      size="small"
                      column={2}
                      style={{
                        borderRadius: '0px',
                      }}
                      labelStyle={{
                        fontSize: '12px',
                        margin: '5px',
                        padding: '5px',
                        width: '170px',
                      }}
                      contentStyle={{
                        minHeight: '80px',
                        padding: '12px',
                        minWidth: '150px',
                      }}
                      items={[
                        {
                          label: <p className="md:text-[12px] text-[10px]">Mã đơn hàng</p>,
                          span: 2,
                          children: <p className="text-black font-semibold text-sm">{subOrder.subOrderUUID}</p>,
                        },
                        {
                          label: <p className="md:text-[12px] text-[10px]">Phương thức vận chuyển</p>,
                          span: isMobile ? 2 : 1,
                          children: (
                            <div className="h-full flex flex-col justify-between">
                              <div>
                                {subOrder.shippingService === 'GHN' && (
                                  <>
                                    <p className="text-black font-bold text-xs md:text-sm">Giao hàng nhanh</p>
                                    <p className="text-black font-normal text-[10px] md:text-xs">Standard Express</p>
                                    <p className="text-black font-normal text-[10px] md:text-xs">
                                      Nhận hàng trong 1-3 ngày
                                    </p>
                                    <p className="text-black font-normal text-[10px] md:text-xs flex flex-row gap-1 items-center">
                                      <span>Xem cách tính đơn giá vận chuyển</span>
                                      <Popover>
                                        <Popover.Target>
                                          <ActionIcon variant="transparent" size="xs">
                                            <IconifyIcon icon="mingcute:information-line" className="w-4 h-4" />
                                          </ActionIcon>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                          <p className="text-black font-normal text-[10px] md:text-xs">
                                            Nội tỉnh: Không quá 3kg, giá giao hàng 22.000đ, mỗi 0,5kg tiếp theo tính
                                            2.500đ
                                          </p>
                                          <p className="text-black font-normal text-[10px] md:text-xs">
                                            Liên tỉnh: Không quá 0.3kg (300gram), giá giao hàng 30.000đ, mỗi 0,5kg tiếp
                                            theo tính 5.000đ
                                          </p>
                                        </Popover.Dropdown>
                                      </Popover>
                                    </p>
                                  </>
                                )}
                                {subOrder.shippingService === 'GHTK' && (
                                  <>
                                    <p className="text-black font-bold text-sm">Giao hàng tiết kiệm</p>
                                    <p className="text-black font-normal text-[10px] md:text-xs">Standard Express</p>
                                    <p className="text-black font-normal text-[10px] md:text-xs">
                                      Nhận hàng trong 3-5 ngày
                                    </p>
                                    <p className="text-black font-normal text-[10px] md:text-xs flex flex-row gap-1 items-center">
                                      <span>Xem cách tính đơn giá vận chuyển</span>
                                      <Popover>
                                        <Popover.Target>
                                          <ActionIcon variant="transparent" size="xs">
                                            <IconifyIcon icon="mingcute:information-line" className="w-4 h-4" />
                                          </ActionIcon>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                          <p className="text-black font-normal text-[10px] md:text-xs">
                                            Nội tỉnh: Không quá 3kg, giá giao hàng 15.000đ, mỗi 0,5kg tiếp theo tính
                                            2.500đ
                                          </p>
                                          <p className="text-black font-normal text-[10px] md:text-xs">
                                            Liên tỉnh: Không quá 0.5kg (500gram), giá giao hàng 29.000đ, mỗi 0,5kg tiếp
                                            theo tính 5.000đ
                                          </p>
                                        </Popover.Dropdown>
                                      </Popover>
                                    </p>
                                  </>
                                )}
                                {subOrder.shippingService === 'agreement' && (
                                  <>
                                    <p className="text-black font-bold text-sm">Theo thỏa thuận</p>
                                  </>
                                )}
                              </div>
                              <p
                                className="text-green-900 text-xs underline mt-auto cursor-pointer"
                                onClick={() => {
                                  toggleEdit()
                                  setIdOrder(subOrder._id)
                                  setSubOrder(subOrder)
                                }}
                              >
                                Thay đổi
                              </p>
                            </div>
                          ),
                        },
                        {
                          label: <p className="md:text-[12px] text-[10px]">Phí vận chuyển</p>,
                          span: isMobile ? 2 : 1,
                          children: (
                            <div className="h-full flex items-center">
                              <p className="text-black font-semibold text-sm">
                                {formatPrice(subOrder.shippingFee) + 'đ'}
                              </p>
                            </div>
                          ),
                        },
                        {
                          label: '',
                          span: isMobile ? 0 : 1,
                          className: 'hidden md:table-cell',
                          contentStyle: {
                            display: isMobile ? 'none' : 'table-cell',
                          },
                          children: <p className="text-black font-semibold text-sm text-right "></p>,
                        },
                        {
                          label: <p className="md:text-[12px] text-[10px]">Tổng tiền các sản phẩm</p>,
                          span: isMobile ? 2 : 1,
                          children: (
                            <p className="text-black font-semibold text-sm  ">{formatPrice(subOrder.subTotal) + 'đ'}</p>
                          ),
                        },
                        {
                          label: <p className="md:text-[12px] text-[10px]">Ghi chú</p>,
                          span: 2,
                          children: (
                            <div className="w-full flex justify-between items-center">
                              <p className="text-black font-normal text-sm">{subOrder.note}</p>
                              <p
                                className="text-green-900 text-xs underline mt-auto cursor-pointer"
                                onClick={() => {
                                  toggleEditNote()
                                  setIdOrder(subOrder._id)
                                  setSubOrder(subOrder)
                                }}
                              >
                                Thay đổi
                              </p>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row gap-2 items-center justify-end mt-4">
          <p className="text-black">Tổng loại: {order.summary.totalTypes}</p>
          <p className="text-black">Tổng số lượng: {order.summary.totalAmount}</p>
        </div>
        <Divider my="md" />
        <p className="text-green-900 text-center">
          <IconifyIcon icon="icon-park-outline:information" className="w-6 h-6" />
          <span>
            Bạn có thể hủy đơn hàng khi đơn hàng đang ở trạng thái chờ xử lý. Đơn hàng sẽ không thể hủy sau khi đơn hàng
            được giao cho đơn vị vận chuyển.
          </span>
        </p>
      </div>
    </div>
  )
}
