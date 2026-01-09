/** @type {import('tailwindcss').config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tarot mystic color palette
        primary: '#6B46C1',      // Мистический фиолетовый
        secondary: '#D946EF',    // Магический розовый
        accent: '#F59E0B',       // Золотой акцент
        background: '#0F0F1E',   // Темный фон

        // Glass morphism colors
        glass: {
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
          shadow: 'rgba(31, 38, 135, 0.37)',
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      animation: {
        'card-flip': 'card-flip 0.6s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },

      keyframes: {
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      fontFamily: {
        'mystic': ['serif'], // Для элегантных заголовков
      },
    },
  },
  plugins: [],
}