import Navigation from "@/components/authpage/nav";

const navLinks = [
  {
    href: "/login",
    label: "Đăng nhập",
  },
  {
    href: "/register",
    label: "Đăng ký",
  },
  {
    href: "/forgot-password",
    label: "Quên mật khẩu",
  },
];

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation navLink={navLinks} />
      <div className="mt-24">{children}</div>
    </>
  );
}
