'use client'

import { useProductClient } from '@/zustand/productClient'
import { notification } from 'antd'
import { ScrollArea, Drawer, Divider, Button } from '@mantine/core'
import useSWR from 'swr'
import cartService from '@/services/cart/cart.service'
import { useCart } from '@/zustand/cart'
import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import orderService from '@/services/order/order.service'
import IconifyIcon from '../icons'
import toast from 'react-hot-toast'

const CartItem = dynamic(() => import('./cartItem'), { ssr: false })

export default function CartDrawer() {
  const { openCartDrawer, toggleCartDrawer } = useProductClient()
  const { setCartItems, cartItems } = useCart()
  const [total, setTotal] = useState(0)
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification()

  const { mutate } = useSWR('/api/cart', cartService.getCart, {
    onSuccess: (data) => {
      setCartItems(data.data)
      setTotal(data.data.length)
    },
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handleDeleteCartItem = (id: string) => {
    cartService
      .deleteCartItem(id)
      .then(() => {
        mutate()
        api.success({
          message: 'Xóa sản phẩm thành công',
          placement: 'top',
        })
      })
      .catch(() => {
        api.error({
          message: 'Đã xãy ra lỗi, vui lòng thử lại!',
          placement: 'top',
        })
      })
  }

  const handleSubmit = () => {
    orderService.createOrder(
      async (res) => {
        toast.success('Đặt hàng thành công')
        toggleCartDrawer()
        router.push(`/checkout/${res.order._id}`)
        await Promise.all(cartItems.map((item) => cartService.deleteCartItem(item._id)))
        mutate()
      },
      (message) => {
        if (message) {
          toast.error(message)
        }
      },
    )
  }

  return (
    <>
      {contextHolder}
      <Drawer.Root
        opened={openCartDrawer}
        onClose={toggleCartDrawer}
        size="30%"
        position="right"
        scrollAreaComponent={ScrollArea.Autosize}
        className="cgscgcjhscasjcsc"
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <h3 className="text-green-900 text-xl font-semibold flex flex-row items-center gap-2">
                {total > 0 && <IconifyIcon icon="mynaui:cart-solid" className="text-green-900 w-10 h-10" />}
                {total === 0 && <IconifyIcon icon="mynaui:cart" className="text-green-900 w-10 h-10" />}
                {total > 0 && <span className="text-green-900 text-xl font-semibold">{total} đơn hàng</span>}
                {total === 0 && <span className="text-green-900 text-xl font-semibold">Giỏ hàng trống</span>}
              </h3>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Divider mb="md" />
          <Drawer.Body>
            <div className="container mx-auto p-1 w-full flex flex-col space-y-3">
              {total > 0 &&
                cartItems.map((item) => (
                  <CartItem key={item._id} item={item} handleDeleteCartItem={handleDeleteCartItem} />
                ))}

              {cartItems.length === 0 && (
                <div className="flex flex-col justify-center items-center w-full h-full">
                  <div className="w-[200px] h-[200px] flex items-center justify-start">
                    <Image src="/empty-cart.svg" alt="empty-cart" width={200} height={200} />
                  </div>
                  <p className="text-green-900 text-lg font-semibold">Không có sản phẩm nào trong giỏ hàng</p>
                </div>
              )}
            </div>
          </Drawer.Body>
          {total > 0 && (
            <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3">
              <Button onClick={handleSubmit} type="submit" className="w-full bg-green-900 text-white">
                Tiến hành thanh toán
              </Button>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Root>
    </>
  )
}
