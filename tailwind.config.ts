import tailwindPresetMantine from "tailwind-preset-mantine";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/partials/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [tailwindPresetMantine()],
  plugins: [],
  theme: {
    backgroundPosition: {
      center_90: "center 96px",
    },
  },
};
export default config;
