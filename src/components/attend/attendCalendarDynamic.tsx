import dynamic from 'next/dynamic'

const AttendCalendar = dynamic(() => import('@/components/attend/attendCalendar'), {
  ssr: false,
})

export default function AttendCalendarDynamic() {
  return <AttendCalendar />
}
