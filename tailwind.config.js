module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['"Pacifico"', 'cursive'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out both',
        'fade-in-delay': 'fade-in 1s ease-out 0.3s both',
        heart: 'float 10s linear infinite',
      },
    },
    colors: {
      sand: '#f8f7f5',
      latte: '#f4ede8',
      rose: '#ffb3c6',
      iguazu: '#5ac8fa',
      aqua: '#00d2ff',
      lavender: '#c8b6ff',
      sunset: '#ff8c61',
      sun: '#ffe066',
      offwhite: '#F8F5F0',
      taupe: '#B3A18B',
    },
  },
  plugins: [],
}; 