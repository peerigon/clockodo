module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    collectCoverage: true,
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    },
};
