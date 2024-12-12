'use client'
import { LineChart } from '@mantine/charts'
import { Select } from '@mantine/core'
import useSWR from 'swr'
import statisticService from '@/services/statistist/statistist.service'
import { useSearchParams } from 'next/navigation'
import { Paper, Text } from '@mantine/core'
import { useState } from 'react'
import { DateInput, DatesProvider } from '@mantine/dates'
import { useRouter } from 'next/navigation'
import 'dayjs/locale/vi'

interface ChartTooltipProps {
  label: string
  payload: Record<string, any>[] | undefined
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      <Text fz="sm">
        Mã đơn hàng đã thanh toán:{' '}
        {payload?.[0]?.payload?.paidUUIDs && payload?.[0]?.payload?.paidUUIDs.length === 0 && 0}
        {payload?.[0]?.payload?.paidUUIDs?.map((item: string) => {
          if (!item) return 0
          return (
            <div key={item}>
              <Text fz="sm">{item || 0}</Text>
            </div>
          )
        })}
      </Text>
      <Text fz="sm">
        Mã đơn hàng đã hoàn tiền:{' '}
        {payload?.[0]?.payload?.refundedUUIDs && payload?.[0]?.payload?.refundedUUIDs.length === 0 && 0}
        {payload?.[0]?.payload?.refundedUUIDs?.map((item: string) => {
          if (!item) return 0
          return (
            <div key={item}>
              <Text fz="sm">{item || 0}</Text>
            </div>
          )
        })}
      </Text>
      {payload.map((item: any) => (
        <div key={item.name}>
          <Text c={item.color} fz="sm">
            {item.name === 'totalPaid'
              ? 'Tổng doanh thu'
              : item.name === 'totalRefund'
                ? 'Tổng hoàn tiền'
                : item.name === 'totalShippingFee'
                  ? 'Phí vận chuyển'
                  : 'Tổng'}{' '}
            : {item.value}
          </Text>
        </div>
      ))}
    </Paper>
  )
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const startDate = searchParams.get('startDate')?.toString() || ''
  const endDate = searchParams.get('endDate')?.toString() || ''
  const viewBy = searchParams.get('viewBy')?.toString() || ''

  const [value, setValue] = useState<{ value: string; label: string } | null>(
    viewBy ? { value: viewBy, label: viewBy } : null,
  )
  // Thêm state để lưu giá trị ngày
  const [dateFromValue, setDateFromValue] = useState<Date | null>(startDate ? new Date(startDate) : null)
  const [dateToValue, setDateToValue] = useState<Date | null>(endDate ? new Date(endDate) : null)

  const { data } = useSWR(
    ['/api/statistic', startDate, endDate, viewBy],
    () => statisticService.getStatisticForSeller(startDate, endDate, viewBy),
    {
      revalidateOnMount: true,
    },
  )

  return (
    <div className="container mx-auto px-1 md:px-10">
      <div className="title text-black text-2xl font-semibold">
        <h2>Tổng quan</h2>
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <div className="p-5">
          <h2 className="text-xl font-semibold">Bộ lọc</h2>
          <div className="w-[800px] flex flex-row gap-2">
            <Select
              data={[
                {
                  value: '',
                  label: 'Chọn thời gian',
                  disabled: true,
                },
                { value: 'day', label: 'Theo ngày' },
                { value: 'month', label: 'Theo tháng' },
                { value: 'year', label: 'Theo năm' },
              ]}
              placeholder="Chọn thời gian"
              label="Chọn thời gian"
              value={value ? value.value : null}
              onChange={(selected) => {
                const selectedValue = selected ? { value: selected, label: selected } : null
                setValue(selectedValue)
                // Use selected value directly in URL
                router.push(`/dashboard?startDate=${startDate}&endDate=${endDate}&viewBy=${selected || ''}`)
              }}
            />
            <DatesProvider settings={{ locale: 'vi' }}>
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Từ ngày"
                placeholder="Chọn ngày bắt đầu"
                value={dateFromValue}
                onChange={(date) => {
                  setDateFromValue(date)
                  const formattedDate = date?.toISOString().split('T')[0] || ''
                  router.push(`/dashboard?startDate=${startDate}&endDate=${formattedDate}`)
                }}
                clearable
              />

              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Đến ngày"
                placeholder="Chọn ngày kết thúc"
                value={dateToValue}
                onChange={(date) => {
                  setDateToValue(date)
                  const formattedDate = date?.toISOString().split('T')[0] || ''
                  router.push(`/dashboard?startDate=${formattedDate}&endDate=${endDate}`)
                }}
                disabled={!dateFromValue}
                clearable
                minDate={dateFromValue || undefined}
              />
            </DatesProvider>
          </div>
        </div>
        <div className="p-5">
          <LineChart
            h={300}
            data={
              data?.dailyDetails?.map((item) => ({
                date: item.date,
                paidUUIDs: item.paidUUIDs,
                refundedUUIDs: item.refundedUUIDs,
                totalPaid: item.summary.totalPaid,
                totalRefund: item.summary.totalRefund,
                totalShippingFee: item.summary.totalShippingFee,
                totalSubTotal: item.summary.totalSubTotal,
              })) || []
            }
            tooltipProps={{
              content: ({ label, payload }) => {
                return <ChartTooltip label={label} payload={payload} />
              },
            }}
            dataKey="date"
            withPointLabels
            withLegend
            legendProps={{ verticalAlign: 'bottom', height: 50 }}
            series={[
              { name: 'totalPaid', color: 'blue', label: 'Doanh thu' },
              { name: 'totalRefund', color: 'red', label: 'Hoàn tiền' },
              { name: 'totalShippingFee', color: 'green', label: 'Phí vận chuyển' },
              { name: 'totalSubTotal', color: 'orange', label: 'Tổng' },
            ]}
            curveType="linear"
          />
        </div>
      </div>
    </div>
  )
}
