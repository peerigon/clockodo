import { describe, expect, test } from "vitest";
import {
  createTargethoursRowMocks,
  createTargethoursRowMonthlyMocks,
  createTargethoursRowWeeklyMocks,
} from "./targethours.mocks.js";

describe("createTargethoursRowMocks()", () => {
  test("It creates realistic mocks", () => {
    expect(createTargethoursRowMocks({ count: 20 })).toMatchSnapshot();
  });

  test("Creates targethours rows on a single day", () => {
    for (let i = 0; i < 20; i++) {
      const [targethoursRow] = createTargethoursRowMonthlyMocks({
        count: 1,
        dateSinceBetween: [new Date(2020, 0, 1), new Date(2020, 0, 1)],
      });

      expect(targethoursRow).toMatchObject({
        dateSince: "2020-01-01",
      });
    }
  });
  for (let i = 0; i < 20; i++) {
    const [targethoursRow] = createTargethoursRowWeeklyMocks({
      count: 1,
      dateSinceBetween: [new Date(2020, 0, 1), new Date(2020, 0, 1)],
    });

    expect(targethoursRow).toMatchObject({
      dateSince: "2020-01-01",
    });
    expect(["2020-01-01", null]).toContain(targethoursRow.dateUntil);
  }
});
