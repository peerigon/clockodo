"use strict";

import axios from "axios";
import camelCase from "camelcase";
import deepMapKeys from "deep-map-keys";
import qs from "qs";
import mapKeys from "./mapKeys";

const ENDPOINT = "https://my.clockodo.com/api";
const axiosClient = Symbol("axiosClient");

export class ClockodoLib {
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
            params: mapKeys(params),
            paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
            },
        });

        return deepMapKeys(response.data, key => camelCase(key));
    }
    async post(resource, params = {}) {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].post(resource, mappedObj);

        return deepMapKeys(response.data, key => camelCase(key));
    }
    async put(resource, params = {}) {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].put(resource, qs.stringify(mappedObj), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        return deepMapKeys(response.data, key => camelCase(key));
    }
    async delete(resource, params = {}) {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].delete(resource, { data: mappedObj });

        return deepMapKeys(response.data, key => camelCase(key));
    }
}