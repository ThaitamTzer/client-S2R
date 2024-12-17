'use client'

import { StatisticSellerType } from '@/types/statisticType'
import { memo } from 'react'

interface StatsSummaryProps {
  data: StatisticSellerType
}

const StatsSummary: React.FC<StatsSummaryProps> = memo(({ data }) => {
  const summaries = [
    {
      title: 'Tổng tiền đã thanh toán',
      value: data.allSummary.totalPaid,
      color: 'text-green-800',
    },
    {
      title: 'Tổng hoàn tiền',
      value: data.allSummary.totalRefund,
      color: 'text-red-500',
    },
    {
      title: 'Tổng phí vận chuyển',
      value: data.allSummary.totalShippingFee,
      color: 'text-blue-600',
    },
    {
      title: 'Tổng doanh thu',
      value: data.allSummary.totalSubTotal,
      color: 'text-green-800',
    },
  ]

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex-1">
      <div className="grid grid-cols-2 gap-4">
        {summaries.map((item, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className={`text-3xl font-semibold ${item.color}`}>
              {item.value.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
})

StatsSummary.displayName = 'StatsSummary'

export default StatsSummary
