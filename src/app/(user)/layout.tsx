"use client";

import Navigation from "@/components/authpage/nav";
import { navLink } from "@/types/navTypes";
import { Avatar, Layout, Menu } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { IconUserCircle } from "@tabler/icons-react";
import { profileLinks } from "@/navigation/profile/type";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const selectedKey = pathname.split("/")[1] || "profile";

  return (
    <>
      <Navigation navLink={navLinks} />
      <Layout className="container mx-auto px-20 bg-white mt-32">
        <Content style={{ padding: "0 48px", backgroundColor: "white" }}>
          <Layout
            style={{
              padding: "24px 0",
              backgroundColor: "white",
            }}
          >
            <Sider
              width={350}
              style={{
                backgroundColor: "white",
                borderRight: "1px solid #f0f0f0",
              }}
            >
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
                style={{ height: "auto", backgroundColor: "white" }}
                selectedKeys={[selectedKey]}
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
