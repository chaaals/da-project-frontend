/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'phone': '320px',
      'tablet': '600px',
      'desktop': '770px',
    },
    fontFamily: {
      inter: ['Inter']
    },
    extend: {
      colors: {
        'colorPrimary': '#111928',
        'colorSecondary': '#2D3646',
        'colorButton': '#1A56DB',
        'activeTab': '#A798FF',
        'bgActiveTab': '#151D2B',
        'tableHeader': '#374151',
        'tableData': '#1F2A37',
        'textPrimary': '#CBCBCB',
        'textSecondary': '#8C9199'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
