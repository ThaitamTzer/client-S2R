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

type DataPoint = {
  date: string
  paidUUIDs: string[]
  refundedUUIDs: string[]
  totalPaid: number
  totalRefund: number
  totalShippingFee: number
  totalSubTotal: number
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
    },
  )

  const handlePointClick = (dataPoint: any) => {
    setSelectedPoint(dataPoint)
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-1 md:px-10">
      <div className="title text-black text-2xl font-semibold">
        <h2>Tổng quan</h2>
        <p className="text-lg">
          {startDateDisplay && endDateDisplay
            ? `Từ ${dayjs(startDateDisplay).format('DD/MM/YYYY')} đến ${dayjs(endDateDisplay).format('DD/MM/YYYY')}`
            : 'Tất cả thời gian'}
        </p>
      </div>
      <div className="bg-white rounded-sm shadow-md">
        <div className="p-5">
          <StatsSummary data={data} />
        </div>
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <div className="p-5">
          <h2 className="text-xl font-semibold">Bộ lọc</h2>
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
        <div className="p-5">
          <LineChartDashboard data={data} handlePointClick={handlePointClick} />
        </div>
      </div>
      {selectedPoint && (
        <div className="bg-white rounded-sm shadow-md mt-5">
          <p className="text-xl px-5 pt-2">Các hoá đơn trong ngày {dayjs(selectedPoint.date).format('DD/MM/YYYY')}</p>
          <div className="p-5 grid grid-cols-2">
            <div>
              <p>Các hóa đơn đã thanh toán: </p>
              {selectedPoint.paidUUIDs.length === 0 && <p>Không có hóa đơn nào</p>}
              {selectedPoint.paidUUIDs.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div>
              <p>Các hóa đơn đã hoàn tiền: </p>
              {selectedPoint.refundedUUIDs.length === 0 && <p>Không có hóa đơn nào</p>}
              {selectedPoint.refundedUUIDs.map((item) => (
                <p key={item}>- {item}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
