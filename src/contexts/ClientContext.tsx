'use client'
import { Category, Brand } from '@/types/clientypes'
import { createContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import categoryService from '@/services/category/category.service'
import brandService from '@/services/brand/brand.service'
import { useCategory } from '@/zustand/category'
import { Product } from '@/types/users/productTypes'
import productService from '@/services/product/product.service'
import { useNotificationStore } from '@/zustand/notification'
import notificationService from '@/services/notification/notification.service'
import { useAuth } from '@/hooks/useAuth'
import exChangeService from '@/services/exchange/exchange.service'
import { useExchange } from '@/zustand/exchange'
import messageService from '@/services/message/message.service'
import { useUserAction } from '@/zustand/user'
import { useSocket } from '@/hooks/useSocket'

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
  const { setNotifications } = useNotificationStore()
  const { setListExchangeRev } = useExchange()
  const { setRooms, RoomId, setMessages } = useUserAction()
  const { user } = useAuth()
  const { socket } = useSocket()

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

  useSWR('/api/messages/get-room', messageService.getRooms, {
    onSuccess: (data) => {
      setRooms(data)
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 10000,
    errorRetryCount: 3,
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
      setProductsUser(data?.data)
      setLoading(false)
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 10000,
    errorRetryCount: 3,
  })

  useEffect(() => {
    if (user) {
      notificationService.getNotifications().then((data) => {
        setNotifications(data)
      })
      exChangeService.getAll(1, 10, '', 'receiver').then((data) => {
        setListExchangeRev(data?.data)
      })
    }
  }, [user])

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
