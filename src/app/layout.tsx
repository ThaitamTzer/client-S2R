import type { Metadata } from "next";
import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
} from "@mantine/core";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@mantine/carousel/styles.css";
import Header from "@/partials/header";
import ScrollingUp from "@/partials/up";
import Footer from "@/partials/footer";
import LoginModal from "@/partials/loginModal";
import { AuthProvider } from "@/contexts/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { themeAntProvider } from "@/components/themeProvider";
import { Toaster } from "react-hot-toast";
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "Share2Receive",
    template: "%s | Share2Receive",
  },
};

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    fontFamily: montserrat.style.fontFamily,
    fontFamilyMonospace: montserrat.style.fontFamily,
  }),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="scroll-smooth [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-green-700"
      lang="en"
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased relative ${montserrat.className}`}>
        <AuthProvider>
          <ConfigProvider theme={themeAntProvider}>
            <AntdRegistry>
              <MantineProvider theme={theme}>
                <Header />
                <main className="relative mt-12 h-full min-h-screen scroll-smooth">
                  <LoginModal />
                  <Toaster position="top-right" />
                  {children}
                  <ScrollingUp />
                </main>
                <Footer />
              </MantineProvider>
            </AntdRegistry>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
