import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'benzo-landing': "url('/images/benzo/backgrounds/landing.jpeg')",
        'benzo-memories': "url('/images/benzo/backgrounds/memories.jpg')",
        'benzo-message': "url('/images/benzo/backgrounds/message.jpg')",
        'benzo-selector': "url('/images/benzo/backgrounds/landing.jpg')",
        'benzo-time-together': "url('/images/benzo/backgrounds/time-to-gether.jpg')",
        'benzo-quiz': "url('/images/benzo/backgrounds/quiz.jpeg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        Libre: ['Libre Baskerville', 'sans-serif'],
        Prompt: ['Prompt', 'sans-serif']
      }
    },
  },
  plugins: [],
};
export default config;
