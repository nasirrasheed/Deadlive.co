import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
      colors: {
        'deep-purple': '#4B0082',
        'faded-gold': '#DAA520',
        'dark-gray': '#2D2D2D',
      },
      backgroundImage: {
        'haunted-gradient':
          'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(75,0,130,0.3), rgba(0,0,0,0.9))',
        'mystical-gradient':
          'linear-gradient(45deg, rgba(218,165,32,0.1), rgba(75,0,130,0.1))',
      },
    },
  },
  plugins: [],
};

export default config;
