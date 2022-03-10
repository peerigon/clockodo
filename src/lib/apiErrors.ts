export enum ApiErrorCode {
  /**
   * In case we couldn't establish a connection to the server.
   */
  Disconnected = "Disconnected",

  /**
   * In case we didn't receive a response from the server within a given time span
   */
  Timeout = "Timeout",

  /**
   * In case the server responded with 429 - Too Many Requests
   */
  TooManyRequests = "TooManyRequests",

  /**
   * In case the server responded with 401 - Unauthorized
   */
  AuthenticationInvalid = "AuthenticationInvalid",

  /**
   * In case the server responded with 403 - Forbidden
   */
  Forbidden = "Forbidden",

  /**
   * In case the server responded with 423 - Locked
   */
  Locked = "Locked",

  /**
   * In case the server responded with 404 - Not Found
   */
  NotFound = "NotFound",

  /**
   * Catch-all error for all error codes < 500, including:
   * - 400 - Bad Request
   * - 409 - Conflict
   * - 412 - Precondition Failed
   */
  BadRequest = "BadRequest",

  /**
   * Catch-all error for all error codes >= 500, including:
   * - 500 - Internal Server Error
   */
  ServerError = "ServerError",

  /**
   * Catch-all error for any remaining error conditions.
   */
  UnknownError = "UnknownError",
}

const apiErrorCodes = Object.values(ApiErrorCode);
const offlineApiErrorCodes = [ApiErrorCode.Disconnected, ApiErrorCode.Timeout];

abstract class AbstractApiError<
  GivenApiErrorCode extends ApiErrorCode
> extends Error {
  readonly code: GivenApiErrorCode;
  readonly message: string;

  constructor({
    // Since we serializing and de-serializing error objects, these properties
    // should be the same as the properties on the error instance
    code,
    message = code,
  }: {
    code: GivenApiErrorCode;
    message?: string;
  }) {
    super(message);
    this.code = code;
    this.message = message;
  }

  // toJSON() gets called by JSON.stringify() automatically.
  // It's supposed to return a serializable object.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON_behavior
  toJSON() {
    return {
      ...this,
      // Since 'message' is a non-enumerable property on the error object,
      // we need to list it here explicitly.
      message: this.message,
    };
  }
}

export class ApiErrorDisconnected extends AbstractApiError<ApiErrorCode.Disconnected> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.Disconnected });
  }
}

export class ApiErrorTimeout extends AbstractApiError<ApiErrorCode.Timeout> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.Timeout });
  }
}

export class ApiErrorTooManyRequests extends AbstractApiError<ApiErrorCode.TooManyRequests> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.TooManyRequests });
  }
}

export class ApiErrorAuthenticationInvalid extends AbstractApiError<ApiErrorCode.AuthenticationInvalid> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.AuthenticationInvalid });
  }
}

export class ApiErrorForbidden extends AbstractApiError<ApiErrorCode.Forbidden> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.Forbidden });
  }
}

export class ApiErrorLocked extends AbstractApiError<ApiErrorCode.Locked> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.Locked });
  }
}

export class ApiErrorNotFound extends AbstractApiError<ApiErrorCode.NotFound> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.NotFound });
  }
}

export class ApiErrorBadRequest extends AbstractApiError<ApiErrorCode.BadRequest> {
  readonly fields: Array<string>;

  constructor({
    message,
    fields = [],
  }: { message?: string; fields?: Array<string> } = {}) {
    super({ message, code: ApiErrorCode.BadRequest });

    this.fields = fields;
  }
}

export class ApiErrorServerError extends AbstractApiError<ApiErrorCode.ServerError> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.ServerError });
  }
}

export class ApiErrorUnknownError extends AbstractApiError<ApiErrorCode.UnknownError> {
  constructor({ message }: { message?: string } = {}) {
    super({ message, code: ApiErrorCode.UnknownError });
  }
}

export type ApiError =
  | ApiErrorDisconnected
  | ApiErrorTimeout
  | ApiErrorTooManyRequests
  | ApiErrorAuthenticationInvalid
  | ApiErrorLocked
  | ApiErrorNotFound
  | ApiErrorBadRequest
  | ApiErrorServerError
  | ApiErrorUnknownError;

export const createErrorInstanceFromSerializedError = (
  serializedError: Omit<ReturnType<ApiError["toJSON"]>, "name" | "toJSON">
): ApiError => {
  switch (serializedError.code) {
    case ApiErrorCode.Disconnected:
      return new ApiErrorDisconnected(serializedError);
    case ApiErrorCode.Timeout:
      return new ApiErrorTimeout(serializedError);
    case ApiErrorCode.TooManyRequests:
      return new ApiErrorTooManyRequests(serializedError);
    case ApiErrorCode.AuthenticationInvalid:
      return new ApiErrorAuthenticationInvalid(serializedError);
    case ApiErrorCode.Locked:
      return new ApiErrorLocked(serializedError);
    case ApiErrorCode.BadRequest:
      return new ApiErrorBadRequest(serializedError);
    case ApiErrorCode.NotFound:
      return new ApiErrorNotFound(serializedError);
    case ApiErrorCode.ServerError:
      return new ApiErrorServerError(serializedError);
    default:
      return new ApiErrorUnknownError(serializedError);
  }
};

export const isApiErrorCode = (code: any): code is ApiErrorCode => {
  return apiErrorCodes.includes(code as ApiErrorCode);
};

export const isOfflineApiErrorCode = (
  code: any
): code is ApiErrorCode.Disconnected | ApiErrorCode.Timeout => {
  return offlineApiErrorCodes.includes(code as ApiErrorCode);
};

export const createApiErrorFromFailedResponse = (
  /** Pass undefined if the request failed without a response */
  response: Response | undefined,
  /** Parsed JSON response if available */
  responseBody?: any
) => {
  if (response === undefined) return new ApiErrorDisconnected();

  const message = getErrorMessageFromResponseBody(responseBody);

  if (response.status === 401)
    return new ApiErrorAuthenticationInvalid({ message });
  if (response.status === 403) return new ApiErrorForbidden({ message });
  if (response.status === 404) return new ApiErrorNotFound({ message });
  if (response.status === 423) return new ApiErrorLocked({ message });
  if (response.status === 429) return new ApiErrorTooManyRequests({ message });
  if (response.status < 500)
    return new ApiErrorBadRequest({
      message,
      fields: responseBody.error?.fields ?? [],
    });
  if (response.status >= 500) return new ApiErrorServerError({ message });

  return new ApiErrorUnknownError({ message });
};

const getErrorMessageFromResponseBody = (responseBody: any) => {
  let message: string = responseBody?.error?.message;

  if (typeof message !== "string") return undefined;

  const lastChar = message[message.length - 1];

  if (lastChar !== ".") {
    message = message + ".";
  }

  return message;
};
