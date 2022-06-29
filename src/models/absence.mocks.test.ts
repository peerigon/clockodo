import { createAbsenceMocks } from "./absence.mocks.js";

describe("createAbsenceMocks()", () => {
  test("It creates realistic mocks", () => {
    expect(createAbsenceMocks({ count: 20 })).toMatchSnapshot();
  });
});
