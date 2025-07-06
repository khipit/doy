/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'terminal': ['Press Start 2P', 'VT323', 'Orbitron', 'monospace'],
        'body': ['Anaheim', 'system-ui', 'sans-serif'],
        'fredoka': ['Fredoka', 'cursive'],
        'space': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wobble': 'wobble 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'crawl': 'crawl 2s ease-in-out infinite',
        'dotted-line': 'dotted-line 2s linear infinite',
        'connection-pulse': 'connection-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(12deg)' },
          '50%': { transform: 'translateY(-10px) rotate(12deg)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        crawl: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'dotted-line': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '20' },
        },
        'connection-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};