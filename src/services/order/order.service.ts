import axiosClient from '@/lib/axios'
import { CreateOrderNow, Order, Orders, UpdateAddressOrder } from '@/types/orderTypes'

const orderService = {
  createOrder: async (success?: (res: any) => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.post('/api/orders').then((res) => success && success(res))
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  getAllOrders: (): Promise<Orders> => axiosClient.get('/api/orders'),

  getAllOrdersByUser: (): Promise<Orders> => axiosClient.get('/api/orders/user'),

  getOrderById: async (id: string): Promise<Order> => {
    const res = await axiosClient.get(`/api/orders/${id}`)

    return res.data
  },

  updateAddressOrder: async (
    id: string,
    data: UpdateAddressOrder,
    success?: (res: any) => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.patch(`/api/orders/${id}`, data).then((res) => success && success(res))
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  // Create order now
  createOrderNow: (data: CreateOrderNow) => axiosClient.post('/api/orders/create-now', data),

  cancelOrder: async (id: string, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.patch(`/api/orders/cancel/${id}`).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  changeStatusOrder: async (
    id: string,
    status: string,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.patch(`/api/orders/${id}`, { status }).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },
}

export default orderService
