import { formatPrice } from '@/helper/format'
import checkoutService, { Success } from '@/services/checkout/checkout.service'
import { OrderById } from '@/types/orderTypes'
import { Button } from '@mantine/core'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { useRouter } from 'next/navigation'

type InforPaymentProps = {
  order: OrderById
  paymentMethod: string
  setPayUrl: (value: string) => void
  classname?: string
}
export default function InforPayment({ order, paymentMethod, classname, setPayUrl }: InforPaymentProps) {
  const router = useRouter()
  const handleMomoPayment = async () => {
    if (!order.data.address || !order.data.phone) {
      toast.error('Vui lòng điền địa chỉ nhận hàng')
      return
    }
    if (paymentMethod === '1') {
      await checkoutService.codPayment(order.data._id, () => {
        toast.success('Đặt hàng thành công, chuyển hướng đến trang chi tiết đơn hàng')
        mutate(['/order/id', order.data._id])
        router.push(`/checkout/${order.data._id}?callback=orders-management`)
      })
    } else if (paymentMethod === '2') {
      await checkoutService.momoPayment(order.data._id, (res: Success) => {
        setPayUrl(res.response.payUrl)
      })
    } else if (paymentMethod === '3') {
      await checkoutService.walletPayment(
        order.data._id,
        () => {
          toast.success('Đặt hàng thành công, chuyển hướng đến trang chi tiết đơn hàng')
          mutate(['/order/id', order.data._id])
          router.push(`/checkout/${order.data._id}?callback=orders-management`)
        },
        (error) => {
          toast.error(error)
        },
      )
    }
  }
  return (
    <>
      <div className={`bg-white md:p-8 p-4 md:rounded-lg rounded-sm shadow-md ${classname} flex-col gap-4`}>
        <h1 className="md:text-2xl text-lg md:font-bold font-medium">Thông tin thanh toán</h1>
        <div className="w-full flex flex-col gap-2">
          <p className="md:text-lg text-base font-normal flex justify-between">
            Tổng tiền sản phẩm:{' '}
            <span className="font-semibold text-black">{formatPrice(order.summary.totalPrice) + 'đ'}</span>
          </p>
          <p className="md:text-lg text-sm font-normal flex justify-between">
            Phí vận chuyển:{' '}
            <span className="font-semibold text-black">{formatPrice(order.summary.totalShippingFee) + 'đ'}</span>
          </p>
          <p className="md:text-xl text-base font-normal flex justify-between">
            Tổng tiền thanh toán:{' '}
            <span className="font-semibold text-green-900">{formatPrice(order.data.totalAmount) + 'đ'}</span>
          </p>
        </div>
      </div>
      {/* nút mua */}
      <Button
        type="button"
        disabled={!order.data.address || !order.data.phone}
        onClick={handleMomoPayment}
        style={{
          backgroundColor: !order.data.address || !order.data.phone ? '#ccc' : '#16a34a',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '30px',
          width: '100%',
          height: '80px',
        }}
        className={`${classname} items-center justify-center`}
      >
        {paymentMethod === '1' ? 'Đặt hàng' : 'Thanh toán'}
      </Button>
    </>
  )
}
