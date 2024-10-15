import baseConfig from "@bera/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [baseConfig],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/*.{css,js,ts,jsx,tsx,mdx}",
    ...baseConfig.content,
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  plugins: [],
};
export default config;
