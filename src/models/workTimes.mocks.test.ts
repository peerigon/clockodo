import {
  createChangeRequestMocks,
  createWorkTimeDayMocks,
} from "./workTimes.mocks.js";

describe("workTimesMocks", () => {
  test("createWorkDayMocks", () => {
    expect(
      createWorkTimeDayMocks({
        count: 5,
      })
    ).toMatchSnapshot();
  });

  test("createChangeRequestMocks", () => {
    expect(
      createChangeRequestMocks({
        count: 5,
      })
    ).toMatchSnapshot();
  });
});
