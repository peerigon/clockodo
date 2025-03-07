import { defineConfig } from "vitest/config";

const isIntegrationTest = process.argv.at(-1) === "integration.test.ts";

export default defineConfig({
  test: {
    include: ["src/**/*.test.?(c|m)[jt]s?(x)"],
    exclude: isIntegrationTest ? [] : ["src/integration.test.ts"],
    setupFiles: ["dotenv/config", "./src/tests/setup.ts"],
    coverage: {
      provider: "v8",
    },
  },
  plugins: [],
});
