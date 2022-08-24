/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Pacifico"],
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
