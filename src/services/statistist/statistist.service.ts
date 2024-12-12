import axiosClient from '@/lib/axios'
import { StatisticSellerType } from '@/types/statisticType'

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
}

export default statisticService
