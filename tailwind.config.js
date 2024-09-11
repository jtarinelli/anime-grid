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
        50: "#DDF5FD",
        100: "#BCEBFB",
        200: "#73D6F7",
        300: "#30C2F3",
        400: "#0C9ECF",
        500: "#086788",
        600: "#086B8C",
        700: "#086B8C",
        800: "#086B8C",
        900: "#086F91",
        950: "#086F91"
      },
    },
    fontFamily: {
      sans: ["Work Sans", "Roboto", "sans-serif"]
    }
  },
  plugins: [],
}

