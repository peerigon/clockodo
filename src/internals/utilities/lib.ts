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

        // this[axiosClient].interceptors.request.use(function (config) {
        //     // Do something before request is sent
        //     console.log(config);

        //     return config;
        // });
    }

    get = async <Result = any>(
        url: string,
        queryParams = {}
    ): Promise<Result> => {
        const response = await this[axiosClient].get(url, {
            params: mapQueryParams(queryParams),
            paramsSerializer,
        });

        return mapResponseBody(response.data) as Result;
    };

    post = async <Result = any>(url: string, body = {}): Promise<Result> => {
        const response = await this[axiosClient].post(
            url,
            mapRequestBody(body)
        );

        return mapResponseBody(response.data) as Result;
    };

    put = async <Result = any>(url: string, body = {}): Promise<Result> => {
        const response = await this[axiosClient].put(url, mapRequestBody(body));

        return mapResponseBody(response.data) as Result;
    };

    delete = async <Result = any>(url: string, body = {}): Promise<Result> => {
        const response = await this[axiosClient].delete(url, {
            data: mapRequestBody(body),
        });

        return mapResponseBody(response.data) as Result;
    };
}
