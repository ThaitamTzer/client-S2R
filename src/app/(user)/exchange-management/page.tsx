import { Metadata } from 'next'
import { ExchangePage } from '@/components/exchange/exchangePage'

export const metadata: Metadata = {
  title: 'Quản lý trao đổi',
  description: 'Quản lý trao đổi',
}

const Exchange = () => {
  return (
    <>
      <ExchangePage />
    </>
  )
}

export default Exchange
