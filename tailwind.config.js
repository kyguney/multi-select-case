/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bell-flower-blue': '#e2e8f0',
        'blouse-blue': '#94a3b8',
        'rain-maker': '#475569',
        'rain-maker-500': '#64748b',
        'wash-me': '#f8fafc',
        'wash-me-500': '#e9f2fb',
      }
    },
  },
  plugins: [],
}

