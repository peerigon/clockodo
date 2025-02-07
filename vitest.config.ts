import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.?(c|m)[jt]s?(x)"],
    setupFiles: ["dotenv/config", "./src/tests/setup.ts"],
    coverage: {
      provider: "v8",
    },
  },
  plugins: [],
});
