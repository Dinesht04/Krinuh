const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        krinuh: {
          primary: "#9d2470",
          primaryDark: "#7c1c58",
          light: "#f8e8f3",
          secondary: "#dfcce3",
          secondaryBorder: "#d0bdd7",
          text: "#414141",
          textLight: "#414141BF",
          muted: "#6a6a6a",
          ash: "#f3f3f3",
          hairline: "#cccccc",
          nearBlack: "#1e1e1e",
          ink: "#121212",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        script: ["var(--font-sacramento)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      spacing: {
        "tn-xs": "5px",
        "tn-sm": "8px",
        "tn-md": "10px",
        "tn-md-plus": "12px",
        "tn-nav-v": "15px",
        "tn-lg": "16px",
        "tn-nav-h": "17px",
        "tn-xl": "20px",
        "tn-2xl": "30px",
        "tn-3xl": "35px",
        "tn-4xl": "40px",
        "tn-5xl": "50px",
      },
      boxShadow: {
        "card-float": "0px 4px 20px 0px rgba(0, 0, 0, 0.1)",
        "dropdown-lift": "0px 4px 5px 0px rgba(18, 18, 18, 0.05)",
        "soft-glow": "0px 0px 17px -5px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        subtle: "2px",
        soft: "5px",
        "tn-rounded": "7px",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 

export default config
