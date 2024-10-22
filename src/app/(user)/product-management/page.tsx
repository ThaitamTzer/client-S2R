'use client'

import React from 'react'
import { Suspense } from 'react'

import { DataTable } from '@/components/product-management/dataTable'
import { AddProduct } from '@/components/product-management/addProduct'
import { EditProduct } from '@/components/product-management/editProduct'
import { Alert } from '@/components/product-management/tabs/alert'
import { useProductManagement } from '@/zustand/productManagement'
import productService from '@/services/product/product.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { useSearchParams } from 'next/navigation'
import { ViewProductModal } from '@/components/product-management/viewProduct'

const ProductManagementPage = () => {
  const param = useSearchParams()

  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  const { toggleDeleteProductModal, openDeleteProductModal, product, setProduct } =
    useProductManagement()

  const handleDeleteProduct = async () => {
    try {
      await productService
        .deleteProduct(product._id)
        .then(() => {
          toast.success('Xóa sản phẩm thành công')
          toggleDeleteProductModal()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setProduct({} as any)
          mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
        })
        .catch(() => {
          toast.error('Xóa sản phẩm thất bại')
        })
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại')
      console.log(error)
    }
  }

  return (
    <div>
      <EditProduct />
      <ViewProductModal />
      <div className="title text-black text-2xl font-semibold">
        <h2>Quản lý sản phẩm</h2>
      </div>
      <div className="flex justify-end">
        <AddProduct />
        <Alert
          title="Xác nhận xóa"
          content="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          nameOk="Xóa"
          nameCancel="Hủy"
          onSubmit={handleDeleteProduct}
          onOpen={openDeleteProductModal}
          onClose={toggleDeleteProductModal}
        />
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <Suspense>
          <DataTable />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductManagementPage
