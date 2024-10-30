import { create } from 'zustand'
import { Exchange } from '@/types/exchangeTypes'
import { ProductsClient } from '@/types/users/productTypes'

type State = {
  openExchangeModal: boolean
  openLogin: boolean
  exchanges: Exchange[]
  exchange: Exchange
  openViewExchangeModal: boolean
  openCreateExchangeModal: boolean
  data: { productId: string; size: string; colors: string; amount: string }
  product: ProductsClient
  openPopconfirmShipping: boolean
  openPopconfirmDelivered: boolean
  exchangeId: string
  loading: boolean
}

type Actions = {
  toogleExchangeModal: () => void
  toogleLogin: () => void
  setExchange: (exchange: Exchange) => void
  setExchanges: (exchanges: Exchange[]) => void
  setOpenViewExchangeModal: (openViewExchangeModal: boolean) => void
  setOpenCreateExchangeModal: (openCreateExchangeModal: boolean) => void
  setData: (data: { productId: string; size: string; colors: string; amount: string }) => void
  setProduct: (product: ProductsClient) => void
  setOpenPopconfirmShipping: (openPopconfirmShipping: boolean) => void
  setOpenPopconfirmDelivered: (openPopconfirmDelivered: boolean) => void
  updateExchange: (exchange: Exchange) => void
  setExchangeId: (exchangeId: string) => void
  setLoading: (loading: boolean) => void
}

export const useExchange = create<State & Actions>((set) => ({
  openExchangeModal: false,
  openLogin: false,
  exchanges: [],
  exchange: {} as Exchange,
  openViewExchangeModal: false,
  openCreateExchangeModal: false,
  product: {} as ProductsClient,
  data: { productId: '', size: '', colors: '', amount: '' },
  openPopconfirmShipping: false,
  openPopconfirmDelivered: false,
  exchangeId: '',
  loading: false,
  toogleExchangeModal: () => set((state) => ({ openExchangeModal: !state.openExchangeModal })),
  toogleLogin: () => set((state) => ({ openLogin: !state.openLogin })),
  setExchange: (exchange) => set({ exchange }),
  setExchanges: (exchanges) => set({ exchanges }),
  setOpenCreateExchangeModal: (openCreateExchangeModal) => set({ openCreateExchangeModal }),
  setOpenViewExchangeModal: (openViewExchangeModal) => set({ openViewExchangeModal }),
  setData: (data) => set({ data }),
  setProduct: (product) => set({ product }),
  setOpenPopconfirmShipping: (openPopconfirmShipping) => set({ openPopconfirmShipping }),
  setOpenPopconfirmDelivered: (openPopconfirmDelivered) => set({ openPopconfirmDelivered }),
  updateExchange: (exchange) => set({ exchange }),
  setExchangeId: (exchangeId) => set({ exchangeId }),
  setLoading: (loading) => set({ loading }),
}))
