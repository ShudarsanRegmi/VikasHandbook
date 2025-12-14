/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Crimson Pro', 'serif'],
        display: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
