import fetch, { Request, RequestInit, RequestInfo } from "node-fetch";
import qs from "qs";
import { requestConfig } from "./symbols.js";
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

// HeadersInit = Headers | string[][] | { [key: string]: string };
// type FetchConfig = {
//   baseUrl: RequestInfo | undefined
// } & RequestInit;
type FetchConfig = {
  baseUrl: RequestInfo | undefined;
  headers: any;
};

export type ErrorResponse = {
  status: number;
  body: any;
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
  authentication?: Authentication;
  baseUrl?: string;
};

export class Api {
  [requestConfig]: FetchConfig = {
    baseUrl: undefined,
    headers: {},
  };

  constructor({ baseUrl = DEFAULT_BASE_URL, authentication, client }: Config) {
    // This check is for non-TypeScript users only
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!client) {
      throw new Error(
        `Client identification missing: The Clockodo API requires a client identification now. See "Installation and usage" instructions for more information.`
      );
    }
    this.config({ client, authentication, baseUrl });
  }

  // The fact that this can be called again was a source of great confusion. I had changed the if below to throw if (!baseUrl || typeof baseUrl !== "string"), but turns out sometimes we don't need it
  config(config: Partial<Config>) {
    const { authentication, baseUrl, client } = config;

    const request = this[requestConfig];

    request.headers["X-ClockodoEnableIsoUtcDateTimes"] = "1";

    if (baseUrl) {
      if (typeof baseUrl !== "string") {
        throw new Error(
          `baseUrl should be a string but is typeof: ${typeof baseUrl}`
        );
      }

      request.baseUrl = baseUrl;
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

      request.headers["X-Clockodo-External-Application"] = `${name};${email}`;
    }

    if ("authentication" in config) {
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
          throw new Error(
            `user should be a string but is typeof: ${typeof user}`
          );
        }

        if (typeof apiKey !== "string") {
          throw new Error(
            `apiKey should be a string but is typeof: ${typeof apiKey}`
          );
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

  async get<Result = any>(
    url: string,
    queryParams = {}
  ): Promise<Result | ErrorResponse> {
    const params = paramsSerializer(mapQueryParams(queryParams));
    const baseUrl = this[requestConfig].baseUrl;
    const request = new Request(`${baseUrl}${url}?${params}`);

    const response = await fetch(request, {
      method: "GET",
      headers: this[requestConfig].headers,
    });

    const data = (await response.json());

    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return mapResponseBody<Result>(data);
    }

    return {
      status: response.status,
      body: {
        ...data,
      },
    };
  }

  async post<Result = any>(
    url: string,
    body = {}
  ): Promise<Result | ErrorResponse> {
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

    const data = (await response.json());

    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return mapResponseBody<Result>(data);
    }

    return {
      status: response.status,
      body: {
        ...data,
      },
    };
  }

  async put<Result = any>(
    url: string,
    body = {}
  ): Promise<Result | ErrorResponse> {
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

    const data = (await response.json());

    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return mapResponseBody<Result>(data);
    }

    return {
      status: response.status,
      body: {
        ...data,
      },
    };
  }

  async delete<Result = any>(
    url: string,
    body = {}
  ): Promise<Result | ErrorResponse> {
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

    const data = (await response.json());

    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return mapResponseBody<Result>(data);
    }

    return {
      status: response.status,
      body: {
        ...data,
      },
    };
  }
}
