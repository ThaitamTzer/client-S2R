import axiosClient from '@/lib/axios'
import { CreateRatingType } from '@/types/rating'

const ratingService = {
  create: async (data: CreateRatingType, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.post('/api/rating', data).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  getRating: async (targetId: string): Promise<void> => {
    await axiosClient.get(`/api/rating/get-list-detail-rating?targetId=${targetId}`)
  },
}

export default ratingService
