import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import pLimit from "p-limit";
import { axiosClient } from "./symbols.js";
import { mapQueryParams, mapRequestBody, mapResponseBody } from "./mappings.js";
import { Billability } from "../models/entry.js";

const DEFAULT_BASE_URL = "https://my.clockodo.com/api";
const MAX_PARALLEL_REQUESTS_WHEN_STREAMING = 3;
const EXTERNAL_APPLICATION_HEADER_MAX_LENGTH = 50;

const paramsSerializer = (params: Record<string, string>) => {
  const urlParams = [];

  for (const [key, value] of Object.entries(params)) {
    if (key === "grouping") {
      urlParams.push(
        qs.stringify({ [key]: value }, { arrayFormat: "brackets" }),
      );
    } else {
      urlParams.push(qs.stringify({ [key]: value }, { arrayFormat: "repeat" }));
    }
  }

  return urlParams.join("&");
};

/**
 * Allows additional properties to be present on the params object.
 * This is necessary so that the SDK doesn't disallow unknown params that we haven't implemented yet.
 */
export type Params<
  KnownParams extends Record<string, unknown> = Record<string, unknown>,
> = KnownParams & Record<string, unknown>;

export type ParamsWithPage = {
  page?: number;
};

export type Paging = {
  itemsPerPage: number;
  currentPage: number;
  countPages: number;
  countItems: number;
};

type BooleanAsNumber = 0 | 1;

export type Filter = {
  usersId: number;
  customersId: number;
  projectsId: number;
  servicesId: number;
  lumpsumServicesId: number;
  billable: Billability;
  text: string;
  textsId: number;
  budgetType: string;
  timeSince: string;
  timeUntil: string;
  active: BooleanAsNumber;
};

export type ResponseWithPaging = {
  paging: Paging;
};

export type ResponseWithoutPaging<Response> = Omit<Response, "paging">;

export type ResponseWithFilter<FilterProperty extends keyof Filter> = {
  filter: null | Partial<Pick<Filter, FilterProperty>>;
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
        `Client identification missing: The Clockodo API requires a client identification now. See "Installation and usage" instructions for more information.`,
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

      const externalApplication = `${name};${email}`;

      if (externalApplication.length > EXTERNAL_APPLICATION_HEADER_MAX_LENGTH) {
        throw new Error(
          `External application header "${externalApplication}" is longer than ${EXTERNAL_APPLICATION_HEADER_MAX_LENGTH} characters (was ${externalApplication.length}). Please use a shorter name.`,
        );
      }

      defaults.headers["X-Clockodo-External-Application"] = externalApplication;
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
    options?: AxiosRequestConfig,
  ): Promise<Result> {
    const response = await this[axiosClient].get(url, {
      params: mapQueryParams(queryParams),
      paramsSerializer,
      ...options,
    });

    return mapResponseBody<Result>(response.data);
  }

  async *getPagesStreaming<Result extends ResponseWithPaging>(
    ...args: Parameters<Api["get"]>
  ) {
    const [url, queryParams = {}, options] = args;
    const getPage = async (page: number) => {
      return this.get<Result & ResponseWithPaging>(
        url,
        { ...queryParams, page },
        options,
      );
    };
    const firstResponse = await getPage(1);

    yield firstResponse;

    const { paging } = firstResponse;
    const limit = pLimit(MAX_PARALLEL_REQUESTS_WHEN_STREAMING);
    const remainingPages = Array.from(
      { length: paging.countPages - 1 },
      (_, index) => index + 2,
    );

    yield* yieldPagesAsap(
      remainingPages.map(async (page) => limit(getPage, page)),
    );
  }

  async getAllPages<Result extends ResponseWithPaging>(
    ...args: Parameters<Api["get"]>
  ): Promise<Array<Result>> {
    const pages: Array<Result> = [];

    for await (const page of this.getPagesStreaming<Result>(...args)) {
      pages.push(page);
    }

    pages.sort(
      (pageA, pageB) => pageA.paging.currentPage - pageB.paging.currentPage,
    );

    return pages;
  }

  async post<Result = any>(
    url: string,
    body = {},
    options?: AxiosRequestConfig,
  ): Promise<Result> {
    const response = await this[axiosClient].post(
      url,
      mapRequestBody(body),
      options,
    );

    return mapResponseBody<Result>(response.data);
  }

  async put<Result = any>(
    url: string,
    body = {},
    options?: AxiosRequestConfig,
  ): Promise<Result> {
    const response = await this[axiosClient].put(
      url,
      mapRequestBody(body),
      options,
    );

    return mapResponseBody<Result>(response.data);
  }

  async delete<Result = any>(
    url: string,
    body = {},
    options?: AxiosRequestConfig,
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
    `${name} should be ${expected} but given value ${actual} is typeof ${typeof actual}`,
  );
};

const yieldPagesAsap = async function* <Result>(
  pagePromises: Array<Promise<Result>>,
) {
  const pending = new Map(
    pagePromises.map((promise, index) => [
      index,
      promise.then((result) => [index, result] as const),
    ]),
  );

  while (pending.size > 0) {
    // eslint-disable-next-line no-await-in-loop
    const [index, result] = await Promise.race(pending.values());

    pending.delete(index);

    yield result;
  }
};
