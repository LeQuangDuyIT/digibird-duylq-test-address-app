/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7B015'
      },
      dropShadow: {
        'logo-hover': '0 0 2em #646cffaa'
      }
    }
  },
  plugins: []
};
