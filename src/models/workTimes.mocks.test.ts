import {
  createWorkTimesMocks,
  WorkTimeDayVariantStatusCombination,
} from "./workTimes.mocks.js";

describe("createWorkTimesMocks", () => {
  test("Nur genehmigte", () => {
    expect(
      createWorkTimesMocks({
        count: 5,
        status: WorkTimeDayVariantStatusCombination.Approved,
      })
    ).toMatchSnapshot();
  });
  test("Nur beantragte", () => {
    expect(
      createWorkTimesMocks({
        count: 5,
        status: WorkTimeDayVariantStatusCombination.Requested,
      })
    ).toMatchSnapshot();
  });
  test("Genehmigte und beantragte", () => {
    expect(
      createWorkTimesMocks({
        count: 5,
        status: WorkTimeDayVariantStatusCombination.ApprovedAndRequested,
      })
    ).toMatchSnapshot();
  });
});
