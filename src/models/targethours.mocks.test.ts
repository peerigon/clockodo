import { createTargethoursRowMocks } from "./targethours.mocks.js";

describe("createTargethoursRowMocks()", () => {
  test("It creates realistic mocks", () => {
    expect(createTargethoursRowMocks({ count: 20 })).toMatchSnapshot();
  });
});
