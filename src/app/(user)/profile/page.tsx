import Profile from '@/components/profile/profilePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông tin tài khoản',
}

const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  )
}

export default ProfilePage
