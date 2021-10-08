module.exports = {
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  resolver: "ts-jest-resolver",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
