'use client'

import Image from 'next/image'
import MotionDiv from '../motiondiv'
import { useAttend } from '@/zustand/attend'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Badge } from '@mantine/core'

export default function Attend() {
  const { toggleAttendModal, attendances } = useAttend()
  const [isAttendance, setIsAttendance] = useState<boolean>(false)

  useEffect(() => {
    const today = dayjs().format('YYYY/MM/DD')

    const todayAttendance = attendances.find((attendance) => {
      const attendanceDate = dayjs(attendance.date).format('YYYY/MM/DD')
      return attendanceDate === today
    })

    if (todayAttendance?.isAttendance) {
      setIsAttendance(true)
    } else {
      setIsAttendance(false)
    }
  }, [attendances])

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileInView={
        !isAttendance
          ? {
              scale: [1, 1.2, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 7,
              },
            }
          : {}
      }
      transition={{
        duration: 0.5,
      }}
    >
      <div className="cursor-pointer relative" onClick={toggleAttendModal}>
        {!isAttendance ? (
          <Badge className="absolute top-2 right-3 z-10 h-3 w-3 p-0" radius="xl" color="red" variant="filled" />
        ) : null}
        <Image src="/misc/Item_Jocund_Letters.png" alt="logo" width={100} height={100} />
      </div>
    </MotionDiv>
  )
}
