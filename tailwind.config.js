/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'colorPrimary': '#111928',
        'colorSecondary': '#2D3646',
        'textPrimary': '#CBCBCB',
        'textSecondary': '#8C9199'
      },
      screens: {
        'phone': '320px',
        'tablet': '480px',
        'desktop': '770px',
      },
      fontFamily: {
        inter: ['Inter']
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
