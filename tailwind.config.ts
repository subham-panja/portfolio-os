import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        "macos-bg": "#1e1e1e",
        "macos-dock": "rgba(30, 30, 30, 0.7)",
        "macos-window": "rgba(40, 40, 40, 0.85)",
        "macos-menubar": "rgba(30, 30, 30, 0.8)",
        "ios-bg": "#000000",
        accent: "#0A84FF",
        "accent-pink": "#FF375F",
        "accent-green": "#30D158",
        "accent-yellow": "#FFD60A",
        "accent-orange": "#FF9F0A",
        "accent-purple": "#BF5AF2",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "dock-bounce": "dock-bounce 0.3s ease-out",
        "window-open": "window-open 0.3s ease-out",
        "app-zoom": "app-zoom 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        "dock-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "window-open": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "app-zoom": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
