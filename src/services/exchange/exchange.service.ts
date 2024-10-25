import axiClient from '@/lib/axios'
import { CreateExchangeType, ExchangeType } from '@/types/exchangeTypes'

const exChangeService = {
  //  ** Get all exchange
  getAll: async (): Promise<ExchangeType[]> => {
    const res: ExchangeType[] = await axiClient.get('/api/Exchange/get-list-exchange')

    return res
  },

  // ** Create exchange
  create: async (data: CreateExchangeType) => {
    const res = await axiClient.post('/api/Exchange', data)

    return res?.data
  },

  // ** Approve exchange
  approve: async (
    id: string,
    status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled',
  ) => {
    const res = await axiClient.patch(`/api/Exchange/approve-exchange/${id}?status=${status}`)

    return res?.data
  },

  // ** Update exchange
  update: async (id: string, status: 'pending' | 'shipping' | 'delivered' | 'canceled') => {
    const res = await axiClient.patch(`/api/Exchange/update-status-exchange/${id}?status=${status}`)

    return res?.data
  },
}

export default exChangeService
