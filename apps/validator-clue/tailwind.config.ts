import baseConfig from "@bera/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: baseConfig.content,
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        "retro-gaming": ["var(--font-retro-gaming)", "sans-serif"],
        "jet-brains-mono": ["var(--font-jet-brains-mono)", "monospace"],
      },
    },
  },
} satisfies Config;
