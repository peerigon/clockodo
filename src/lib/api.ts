import fetch, { Request } from "node-fetch";
import qs from "qs";
import { requestConfig } from "./symbols.js";
import { mapQueryParams, mapRequestBody, mapResponseBody } from "./mappings.js";
import { ApiResponseError } from "./errors.js";

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

type FetchConfig = {
  baseUrl: string | undefined;
  headers: Record<string, string>;
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
  billable?: number;
  text?: string;
  textsId?: number;
  budgetType?: string;
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
  [requestConfig]: FetchConfig = {
    baseUrl: undefined,
    headers: {},
  };

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

  // The fact that this can be called again was a source of great confusion. I had changed the if below to throw if (!baseUrl || typeof baseUrl !== "string"), but turns out sometimes we don't need it
  config(config: Partial<Config>) {
    const request = this[requestConfig];

    request.headers["X-ClockodoEnableIsoUtcDateTimes"] = "1";

    if ("locale" in config) {
      const { locale } = config;

      if (locale === undefined) {
        // * from merge
        delete request.headers["Accept-Language"];
      } else if (typeof locale === "string") {
        // * from merge
        request.headers["Accept-Language"] = locale;
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
        request.baseUrl = DEFAULT_BASE_URL;
      } else if (typeof baseUrl === "string") {
        request.baseUrl = baseUrl;
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

      request.headers["X-Clockodo-External-Application"] = `${name};${email}`;
    }

    if ("authentication" in config) {
      const { authentication } = config;

      if (authentication === undefined) {
        if (request.headers["X-ClockodoApiUser"]) {
          delete request.headers["X-ClockodoApiUser"];
        }

        if (request.headers["X-ClockodoApiKey"]) {
          delete request.headers["X-ClockodoApiKey"];
        }

        request.headers["X-Requested-With"] = "XMLHttpRequest";
        // defaults.withCredentials = true;
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

        request.headers["X-ClockodoApiUser"] = user;
        request.headers["X-ClockodoApiKey"] = apiKey;

        if (request.headers["X-Requested-With"]) {
          delete request.headers["X-Requested-With"];
        }

        // Since we're sending auth headers now, it's not required to also send cookies.
        // defaults.withCredentials = false;
      }
    }
  }

  async get<Result = any>(url: string, queryParams = {}): Promise<Result> {
    const params = paramsSerializer(mapQueryParams(queryParams));
    const baseUrl = this[requestConfig].baseUrl;
    const request = new Request(
      `${baseUrl}${url}${params ? "?" + params : ""}`
    );

    const response = await fetch(request, {
      method: "GET",
      headers: this[requestConfig].headers,
    });

    const data = await response.json();

    if (!response.ok) throw new ApiResponseError(response.status, data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return mapResponseBody<Result>(data);
  }

  async post<Result = any>(url: string, body = {}): Promise<Result> {
    const baseUrl = this[requestConfig].baseUrl;
    const request = new Request(`${baseUrl}${url}`);

    const response = await fetch(request, {
      method: "POST",
      headers: {
        ...this[requestConfig].headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mapRequestBody(body)),
    });

    const data = await response.json();

    if (!response.ok) throw new ApiResponseError(response.status, data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return mapResponseBody<Result>(data);
  }

  async put<Result = any>(url: string, body = {}): Promise<Result> {
    const baseUrl = this[requestConfig].baseUrl;
    const request = new Request(`${baseUrl}${url}`);

    const response = await fetch(request, {
      method: "PUT",
      headers: {
        ...this[requestConfig].headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mapRequestBody(body)),
    });

    const data = await response.json();

    if (!response.ok) throw new ApiResponseError(response.status, data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return mapResponseBody<Result>(data);
  }

  async delete<Result = any>(url: string, body = {}): Promise<Result> {
    const baseUrl = this[requestConfig].baseUrl;
    const request = new Request(`${baseUrl}${url}`);

    const response = await fetch(request, {
      method: "DELETE",
      headers: {
        ...this[requestConfig].headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mapRequestBody(body)),
    });

    const data = await response.json();

    if (!response.ok) throw new ApiResponseError(response.status, data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return mapResponseBody<Result>(data);
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
