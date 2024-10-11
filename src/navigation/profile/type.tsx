import React from "react";
import type { MenuProps } from "antd";
import Link from "next/link";
import { IconUserFilled } from "@tabler/icons-react";

type MenuItem = Required<MenuProps>["items"][number];

export const profileLinks: MenuItem[] = [
  {
    key: "account-infor",
    label: (
      <p className="font-semibold text-lg text-black">Thông tin tài khoản</p>
    ),
    type: "group",
    children: [
      {
        key: "profile",
        icon: <IconUserFilled size={26} color="#000" />,
        label: (
          <Link href="/profile" className="text-lg font-thin">
            Thông tin tài khoản
          </Link>
        ),
      },
      {
        key: "changePassword",
        icon: <IconUserFilled size={26} color="#000" />,
        label: (
          <Link href="/change-password" className="text-lg font-thin">
            Thay đổi mật khẩu
          </Link>
        ),
      },
    ],
  },
];
