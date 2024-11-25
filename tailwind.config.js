/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'phone': '320px',
      'tablet': '480px',
      'desktop': '770px',
    },
    extend: {
      colors: {
        'colorPrimary': '#111928',
        'colorSecondary': '#2D3646',
        'colorButton': '#1A56DB',
        'textPrimary': '#CBCBCB',
        'textSecondary': '#8C9199'
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
