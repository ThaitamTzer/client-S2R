import dynamic from 'next/dynamic'

const DashboardPage = dynamic(() => import('@/components/dashboard/dashboardPage'), {
  loading: () => <p>Loading...</p>,
})

export default function Dashboard() {
  return (
    <>
      <DashboardPage />
    </>
  )
}
