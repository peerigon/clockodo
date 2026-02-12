import { defineConfig } from "vitest/config";

const isCi = process.env["CI"] === "true";
const isIntegrationTest = process.argv.at(-1) === "integration.test.ts";

export default defineConfig({
  test: {
    include: ["src/**/*.test.?(c|m)[jt]s?(x)"],
    exclude: isIntegrationTest ? [] : ["src/integration.test.ts"],
    setupFiles: ["dotenv/config", "./src/tests/setup.ts"],
    coverage: {
      enabled: isCi,
      reporter: ["html", "lcov"],
      include: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  },
});
