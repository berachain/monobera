import baseConfig from "@bera/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: baseConfig.content,
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        retroGaming: ['var(--font-retro-gaming)', 'sans-serif'],
        jetBrainsMono: ['var(--font-jet-brains-mono)', 'monospace'],
      },
    },
  },
} satisfies Config;
