'use client'
import useSWR from 'swr'
import statisticService from '@/services/statistist/statistist.service'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import 'dayjs/locale/vi'
import dayjs from 'dayjs'
import StatsSummary from './StatsSummary'
import DateFilters from './DateFilters'
import LineChartDashboard from './LineChartDashboard'
import DonutChart from './DonutChart'

type DataPoint = {
  date: string
  paidUUIDs: string[]
  refundedUUIDs: string[]
  totalPaid: number
  totalRefund: number
  totalShippingFee: number
  totalSubTotal: number
}

const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto px-1 md:px-10 space-y-6 animate-pulse">
      {/* Tiêu đề skeleton */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Stats Summary skeleton */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-sm shadow-md p-5">
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Biểu đồ và bộ lọc skeleton */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-[800px]"></div>
        </div>
        <div className="h-[300px] bg-gray-200 rounded"></div>
      </div>

      {/* Grid 2 cột skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-[300px] bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-[300px] bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const searchParams = useSearchParams()

  const startDate = searchParams.get('startDate')?.toString() || ''
  const endDate = searchParams.get('endDate')?.toString() || ''
  const viewBy = searchParams.get('viewBy')?.toString() || ''

  const [value, setValue] = useState<{ value: string; label: string } | null>(
    viewBy ? { value: viewBy, label: viewBy } : null,
  )
  // Thêm state để lưu giá trị ngày
  const [dateFromValue, setDateFromValue] = useState<Date | null>(startDate ? new Date(startDate) : null)
  const [dateToValue, setDateToValue] = useState<Date | null>(endDate ? new Date(endDate) : null)
  const [selectedPoint, setSelectedPoint] = useState<DataPoint>()
  const [startDateDisplay, setStartDateDisplay] = useState<string>('')
  const [endDateDisplay, setEndDateDisplay] = useState<string>('')

  const { data } = useSWR(
    ['/api/statistic', startDate, endDate, viewBy],
    () => statisticService.getStatisticForSeller(startDate, endDate, viewBy),
    {
      onSuccess(data) {
        if (data) {
          // lấy ngày đầu tiên và cuối cùng trong dữ liệu
          const firstDate = data.dailyDetails[0]?.date
          const lastDate = data.dailyDetails[data.dailyDetails.length - 1]?.date
          setStartDateDisplay(firstDate)
          setEndDateDisplay(lastDate)
        }
      },
      revalidateOnMount: true,
      keepPreviousData: true,
    },
  )

  const { data: TimeAddToCart } = useSWR(
    '/api/statistics/get-time-add-cart',
    statisticService.getTotalTimeUserAddtoCart,
    {
      keepPreviousData: true,
      revalidateOnMount: true,
    },
  )

  const handlePointClick = (dataPoint: any) => {
    setSelectedPoint(dataPoint)
  }

  if (!data || !TimeAddToCart) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container mx-auto px-1 md:px-10 space-y-6">
      {/* Phần tiêu đề */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Tổng quan</h2>
        <p className="text-lg text-gray-600">
          {startDateDisplay && endDateDisplay
            ? `Từ ${dayjs(startDateDisplay).format('DD/MM/YYYY')} đến ${dayjs(endDateDisplay).format('DD/MM/YYYY')}`
            : 'Tất cả thời gian'}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <StatsSummary data={data} />
      </div>

      {/* Biểu đồ và bộ lọc */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Thống kê các khoản phí</h2>
          <DateFilters
            value={value}
            setValue={setValue}
            dateFromValue={dateFromValue}
            setDateFromValue={setDateFromValue}
            dateToValue={dateToValue}
            setDateToValue={setDateToValue}
            endDate={endDate}
            startDate={startDate}
            viewBy={viewBy}
          />
        </div>
        <LineChartDashboard data={data} handlePointClick={handlePointClick} />
      </div>

      {/* Grid 2 cột cho biểu đồ tròn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thống kê thêm vào giỏ hàng</h2>
          <DonutChart data={TimeAddToCart?.data} />
        </div>

        {selectedPoint && (
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Các hoá đơn ngày {dayjs(selectedPoint.date).format('DD/MM/YYYY')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Các hóa đơn đã thanh toán:</p>
                {selectedPoint.paidUUIDs.length === 0 ? (
                  <p className="text-gray-500">Không có hóa đơn nào</p>
                ) : (
                  <div className="space-y-1">
                    {selectedPoint.paidUUIDs.map((item) => (
                      <p key={item} className="text-sm">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium mb-2">Các hóa đơn đã hoàn tiền:</p>
                {selectedPoint.refundedUUIDs.length === 0 ? (
                  <p className="text-gray-500">Không có hóa đơn nào</p>
                ) : (
                  <div className="space-y-1">
                    {selectedPoint.refundedUUIDs.map((item) => (
                      <p key={item} className="text-sm">
                        - {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
