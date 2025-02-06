import { createDefaultEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const presetConfig = createDefaultEsmPreset({
  diagnostics: false,
});

const jestConfig: JestConfigWithTsJest = {
  setupFiles: ["dotenv/config", "./src/tests/setup.ts"],
  setupFilesAfterEnv: ["./src/tests/setupAfterEnv.ts"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  resolver: "ts-jest-resolver",
  ...presetConfig,
};

export default jestConfig;
