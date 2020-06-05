import axios from "axios";
import camelCaseKeys from "camelcase-keys";
import qs from "qs";
import {setup} from "axios-cache-adapter";
import mapKeys from "./mapKeys";

const ENDPOINT = "https://my.clockodo.com/api";
const axiosClient = Symbol("axiosClient");

const transformRequestOptions = params => {
    const urlParams = [];

    for (const [key, value] of Object.entries(params)) {
        if (key === "grouping") {
            urlParams.push(qs.stringify({[key]: value}, {arrayFormat: "brackets"}));
        } else {
            urlParams.push(qs.stringify({[key]: value}, {arrayFormat: "repeat"}));
        }
    }

    return urlParams.join("&");
};

export class ClockodoLib {
    constructor({user, apiKey, cacheTime}: { user: string; apiKey: string; cacheTime?: number }) {
        const baseConfig = {
            baseURL: ENDPOINT,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey,
            },
        };

        this[axiosClient] = typeof cacheTime === "number" ?
            setup({
                ...baseConfig,
                cache: {
                    maxAge: cacheTime,
                    exclude: {query: false},
                },
            }) :
            axios.create(baseConfig);
    }

    async get(resource, params = {}) {
        const response = await this[axiosClient].get(resource, {
            params: mapKeys(params),
            paramsSerializer: transformRequestOptions,
        });

        return camelCaseKeys(response.data, {deep: true});
    }

    async post(resource, params = {}) {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].post(resource, mappedObj);

        return camelCaseKeys(response.data, {deep: true});
    }

    async put(resource, params = {}) {
        const mappedObj = mapKeys(params);

        const response = await this[axiosClient].put(resource, qs.stringify(mappedObj), {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        });

        return camelCaseKeys(response.data, {deep: true});
    }

    async delete(resource, params = {}) {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].delete(resource, {data: mappedObj});

        return camelCaseKeys(response.data, {deep: true});
    }
}
