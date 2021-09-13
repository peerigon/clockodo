module.exports = {
    preset: "ts-jest",
    setupFiles: ["dotenv/config"],
    collectCoverage: true,
    resolver: "ts-jest-resolver",
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    },
};
