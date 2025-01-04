/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { colors: { primary: "#ABC32F" } },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
