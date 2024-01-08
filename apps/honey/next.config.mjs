import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  crossOrigin: "anonymous",
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  transpilePackages: ["@bera/ui", "@bera/berajs", "@bera/bera-router"],
  compiler: {
    removeConsole: true,
  },
  experimental: {
    esmExternals: "loose",
    webpackBuildWorker: true,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: "",
        pathname: "/static/img/coins/**",
      },
    ],
    domains: ["res.cloudinary.com", "raw.githubusercontent.com"],
  },
};

export default config;
