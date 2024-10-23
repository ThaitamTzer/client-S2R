import UserStyle from '@/components/userStyle/useStyle'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Phong cách của bạn',
  description: 'Phong cách của bạn',
}

const UserStylePage = () => {
  return (
    <>
      <UserStyle />
    </>
  )
}

export default UserStylePage
