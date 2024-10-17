import { readFile, writeFile } from "fs/promises";
import { defineConfig, type Options } from "tsup";

// TODO: Would be nice not having to split up the client and server
// and just have esbuild keep the directives so that components with
// the directive stays a client component and the rest is server...
const client = [
  "./src/accordion.tsx",
  "./src/alert.tsx",
  "./src/alert-dialog.tsx",
  "./src/avatar.tsx",
  "./src/bera-chart.tsx",
  "./src/calendar.tsx",
  "./src/checkbox.tsx",
  "./src/command.tsx",
  "./src/dialog.tsx",
  "./src/dropdown-menu.tsx",
  "./src/form.tsx",
  "./src/form-error.tsx",
  "./src/hover-card.tsx",
  "./src/input.tsx",
  "./src/label.tsx",
  "./src/popover.tsx",
  "./src/progress.tsx",
  "./src/resizable.tsx",
  "./src/scroll-area.tsx",
  "./src/select.tsx",
  "./src/separator.tsx",
  "./src/sheet.tsx",
  "./src/switch.tsx",
  "./src/tabs.tsx",
  "./src/text-area.tsx",
  "./src/toaster.tsx",
  "./src/toggle.tsx",
  "./src/tooltip.tsx",
  "./src/use-toast.tsx",
  "./src/navigation-menu.tsx",
  "./src/slider.tsx",
  "./src/chart.tsx",
  "./src/recharts.tsx",
  "./src/pagination.tsx",
  "./src/table/index.ts",
  "./src/table/legacy/index.ts",
];

const server = [
  "./src/badge.tsx",
  "./src/button.tsx",
  "./src/icons.tsx",
  "./src/card.tsx",
  "./src/table.tsx",
  "./src/toast.tsx",
  "./src/skeleton.tsx",
  "./src/multiple-selector.tsx",
];

export default defineConfig((opts) => {
  const common = {
    clean: !opts.watch,
    dts: true,
    format: ["esm"],
    minify: process.env.NODE_ENV !== "development",
    outDir: "dist",
  } satisfies Options;

  return [
    {
      // separate not to inject the banner
      ...common,
      entry: ["./src/index.ts", ...server],
    },
    {
      ...common,
      entry: client,
      esbuildOptions: (opts) => {
        opts.banner = {
          js: '"use client";',
        };
      },
      async onSuccess() {
        const pkgJson = JSON.parse(
          await readFile("./package.json", {
            encoding: "utf-8",
          }),
        ) as PackageJson;
        pkgJson.exports = {
          "./package.json": "./package.json",
          ".": {
            import: "./dist/index.mjs",
            types: "./dist/index.d.ts",
          },
        };
        [...client, ...server]
          .filter((e) => e.endsWith(".tsx"))
          .forEach((entry) => {
            const file = entry.replace("./src/", "").replace(".tsx", "");
            pkgJson.exports["./" + file] = {
              import: "./dist/" + file + ".mjs",
              types: "./dist/" + file + ".d.ts",
            };
            pkgJson.typesVersions["*"][file] = ["dist/" + file + ".d.ts"];
          });

        await writeFile("./package.json", JSON.stringify(pkgJson, null, 2));
      },
    },
  ];
});

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
