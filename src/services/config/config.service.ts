import axiosClient from '@/lib/axios'
import { ConfigType } from '@/types/config'

const configService = {
  getConfig: async () => {
    const res = await axiosClient.get('/api/configs')

    return res as any as ConfigType
  },
}

export default configService
