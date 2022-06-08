import { faker } from "@faker-js/faker";
import { Project } from "./project.js";

export const createProjectMocks = ({ count = 1 }: { count?: number } = {}) =>
  Array.from({ length: count }, (_, index): Project => {
    const projectId = index;
    const budget =
      faker.datatype.number({ min: 0, max: 10 }) > 2
        ? faker.datatype.number({ min: 10, max: 999999 })
        : null;
    const billedCompletely = budget === null ? null : faker.datatype.boolean();

    return {
      id: projectId,
      customersId: faker.datatype.number(),
      name: faker.commerce.productName(),
      number: faker.datatype.hexadecimal(),
      active: faker.datatype.boolean(),
      billableDefault: faker.datatype.boolean(),
      note: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 3 })),
      budgetMoney: budget,
      budgetIsHours: faker.datatype.boolean(),
      budgetIsNotStrict: faker.datatype.boolean(),
      billedMoney:
        budget === null
          ? null
          : billedCompletely === true
          ? budget
          : faker.datatype.number({ min: 0, max: budget }),
      billedCompletely,
      completed: faker.datatype.boolean(),
      revenueFactor:
        faker.datatype.number({ min: 0, max: 10 }) > 2
          ? 1
          : faker.datatype.number({ min: 0.1, max: 1 }),
    };
  });
