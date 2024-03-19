import type { Config } from "tailwindcss"

import typography from "@tailwindcss/typography"
import forms from "@tailwindcss/forms"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        button: "inset 0px 1px 0px 0px rgba(255, 255, 255, 0.10)",
      },
      colors: {
        "blue-ribbon": {
          "50": "#f2fbff",
          "100": "#e6f7ff",
          "200": "#c2e8ff",
          "300": "#9cd6ff",
          "400": "#52a5ff",
          "500": "#076aff",
          "600": "#075ce6",
          "700": "#0445bf",
          "800": "#033399",
          "900": "#012173",
          "950": "#01134a",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.04em",
      },
    },
  },
  plugins: [typography, forms],
}

export default config
