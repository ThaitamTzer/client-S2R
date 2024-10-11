"use client";

import Navigation from "@/components/authpage/nav";
import { navLink } from "@/types/navTypes";
import { Avatar, Layout, Menu } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { IconUserCircle } from "@tabler/icons-react";
import { profileLinks } from "@/navigation/profile/type";

const { Content, Sider } = Layout;

const navLinks: navLink[] = [
  {
    href: "/profile",
    label: "Thông tin tài khoản",
  },
];

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  return (
    <>
      <Navigation navLink={navLinks} />
      <Layout className="container mx-auto px-32 bg-white mt-32">
        <Content style={{ padding: "0 48px" }}>
          <Layout
            style={{
              padding: "24px 0",
            }}
          >
            <Sider width={350}>
              <div className="profile-avatar bg-white flex items-center gap-3 justify-start pb-6">
                <div className="avatar ">
                  <Avatar
                    src={user?.avatar}
                    alt="avatar"
                    size={80}
                    icon={<IconUserCircle size={30} />}
                  />
                </div>
                <div className="infor flex flex-col justify-start items-start">
                  <p className="text-lg">Tài khoản</p>
                  <p className="text-lg">Share2Receive của</p>
                  <h2 className="text-left text-2xl font-semibold">
                    {user?.firstname + " " + user?.lastname}
                  </h2>
                </div>
              </div>
              <Menu
                mode="inline"
                defaultSelectedKeys={["profile"]}
                style={{ height: "90%" }}
                items={profileLinks}
              />
            </Sider>
            <Content style={{ padding: "0 24px", height: "auto" }}>
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
