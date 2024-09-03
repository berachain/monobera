import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  trailingSlash: true,
  transpilePackages: ["@bera/ui", "@bera/berajs", "@bera/wagmi"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: process.env.NEXT_PUBLIC_HOST === "ipfs" ? "export" : undefined,
  experimental: {
    esmExternals: "loose",
    webpackBuildWorker: true,
    missingSuspenseWithCSRBailout: false,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    unoptimized: process.env.NEXT_PUBLIC_HOST === "ipfs" ? true : undefined,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: "",
        pathname: "/static/img/coins/**",
      },
    ],
    domains: [
      "res.cloudinary.com",
      "raw.githubusercontent.com",
      "s3.amazonaws.com",
    ],
  },
};

export default config;
