import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*",
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bigBg: "#171A21",
        sidePanel: "#272A31",
        "cp-primary-blue": "#909FFF",
        "cp-secondary-blue": "#5A4FFF",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
