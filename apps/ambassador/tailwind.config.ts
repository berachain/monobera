import baseConfig from "@bera/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: baseConfig.content,
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        background: "#yourColorValue",
      },
      backdropBlur: {
        none: "0",
        blur: "blur(100px)",
        "blur-lg": "blur(64px)",
        "blur-md": "blur(32px)",
        "blur-sm": "blur(16px)",
        "blur-xs": "blur(8px)",
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ["responsive"], // or other variants you need
    },
  },
  plugins: [],
} satisfies Config;
