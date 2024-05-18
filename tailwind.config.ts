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
        primaryColorLight: "#2A4E8F",
        backgroundColorLight: "#FFFFFF",
        accentColorLight: "#F4F6F9",
        borderColor: "#CBD5E4",

        confirmColor: "#2B9F03",
        warningColor: "#B50202",

        primaryColorDark: "#1D385C",
        backgroundColorDark: "#151515",
        accentColorDark: "#0A0A0A",

        textColorDark: "#000000",
        textColorLight: "#FFFFFF",
        textColorDarkBlue: "#1E1B39"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      linearGradientColors: {
        'transparent-left': 'transparent, #F7F7F7',
        'transparent-right': '#F7F7F7, transparent',
      },
      boxShadow: {
        'normal': '0 0 25px rgba(0, 0, 0, 0.02), 0 0 4px rgba(0, 0, 0, 0.02)',
      },

    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
export default config;
