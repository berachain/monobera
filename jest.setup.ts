// jest.setup.ts
jest.mock("node-fetch", () => require("fetch-mock").sandbox());
Object.defineProperty(global, "fetch", { value: require("fetch-mock") });
