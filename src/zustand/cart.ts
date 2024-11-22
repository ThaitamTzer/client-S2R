import { CartItem } from '@/types/cart'
import { create } from 'zustand'

type CartState = {
  cartItem: CartItem
  cartItems: CartItem[]
}

type CartActions = {
  setCartItem: (cartItem: CartItem) => void
  setCartItems: (cartItems: CartItem[]) => void
}

export const useCart = create<CartState & CartActions>((set) => ({
  cartItem: {} as CartItem,
  cartItems: [],
  setCartItem: (cartItem) => set({ cartItem }),
  setCartItems: (cartItems) => set({ cartItems }),
}))
