import axios from 'axios'

export const optionCookie = {
  expires: 1 * 60 * 60 * 1000 // 1 hour
  // sameSite: "Strict",
  // HttpOnly: true,
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

axiosClient.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  response => response.data,
  async error => {
    const prevReq = error.config

    if (error.response?.status === 401 && !prevReq._retry) {
      prevReq._retry = true
      try {
        await axiosClient
          .patch('/api/auth/refresh-token', {
            // get refreshToken from cookies
            refreshToken: window.localStorage.getItem('refreshToken')
          })
          .then(res => {
            document.cookie = `accessToken=${res.data.accessToken}; ${optionCookie}`
            document.cookie = `refreshToken=${res.data.refreshToken}; ${optionCookie}`
            window.localStorage.setItem('refreshToken', res.data.refreshToken)
            window.localStorage.setItem('accessToken', res.data.accessToken)
          })
          .catch(() => {
            // Logout user clear cookies
            document.cookie = 'accessToken' + '=; Max-Age=-99999999;'
            document.cookie = 'refreshToken' + '=; Max-Age=-99999999;'
            document.cookie = 'userData' + '=; Max-Age=-99999999;'
            window.localStorage.removeItem('refreshToken')
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('userData')
          })

        return axiosClient(prevReq)
      } catch (error) {
        // Logout user
        document.cookie = 'accessToken' + '=; Max-Age=-99999999;'
        document.cookie = 'refreshToken' + '=; Max-Age=-99999999;'
        document.cookie = 'userData' + '=; Max-Age=-99999999;'
        window.location.href = '/login'
        window.localStorage.removeItem('refreshToken')
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('userData')

        return Promise.reject(error)
      }
    }
  }
)

export default axiosClient