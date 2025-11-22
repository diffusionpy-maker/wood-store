import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        success: '#52c41a',
        warning: '#faad14',
        danger: '#ff4d4f'
      }
    }
  },
  corePlugins: {
    preflight: false
  }
};

export default config;
