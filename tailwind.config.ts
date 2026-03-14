import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kemut: {
          yellow: "#FFD60A",
          "yellow-light": "#FFF3B0",
          "yellow-dark": "#E6B800",
          orange: "#FF8C42",
          cream: "#FFFBEA",
          brown: "#6B3A2A",
          "brown-light": "#A0522D",
          pink: "#FF6B9D",
          mint: "#4ECDC4",
          sky: "#74B9FF",
          dark: "#1A0A00",
          "dark-soft": "#2D1500",
        },
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        pacifico: ["var(--font-pacifico)", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 8s linear infinite",
        blob: "blob 7s infinite",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        kemut: "4px 4px 0px #1A0A00",
        "kemut-lg": "6px 6px 0px #1A0A00",
        "kemut-xl": "8px 8px 0px #1A0A00",
        "kemut-yellow": "4px 4px 0px #E6B800",
        glow: "0 0 30px rgba(255, 214, 10, 0.5)",
        "glow-lg": "0 0 50px rgba(255, 214, 10, 0.7)",
      },
    },
  },
  plugins: [],
};
export default config;
