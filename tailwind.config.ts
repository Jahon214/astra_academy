import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        astra: {
          darkest: '#000000',
          dark: '#080808',
          card: '#0f0f0f',
          cardLight: '#171717',
          border: 'rgba(250, 204, 21, 0.2)',
          borderHover: 'rgba(250, 204, 21, 0.5)',
          gold: '#facc15',
          goldDark: '#eab308',
          cyan: '#00d2ff',
          blue: '#0084ff',
          glow: 'rgba(250, 204, 21, 0.25)',
          metallic: '#cbd5e1',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(250, 204, 21, 0.2)',
        'glow-md': '0 0 25px rgba(250, 204, 21, 0.35)',
        'glow-lg': '0 0 40px rgba(250, 204, 21, 0.45)',
        'glow-cyan': '0 0 25px rgba(0, 210, 255, 0.35)',
        'card': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fef08a 0%, #facc15 50%, #eab308 100%)',
        'metallic-gradient': 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #475569 100%)',
        'astra-gradient': 'linear-gradient(135deg, #facc15 0%, #f59e0b 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #141414 0%, #000000 80%)',
      },
    },
  },
  plugins: [],
};
export default config;
