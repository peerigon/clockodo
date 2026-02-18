/**
 * Type definitions for supported HTTP request headers sent to Clockodo.
 *
 * @module
 */
/** Documents request headers that can be set for requests to the Clockodo API. */
export type RequestHeaders = Partial<
  WithAcceptLanguage &
    WithIsoUtcDateTimes &
    WithExternalApplication &
    WithApiKeyAuthentication &
    WithCookieAuthentication
> &
  Record<string, string>;

type WithAcceptLanguage = {
  /** Controls the language of error responses. */
  "Accept-Language": string;
};

type WithIsoUtcDateTimes = {
  /**
   * Enables UTC date times in ISO format for legacy endpoints. Modern endpoints
   * always return UTC date times in ISO format.
   */
  "X-ClockodoEnableIsoUtcDateTimes": string;
};

type WithExternalApplication = {
  /**
   * Identifies the external application and provides contact information for
   * Clockodo.
   */
  "X-Clockodo-External-Application": string;
};

type WithApiKeyAuthentication = {
  "X-ClockodoApiUser": string;
  "X-ClockodoApiKey": string;
};

type WithCookieAuthentication = {
  /**
   * Custom header that is includes in cookie requests to prevent CSRF attacks
   * from <form>s.
   */
  "X-Requested-With": "XMLHttpRequest";
};
