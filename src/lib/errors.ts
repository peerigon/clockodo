class BaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ApiResponseError extends BaseError {
    status;
    body;

    constructor(status: number, body: any) {
      super("The Clockodo API returned an error status code");
      this.status = status;
      this.body = body;
    }
}