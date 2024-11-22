import { Order } from '@/types/orderTypes'
import { create } from 'zustand'

type OrderState = {
  orders: Order[]
  order: Order
  openChangeAddressModal: boolean
  idOrder: string
  address: string
  phone: string
}

type OrderActions = {
  setOrders: (orders: Order[]) => void
  setOrder: (order: Order) => void
  toggleChangeAddressModal: () => void
  setIdOrder: (idOrder: string) => void
  setAddress: (address: string) => void
  setPhone: (phone: string) => void
}

export const useOrderStore = create<OrderState & OrderActions>((set) => ({
  orders: [],
  order: {} as Order,
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
}))
