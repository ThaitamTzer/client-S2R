'use client'
import { Category, Brand } from '@/types/clientypes'
import { createContext, useEffect, useState, useCallback } from 'react'
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
import { useMediaQuery } from '@mantine/hooks'
import attendService from '@/services/attend/attend.service'
import { useAttend } from '@/zustand/attend'
import { useWalletStore } from '@/zustand/wallet'
import walletService from '@/services/wallet/wallet.service'
import { ConfigType } from '@/types/config'
import configService from '@/services/config/config.service'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type ClientValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  categories: Category[] | null
  setCates: (value: Category[] | null) => void
  brands: Brand[] | null
  setBrands: (value: Brand[] | null) => void
  productsUser: Product[] | null
  isMobile: boolean | undefined
  config: ConfigType | null
  setConfig: (value: ConfigType | null) => void
  error: string | null
  refetchAll: () => Promise<void>
}

const defaultProvider: ClientValuesType = {
  loading: false,
  setLoading: () => Boolean,
  categories: null,
  setCates: () => null,
  brands: null,
  setBrands: () => null,
  productsUser: null,
  isMobile: false,
  config: null,
  setConfig: () => null,
  error: null,
  refetchAll: async () => {},
}

const ClientContext = createContext(defaultProvider)

type Props = {
  children: React.ReactNode
}

// Helper function để xử lý kết quả từ Promise.allSettled
const handleSettledResults = (results: PromiseSettledResult<any>[], labels: string[]) => {
  const errors: string[] = []
  const data: any[] = []
  let allFailed = true

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      data[index] = result.value
      allFailed = false
    } else {
      errors.push(`Lỗi khi tải ${labels[index]}: ${result.reason?.message || 'Không xác định'}`)
      data[index] = null
    }
  })

  return { data, errors, allFailed }
}

const ClientProvider = ({ children }: Props) => {
  const [categories, setCates] = useState<Category[] | null>(defaultProvider.categories)
  const [brands, setBrands] = useState<Brand[] | null>(defaultProvider.brands)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [config, setConfig] = useState<ConfigType | null>(defaultProvider.config)
  const [productsUser, setProductsUser] = useState<Product[] | null>(defaultProvider.productsUser)
  const [error, setError] = useState<string | null>(null)

  const { setCategories } = useCategory()
  const { setNotifications } = useNotificationStore()
  const { setListExchangeRev } = useExchange()
  const { setAttendances } = useAttend()
  const { setRooms } = useUserAction()
  const { setWallet } = useWalletStore()
  const { user } = useAuth()
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Fetch dữ liệu chung (không cần auth)
  const fetchPublicData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const results = await Promise.allSettled([
        categoryService.gellClientCategories(),
        brandService.getBrands(),
        configService.getConfig(),
      ])

      const { data, errors, allFailed } = handleSettledResults(results, ['danh mục', 'thương hiệu', 'cấu hình'])

      // Nếu tất cả đều lỗi, chuyển đến trang 502
      if (allFailed) {
        router.push('/502')
        return
      }

      // Set data even if some requests failed
      if (data[0]) {
        setCates(data[0])
        setCategories(data[0])
      }
      if (data[1]) {
        setBrands(data[1])
      }
      if (data[2]) {
        setConfig(data[2])
      }

      // Show errors if any
      if (errors.length > 0) {
        errors.forEach((err) => {
          toast.error(err)
        })
        setError(errors.join('\n'))
      }
    } catch {
      const errorMessage = 'Lỗi không xác định khi tải dữ liệu công khai'
      setError(errorMessage)
      toast.error(errorMessage)
      router.push('/502')
    } finally {
      setLoading(false)
    }
  }, [setCategories, router])

  // Fetch dữ liệu cần auth
  const fetchUserData = useCallback(async () => {
    if (!user) return

    setLoading(true)

    try {
      const results = await Promise.allSettled([
        productService.getAllProductUser(1, 999, '', '', ''),
        notificationService.getNotifications(),
        exChangeService.getAll(1, 10, '', 'receiver'),
        messageService.getRooms(),
        attendService.getAttend(),
        walletService.getWallet(),
      ])

      const { data, errors, allFailed } = handleSettledResults(results, [
        'sản phẩm',
        'thông báo',
        'trao đổi',
        'tin nhắn',
        'điểm danh',
        'ví',
      ])

      // Nếu tất cả đều lỗi, chuyển đến trang 502
      if (allFailed) {
        router.push('/502')
        return
      }

      // Set data even if some requests failed
      if (data[0]) {
        setProductsUser(data[0]?.data ?? null)
      }
      if (data[1]) {
        setNotifications(data[1])
      }
      if (data[2]) {
        setListExchangeRev(data[2]?.data || [])
      }
      if (data[3]) {
        setRooms(data[3] || [])
      }
      if (data[4]) {
        setAttendances(data[4]?.data?.attendances || [])
      }
      if (data[5]) {
        setWallet(data[5])
      }

      // Show errors if any
      if (errors.length > 0) {
        errors.forEach((err) => {
          toast.error(err)
        })
      }
    } catch {
      toast.error('Không thể tải dữ liệu người dùng')
      router.push('/502')
    } finally {
      setLoading(false)
    }
  }, [user, setNotifications, setListExchangeRev, setRooms, setAttendances, setWallet, router])

  // Refetch all data
  const refetchAll = useCallback(async () => {
    await Promise.all([fetchPublicData(), user ? fetchUserData() : Promise.resolve()])
  }, [fetchPublicData, fetchUserData, user])

  // Initial fetch public data
  useEffect(() => {
    fetchPublicData()
  }, [fetchPublicData])

  // Fetch user data when user changes
  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user, fetchUserData])

  const value = {
    loading,
    setLoading,
    categories,
    setCates,
    brands,
    setBrands,
    productsUser,
    isMobile,
    config,
    setConfig,
    error,
    refetchAll,
  }

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}

export { ClientContext, ClientProvider }
