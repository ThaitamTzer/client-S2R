import axiosClient from '@/lib/axios'
import { StatisticSellerType } from '@/types/statisticType'

type getEcoOfUserType = {
  totalWeight: number
}

const statisticService = {
  getStatisticForSeller: async (startDate?: string, endDate?: string, viewBy?: string) => {
    const params = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(viewBy && { viewBy }),
    }

    const res: StatisticSellerType = await axiosClient.get('/api/statistics/get-static-saller', {
      params,
    })
    return res
  },

  getEcoOfUser: async (): Promise<getEcoOfUserType> => axiosClient.get('/api/statistics/get-static-eco-of-user'),

  getEcoOfAllUser: async (): Promise<getEcoOfUserType> => axiosClient.get('/api/statistics/get-static-eco-all'),
}

export default statisticService
