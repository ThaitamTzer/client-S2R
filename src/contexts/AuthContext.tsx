'use client'

// ** React Imports
import { createContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react'
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

  // ** Hooks
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')

  // Memoize the setAllNull function to prevent unnecessary re-renders
  const setAllNull = useCallback(() => {
    setUser(null)
    setProducts([])
    setExchanges([])
    setListExchange([])
    setExchangesRev([])
    setListExchangeRev([])
    setNotifications([])
  }, [setProducts, setExchanges, setListExchange, setExchangesRev, setListExchangeRev, setNotifications])

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      Cookies.set('jwt', accessToken)
      router.replace('/')
    }
  }, [accessToken, refreshToken, router])

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
          localStorage.clear()
          if (authConfig.onTokenExpiration === 'logout' && !pathName.includes('login')) {
            router.replace('/login')
          }
        })
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('jwt')])

  // Memoize the login function to prevent unnecessary re-renders
  const handleLogin = useCallback((params: LoginParams, sucessCallback?: () => void, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    try {
      axiosClient
        .post(authConfig.loginEndpoint, params)
        .then(async (response) => {
          if (sucessCallback) sucessCallback()
          setLoading(false)
          setUser({ ...response.data.user })
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)

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
    } catch {
      setLoading(false)
    }
  }, [router, searchParams, closeModal])

  // Memoize the register function
  const handleRegister = useCallback((params: RegisterParams, sucessCalback?: () => void, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    try {
      axiosClient
        .post(authConfig.registerEndpoint, params)
        .then(async (res) => {
          if (sucessCalback) sucessCalback()
          setUser(res.data.user)
          localStorage.setItem('accessToken', res.data.accessToken)
          localStorage.setItem('refreshToken', res.data.refreshToken)
          Cookies.set('jwt', JSON.stringify(res.data.user))
          setLoading(false)
        })
        .catch((error: any) => {
          setLoading(false)
          if (errorCallback) errorCallback(error)
        })
    } catch {
      setLoading(false)
    }
  }, [])

  // Memoize other functions
  const handleForgetPassword = useCallback(async (params: { email: string }) => {
    try {
      await axiosClient.post('/api/auth/forgot-password', params)
    } catch {
      setLoading(false)
    }
  }, [])

  const handleResetPassword = useCallback(async (params: { code: string; newPassword: string }) => {
    try {
      await axiosClient.put('/api/auth/reset-password', params)
    } catch {
      setLoading(false)
    }
  }, [])

  const getProfile = useCallback(async () => {
    try {
      const res = await axiosClient.get('/api/users/view-profile')
      setUser(res.data)
      return res.data
    } catch {
      setLoading(false)
    }
  }, [])

  const handleLogout = useCallback(() => {
    try {
      axiosClient.patch(authConfig.logoutEndpoint).then(() => {
        Cookies.remove('jwt')
        localStorage.clear()
        setAllNull()
        router.push('/')
      })
    } catch {
      Cookies.remove('jwt')
      localStorage.clear()
      setUser(null)
      router.push('/')
    }
  }, [router, setAllNull])

  // Memoize the context value to prevent unnecessary re-renders
  const values = useMemo(() => ({
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
  }), [user, loading, handleLogin, handleLogout, handleRegister, handleForgetPassword, handleResetPassword, getProfile])

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
