import { Order, OrderById, SubOrder } from '@/types/orderTypes'
import { Sell } from '@/types/sellType'
import { create } from 'zustand'

type OrderState = {
  orders: Order[]
  order: OrderById
  openChangeAddressModal: boolean
  idOrder: string
  address: string
  phone: string
  subOrder: SubOrder
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }
  openDetailModal: boolean
  sell: Sell
}

type OrderActions = {
  setOrders: (orders: Order[]) => void
  setOrder: (order: OrderById) => void
  toggleChangeAddressModal: () => void
  setIdOrder: (idOrder: string) => void
  setAddress: (address: string) => void
  setPhone: (phone: string) => void
  setSubOrder: (subOrder: SubOrder) => void
  setSummary: (summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }) => void
  toggleDetailModal: () => void
  setSell: (sell: Sell) => void
}

export const useOrderStore = create<OrderState & OrderActions>((set) => ({
  orders: [],
  order: {} as OrderById,
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
  subOrder: {} as SubOrder,
  openDetailModal: false,
  sell: {} as Sell,
  setOrders: (orders) => set({ orders }),
  setOrder: (order) => set({ order }),
  toggleChangeAddressModal: () => set((state) => ({ openChangeAddressModal: !state.openChangeAddressModal })),
  setIdOrder: (idOrder) => set({ idOrder }),
  setAddress: (address) => set({ address }),
  setPhone: (phone) => set({ phone }),
  setSubOrder: (subOrder) => set({ subOrder }),
  setSummary: (summary) => set({ summary }),
  toggleDetailModal: () => set((state) => ({ openDetailModal: !state.openDetailModal })),
  setSell: (sell) => set({ sell }),
}))
