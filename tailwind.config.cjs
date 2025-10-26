/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff9e6',
          100: '#fff3cc',
          500: '#FFD700',
          900: '#0D0D0D',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbe6',
          100: '#fff4cc',
          500: '#FFD700',
          900: '#0D0D0D'
        }
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: [],
};
