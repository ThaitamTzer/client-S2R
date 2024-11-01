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
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  RegisterParams,
} from '@/contexts/types'

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
  const { setExchanges, setListExchange, setExchangesRev } = useExchange()
  const { closeModal } = useLoginModal()

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
        })
        .catch(() => {
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          setUser(null)
          if (authConfig.onTokenExpiration === 'logout' && !pathName.includes('login')) {
            router.replace('/login')
          }
        })
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    try {
      axiosClient
        .post(authConfig.loginEndpoint, params)
        .then(async (response) => {
          setLoading(false)
          if (params.rememberMe) {
            window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
            window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshToken)
          }
          const returnUrl = searchParams.get('returnUrl')

          setUser({ ...response.data.user })
          if (params.rememberMe) {
            window.localStorage.setItem('userData', JSON.stringify(response.data.user))
          }

          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

          router.replace(redirectURL as string)
          closeModal()
        })

        .catch((err) => {
          setLoading(false)
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
      console.log('res', res.data.user)
      setLoading(false)
      router.push('/')
    } catch {
      setLoading(false)
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
        setUser(null)
        setProducts([])
        setExchanges([])
        setListExchange([])
        setExchangesRev([])
        router.push('/')
      })
    } catch {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      setUser(null)
      router.push('/')
    }
  }

  console.log('user', user)

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
