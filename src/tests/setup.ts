import nock from "nock";
import timezoneMock from "timezone-mock";
import { afterAll, beforeEach } from "vitest";
import { setFakerSeed } from "../lib/mocks.js";

timezoneMock.register("US/Eastern");

beforeEach(() => {
  setFakerSeed(123);
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
