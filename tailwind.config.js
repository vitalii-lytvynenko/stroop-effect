/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#EF4444',
        green: '#22C55E',
        blue: '#3B82F6',
        yellow: '#FFD700',
        purple: '#9932CC',
        orange: '#FFA500',
        brown: '#A0522D',
        pink: '#FF69B4',
      },
    },
  },
  plugins: [],
};
