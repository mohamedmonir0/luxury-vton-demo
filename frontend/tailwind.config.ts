import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        ivory: "#faf7ef",
        gold: "#d4af37",
        "gold-deep": "#8f6b16",
      },
      boxShadow: {
        luxury: "0 20px 80px rgba(0, 0, 0, 0.45)",
        gilded: "0 18px 60px rgba(212, 175, 55, 0.08)",
      },
      borderRadius: {
        panel: "32px",
      },
      backgroundImage: {
        "luxury-radial":
          "radial-gradient(circle at top, rgba(212, 175, 55, 0.18), transparent 28%)",
        "luxury-panel":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
      },
    },
  },
  plugins: [],
};

export default config;
