"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const camelcase_1 = __importDefault(require("camelcase"));
const deep_map_keys_1 = __importDefault(require("deep-map-keys"));
const qs_1 = __importDefault(require("qs"));
const axios_cache_adapter_1 = require("axios-cache-adapter");
const mapKeys_1 = __importDefault(require("./mapKeys"));
const DEFAULT_BASE_URL = "https://my.clockodo.com/api";
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
    constructor({ user, apiKey, cacheTime, baseUrl = DEFAULT_BASE_URL }) {
        const baseConfig = {
            baseURL: baseUrl,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey,
            },
        };
        this[axiosClient] = typeof cacheTime === "number" ?
            axios_cache_adapter_1.setup(Object.assign(Object.assign({}, baseConfig), { cache: {
                    maxAge: cacheTime,
                    exclude: { query: false },
                } })) :
            axios_1.default.create(baseConfig);
    }
    get(resource, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this[axiosClient].get(resource, {
                params: mapKeys_1.default(params),
                paramsSerializer: transformRequestOptions,
            });
            return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
        });
    }
    post(resource, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedObj = mapKeys_1.default(params);
            const response = yield this[axiosClient].post(resource, mappedObj);
            return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
        });
    }
    put(resource, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedObj = mapKeys_1.default(params);
            const response = yield this[axiosClient].put(resource, qs_1.default.stringify(mappedObj), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
        });
    }
    delete(resource, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedObj = mapKeys_1.default(params);
            const response = yield this[axiosClient].delete(resource, { data: mappedObj });
            return deep_map_keys_1.default(response.data, key => camelcase_1.default(key));
        });
    }
}
exports.ClockodoLib = ClockodoLib;
