'use client'

import { StatisticSellerType } from '@/types/statisticType'
import { memo } from 'react'
import { useEffect, useState } from 'react'
import statisticService from '@/services/statistist/statistist.service'
import { useAuth } from '@/hooks/useAuth'

const StatsSummary = memo(({ data }: { data: StatisticSellerType }) => {
  const { user } = useAuth()

  const [totalWeight, setTotalWeight] = useState<number>(0)
  useEffect(() => {
    if (user) {
      statisticService.getEcoOfUser().then((res) => {
        setTotalWeight(res.totalWeight)
      })
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <h3 className="text-lg font-semibold">Tổng tiền đã thanh toán</h3>
        <p className="text-4xl font-semibold text-green-800 ">
          {data.allSummary.totalPaid.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Tổng hoàn tiền</h3>
        <p className="text-4xl font-semibold text-green-800 ">
          {data.allSummary.totalRefund.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Tổng phí vận chuyển</h3>
        <p className="text-4xl font-semibold text-green-800 ">
          {data.allSummary.totalShippingFee.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
        <p className="text-4xl font-semibold text-green-800 ">
          {data.allSummary.totalSubTotal.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Tổng khối lượng bạn đã tiết kiệm</h3>
        <p className="text-4xl font-semibold text-green-800 ">{totalWeight} gram</p>
      </div>
    </div>
  )
})

StatsSummary.displayName = 'StatsSummary'

export default StatsSummary
