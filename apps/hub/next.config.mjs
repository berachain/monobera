import { withSentryConfig } from "@sentry/nextjs";

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
    instrumentationHook: true,
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

export default withSentryConfig(config, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
