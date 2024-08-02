import typescriptPreset from "@peerigon/configs/eslint/presets/typescript";
import stylesNoDefaultExport from "@peerigon/configs/eslint/styles/no-default-export";

export default [...typescriptPreset, ...stylesNoDefaultExport];
