/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      background: "#F7F9F9",
      text: "#12130F",
      neutral: {
        50: "#F4F2F1",
        100: "#E8E5E3",
        200: "#D2CCC6",
        300: "#BBB2AA",
        400: "#A4988E",
        500: "#8F8073",
        600: "#71655B",
        700: "#554C44",
        800: "#39332D",
        900: "#1C1917",
        950: "#0E0D0B"
      },
      "accent": {
        50: "#D1FFBD",
      100: "#C9FFB3",
      200: "#B4FF94",
      300: "#A2FF7A",
      400: "#8DFF5C",
      500: "#7BFF42",
      600: "#5BFF14",
      700: "#46EB00",
      800: "#39BD00",
      900: "#2C9400",
      950: "#257A00"
      },
    },
    fontFamily: {
      sans: ["Work Sans", "Roboto", "sans-serif"]
    }
  },
  plugins: [],
}

