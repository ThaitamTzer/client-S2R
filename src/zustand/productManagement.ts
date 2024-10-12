import { create } from "zustand";
import { Product } from "@/types/users/productTypes";

type State = {
  openAddProductModal: boolean;
  openEditProductModal: boolean;
  openDeleteProductModal: boolean;
  openUploadImageModal: boolean;
  products: Product[];
  product: Product;
};

type Actions = {
  toggleAddProductModal: () => void;
  toggleEditProductModal: () => void;
  toggleDeleteProductModal: () => void;
  toggleUploadImageModal: () => void;
  setProducts: (products: Product[]) => void;
  setProduct: (product: Product) => void;
};

export const useProductManagement = create<State & Actions>((set) => ({
  openAddProductModal: false,
  openEditProductModal: false,
  openDeleteProductModal: false,
  openUploadImageModal: false,
  products: [],
  product: {} as Product,

  toggleAddProductModal: () =>
    set((state) => ({ openAddProductModal: !state.openAddProductModal })),
  toggleEditProductModal: () =>
    set((state) => ({ openEditProductModal: !state.openEditProductModal })),
  toggleDeleteProductModal: () =>
    set((state) => ({ openDeleteProductModal: !state.openDeleteProductModal })),
  toggleUploadImageModal: () =>
    set((state) => ({ openUploadImageModal: !state.openUploadImageModal })),
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
}));
