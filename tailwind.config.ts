import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f6f7",
          100: "#e4e9eb",
          200: "#c7d1d5",
          300: "#a1aeb4",
          400: "#77878f",
          500: "#5a6b73",
          600: "#46545c",
          700: "#333f45",
          800: "#20282d",
          900: "#141a1e",
          950: "#0a0d0f",
        },
        accent: {
          300: "#7fe3d8",
          400: "#4fd6c6",
          500: "#22b8a8",
          600: "#188f83",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      /* Motion tokens — one easing family, a few durations (pleurat-inspired) */
      transitionTimingFunction: {
        standard: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        micro: "150ms",
        normal: "300ms",
        reveal: "600ms",
      },
      boxShadow: {
        "glow-sm": "0 0 0 1px rgba(79, 214, 198, 0.25), 0 4px 24px -6px rgba(79, 214, 198, 0.35)",
        "glow-md": "0 0 0 1px rgba(79, 214, 198, 0.3), 0 8px 40px -8px rgba(79, 214, 198, 0.45)",
        lift: "0 12px 32px -12px rgba(0, 0, 0, 0.55)",
        "nav-shadow": "0 1px 0 0 rgba(255,255,255,0.06), 0 8px 24px -16px rgba(0,0,0,0.5)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(79, 214, 198, 0.0)" },
          "50%": { boxShadow: "0 0 24px 2px rgba(79, 214, 198, 0.25)" },
        },
        dotBounce: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "scale-in": "scaleIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "dot-bounce": "dotBounce 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
