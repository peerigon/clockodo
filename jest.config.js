"use strict";

module.exports = {
    preset: "ts-jest",
    setupFiles: ["dotenv/config"],
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    }
};
