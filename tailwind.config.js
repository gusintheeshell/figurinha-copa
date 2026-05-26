/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          bg: '#282828',
          bg1: '#3c3836',
          bg2: '#504945',
          fg: '#ebdbb2',
          fgMuted: '#a89984',
          green: '#98971a',
          greenBright: '#b8bb26',
          red: '#cc241d',
          orange: '#d65d0e',
          yellow: '#d79921',
          blue: '#458588',
          aqua: '#689d6a',
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
