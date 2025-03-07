import { describe, expect, test } from "vitest";
import { createAbsenceMocks } from "./absence.mocks.js";

describe("createAbsenceMocks()", () => {
  test("It creates realistic mocks", () => {
    expect(createAbsenceMocks({ count: 20 })).toMatchSnapshot();
  });

  test("Creates absences on a single day", () => {
    for (let i = 0; i < 20; i++) {
      const [absence] = createAbsenceMocks({
        count: 1,
        dateSinceBetween: [new Date(2020, 0, 1), new Date(2020, 0, 1)],
      });

      expect(absence).toMatchObject({
        dateSince: "2020-01-01",
        dateUntil: "2020-01-01",
      });
    }
  });
});
