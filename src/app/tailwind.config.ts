import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#FAFAFA",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F3E5AB",
          dark: "#AA8C2C",
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #AA8C2C, #D4AF37, #F3E5AB, #D4AF37)',
      }
    },
  },
  plugins: [],
};
export default config;