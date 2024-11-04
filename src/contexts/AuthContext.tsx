'use client'

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import Cookies from 'js-cookie'

// ** Next Import
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// ** Axios
import axiosClient from '@/lib/axios'

// ** Config
import authConfig from '@/config/auth'

import { useLoginModal } from '@/zustand/loginModal'
import { useProductManagement } from '@/zustand/productManagement'
import { useExchange } from '@/zustand/exchange'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, RegisterParams } from '@/contexts/types'
import { useNotificationStore } from '@/zustand/notification'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  forgetPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  getProfile: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const { setProducts } = useProductManagement()
  const { setExchanges, setListExchange, setExchangesRev, setListExchangeRev } = useExchange()
  const { closeModal } = useLoginModal()
  const { setNotifications } = useNotificationStore()

  const setAllNull = () => {
    setUser(null)
    setProducts([])
    setExchanges([])
    setListExchange([])
    setExchangesRev([])
    setListExchangeRev([])
    setNotifications([])
  }

  // ** Hooks
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      await axiosClient
        .get(authConfig.meEndpoint)
        .then(async (response) => {
          setUser({ ...response.data })
          Cookies.set('jwt', JSON.stringify(response.data))
        })
        .catch(() => {
          setUser(null)
          Cookies.remove('jwt')
          if (authConfig.onTokenExpiration === 'logout' && !pathName.includes('login')) {
            router.replace('/login')
          }
        })
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('jwt')])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    try {
      axiosClient
        .post(authConfig.loginEndpoint, params)
        .then(async (response) => {
          setLoading(false)
          setUser({ ...response.data.user })

          // Lưu token vào cookie với httpOnly và secure
          Cookies.set('jwt', response.data.accessToken, {
            secure: true,
            sameSite: 'strict',
            expires: 7, // Token hết hạn sau 7 ngày
          })

          const returnUrl = searchParams.get('returnUrl')
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
          closeModal()
        })
        .catch((err) => {
          setLoading(false)
          toast.error('Đăng nhập thất bại')
          if (errorCallback) errorCallback(err)
        })
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const handleRegister = async (params: RegisterParams) => {
    setLoading(true)
    try {
      const res = await axiosClient.post(authConfig.registerEndpoint, params)
      setUser(res.data.user)
      Cookies.set('jwt', JSON.stringify(res.data.user))
      console.log('res', res.data.user)
      setLoading(false)
      router.push('/')
    } catch {
      setLoading(false)
      toast.error('Đăng ký thất bại')
    }
  }

  const handleForgetPassword = async (params: { email: string }) => {
    try {
      await axiosClient.post('/api/auth/forgot-password', params)
    } catch {
      setLoading(false)
    }
  }

  const handleResetPassword = async (params: { code: string; newPassword: string }) => {
    try {
      await axiosClient.put('/api/auth/reset-password', params)
    } catch {
      setLoading(false)
    }
  }

  const getProfile = async () => {
    try {
      const res = await axiosClient.get('/api/users/view-profile')
      setUser(res.data)
      return res.data
    } catch {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    try {
      axiosClient.patch(authConfig.logoutEndpoint).then(() => {
        // Xóa token
        Cookies.remove('jwt')
        setAllNull()
        router.push('/')
      })
    } catch {
      Cookies.remove('jwt')
      setUser(null)
      router.push('/')
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    forgetPassword: handleForgetPassword,
    resetPassword: handleResetPassword,
    getProfile: getProfile,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
