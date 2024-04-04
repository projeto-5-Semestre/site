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
<<<<<<< HEAD
      },colors:{
      fund: "#0D1F2D",
      txt: "#EFF1F3",
      grid: "#555",
      shad: "#008190"
      }
=======
      },
>>>>>>> 06dc9a0891bab82567eff60faeb514d537b4ae5b
    },
  },
  plugins: [
    
  ],
  corePlugins: {
    backdropFilter: true,
  }
};
export default config;
