/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1a3a2e', light: '#1f4434' },
        sage: '#7a9b8a',
        cream: { DEFAULT: '#f5f1ea', dark: '#e8e3d8' },
        ochre: '#c47a28',
        ink: '#1a1a1a',
        mute: '#4a4a4a',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        kicker: '0.3em',
      },
    },
  },
  plugins: [],
};
