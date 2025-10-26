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
        duo: {
          50: '#f3fff4',
          100: '#e6ffea',
          200: '#c7ffd0',
          400: '#66e37a',
          500: '#34c759',
          600: '#2aa84a',
          800: '#1b6b31'
        },
        'brand-ink': '#0d0d0d',
        duo: {
          50: '#f0fff4',
          100: '#dcffdf',
          200: '#bfffbf',
          300: '#94f78f',
          400: '#66e066',
          500: '#34c84a',
          600: '#2ba83a',
          700: '#1f7a2a',
          800: '#125218',
          900: '#07300c',
        },
        'duo-ink': '#07300c',
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
