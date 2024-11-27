import axiosClient from '@/lib/axios'
import { CreateOrderNow, OrderById, Orders, UpdateAddressOrder } from '@/types/orderTypes'
import { SellType } from '@/types/sellType'

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

  getAllOrdersByUser: (): Promise<SellType> => axiosClient.get('/api/orders/get-order-for-seller'),

  getOrderById: async (id: string): Promise<OrderById> => {
    const res: OrderById = await axiosClient.get(`/api/orders/${id}`)

    return res
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
  createOrderNow: async (
    data: CreateOrderNow,
    success?: (res: any) => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.post('/api/orders/create-now', data).then((res) => success && success(res))
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

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
      return await axiosClient
        .patch(`/api/orders/update-status-for-sell/${id}`, { status })
        .then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  deleteSubOrder: async (subOrderId: string, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.delete(`/api/orders/${subOrderId}`).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },
  deleteOrderProduct: async (
    subOrderId: string,
    orderItemId: string,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.delete(`/api/orders/${subOrderId}/${orderItemId}`).then(() => success && success())
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
