'use client'
import { Category, Brand } from '@/types/clientypes'
import { createContext, useState } from 'react'
import useSWR from 'swr'
import categoryService from '@/services/category/category.service'
import brandService from '@/services/brand/brand.service'
import { useCategory } from '@/zustand/category'

type ClientValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  categories: Category[] | null
  setCates: (value: Category[] | null) => void
  brands: Brand[] | null
  setBrands: (value: Brand[] | null) => void
}

const defaultProvider: ClientValuesType = {
  loading: false,
  setLoading: () => Boolean,
  categories: null,
  setCates: () => null,
  brands: null,
  setBrands: () => null,
}

const ClientContext = createContext(defaultProvider)

type Props = {
  children: React.ReactNode
}

const ClientProvider = ({ children }: Props) => {
  const [categories, setCates] = useState<Category[] | null>(defaultProvider.categories)
  const [brands, setBrands] = useState<Brand[] | null>(defaultProvider.brands)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
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

  const value = {
    loading,
    setLoading,
    categories,
    setCates,
    brands,
    setBrands,
  }

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}

export { ClientContext, ClientProvider }
