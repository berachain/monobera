import { readFile, writeFile } from "fs/promises";

const entryPoints = [
  "./src/modules/governance/index.ts",
  "./src/modules/chain/index.ts",
];
const config = {
  entryPoints: ["./src/index.ts", ...entryPoints], // The entry point(s) of your library
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

  async onSuccess() {
    const pkgJson = JSON.parse(
      await readFile("./package.json", {
        encoding: "utf-8",
      }),
    ) as PackageJson;
    pkgJson.exports = {
      ".": {
        import: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
    };
    entryPoints
      .filter((e) => e.endsWith(".ts"))
      .forEach((entry) => {
        const file = entry
          .replace("./src/", "")
          .replace("modules/", "")
          .replace("/index.ts", "");

        pkgJson.exports[`./${file}`] = {
          import: `./dist/modules/${file}/index.js`,
          types: `./dist/modules/${file}/index.d.ts`,
        };
        pkgJson.typesVersions["*"][file] = [`dist/modules/${file}/index.d.ts`];
      });

    await writeFile("./package.json", JSON.stringify(pkgJson, null, 2));
  },
};

export default config;

type PackageJson = {
  name: string;
  exports: Record<string, { import: string; types: string } | string>;
  typesVersions: Record<"*", Record<string, string[]>>;
  files: string[];
  dependencies: Record<string, string>;
  pnpm: {
    overrides: Record<string, string>;
  };
};
