/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vms-azul': '#1a2a3a',
        'vms-laranja': '#f59e0b',
        'vms-fundo': '#f0f4f8',
      }
    },
  },
  plugins: [],
}