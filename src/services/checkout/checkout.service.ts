import axiosClient from '@/lib/axios'

export type Success = {
  message: string
  response: {
    partnerCode: string
    orderId: string
    requestId: string
    amount: number
    responseTime: number
    message: string
    resultCode: number
    payUrl: string
    shortLink: string
  }
}

const checkoutService = {
  momoPayment: async (orderId: string, success?: (res: any) => void, error?: (err: any) => void) => {
    try {
      return await axiosClient.post(`/api/checkout/momo/${orderId}`).then((res) => success && success(res))
    } catch (err) {
      if (err) {
        if (error) {
          error(err)
        }
      }
    }
  },
}

export default checkoutService
