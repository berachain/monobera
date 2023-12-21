/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@bera/eslint-config"], // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/auth/*"],
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  settings: {
    next: {
      rootDir: ["apps/dex"],
    },
  },
  globals: {
    TradingView: true,
    Datafeeds: true,
  },
};


module.exports = config;
