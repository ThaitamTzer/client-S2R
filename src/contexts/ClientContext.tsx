'use client'
import { Category, Brand } from '@/types/clientypes'
import { createContext, useState } from 'react'
import useSWR from 'swr'
import categoryService from '@/services/category/category.service'
import brandService from '@/services/brand/brand.service'
import { useCategory } from '@/zustand/category'
import { Product } from '@/types/users/productTypes'
import productService from '@/services/product/product.service'

type ClientValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  categories: Category[] | null
  setCates: (value: Category[] | null) => void
  brands: Brand[] | null
  setBrands: (value: Brand[] | null) => void
  productsUser: Product[] | null
}

const defaultProvider: ClientValuesType = {
  loading: false,
  setLoading: () => Boolean,
  categories: null,
  setCates: () => null,
  brands: null,
  setBrands: () => null,
  productsUser: null,
}

const ClientContext = createContext(defaultProvider)

type Props = {
  children: React.ReactNode
}

const ClientProvider = ({ children }: Props) => {
  const [categories, setCates] = useState<Category[] | null>(defaultProvider.categories)
  const [brands, setBrands] = useState<Brand[] | null>(defaultProvider.brands)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [productsUser, setProductsUser] = useState<Product[] | null>(defaultProvider.productsUser)
  const { setCategories } = useCategory()

  useSWR('/api/category/list-category-client', categoryService.gellClientCategories, {
    onLoadingSlow: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setCates(data)
      setCategories(data)
      setLoading(false)
    },
  })

  useSWR('/api/brand/list-brand-client', brandService.getBrands, {
    onLoadingSlow: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setBrands(data)
      setLoading(false)
    },
  })

  useSWR('productsUser', () => productService.getAllProductUser(1, 999, '', '', ''), {
    onLoadingSlow: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setProductsUser(data.data)
      setLoading(false)
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 10000,
    errorRetryCount: 3,
  })

  const value = {
    loading,
    setLoading,
    categories,
    setCates,
    brands,
    setBrands,
    productsUser,
    setProductsUser,
  }

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}

export { ClientContext, ClientProvider }
