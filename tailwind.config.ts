import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
  first: "moveVertical 18s ease-in-out infinite",
  second: "moveInCircle 22s linear infinite",
  third: "moveHorizontal 26s ease-in-out infinite",
  "shiny-text": "shiny-text 8s infinite",
},
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-40%) translateY(-10%)" },
          "50%": { transform: "translateX(40%) translateY(10%)" },
          "100%": { transform: "translateX(-40%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-30%)" },
          "50%": { transform: "translateY(30%)" },
          "100%": { transform: "translateY(-30%)" },
        },
        "shiny-text": {
  "0%, 90%, 100%": {
    backgroundPosition: "calc(-100% - var(--shiny-width)) 0",
  },
  "30%, 60%": {
    backgroundPosition: "calc(100% + var(--shiny-width)) 0",
  },
},
      },
    },
  },
  plugins: [],
};

export default config;
