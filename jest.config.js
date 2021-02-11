module.exports = {
    preset: "ts-jest",
    setupFiles: ["dotenv/config"],
    collectCoverage: true,
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    },
};
