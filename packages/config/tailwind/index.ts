import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/*.{ts,tsx}",
    "../../packages/shared-ui/src/*.{ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "3rem" }],
      "4xl": ["2.5rem", { lineHeight: "3rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      ...Array.from({ length: 16 }, (_, i) => i + 1).reduce(
        (acc, val) => ({ ...acc, [val]: String(val) }),
        {}
      ),
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "4rem",
      },
      screens: {
        // xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      minHeight: {
        minimum: "calc(100vh - 191px)",
        "screen-250": "calc(100vh - 214px)",
      },
      width: {
        "screen-w-400": "calc(100vw - 400px)",
      },
      maxWidth: {
        "1280": "1280px",
      },
      backgroundImage: {
        glow: "url('/glow.png')",
        "honey-gradient":
          "linear-gradient(180deg, #FFFCF2 19.89%, #FFF2D0 100%)",
        lend: "url('/heroBgnd.png')",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border) / <alpha-value>)",
      },
      boxShadow: {
        "dark-shadow": "0px 12px 250px 0px #A571239E",
        "light-shadow": "0px 12px 250px 0px #FFE1C91A",
      },
      padding: {
        start: "106px",
        "start-lg": "154px",
      },
      colors: {
        hover: "hsl(var(--hover) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        backgroundSecondary: "hsl(var(--background-secondary) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        foregroundSecondary: "hsl(var(--foreground-secondary) / <alpha-value>)",
        foregroundTertiary: "hsl(var(--foreground-tertiary) / <alpha-value>)",
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          secondary: "hsl(var(--border-secondary) / <alpha-value>)",
        },
        input: "hsl(var(--input) / <alpha-value>)",
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        positive: "hsl(var(--positive) / <alpha-value>)",
        foundationTheme: "#775A49",
        hubTheme: "#E6B434",
        honeyTheme: "#EC8A19",
        bendTheme: "#41D6E0",
        berpsTheme: "#E96042",
        berascanTheme: "#96532C",
        faucetTheme: "#326FE5",
        ecosystemTheme: "#2F2F2F",
      },
      borderRadius: {
        "2xs": "0.125rem",
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        honey: ["var(--font-honey)", ...fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "80%": { opacity: "0.6" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "80%": { opacity: "0.6" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        marquee: {
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-x": {
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-reverse": {
          to: { transform: "rotate(-360deg)" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration) linear infinite",
        "marquee-x": "marquee-x var(--marquee-duration) linear infinite",
        "fade-in": "fade-in 0.5s linear forwards",
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-slowly": "spin 20s linear infinite",
        "spin-reverse-slowly": "spin-reverse 20s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
        "orbit-spin": "spin 30s linear infinite",
        "orbit-spin-reverse": "spin-reverse 30s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
