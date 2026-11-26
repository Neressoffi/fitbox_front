/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '2rem' },
      screens: { xl: '1200px' },
    },
    extend: {
      colors: {
        basalte: '#1B1E23',
        ardoise: '#2A2E35',
        lave: { DEFAULT: '#C53D13', hover: '#9E3210', clair: '#F26B3A' },
        brume: '#F2F3F5',
        cendre: { DEFAULT: '#5B616B', clair: '#A9AEB6' },
        ligne: '#E3E5E9',
      },
      fontFamily: {
        titre: ['Archivo', 'sans-serif'],
        texte: ['Inter', 'sans-serif'],
      },
      borderRadius: { bouton: '6px', carte: '8px' },
      letterSpacing: { titre: '-0.02em' },
    },
  },
  plugins: [],
}
