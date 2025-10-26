/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#fff9e6',
          100: '#fff4cc',
          200: '#ffec99',
          300: '#ffe066',
          400: '#ffd233',
          500: '#ffd700',
          600: '#e6bf00',
          700: '#b38f00',
          800: '#806000',
          900: '#0d0d0d',
        },
        'brand-ink': '#0d0d0d',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
      boxShadow: {
        'card': '0 6px 18px rgba(13,13,13,0.08)',
      }
    },
  },
  plugins: [],
};
