import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "peach-sand": "var(--peach-sand)",
        maize: "var(--maize)",
        "tamarind-orange": "var(--tamarind-orange)",
        "chili-red": "var(--chili-red)",
        "clay-umber": "var(--clay-umber)",
        "burnt-sienna": "var(--burnt-sienna)",
        "cacao-brown": "var(--cacao-brown)",
      },
      fontFamily: {
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        display1: ["var(--font-kaushan)", "cursive"],
        display2: ["var(--font-cinzel)", "serif"],
        label: ["var(--font-bebas)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 24px rgba(241,151,56,0.25)"
      },
      backgroundImage: {
        "nebula": "radial-gradient(1000px 600px at 10% -20%, rgba(241,151,56,0.15), transparent), radial-gradient(800px 400px at 90% 10%, rgba(215,67,12,0.12), transparent), radial-gradient(900px 600px at 50% 120%, rgba(52,33,20,0.25), transparent)",
      }
    },
  },
  plugins: [],
};

export default config;
