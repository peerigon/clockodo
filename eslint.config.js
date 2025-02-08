import typescriptNodePreset from "@peerigon/configs/eslint/presets/typescript-node";
import stylesNoDefaultExport from "@peerigon/configs/eslint/styles/no-default-export";

export default [...typescriptNodePreset, ...stylesNoDefaultExport];
