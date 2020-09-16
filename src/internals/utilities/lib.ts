import axios from "axios";
import camelCaseKeys from "camelcase-keys";
import qs from "qs";
import { axiosClient } from "./symbols";
import mapKeys from "./mapKeys";

const DEFAULT_BASE_URL = "https://my.clockodo.com/api";

const transformRequestOptions = (params: Record<string, string>) => {
    const urlParams = [];

    for (const [key, value] of Object.entries(params)) {
        if (key === "grouping") {
            urlParams.push(
                qs.stringify({ [key]: value }, { arrayFormat: "brackets" })
            );
        } else {
            urlParams.push(
                qs.stringify({ [key]: value }, { arrayFormat: "repeat" })
            );
        }
    }

    return urlParams.join("&");
};

export class ClockodoLib {
    [axiosClient]: ReturnType<typeof axios.create>;

    constructor({
        user,
        apiKey,
        baseUrl = DEFAULT_BASE_URL,
    }: {
        user: string;
        apiKey: string;
        baseUrl?: string;
    }) {
        const baseConfig = {
            baseURL: baseUrl,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey,
            },
        };

        this[axiosClient] = axios.create(baseConfig);
    }

    get = async <Result = any>(
        resource: string,
        params = {}
    ): Promise<Result> => {
        const response = await this[axiosClient].get(resource, {
            params: mapKeys(params),
            paramsSerializer: transformRequestOptions,
        });

        return camelCaseKeys(response.data, { deep: true }) as Result;
    };

    post = async <Result = any>(
        resource: string,
        params = {}
    ): Promise<Result> => {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].post(resource, mappedObj);

        return camelCaseKeys(response.data, { deep: true }) as Result;
    };

    put = async <Result = any>(
        resource: string,
        params = {}
    ): Promise<Result> => {
        const mappedObj = mapKeys(params);

        const response = await this[axiosClient].put(
            resource,
            qs.stringify(mappedObj),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return camelCaseKeys(response.data, { deep: true }) as Result;
    };

    delete = async <Result = any>(
        resource: string,
        params = {}
    ): Promise<Result> => {
        const mappedObj = mapKeys(params);
        const response = await this[axiosClient].delete(resource, {
            data: mappedObj,
        });

        return camelCaseKeys(response.data, { deep: true }) as Result;
    };
}
