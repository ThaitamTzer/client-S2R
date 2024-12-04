import ReportModal from '@/components/checkout/reportModal'
import SellPage from '@/components/sell-management/sell'
import { RessonOrder } from '@/constants/resson'

export default function SellManagement() {
  return (
    <>
      <SellPage />
      <ReportModal reportType="order" resson={RessonOrder} />
    </>
  )
}
