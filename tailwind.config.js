export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deck: {
          bg: '#050505',
          surface: '#121212',
          text: '#F5F5F5',
          muted: '#BDBDBD',
          platinum: '#E5E7EB',
          silver: '#B8B8B8',
          gold: '#D4AF37',
          ice: '#7DD3FC',
          bluegray: '#93C5FD',
          warmgold: '#FBBF24',
          joker: '#C084FC',
        },
      },
      boxShadow: {
        deck: '0 35px 90px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        slowrotate: 'slowrotate 6s ease-in-out infinite',
        glowpulse: 'glowpulse 4s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slowrotate: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        glowpulse: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(212, 175, 55, 0.08)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.18)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
