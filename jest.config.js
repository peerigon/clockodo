export default {
  preset: "ts-jest/presets/default-esm",
  setupFiles: ["dotenv/config", "./src/tests/setup.js"],
  setupFilesAfterEnv: ["./src/tests/setupAfterEnv.js"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  resolver: "ts-jest-resolver",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      diagnostics: false,
      useESM: true,
    },
  },
};
