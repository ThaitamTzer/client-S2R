'use client'

import { Title } from '@mantine/core'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

const HomePageTitle = () => {
  return (
    <>
      <div className="container mx-auto px-24 pt-14 grid gap-10">
        <div className="homepage_title container ">
          <Title
            style={{
              fontFamily: spaceGrotesk.style.fontFamily,
              fontSmooth: 'auto',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: '20px',
              lineHeight: '30px',
              letterSpacing: '.9px',
            }}
            className="text-green-800 "
            fw={500}
          >
            “Tại Share2Receive, chúng tôi tin rằng mặc đồ gì giúp bạn luôn sáng tạo và giúp môi
            trường XANH hơn. Bạn có thể cùng chúng tôi xây dựng tương lai bền vững hơn.” - Xuân
            Nguyễn, Founder
          </Title>
        </div>
      </div>
    </>
  )
}

export default HomePageTitle
