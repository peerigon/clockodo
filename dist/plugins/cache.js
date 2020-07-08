"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_cache_adapter_1 = require("axios-cache-adapter");
const symbols_1 = require("../internals/utilities/symbols");
const cachePlugin = (config) => (clockodo) => {
    if (typeof config.cacheTime !== "number") {
        throw new Error("Clockodo cacheTime expected to be a number, is typeof: " + typeof config.cacheTime);
    }
    clockodo[symbols_1.axiosClient] =
        axios_cache_adapter_1.setup({
            baseURL: clockodo[symbols_1.axiosClient].defaults.baseURL,
            headers: clockodo[symbols_1.axiosClient].defaults.headers,
            cache: {
                maxAge: config.cacheTime,
                exclude: { query: false },
            },
        });
};
exports.default = cachePlugin;
