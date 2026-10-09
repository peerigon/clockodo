import nock from "nock";
import { afterAll, afterEach, describe, expect, it } from "vitest";

import { Api, ClockodoApiError } from "./api.js";

const config = {
  client: {
    name: "Clockodo SDK Unit Test",
    email: "johannes.ewald@peerigon.com",
  },
};

describe("Api", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  it("keeps the path of the base url", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com/some/api/" });
    const nockScope = nock("https://example.com").get("/some/api/v2/clock").reply(200, {});

    await expect(api.get("/v2/clock")).resolves.toEqual({});

    nockScope.done();
  });

  it("serializes array query params with brackets", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com" });
    const nockScope = nock("https://example.com")
      .get("/v2/entries")
      .query({ "filter[users_id][]": ["1", "2"], items_per_page: "10" })
      .reply(200, {});

    await expect(
      api.get("/v2/entries", { filter: { usersId: [1, 2] }, itemsPerPage: 10 }),
    ).resolves.toEqual({});

    nockScope.done();
  });

  it("sends the mapped body as JSON and maps the response", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com" });
    const nockScope = nock("https://example.com", {
      reqheaders: { "Content-Type": "application/json" },
    })
      .post("/v2/clock", { customers_id: 1 })
      .reply(200, { running: { customers_id: 1 } });

    await expect(api.post("/v2/clock", { customersId: 1 })).resolves.toEqual({
      running: { customersId: 1 },
    });

    nockScope.done();
  });

  it("does not send undefined header values", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com" });
    const nockScope = nock("https://example.com", {
      badheaders: ["X-Undefined"],
    })
      .delete("/v2/clock/1")
      .reply(200, {});

    await expect(
      api.delete("/v2/clock/1", {}, { "X-Undefined": undefined as unknown as string }),
    ).resolves.toEqual({});

    nockScope.done();
  });

  it("resolves with undefined on empty responses", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com" });
    const nockScope = nock("https://example.com").delete("/v2/clock/1").reply(204);

    await expect(api.delete("/v2/clock/1")).resolves.toBeUndefined();

    nockScope.done();
  });

  it("throws a ClockodoApiError on non-2xx responses", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com" });
    const nockScope = nock("https://example.com")
      .get("/v2/clock")
      .reply(403, { error: { message: "Forbidden" } }, { "Retry-After": "120" });

    const request = api.get("/v2/clock");

    await expect(request).rejects.toBeInstanceOf(ClockodoApiError);
    await expect(request).rejects.toMatchObject({
      status: 403,
      data: { error: { message: "Forbidden" } },
      response: {
        status: 403,
        data: { error: { message: "Forbidden" } },
        headers: { "retry-after": "120" },
      },
    });

    nockScope.done();
  });

  it("exposes non-JSON error bodies as text", async () => {
    const api = new Api({ ...config, baseUrl: "https://example.com" });
    const nockScope = nock("https://example.com").get("/v2/clock").reply(502, "Bad Gateway");

    await expect(api.get("/v2/clock")).rejects.toMatchObject({
      status: 502,
      data: "Bad Gateway",
    });

    nockScope.done();
  });
});
