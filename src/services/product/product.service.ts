import axiosClient, { axiosUpload } from '@/lib/axios'
import {
  ProductType,
  Product,
  addProduct,
  ProductSClientList,
  ProductsPropose,
} from '@/types/users/productTypes'

const productService = {
  getAllProductUser: async (
    page?: number,
    limit?: number,
    searchKey?: string,
    sortField?: string,
    sortOrder?: string,
  ): Promise<ProductType> => {
    const params = {
      ...(page && { page }),
      ...(limit && { limit }),
      ...(searchKey && { searchKey }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    }
    const res: ProductType = await axiosClient.get('/api/product/list-product-of-user', {
      params,
    })

    return res
  },

  getAllProdClient: async (page?: number, limit?: number): Promise<ProductSClientList> => {
    const params = {
      ...(page && { page }),
      ...(limit && { limit }),
    }
    const res: ProductSClientList = await axiosClient.get('/api/product/list-product-for-client', {
      params,
    })

    return res
  },

  // ** Get Product user will like
  getProductUserWillLike: async (): Promise<ProductsPropose> => {
    const res: ProductsPropose = await axiosClient.get('/api/product/propose')

    return res
  },

  addProduct: async (data: addProduct) => {
    const res = await axiosClient.post('/api/product', data)

    return res.data
  },

  editProduct: async (productId: string, values: Product) => {
    const res = await axiosClient.put(`/api/product/${productId}`, values)

    return res.data
  },

  editStatus: async (productId: string, status: boolean) => {
    const res = await axiosUpload.patch(`/api/product/update-status/${productId}`, {
      status,
    })

    return res.data
  },

  deleteProduct: async (productId: string) => {
    const res = await axiosUpload.delete(`/api/product/${productId}`)

    return res.data
  },

  // ** Upload Image
  uploadImage: async (productId: string, data: FormData) => {
    const res = await axiosUpload.post(`/api/product/upload-images/${productId}`, data)
    return res.data
  },

  // ** Delete Image
  deleteImage: async (productId: string, publicIds: string[]) => {
    const res = await axiosClient.patch(`/api/product/delete-images/${productId}`, {
      publicIds,
    })

    return res.data
  },
}

export default productService
