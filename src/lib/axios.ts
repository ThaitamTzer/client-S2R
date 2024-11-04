import axios from 'axios'
import Cookies from 'js-cookie'

export const optionCookie = {
  expires: 1 * 60 * 60 * 1000, // 1 hour
  // sameSite: "Strict",
  // HttpOnly: true,
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const axiosUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const prevReq = error.config

    if (error.response?.status === 401 && !prevReq._retry) {
      prevReq._retry = true
      try {
        await axiosClient
          .patch('/api/auth/refresh-token')
          .then((res) => {
            Cookies.set('jwt', res.data.accessToken)
          })
          .catch(() => {
            // Logout user clear cookies
            Cookies.remove('jwt')
          })

        return axiosClient(prevReq)
      } catch (error) {
        // Logout user
        Cookies.remove('jwt')

        return Promise.reject(error)
      }
    }
  },
)

export default axiosClient
