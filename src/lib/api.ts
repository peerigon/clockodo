/**
 * HTTP API client primitives, shared request/response types, and pagination helpers.
 *
 * @module
 */
import pLimit from "p-limit";
import qs from "qs";

import { CLOCKODO_API_BASE_URL } from "../consts.js";
import { Billability } from "../models/entry.js";
import { mapQueryParams, mapRequestBody, mapResponseBody } from "./mappings.js";
import { type RequestHeaders } from "./requests.js";

const MAX_PARALLEL_REQUESTS_WHEN_STREAMING = 3;
const EXTERNAL_APPLICATION_HEADER_MAX_LENGTH = 50;

const paramsSerializer = (params: Record<string, string> | undefined) => {
  const urlParams = [];

  for (const [key, value] of Object.entries(params ?? {})) {
    urlParams.push(qs.stringify({ [key]: value }, { arrayFormat: "brackets" }));
  }

  return urlParams.join("&");
};

/**
 * Allows additional properties to be present on the params object. This is necessary so that the
 * SDK doesn't disallow unknown params that we haven't implemented yet.
 */
export type Params<KnownParams extends Record<string, unknown> = Record<string, unknown>> =
  KnownParams & Record<Exclude<string, keyof KnownParams>, unknown>;

export type ParamsWithPage = {
  page?: number;
  itemsPerPage?: number;
};

export type ParamsWithSort<SortParams extends string> = {
  sort?: Array<SortParams | `-${SortParams}`>;
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
  fulltext: string;
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
   * Information about the client that is going to do the requests. Will be sent as
   * X-Clockodo-External-Application.
   */
  client: {
    /** Name of the application or your company */
    name: string;
    /** E-mail address of a technical contact person */
    email: string;
  };
  /** Authentication for all requests. Uses cookie authentication if undefined. */
  authentication?: Authentication | undefined;
  /** The API base url. Falls back to "https://my.clockodo.com/api" if undefined. */
  baseUrl?: string | undefined;
  /** Will be sent as Accept-Language header. */
  locale?: string | undefined;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  queryParams?: Record<string, unknown>;
  body?: Record<string, unknown>;
  headers?: RequestHeaders;
};

/** Thrown when the Clockodo API responds with a non-2xx status code. */
export class ClockodoApiError extends Error {
  readonly status: number;
  /** The parsed JSON response body or the raw text if the body is not JSON. */
  readonly data: unknown;
  /** Mirrors the shape of axios errors so that existing error handling code keeps working. */
  readonly response: { status: number; data: unknown; headers: Record<string, string> };

  constructor({ status, data, headers }: { status: number; data: unknown; headers: Headers }) {
    super(`Request failed with status code ${status}`);
    this.name = "ClockodoApiError";
    this.status = status;
    this.data = data;
    // Plain object with lowercase keys like axios so that e.g. headers["retry-after"] keeps working
    this.response = { status, data, headers: Object.fromEntries(headers) };
  }
}

export class Api {
  #baseUrl = CLOCKODO_API_BASE_URL;

  #headers: RequestHeaders = {
    Accept: "application/json",
    "X-ClockodoEnableIsoUtcDateTimes": "1",
  };

  #credentials: NonNullable<RequestInit["credentials"]> = "same-origin";

  #config: Partial<Config> = {};

  defaultHeaders: undefined | (() => RequestHeaders);

  constructor({ baseUrl = CLOCKODO_API_BASE_URL, authentication, client, locale }: Config) {
    // This check is for non-TypeScript users only
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!client) {
      throw new Error(
        `Client identification missing: The Clockodo API requires a client identification now. See "Installation and usage" instructions for more information.`,
      );
    }
    this.config = { client, authentication, baseUrl, locale };
  }

  async #request<Result>(
    method: HttpMethod,
    url: string,
    { queryParams, body, headers }: RequestOptions,
  ): Promise<Result> {
    const queryString =
      queryParams === undefined ? "" : paramsSerializer(mapQueryParams({ ...queryParams }));
    const requestHeaders = withoutUndefinedValues({
      ...this.#headers,
      ...this.defaultHeaders?.(),
      ...headers,
    });

    if (body !== undefined) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(
      joinUrl(this.#baseUrl, url) + (queryString === "" ? "" : `?${queryString}`),
      {
        method,
        headers: requestHeaders,
        credentials: this.#credentials,
        body: body === undefined ? undefined : JSON.stringify(mapRequestBody(body)),
      },
    );
    const data = await parseResponseBody(response);

    if (!response.ok) {
      throw new ClockodoApiError({ status: response.status, data, headers: response.headers });
    }

    return isObject(data) ? mapResponseBody<Result>(data) : (data as Result);
  }

  set config(config: Partial<Config>) {
    this.#config = config;
    const headers = this.#headers;

    if ("locale" in config) {
      const { locale } = config;

      if (locale === undefined) {
        delete headers["Accept-Language"];
      } else if (typeof locale === "string") {
        headers["Accept-Language"] = locale;
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
        this.#baseUrl = CLOCKODO_API_BASE_URL;
      } else if (typeof baseUrl === "string") {
        this.#baseUrl = baseUrl;
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

      headers["X-Clockodo-External-Application"] = externalApplication;
    }
    if ("authentication" in config) {
      const { authentication } = config;

      if (authentication === undefined) {
        delete headers["X-ClockodoApiUser"];
        delete headers["X-ClockodoApiKey"];
        headers["X-Requested-With"] = "XMLHttpRequest";
        this.#credentials = "include";
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

        headers["X-ClockodoApiUser"] = user;
        headers["X-ClockodoApiKey"] = apiKey;
        delete headers["X-Requested-With"];
        // Since we're sending auth headers now, it's not required to also send cookies.
        this.#credentials = "same-origin";
      }
    }
  }

  get config(): Partial<Config> {
    return this.#config;
  }

  async get<Result = any>(url: string, queryParams = {}): Promise<Result> {
    return this.#request<Result>("GET", url, { queryParams });
  }

  async *getPagesStreaming<Result extends ResponseWithPaging>(
    ...args: Parameters<Api["get"]>
  ): AsyncGenerator<Result, void, undefined> {
    const [url, queryParams = {}] = args;
    const getPage = async (page: number) => {
      return this.get<Result & ResponseWithPaging>(url, {
        ...queryParams,
        page,
      });
    };
    const firstResponse = await getPage(1);

    yield firstResponse;
    const { paging } = firstResponse;
    const limit = pLimit(MAX_PARALLEL_REQUESTS_WHEN_STREAMING);
    const remainingPages = Array.from({ length: paging.countPages - 1 }, (_, index) => index + 2);

    yield* yieldPagesAsap(remainingPages.map(async (page) => limit(getPage, page)));
  }

  async getAllPages<Result extends ResponseWithPaging>(
    ...args: Parameters<Api["get"]>
  ): Promise<Array<Result>> {
    // Array.fromAsync() is not yet supported by our target
    /* eslint-disable unicorn/prefer-array-from-async */
    const pages: Array<Result> = [];

    for await (const page of this.getPagesStreaming<Result>(...args)) {
      pages.push(page);
    }
    /* eslint-enable unicorn/prefer-array-from-async */

    pages.sort((pageA, pageB) => pageA.paging.currentPage - pageB.paging.currentPage);

    return pages;
  }

  async post<Result = any>(url: string, body = {}, headers: RequestHeaders = {}): Promise<Result> {
    return this.#request<Result>("POST", url, { body, headers });
  }

  async put<Result = any>(url: string, body = {}, headers: RequestHeaders = {}): Promise<Result> {
    return this.#request<Result>("PUT", url, { body, headers });
  }

  async delete<Result = any>(
    url: string,
    body = {},
    headers: RequestHeaders = {},
  ): Promise<Result> {
    return this.#request<Result>("DELETE", url, { body, headers });
  }
}

const joinUrl = (baseUrl: string, path: string) => {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

const withoutUndefinedValues = (headers: Record<string, string | undefined>) => {
  return Object.fromEntries(
    Object.entries(headers).filter((entry): entry is [string, string] => entry[1] !== undefined),
  );
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();

  if (text === "") {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const isObject = (value: unknown): value is Record<string, any> => {
  return typeof value === "object" && value !== null;
};

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

const yieldPagesAsap = async function* <Result>(pagePromises: Array<Promise<Result>>) {
  const withIndex = async (promise: Promise<Result>, index: number) =>
    [index, await promise] as const;
  const pending = new Map(
    pagePromises.map((promise, index) => [index, withIndex(promise, index)] as const),
  );

  while (pending.size > 0) {
    // eslint-disable-next-line no-await-in-loop
    const [index, result] = await Promise.race(pending.values());

    pending.delete(index);

    yield result;
  }
};
