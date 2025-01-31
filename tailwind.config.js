/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./src/formkit.config.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/img/hero.jpg')",
      },
      colors: {
        "vtd-primary": colors.sky,
      },
    }
  },
  plugins: [],
}

