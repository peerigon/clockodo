import { createAbsencesMocks } from "./absence.mocks.js";

describe("createAbsencesMocks()", () => {
  test("It creates realistic mocks", () => {
    expect(createAbsencesMocks({ count: 20 })).toMatchSnapshot();
  });
});
