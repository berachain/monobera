const config = {
  entryPoints: [
    "src/abi/index.ts",
    "src/actions/index.ts",
    "src/contexts/index.ts",
    "src/enum/index.ts",
    "src/hooks/index.ts",
    "src/types/index.ts",
    "src/utils/index.ts",
  ], // The entry point(s) of your library
  format: ["esm"], // The desired output format(s)
  clean: true,
  splitting: true,
  outDir: "dist",
  skipNodeModulesBundle: true,
  minify: true, // Whether to minify the output
  sourcemap: true, // Whether to generate sourcemaps
  // splitting: true, // Whether to split the bundle into chunks
  dts: true, // Whether to generate TypeScript declaration files
  // target: "node18", // Specify your target environment
};

export default config;
