import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5fb",
          100: "#d8e7f5",
          200: "#b3cfe9",
          300: "#84afd8",
          400: "#4f88c1",
          500: "#2d6aa8",
          600: "#1f538b",
          700: "#1a4370",
          800: "#16324f",
          900: "#122840",
          950: "#0b1a2c",
        },
        forest: {
          50: "#f0f8f1",
          100: "#dbeede",
          200: "#b8ddc0",
          300: "#8ac49a",
          400: "#58a570",
          500: "#378852",
          600: "#276c40",
          700: "#1f5634",
          800: "#1b452b",
          900: "#173924",
        },
        accent: {
          50: "#fff8eb",
          100: "#ffecc6",
          200: "#ffd688",
          300: "#ffba4a",
          400: "#ff9f1f",
          500: "#f97c06",
          600: "#dd5a02",
          700: "#b73c06",
          800: "#942e0c",
          900: "#7a270d",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1200px" },
      },
    },
  },
  plugins: [],
};
export default config;
