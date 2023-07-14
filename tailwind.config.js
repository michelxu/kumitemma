/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
