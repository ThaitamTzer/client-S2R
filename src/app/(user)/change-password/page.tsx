import ChangePassword from '@/components/changePassword/changePassword'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đổi mật khẩu',
}

const ChangePasswordPage = () => {
  return (
    <>
      <ChangePassword />
    </>
  )
}

export default ChangePasswordPage
