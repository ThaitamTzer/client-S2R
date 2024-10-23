import { Product, ProductsClient } from '@/types/users/productTypes'
import { create } from 'zustand'

type State = {
  productsPropose: Product[]
  product: Product
  products: ProductsClient[]
}

type Actions = {
  setProductsPropose: (products: Product[]) => void
  setProduct: (product: Product) => void
  setProducts: (products: ProductsClient[]) => void
}

export const useProductClient = create<State & Actions>((set) => ({
  productsPropose: [],
  product: {} as Product,
  products: [],

  setProductsPropose: (products) => set({ productsPropose: products }),
  setProduct: (product) => set({ product }),
  setProducts: (products) => set({ products }),
}))
