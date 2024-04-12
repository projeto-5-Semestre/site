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
        fund: "#0D1F2D",
        txt: "#EFF1F3",
        grid: "#555",
        shad: "#008190",
      },

      keyframes: {
        flip: {
          "0%, 100%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(180deg)" },
        },
      },
      animation: {
        "flip-once": "flip 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
