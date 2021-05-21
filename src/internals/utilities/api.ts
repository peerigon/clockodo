import axios, { AxiosRequestConfig } from "axios";
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
    /**
     * Information about the client that is going to do the requests.
     * Will be sent as X-Clockodo-External-Application.
     */
    client: {
        /**
         * Name of the application or your company
         */
        name: string;
        /**
         * E-mail address of a technical contact person
         */
        email: string;
    };
    /**
     * Authentication for all requests.
     * Uses cookie authentication if undefined.
     */
    authentication?: Authentication;
    baseUrl?: string;
};

export class Api {
    [axiosClient] = axios.create({
        headers: {
            "X-ClockodoEnableIsoUtcDateTimes": "1",
        },
    });

    constructor({
        baseUrl = DEFAULT_BASE_URL,
        authentication,
        client,
    }: Config) {
        // This check is for non-TypeScript users only
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!client) {
            throw new Error(
                `Client identification missing: The Clockodo API requires a client identification now. See "Installation and usage" instructions for more information.`
            );
        }
        this.config({ client, authentication, baseUrl });
    }

    config = (config: Partial<Config>) => {
        const { authentication, baseUrl, client } = config;
        const defaults = this[axiosClient].defaults;

        if (baseUrl) {
            if (typeof baseUrl !== "string") {
                throw new Error(
                    `baseUrl should be a string but is typeof: ${typeof baseUrl}`
                );
            }
            defaults.baseURL = baseUrl;
        }
        if (client) {
            const { name, email } = client;

            if (typeof name !== "string") {
                throw new Error(
                    `name should be a string but is typeof: ${typeof name}`
                );
            }

            if (typeof email !== "string") {
                throw new Error(
                    `email should be a string but is typeof: ${typeof email}`
                );
            }

            defaults.headers[
                "X-Clockodo-External-Application"
            ] = `${name};${email}`;
        }
        if ("authentication" in config) {
            if (authentication === undefined) {
                delete defaults.headers["X-ClockodoApiUser"];
                delete defaults.headers["X-ClockodoApiKey"];
                defaults.headers["X-Requested-With"] = "XMLHttpRequest";
                defaults.withCredentials = true;
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
                delete defaults.headers["X-Requested-With"];
                // Since we're sending auth headers now, it's not required to also send cookies.
                defaults.withCredentials = false;
            }
        }
    };

    get = async <Result = any>(
        url: string,
        queryParams = {},
        options?: AxiosRequestConfig
    ): Promise<Result> => {
        const response = await this[axiosClient].get(url, {
            params: mapQueryParams(queryParams),
            paramsSerializer,
            ...options,
        });

        return mapResponseBody<Result>(response.data);
    };

    post = async <Result = any>(
        url: string,
        body = {},
        options?: AxiosRequestConfig
    ): Promise<Result> => {
        const response = await this[axiosClient].post(
            url,
            mapRequestBody(body),
            options
        );

        return mapResponseBody<Result>(response.data);
    };

    put = async <Result = any>(
        url: string,
        body = {},
        options?: AxiosRequestConfig
    ): Promise<Result> => {
        const response = await this[axiosClient].put(
            url,
            mapRequestBody(body),
            options
        );

        return mapResponseBody<Result>(response.data);
    };

    delete = async <Result = any>(
        url: string,
        body = {},
        options?: AxiosRequestConfig
    ): Promise<Result> => {
        const response = await this[axiosClient].delete(url, {
            data: mapRequestBody(body),
            ...options,
        });

        return mapResponseBody<Result>(response.data);
    };
}
