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
          DEFAULT: "#0F5C4C",
          light: "#167A66",
          dark: "#0A4238",
        },
        charcoal: {
          DEFAULT: "#122819",
          soft: "#2A403B",
        },
        ivory: {
          DEFAULT: "#F5F8F6",
          dark: "#E8EFEC",
        },
        bronze: {
          DEFAULT: "#E8A017",
          light: "#F0B83A",
          dark: "#C48910",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#F5F8F6",
          light: "#FFFFFF",
          dark: "#E8EFEC",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0F5C4C",
          light: "#167A66",
          dark: "#0A4238",
          foreground: "#FFFFFF",
          hover: "#0A4238",
        },
        secondary: {
          DEFAULT: "#3D5A54",
          light: "#5F7A73",
          dark: "#2A403B",
          foreground: "#FFFFFF",
          hover: "#2A403B",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#E8A017",
          light: "#F0B83A",
          dark: "#C48910",
          foreground: "#122819",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          primary: "#122819",
          secondary: "#3D5A54",
          muted: "#6B857E",
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
