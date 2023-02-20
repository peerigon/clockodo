import { WorkTimeDayVariantStatus } from "./workTimes.js";
import { createWorkTimesMocks } from "./workTimes.mocks.js";

describe("createWorkTimesMocks", () => {
  test("Genehmigte", () => {
    expect(
      createWorkTimesMocks({
        count: 5,
        status: WorkTimeDayVariantStatus.Approved,
      })
    ).toMatchSnapshot();
  });
  test("Beantragte", () => {
    expect(
      createWorkTimesMocks({
        count: 5,
        status: WorkTimeDayVariantStatus.Requested,
      })
    ).toMatchSnapshot();
  });
});
