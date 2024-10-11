import { ThemeConfig } from "antd";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
});

export const themeAntProvider: ThemeConfig = {
  token: {
    colorPrimary: "#1DA57A",
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    Layout: {
      bodyBg: "#ffff",
    },
    Menu: {
      itemActiveBg: "#dffae6",
    },
  },
};
