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
        // Warm Coffee & Mocha Brown Palette
        brand: {
          50: "#faf6f0",
          100: "#f3ebe0",
          200: "#e6d5bf",
          300: "#d6bc99",
          400: "#bf9a6e",
          500: "#a97d4b",
          600: "#8c6035", // Primary Rich Warm Brown
          700: "#724c2a",
          800: "#5c3d24",
          900: "#4c321e",
          950: "#2a1a0f",
        },
        // Warm Caramel & Sand Accent
        accent: {
          50: "#fdfbf7",
          100: "#f9f4eb",
          200: "#f2e7d3",
          300: "#e7d3b0",
          400: "#d9b986",
          500: "#cb9f60",
          600: "#b58448",
          700: "#946637",
          800: "#79522f",
          900: "#634329",
          950: "#382314",
        },
        // Warm Neutral Stone
        surface: {
          50: "#faf8f5",
          100: "#f4f0ea",
          200: "#e8e1d6",
          300: "#d8cdc0",
          400: "#b9a997",
          500: "#9c8a77",
          600: "#7d6c5b",
          700: "#645547",
          800: "#53463b",
          900: "#463b33",
        },
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "2",
      },
      screens: {
        xs: "375px",
      },
      boxShadow: {
        subtle: "0 2px 12px rgba(92, 61, 36, 0.04)",
        card: "0 8px 30px -4px rgba(76, 50, 30, 0.08)",
        elevated: "0 16px 40px -6px rgba(42, 26, 15, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
