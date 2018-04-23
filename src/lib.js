"use strict";

const axios = require("axios");
const camelCase = require("camelcase");
const deepMapKeys = require("deep-map-keys");
const qs = require("qs");
const mapParams = require("./mapParams");

const ENDPOINT = "https://my.clockodo.com/api";
const axiosClient = Symbol("axiosClient");

class ClockodoLib {
    constructor(user, apiKey) {
        this[axiosClient] = axios.create({
            baseURL: ENDPOINT,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey,
            },
        });
    }
    async get(resource, params = {}) {
        const response = await this[axiosClient].get(resource, {
            params: mapParams(params),
            paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
            },
        });

        return deepMapKeys(response.data, key => camelCase(key));
    }
    async put(resource, params = {}) {
        const response = await this[axiosClient].put(resource, {
            params: mapParams(params),
            paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
            },
        });

        return deepMapKeys(response.data, key => camelCase(key));
    }
    async post(resource, params = {}) {
        const response = await this[axiosClient].post(resource, {
            params: mapParams(params),
            paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
            },
        });

        return deepMapKeys(response.data, key => camelCase(key));
    }
    async delete(resource, params = {}) {
        const response = await this[axiosClient].delete(resource, {
            params: mapParams(params),
            paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
            },
        });

        return deepMapKeys(response.data, key => camelCase(key));
    }
}

module.exports = {
    ClockodoLib,
};
