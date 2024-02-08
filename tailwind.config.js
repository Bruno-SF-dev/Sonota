/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      gridTemplateColumns: {
        "custom-notes": "repeat(auto-fit, minmax(280px, 1fr))",
      },
    },
  },
  plugins: [],
};
