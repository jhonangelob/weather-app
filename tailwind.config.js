/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'bg-color': '#fafafa',
      'white-color': '#ffffff',
      'pimary-color': '#060606',
      'secondary-color': '#a0a0a0',
      'accent-color': '#89CFF0',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
