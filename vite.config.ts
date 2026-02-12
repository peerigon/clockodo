import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import { env } from "./src/env.ts";

const { CI } = env;
const isIntegrationTest = process.argv.at(-1) === "integration.test.ts";

export default defineConfig(({ mode }) => ({
  test: {
    env: loadEnv(mode, import.meta.dirname, ""),
    include: ["src/**/*.test.?(c|m)[jt]s?(x)"],
    exclude: isIntegrationTest ? [] : ["src/integration.test.ts"],
    setupFiles: ["dotenv/config", "./src/tests/setup.ts"],
    coverage: {
      enabled: CI,
      reporter: ["html", "lcov"],
      include: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  },
}));
