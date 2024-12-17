import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Image from 'next/image'

type ProductData = {
  productId: string
  productName: string
  imgUrls: string[]
  timesAdded: number
}

type DonutChartProps = {
  data: ProductData[]
}

const CHART_COLORS = [
  '#FF6384', // hồng đậm
  '#36A2EB', // xanh dương
  '#FFCE56', // vàng
  '#4BC0C0', // xanh ngọc
  '#9966FF', // tím
  '#FF9F40', // cam
  '#E7E9ED', // xám - dùng cho phần "Khác"
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Image src={data.imgUrls[0]} alt={data.productName} width={100} height={100} className="rounded-md mb-2" />
        <p className="text-sm font-semibold">{data.productName}</p>
        <p className="text-sm">Số lần thêm: {data.timesAdded}</p>
      </div>
    )
  }
  return null
}

// const CustomLegend = ({ payload }: any) => {
//   return (
//     <ul className="flex flex-wrap justify-center gap-4 mt-4">
//       {payload.map((entry: any, index: number) => (
//         <li key={`legend-${index}`} className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
//           <span className="text-sm text-gray-600">
//             {entry.payload.productName} ({entry.payload.timesAdded} lần)
//           </span>
//         </li>
//       ))}
//     </ul>
//   )
// }

export default function DonutChart({ data }: DonutChartProps) {
  // Sắp xếp data theo số lần thêm vào giỏ giảm dần
  const sortedData = [...data].sort((a, b) => b.timesAdded - a.timesAdded)

  // Lấy 6 sản phẩm đầu tiên
  const top6Products = sortedData.slice(0, 6)

  // Tính tổng số lần thêm của các sản phẩm còn lại
  const otherProducts = sortedData.slice(6)
  const otherTimesAdded = otherProducts.reduce((sum, product) => sum + product.timesAdded, 0)

  // Tạo data mới bao gồm top 6 và mục "Khác"
  const chartData = [
    ...top6Products,
    ...(otherTimesAdded > 0
      ? [
          {
            productId: 'others',
            productName: 'Khác',
            imgUrls: [''],
            timesAdded: otherTimesAdded,
          },
        ]
      : []),
  ]

  // Thay đổi phần tạo màu
  const chartColors = CHART_COLORS.slice(0, chartData.length)

  return (
    <>
      {data && (
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="timesAdded"
                nameKey="productName" // Thêm nameKey để sử dụng tên sản phẩm
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend content={<CustomLegend />} verticalAlign="bottom" align="center" /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  )
}
