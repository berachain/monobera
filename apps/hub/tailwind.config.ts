import baseConfig from "@bera/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: baseConfig.content,
  presets: [baseConfig],
  theme: {
    extend: {
      animation: {
        orbit: "orbit calc(var(--duration)*1s) ease-in-out infinite",
        moveRight: "moveRight calc(var(--duration)*1s) ease-in-out infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(calc(var(--start) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--start) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(var(--end) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--end) * -1deg))",
          },
        },
        moveRight: {
          "0%": {
            transform: "translateX(-50px) translateY(-50%)",
          },
          "100%": {
            transform: "translateX(420px) translateY(-50%)",
          },
        },
      },
    },
  },
} satisfies Config;
