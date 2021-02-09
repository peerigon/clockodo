import axios from "axios";
import qs from "qs";
import { axiosClient } from "./symbols";
import { mapQueryParams, mapRequestBody, mapResponseBody } from "./mappings";

const DEFAULT_BASE_URL = "https://my.clockodo.com/api";

const paramsSerializer = (params: Record<string, string>) => {
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

export type Authentication = {
    user: string;
    apiKey: string;
};

export type Config = {
    authentication?: Authentication;
    baseUrl?: string;
};

export class Api {
    [axiosClient] = axios.create({
        headers: {
            "X-ClockodoEnableIsoUtcDateTimes": "1",
        },
    });

    constructor({ baseUrl = DEFAULT_BASE_URL, ...config }: Config) {
        this.config({ ...config, baseUrl });
    }

    config = (config: Config) => {
        const { authentication, baseUrl } = config;
        const defaults = this[axiosClient].defaults;

        if (baseUrl) {
            if (typeof baseUrl !== "string") {
                throw new Error(
                    `baseUrl should be a string but is typeof: ${typeof baseUrl}`
                );
            }
            defaults.baseURL = baseUrl;
        }
        if ("authentication" in config) {
            if (authentication === undefined) {
                delete defaults.headers["X-ClockodoApiUser"];
                delete defaults.headers["X-ClockodoApiKey"];
            } else {
                const { user, apiKey } = authentication;

                if (typeof user !== "string") {
                    throw new Error(
                        `user should be a string but is typeof: ${typeof user}`
                    );
                }

                if (typeof apiKey !== "string") {
                    throw new Error(
                        `apiKey should be a string but is typeof: ${typeof apiKey}`
                    );
                }

                defaults.headers["X-ClockodoApiUser"] = user;
                defaults.headers["X-ClockodoApiKey"] = apiKey;
            }
        }
    };

    get = async <Result = any>(
        url: string,
        queryParams = {}
    ): Promise<Result> => {
        const response = await this[axiosClient].get(url, {
            params: mapQueryParams(queryParams),
            paramsSerializer,
        });

        return mapResponseBody<Result>(response.data);
    };

    post = async <Result = any>(url: string, body = {}): Promise<Result> => {
        const response = await this[axiosClient].post(
            url,
            mapRequestBody(body)
        );

        return mapResponseBody<Result>(response.data);
    };

    put = async <Result = any>(url: string, body = {}): Promise<Result> => {
        const response = await this[axiosClient].put(url, mapRequestBody(body));

        return mapResponseBody<Result>(response.data);
    };

    delete = async <Result = any>(url: string, body = {}): Promise<Result> => {
        const response = await this[axiosClient].delete(url, {
            data: mapRequestBody(body),
        });

        return mapResponseBody<Result>(response.data);
    };
}
