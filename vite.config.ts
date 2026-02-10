import { defineConfig } from "vitest/config";

const isCi = process.env["CI"] === "true";

export default defineConfig({
  test: {
    coverage: {
      enabled: isCi,
      reporter: ["html", "lcov"],
      include: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  },
});
