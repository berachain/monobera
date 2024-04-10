import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    "packages/proto/**",
    "packages/beracrocswap/**",
    "apps/perp/public/static/**",
    "**/tsup.config.ts",
  ],
  project: ["apps/dex/**", "apps/honey/**", "apps/lend/**"],
};

export default config;
