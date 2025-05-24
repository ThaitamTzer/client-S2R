'use client'

import { OrderById } from '@/types/orderTypes'
import Image from 'next/image'
import { Radio, Stack } from '@mantine/core'
import { useWalletStore } from '@/zustand/wallet'
import dynamic from 'next/dynamic'
import { useClient } from '@/hooks/useClient'

const ProductInfor = dynamic(() => import('./productInfor'), { ssr: false })
const InforPayment = dynamic(() => import('./inforPayment'), { ssr: false })

export default function ProductPayment({
  order,
  paymentMethod,
  setPaymentMethod,
  setPayUrl,
}: {
  order: OrderById
  paymentMethod: string
  setPaymentMethod: (value: string) => void
  setPayUrl: (value: string) => void
}) {
  const { wallet } = useWalletStore()
  const { config } = useClient()

  const enablePoint = () => {
    if (order.data.totalAmount >= 50000 || wallet.point < order.data.totalAmount / (config?.valueToPoint ?? 1)) {
      return true
    }
    return false
  }

  return (
    <div className="md:w-2/3 w-full flex flex-col gap-4 ">
      {/* Sản phẩm thanh toán */}
      <ProductInfor order={order} />
      {/* Hình thức thanh toán */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="md:text-2xl text-lg font-bold">2. Chọn hình thức thanh toán</h1>
        <div className="w-full">
          <Radio.Group name="paymentMethod" withAsterisk value={paymentMethod} onChange={setPaymentMethod}>
            <Stack mt="xs">
              <Radio
                size="lg"
                color="green"
                value="1"
                disabled={!config?.paymentMethod.CODPayment}
                label={
                  <div className="flex flex-row gap-3 items-start">
                    <Image
                      className="md:w-8 md:h-8 w-6 h-6"
                      src="/misc/cod-icon.svg"
                      alt="cod"
                      width={30}
                      height={30}
                      loading="lazy"
                      quality={70}
                    />
                    <p className="text-sm md:text-lg font-semibold">Thanh toán khi nhận hàng</p>
                    {config?.paymentMethod.CODPayment ? '' : ' (Không khả dụng)'}
                  </div>
                }
              />
              <Radio
                size="lg"
                color="green"
                value="2"
                disabled={!config?.paymentMethod.momoPayment}
                label={
                  <div className="flex flex-row gap-3 items-start">
                    <Image
                      className="md:w-8 md:h-8 w-6 h-6"
                      src="/misc/momo-icon.svg"
                      alt="momo"
                      width={30}
                      height={30}
                      loading="lazy"
                      quality={70}
                    />
                    <p className="text-sm md:text-lg font-semibold">
                      Cổng thanh toán điện tử MOMO (QR code, Visa, Mastercard, JCB)
                      {config?.paymentMethod.momoPayment ? '' : ' (Không khả dụng)'}
                    </p>
                  </div>
                }
              />
              <Radio
                size="lg"
                color="green"
                value="3"
                disabled={!config?.paymentMethod.bonusPayment || enablePoint()}
                label={
                  <div className="flex flex-row gap-3 items-start">
                    <Image
                      className="md:w-8 md:h-8 w-6 h-6"
                      src="/misc/latest.png"
                      alt="point"
                      width={30}
                      height={30}
                      loading="lazy"
                      quality={70}
                    />
                    <p className="text-sm md:text-lg font-semibold">Thanh toán bằng kim cương</p>
                    {config?.paymentMethod.bonusPayment ? '' : ' (Không khả dụng)'}
                  </div>
                }
              />
              {config?.paymentMethod.bonusPayment && (
                <>
                  {wallet.point < order.data.totalAmount / (config?.valueToPoint ?? 1) && (
                    <p className="text-red-500">Số kim cương của bạn không đủ để thanh toán đơn hàng này</p>
                  )}
                  {order.data.totalAmount >= 50000 && (
                    <p className="text-red-500">Đơn hàng trên 50.000đ không thể thanh toán bằng kim cương</p>
                  )}
                </>
              )}
            </Stack>
          </Radio.Group>
        </div>
      </div>
      <InforPayment order={order} paymentMethod={paymentMethod} setPayUrl={setPayUrl} classname="md:hidden flex" />
    </div>
  )
}
