// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
};

export default config;
