/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{html,js,liquid,md,njk}"],
  theme: {
    extend: {
      colors: {
        'background':'#0a0a0a',
        'text':'#e5e7eb',
        'accent':'#d9448a'
      },
    },
  },
  plugins: [],
}

