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
          darker: '#998220',
        },
        dark: {
          lightest: '#FAFAFA',
          lighter: '#F1F1F1',
          light: '#303030',
          default: '#000000',
        },
      },
      transitionDuration: {
        default: '200ms',
      },
    },
  },
  plugins: [],
};
export default config;
