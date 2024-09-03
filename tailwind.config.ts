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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "darkslate-500": "#171717",
        "darkslate-400": "#383838",
        "darkslate-300": "#6b6b6b",
        "ThemeRed": "#cf2f3d",
        "ThemeBlue": "#1e88e5",
        "ThemeGreen": "#4caf50",
        "ThemeYellow": "#fdd835",
        "ThemePurple": "#8e24aa",
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
