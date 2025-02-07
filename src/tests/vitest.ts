import nock from "nock";
import { afterAll, beforeEach } from "vitest";
import { setFakerSeed } from "../lib/mocks.js";

beforeEach(() => {
  setFakerSeed(123);
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
