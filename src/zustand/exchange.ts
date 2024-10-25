import { create } from 'zustand'
import { ExchangeType } from '@/types/exchangeTypes'
import { ProductsClient } from '@/types/users/productTypes'

type State = {
  openExchangeModal: boolean
  openLogin: boolean
  exchanges: ExchangeType[]
  exchange: ExchangeType
  openViewExchangeModal: boolean
  openCreateExchangeModal: boolean
  data: { productId: string; size: string; colors: string; amount: string }
  product: ProductsClient
}

type Actions = {
  toogleExchangeModal: () => void
  toogleLogin: () => void
  setExchange: (exchange: ExchangeType) => void
  setExchanges: (exchanges: ExchangeType[]) => void
  setOpenViewExchangeModal: (openViewExchangeModal: boolean) => void
  setOpenCreateExchangeModal: (openCreateExchangeModal: boolean) => void
  setData: (data: { productId: string; size: string; colors: string; amount: string }) => void
  setProduct: (product: ProductsClient) => void
}

export const useExchange = create<State & Actions>((set) => ({
  openExchangeModal: false,
  openLogin: false,
  exchanges: [],
  exchange: {} as ExchangeType,
  openViewExchangeModal: false,
  openCreateExchangeModal: false,
  product: {} as ProductsClient,
  data: { productId: '', size: '', colors: '', amount: '' },
  toogleExchangeModal: () => set((state) => ({ openExchangeModal: !state.openExchangeModal })),
  toogleLogin: () => set((state) => ({ openLogin: !state.openLogin })),
  setExchange: (exchange) => set({ exchange }),
  setExchanges: (exchanges) => set({ exchanges }),
  setOpenCreateExchangeModal: (openCreateExchangeModal) => set({ openCreateExchangeModal }),
  setOpenViewExchangeModal: (openViewExchangeModal) => set({ openViewExchangeModal }),
  setData: (data) => set({ data }),
  setProduct: (product) => set({ product }),
}))
