import typescriptPreset from "@peerigon/configs/eslint/presets/typescript";
import vitestRules from "@peerigon/configs/eslint/rules/vitest";
import stylesNoDefaultExport from "@peerigon/configs/eslint/styles/no-default-export";

export default [...typescriptPreset, ...vitestRules, ...stylesNoDefaultExport];
