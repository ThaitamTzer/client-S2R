import axiosClient from '@/lib/axios'
import { CreateRatingType } from '@/types/rating'

const ratingService = {
  create: async (data: CreateRatingType): Promise<void> => {
    await axiosClient.post('/api/rating', data)
  },

  getRating: async (targetId: string): Promise<void> => {
    await axiosClient.get(`/api/rating/get-list-detail-rating?targetId=${targetId}`)
  },
}

export default ratingService
