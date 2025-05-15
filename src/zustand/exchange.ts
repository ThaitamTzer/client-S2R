import { create } from 'zustand'
import { Exchange } from '@/types/exchangeTypes'
import { ProductsClient } from '@/types/users/productTypes'

interface ExchangeState {
  // State cho bảng yêu cầu trao đổi của bạn
  exchanges: Exchange[]
  setExchanges: (exchanges: Exchange[]) => void
  exchangeId: string
  setExchangeId: (id: string) => void
  openViewExchangeModal: boolean
  setOpenViewExchangeModal: (open: boolean) => void
  // State cho bảng yêu cầu trao đổi từ người khác
  exchangesRev: Exchange[]
  setExchangesRev: (exchanges: Exchange[]) => void
  exchangeIdRev: string
  setExchangeIdRev: (id: string) => void
  openViewExchangeModalRev: boolean
  setOpenViewExchangeModalRev: (open: boolean) => void
  // State chung
  openExchangeModal: boolean
  openLogin: boolean
  exchange: Exchange
  exchangeRev: Exchange
  openCreateExchangeModal: boolean
  data: { productId: string; size: string; colors: string; amount: string }
  product: ProductsClient
  openPopconfirmShipping: boolean
  openPopconfirmDelivered: boolean
  loading: boolean
  listExchange: Exchange[]
  listExchangeRev: Exchange[]
  // Actions
  toogleExchangeModal: () => void
  toogleLogin: () => void
  setExchange: (exchange: Exchange) => void
  setData: (data: { productId: string; size: string; colors: string; amount: string }) => void
  setProduct: (product: ProductsClient) => void
  setOpenPopconfirmShipping: (openPopconfirmShipping: boolean) => void
  setOpenPopconfirmDelivered: (openPopconfirmDelivered: boolean) => void
  updateExchange: (exchange: Exchange) => void
  setLoading: (loading: boolean) => void
  setExchangeRev: (exchangeRev: Exchange) => void
  setListExchange: (listExchange: Exchange[]) => void
  setListExchangeRev: (listExchangeRev: Exchange[]) => void
  setOpenCreateExchangeModal: (openCreateExchangeModal: boolean) => void
}

export const useExchange = create<ExchangeState>((set) => ({
  // State cho bảng yêu cầu trao đổi của bạn
  exchanges: [],
  setExchanges: (exchanges) => set({ exchanges }),
  exchangeId: '',
  setExchangeId: (id) => set({ exchangeId: id }),
  openViewExchangeModal: false,
  setOpenViewExchangeModal: (open) => set({ openViewExchangeModal: open }),
  // State cho bảng yêu cầu trao đổi từ người khác
  exchangesRev: [],
  setExchangesRev: (exchanges) => set({ exchangesRev: exchanges }),
  exchangeIdRev: '',
  setExchangeIdRev: (id) => set({ exchangeIdRev: id }),
  openViewExchangeModalRev: false,
  setOpenViewExchangeModalRev: (open) => set({ openViewExchangeModalRev: open }),
  // State chung
  openExchangeModal: false,
  openLogin: false,
  exchange: {} as Exchange,
  exchangeRev: {} as Exchange,
  openCreateExchangeModal: false,
  product: {} as ProductsClient,
  data: { productId: '', size: '', colors: '', amount: '' },
  openPopconfirmShipping: false,
  openPopconfirmDelivered: false,
  loading: false,
  listExchange: [],
  listExchangeRev: [],
  // Actions
  toogleExchangeModal: () => set((state) => ({ openExchangeModal: !state.openExchangeModal })),
  toogleLogin: () => set((state) => ({ openLogin: !state.openLogin })),
  setExchange: (exchange) => set({ exchange }),
  setData: (data) => set({ data }),
  setProduct: (product) => set({ product }),
  setOpenPopconfirmShipping: (openPopconfirmShipping) => set({ openPopconfirmShipping }),
  setOpenPopconfirmDelivered: (openPopconfirmDelivered) => set({ openPopconfirmDelivered }),
  updateExchange: (exchange) => set({ exchange }),
  setLoading: (loading) => set({ loading }),
  setExchangeRev: (exchangeRev) => set({ exchangeRev }),
  setListExchange: (listExchange) => set({ listExchange }),
  setListExchangeRev: (listExchangeRev) => set({ listExchangeRev }),
  setOpenCreateExchangeModal: (openCreateExchangeModal) => set({ openCreateExchangeModal }),
}))
