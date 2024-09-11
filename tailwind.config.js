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
        50: "#FFF7E5",
        100: "#FFEED1",
        200: "#FFD89E",
        300: "#FFC170",
        400: "#FFA742",
        500: "#FF8811",
        600: "#EB7D00",
        700: "#C26E00",
        800: "#995C00",
        900: "#754A00",
        950: "#614100"
      },
    },
    fontFamily: {
      sans: ["Work Sans", "Roboto", "sans-serif"]
    }
  },
  plugins: [],
}

