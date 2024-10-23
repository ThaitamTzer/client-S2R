import React from 'react'
import type { MenuProps } from 'antd'
import Link from 'next/link'
import {
  IconUserFilled,
  IconLockPassword,
  IconArchiveFilled,
  IconAccessibleFilled,
} from '@tabler/icons-react'
import { useAuth } from '@/hooks/useAuth'

type MenuItem = Required<MenuProps>['items'][number]

export const useProfileLinks = () => {
  const { user } = useAuth()

  const profileLinks: MenuItem[] = [
    {
      key: 'account-infor',
      label: <p className="font-semibold text-lg text-black">Thông tin tài khoản</p>,
      type: 'group',
      children: [
        {
          key: 'profile',
          icon: <IconUserFilled size={26} color="#000" />,
          label: (
            <Link href="/profile" className="text-lg font-thin">
              Thông tin tài khoản
            </Link>
          ),
        },
        // Conditionally render the change-password option
        ...(user?.typeUser !== 'google'
          ? [
              {
                key: 'change-password',
                icon: <IconLockPassword size={26} color="#000" />,
                label: (
                  <Link href="/change-password" className="text-lg font-thin">
                    Thay đổi mật khẩu
                  </Link>
                ),
              },
            ]
          : []),

        {
          key: 'user-style',
          icon: <IconAccessibleFilled size={26} color="#000" />,
          label: (
            <Link href="/user-style" className="text-lg font-thin">
              Phong cách của bạn
            </Link>
          ),
        },
      ],
    },
    {
      key: 'product-management',
      label: <p className="font-semibold text-lg text-black">Quản lý</p>,
      type: 'group',
      children: [
        {
          key: 'product-management',
          icon: <IconArchiveFilled size={26} color="#000" />,
          label: (
            <Link href="/product-management" className="text-lg font-thin">
              Quản lý sản phẩm
            </Link>
          ),
        },
      ],
    },
  ]

  return profileLinks
}
