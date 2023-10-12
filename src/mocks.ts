import { faker } from "@faker-js/faker";

export * from "./models/absence.mocks.js";
export * from "./models/customer.mocks.js";
export * from "./models/entry.mocks.js";
// export * from "./models/entryGroup.mocks.js";
// export * from "./models/holidayscarry.mocks.js";
// export * from "./models/holidaysquota.mocks.js";
export * from "./models/lumpsumService.mocks.js";
export * from "./models/nonbusinessDay.mocks.js";
export * from "./models/overtimereduced.mocks.js";
export * from "./models/project.mocks.js";
// export * from "./models/service.mocks.js";
export * from "./models/targethours.mocks.js";
export * from "./models/user.mocks.js";
// export * from "./models/userReport.mocks.js";
export * from "./models/worktimeRegulation.mocks.js";
export * from "./models/workTimes.mocks.js";

/**
 * Sets the seed for Faker.js (which is used by the mocks).
 *
 * @see https://github.com/Marak/Faker.js
 */
export const setFakerSeed = (seed: number) => {
  faker.seed(seed);
};
