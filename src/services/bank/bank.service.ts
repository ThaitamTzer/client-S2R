import axios from 'axios'
import { ListBanking } from '../order/order.service'

const bankService = {
  listBanking: async (): Promise<ListBanking> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BANK_LIST}/bank/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return res.data
  },

  checkBanking: async (bank: string, account: string): Promise<any> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_BANK_LIST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_BANKING || '',
        'x-api-secret': process.env.NEXT_PUBLIC_API_BANKING_SECRET || '',
      },
      body: JSON.stringify({ bank, account }),
    }).then((res) => res.json())
  },
}

export default bankService
