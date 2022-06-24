import { createNonbusinessDaysMocks } from "./nonbusinessDay.mocks.js";

describe("createNonbusinessDaysMocks()", () => {
  test("It creates realistic mocks", () => {
    expect(createNonbusinessDaysMocks({ count: 20 })).toMatchSnapshot();
  });

  test("It re-uses ids for the next year", () => {
    const [nonbusinessDay1, nonbusinessDay2] = createNonbusinessDaysMocks({
      count: 2,
      dateBetween: [new Date(2020, 11, 31), new Date(2021, 0, 2)],
    });

    expect(nonbusinessDay1.id === nonbusinessDay2.id);
  });
});
