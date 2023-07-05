/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: "#393939",
        paper: "#2E2E2E",
        primary: "#0C4A6E"
      },
      boxShadow: {
        "default": "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
      }
    },
  },
  plugins: [],
}