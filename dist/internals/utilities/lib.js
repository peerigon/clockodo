"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const camelcase_1 = __importDefault(require("camelcase"));
const deep_map_keys_1 = __importDefault(require("deep-map-keys"));
const qs_1 = __importDefault(require("qs"));
const mapKeys_1 = __importDefault(require("./mapKeys"));
const ENDPOINT = "https://my.clockodo.com/api";
const axiosClient = Symbol("axiosClient");
const transformRequestOptions = params => {
    const urlParams = [];
    for (const [key, value] of Object.entries(params)) {
        if (key === "grouping") {
            urlParams.push(qs_1.default.stringify({ [key]: value }, { arrayFormat: "brackets" }));
        }
        else {
            urlParams.push(qs_1.default.stringify({ [key]: value }, { arrayFormat: "repeat" }));
        }
    }
    return urlParams.join("&");
};
class ClockodoLib {
    constructor(user, apiKey) {
        this[axiosClient] = axios_1.default.create({
            baseURL: ENDPOINT,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey,
            },
        });
    }
    async get(resource, params = {}) {
        const response = await this[axiosClient].get(resource, {
            params: mapKeys_1.default(params),
            paramsSerializer: transformRequestOptions,
        });
        return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
    }
    async post(resource, params = {}) {
        const mappedObj = mapKeys_1.default(params);
        try {
            const response = await this[axiosClient].post(resource, mappedObj);
            return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
        }
        catch (error) {
            console.log(error);
            console.log(error.data);
            throw error;
        }
    }
    async put(resource, params = {}) {
        const mappedObj = mapKeys_1.default(params);
        const response = await this[axiosClient].put(resource, qs_1.default.stringify(mappedObj), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
    }
    async delete(resource, params = {}) {
        const mappedObj = mapKeys_1.default(params);
        const response = await this[axiosClient].delete(resource, { data: mappedObj });
        return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
    }
}
exports.ClockodoLib = ClockodoLib;
