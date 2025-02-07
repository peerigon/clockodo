import nock from "nock";
import { CLOCKODO_API_BASE_URL } from "../consts.js";
import { Api, Config } from "../lib/api.js";
import { RequestHeaders } from "../lib/requests.js";

export const testApiConfig = {
  locale: "en",
  client: {
    name: "Clockodo SDK Unit Test",
    email: "johannes.ewald@peerigon.com",
  },
} satisfies Config;

export const testApi = new Api(testApiConfig);

export const nockUsingTestApi = () => {
  const expectedHeaders: RequestHeaders = {
    "Accept-Language": testApiConfig.locale,
    "X-Clockodo-External-Application": [
      testApiConfig.client.name,
      testApiConfig.client.email,
    ].join(";"),
    "X-ClockodoEnableIsoUtcDateTimes": "1",
    "X-Requested-With": "XMLHttpRequest",
  };

  return nock(CLOCKODO_API_BASE_URL, {
    reqheaders: expectedHeaders,
  });
};
