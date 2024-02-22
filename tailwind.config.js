/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "green-default": "#10C49F",
      },
      gridTemplateColumns: {
        "custom-notes": "repeat(auto-fit, minmax(280px, 1fr))",
      },
    },
  },
  plugins: [],
};
