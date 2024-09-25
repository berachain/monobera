const config = {
  entryPoints: ["index.ts"], // The entry point(s) of your library
  format: ["esm"], // The desired output format(s)
  clean: true,
  splitting: true,
  outDir: "dist",
  skipNodeModulesBundle: true,
  minify: process.env.NODE_ENV !== "development", // Whether to minify the output
  sourcemap: process.env.NODE_ENV !== "development", // Whether to generate sourcemaps
  // splitting: true, // Whether to split the bundle into chunks
  dts: true, // Whether to generate TypeScript declaration files
  // target: "node18", // Specify your target environment
};

export default config;
