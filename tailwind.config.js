/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#ecfdf5", // Emerald 50
          primary: "#059669", // Emerald 600
          dark: "#064e3b", // Emerald 900
        },
        surface: "#f8fafc", // Slate 50
      },
    },
  },
  plugins: [],
};
