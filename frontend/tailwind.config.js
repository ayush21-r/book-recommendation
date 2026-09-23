/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0E8',
        vellum: '#FAF7F2',
        manilla: '#EAE3D5',
        terracotta: {
          DEFAULT: '#C85A32',
          dark: '#9F3C16',
          light: '#FDEEE9',
        },
        emerald: {
          DEFAULT: '#1B4332',
          light: '#EAF3EE',
          container: '#BEAAD1',
        },
        saffron: {
          DEFAULT: '#D99B26',
          light: '#FFF4DF',
        },
        carbon: {
          DEFAULT: '#1E1E1E',
          muted: '#57423B',
          subtle: '#8A726A',
        },
        rose: {
          DEFAULT: '#C47B78',
          light: '#F8E8E7',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        folio: '2px 2px 0px #1E1E1E',
        'folio-hover': '3px 3px 0px #C85A32',
        'folio-lg': '4px 4px 0px #1E1E1E',
        'folio-emerald': '2px 2px 0px #1B4332',
        'folio-saffron': '2px 2px 0px #D99B26',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      borderWidth: {
        hairline: '1.5px',
      }
    },
  },
  plugins: [],
}
