import { Order } from '@/types/orderTypes'
import { create } from 'zustand'

type OrderState = {
  orders: Order[]
  order: Order
  openChangeAddressModal: boolean
  idOrder: string
  address: string
  phone: string
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }
}

type OrderActions = {
  setOrders: (orders: Order[]) => void
  setOrder: (order: Order) => void
  toggleChangeAddressModal: () => void
  setIdOrder: (idOrder: string) => void
  setAddress: (address: string) => void
  setPhone: (phone: string) => void
  setSummary: (summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }) => void
}

export const useOrderStore = create<OrderState & OrderActions>((set) => ({
  orders: [],
  order: {} as Order,
  summary: {
    totalAmount: 0,
    totalTypes: 0,
    totalPrice: 0,
    totalShippingFee: 0,
  },
  openChangeAddressModal: false,
  idOrder: '',
  address: '',
  phone: '',
  setOrders: (orders) => set({ orders }),
  setOrder: (order) => set({ order }),
  toggleChangeAddressModal: () => set((state) => ({ openChangeAddressModal: !state.openChangeAddressModal })),
  setIdOrder: (idOrder) => set({ idOrder }),
  setAddress: (address) => set({ address }),
  setPhone: (phone) => set({ phone }),
  setSummary: (summary) => set({ summary }),
}))
