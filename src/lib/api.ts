import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { axiosClient } from "./symbols.js";
import { mapQueryParams, mapRequestBody, mapResponseBody } from "./mappings.js";

const DEFAULT_BASE_URL = "https://my.clockodo.com/api";

const paramsSerializer = (params: Record<string, string>) => {
  const urlParams = [];

  for (const [key, value] of Object.entries(params)) {
    if (key === "grouping") {
      urlParams.push(
        qs.stringify({ [key]: value }, { arrayFormat: "brackets" })
      );
    } else {
      urlParams.push(qs.stringify({ [key]: value }, { arrayFormat: "repeat" }));
    }
  }

  return urlParams.join("&");
};

export type Paging = {
  itemsPerPage: number;
  currentPage: number;
  countPages: number;
  countItems: number;
};

export type Filter = {
  usersId?: number;
  customersId?: number;
  projectsId?: number;
  servicesId?: number;
  lumpsumServicesId?: number;
  billable?: number;
  text?: string;
  textsId?: number;
  budgetType?: string;
  timeSince?: string;
  timeUntil?: string;
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
  authentication?: Authentication | undefined;
  /**
   * The API base url.
   * Falls back to "https://my.clockodo.com/api" if undefined.
   */
  baseUrl?: string | undefined;
  /**
   * Will be sent as Accept-Language header.
   */
  locale?: string | undefined;
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
    locale,
  }: Config) {
    // This check is for non-TypeScript users only
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!client) {
      throw new Error(
        `Client identification missing: The Clockodo API requires a client identification now. See "Installation and usage" instructions for more information.`
      );
    }
    this.config({ client, authentication, baseUrl, locale });
  }

  config(config: Partial<Config>) {
    const defaults = this[axiosClient].defaults;

    if ("locale" in config) {
      const { locale } = config;

      if (locale === undefined) {
        delete defaults.headers["Accept-Language"];
      } else if (typeof locale === "string") {
        defaults.headers["Accept-Language"] = locale;
      } else {
        throw createTypeError({
          name: "locale",
          expected: "undefined or a string",
          actual: locale,
        });
      }
    }

    if ("baseUrl" in config) {
      const { baseUrl } = config;

      if (baseUrl === undefined) {
        defaults.baseURL = DEFAULT_BASE_URL;
      } else if (typeof baseUrl === "string") {
        defaults.baseURL = baseUrl;
      } else {
        throw createTypeError({
          name: "baseUrl",
          expected: "undefined or a string",
          actual: baseUrl,
        });
      }
    }

    if (config.client) {
      const { name, email } = config.client;

      if (typeof name !== "string") {
        throw createTypeError({
          name: "name",
          expected: "a string",
          actual: name,
        });
      }
      if (typeof email !== "string") {
        throw createTypeError({
          name: "email",
          expected: "a string",
          actual: email,
        });
      }

      defaults.headers["X-Clockodo-External-Application"] = `${name};${email}`;
    }
    if ("authentication" in config) {
      const { authentication } = config;

      if (authentication === undefined) {
        delete defaults.headers["X-ClockodoApiUser"];
        delete defaults.headers["X-ClockodoApiKey"];
        defaults.headers["X-Requested-With"] = "XMLHttpRequest";
        defaults.withCredentials = true;
      } else {
        const { user, apiKey } = authentication;

        if (typeof user !== "string") {
          throw createTypeError({
            name: "user",
            expected: "a string",
            actual: user,
          });
        }
        if (typeof apiKey !== "string") {
          throw createTypeError({
            name: "apiKey",
            expected: "a string",
            actual: apiKey,
          });
        }

        defaults.headers["X-ClockodoApiUser"] = user;
        defaults.headers["X-ClockodoApiKey"] = apiKey;
        delete defaults.headers["X-Requested-With"];
        // Since we're sending auth headers now, it's not required to also send cookies.
        defaults.withCredentials = false;
      }
    }
  }

  async get<Result = any>(
    url: string,
    queryParams = {},
    options?: AxiosRequestConfig
  ): Promise<Result> {
    const response = await this[axiosClient].get(url, {
      params: mapQueryParams(queryParams),
      paramsSerializer,
      ...options,
    });

    return mapResponseBody<Result>(response.data);
  }

  async post<Result = any>(
    url: string,
    body = {},
    options?: AxiosRequestConfig
  ): Promise<Result> {
    const response = await this[axiosClient].post(
      url,
      mapRequestBody(body),
      options
    );

    return mapResponseBody<Result>(response.data);
  }

  async put<Result = any>(
    url: string,
    body = {},
    options?: AxiosRequestConfig
  ): Promise<Result> {
    const response = await this[axiosClient].put(
      url,
      mapRequestBody(body),
      options
    );

    return mapResponseBody<Result>(response.data);
  }

  async delete<Result = any>(
    url: string,
    body = {},
    options?: AxiosRequestConfig
  ): Promise<Result> {
    const response = await this[axiosClient].delete(url, {
      data: mapRequestBody(body),
      ...options,
    });

    return mapResponseBody<Result>(response.data);
  }
}

const createTypeError = ({
  name,
  expected,
  actual,
}: {
  name: string;
  expected: string;
  actual: any;
}) => {
  return new TypeError(
    `${name} should be ${expected} but given value ${actual} is typeof ${typeof actual}`
  );
};
