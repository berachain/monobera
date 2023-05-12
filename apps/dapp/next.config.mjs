import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],

  experimental: {
    appDir: true,
    mdxRs: true,
    typedRoutes: true,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
