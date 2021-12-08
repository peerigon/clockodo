module.exports = {
  // js-with-ts is currently necessary because we need to transform node_modules, like "map-obj"
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  transformIgnorePatterns: ["/node_modules/(?!(map-obj)/)"],
  collectCoverage: true,
  resolver: "ts-jest-resolver",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
