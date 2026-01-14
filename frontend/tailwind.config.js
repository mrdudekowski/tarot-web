/** @type {import('tailwindcss').config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '414px',
        'lg': '480px',
      },
      colors: {
        'loona-dark': '#0a0a1a',
        'loona-purple': '#1a0d3e',
        'loona-purple-dark': '#0d0d2b',
        'loona-neon': '#e600ff',
        'loona-orange': '#ff6b35',
        'loona-orange-light': '#ff9e00',
        'loona-text-primary': '#c3c3c3',
        'loona-text-secondary': '#7a7a7a',
        'loona-border': '#8a2be2',
        'loona-glow-purple': '#9370db',
      },
      backgroundImage: {
        'loona-gradient': 'linear-gradient(145deg, #1a0d3e 0%, #0d0d2b 100%)',
        'loona-neon-gradient': 'linear-gradient(145deg, #e600ff 0%, #9370db 100%)',
        'loona-orange-gradient': 'linear-gradient(145deg, #ff6b35 0%, #ff9e00 100%)',
        'loona-card-gradient': 'linear-gradient(145deg, #1a0d3e 0%, #0d0d2b 100%)',
      },
      backgroundColor: {
        'loona-card-bg': 'rgba(13, 13, 43, 0.5)',
      },
      boxShadow: {
        'neon': '0 0 10px #e600ff, 0 0 20px #9370db',
        'neon-lg': '0 0 20px #e600ff, 0 0 40px #9370db',
        'card': '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px #8a2be2',
        'button': '0 4px 15px rgba(230, 0, 255, 0.3)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontFamily: {
        'press-start': ['Press Start 2P', 'cursive'],
      },
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'float-particles': 'float-particles 3s ease-in-out infinite',
      },
      keyframes: {
        'neon-glow': {
          '0%': { 
            textShadow: '0 0 10px #e600ff, 0 0 20px #e600ff, 0 0 30px #e600ff',
            opacity: '1',
          },
          '100%': { 
            textShadow: '0 0 5px #e600ff, 0 0 10px #9370db, 0 0 15px #9370db',
            opacity: '0.8',
          },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'float-particles': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}
