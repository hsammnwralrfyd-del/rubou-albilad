import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        sans: ["Tajawal", "Cairo", "Segoe UI", "Tahoma", "sans-serif"],
        display: ["Tajawal", "Cairo", "Segoe UI", "Tahoma", "sans-serif"],
      },

      colors: {
        brand: {
          DEFAULT: "#1E3A8A",
          light: "#2563EB",
          dark: "#1E40AF",
        },
        charcoal: {
          DEFAULT: "#1F2937",
          soft: "#374151",
        },
        ivory: {
          DEFAULT: "#FFFFFF",
          dark: "#F3F4F6",
        },
        bronze: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          dark: "#B45309",
        },
        border: "#D1D5DB",
        input: "#D1D5DB",
        ring: "#3B82F6",
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F9FAFB",
          dark: "#F3F4F6",
        },
        foreground: "#111827",
        primary: {
          DEFAULT: "#1E3A8A",
          light: "#2563EB",
          dark: "#1E40AF",
          foreground: "#FFFFFF",
          hover: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#4B5563",
          light: "#6B7280",
          dark: "#374151",
          foreground: "#FFFFFF",
          hover: "#374151",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          dark: "#B45309",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        text: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#6B7280",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232, 160, 23, 0.35)" },
          "50%": { boxShadow: "0 0 0 10px rgba(232, 160, 23, 0)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
    },
  },

  plugins: [tailwindcssAnimate],
} satisfies Config;
