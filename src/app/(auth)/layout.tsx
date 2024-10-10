import Navigation from "@/components/authpage/nav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <div className="mt-16">{children}</div>
    </>
  );
}
