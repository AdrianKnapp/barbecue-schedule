import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#FFD836',
        },
        dark: {
          light: '#303030',
          default: '#000000',
        }
      },
      transitionDuration: {
        default: '200ms',
      }
    },
  },
  plugins: [require('tailwind-gradient-mask-image')],
};
export default config;
