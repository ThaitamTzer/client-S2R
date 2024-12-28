import dynamic from 'next/dynamic'

const Attend = dynamic(() => import('@/components/attend/attend'), { ssr: false, loading: () => <div></div> })

export default function AttendDynamic() {
  return <Attend />
}
