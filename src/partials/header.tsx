"use client";

import {
  Avatar,
  Group,
  Menu,
  rem,
  Text,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  IconSettings,
  IconTruck,
  IconLogout,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const theme = useMantineTheme();

  const pathName = usePathname();

  // const [opened, { toggle }] = useDisclosure(false);
  // const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <header
      id="header"
      className={clsx(
        "fixed top-0 z-modal bg-white w-full transition-transform duration-300",
        {
          "-translate-y-full": !showHeader,
          "translate-y-0": showHeader,
        },
      )}
    >
      <div className="main-nav container mx-auto px-24 pt-0">
        <Group align="center" justify="space-between">
          <Group>
            <Title className="text-green-800">
              <Link href="/">Share2Receive</Link>
            </Title>
            <div className="nav">
              <ul className="nav-list w-full flex flex-row ">
                <li
                  className={clsx(
                    "nav-item px-4 py-3 font-bold text-green-900 cursor-pointer hover:bg-green-200",
                    {
                      "bg-green-100": pathName === "/",
                    },
                  )}
                >
                  <Link href="/">Trang chủ</Link>
                </li>
                <li
                  className={clsx(
                    "nav-item px-4 py-3 font-bold text-green-900 cursor-pointer hover:bg-green-200",
                    {
                      "bg-green-100": pathName === "/shop",
                    },
                  )}
                >
                  <Link href="/shop">Cửa hàng</Link>
                </li>
              </ul>
            </div>
          </Group>
          <Group>
            <UnstyledButton>
              <IconShoppingCart
                className="text-green-900"
                style={{
                  width: rem(30),
                  height: rem(30),
                }}
              />
            </UnstyledButton>
            <Menu shadow="md" width={250}>
              <Menu.Target>
                <div className="flex flex-row items-center cursor-pointer">
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius={rem(24)}
                    size={rem(35)}
                  />
                  <Text className="ml-3" size="xl" fw={500}>
                    Lê Trần Thái Tâm
                  </Text>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Link href="/view-profile">
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Thông tin tài khoản
                  </Menu.Item>
                </Link>
                <Link href="/orders">
                  <Menu.Item
                    leftSection={
                      <IconTruck style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Quản lý đơn hàng
                  </Menu.Item>
                </Link>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </div>
      {/* <div
        className={clsx("sub-nav w-full h-14 bg-green-100", {
          hidden: pathName === "/" || pathName === "/",
        })}
      >
        <div className="container mx-auto h-full px-24">
          <ul className="sub-nav_nav-list h-full flex items-center">
            <li className="sub-nav_nav-item mx-2 text-green-900 font-semibold relative cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-600 before:absolute before:bg-green-700 before:origin-center before:h-[3px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-600 after:absolute after:bg-green-700 after:origin-center after:h-[3px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
              Danh mục 1
            </li>
            <li className="sub-nav_nav-item">Danh mục 2</li>
            <li className="sub-nav_nav-item">Danh mục 3</li>
            <li className="sub-nav_nav-item">Danh mục 4</li>
            <li className="sub-nav_nav-item">Danh mục 5</li>
          </ul>
        </div>
      </div> */}
    </header>
  );
}
