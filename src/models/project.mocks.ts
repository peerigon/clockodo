import { faker } from "@faker-js/faker";
import { type Project } from "./project.js";

export const createProjectMocks = ({
  count = 1,
}: { count?: number } = {}): Array<Project> =>
  Array.from({ length: count }, (_, index): Project => {
    const projectId = index;
    const completed = faker.datatype.boolean();
    const budget =
      faker.number.int({ min: 0, max: 10 }) > 2
        ? faker.number.int({ min: 10, max: 999_999 })
        : null;
    const billedCompletely = budget === null ? null : faker.datatype.boolean();

    return {
      id: projectId,
      customersId: faker.number.int(),
      name: faker.commerce.productName(),
      number: faker.string.hexadecimal(),
      active: faker.datatype.boolean(),
      billableDefault: faker.datatype.boolean(),
      note: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
      billedMoney:
        budget === null
          ? null
          : billedCompletely === true
            ? budget
            : faker.number.int({ min: 0, max: budget }),
      billedCompletely,
      completed,
      completedAt: completed ? faker.date.recent().toISOString() : null,
      testData: faker.datatype.boolean(),
      countSubprojects: faker.number.int({ min: 0, max: 10 }),
      revenueFactor:
        faker.number.int({ min: 0, max: 10 }) > 2
          ? 1
          : faker.number.int({ min: 0.1, max: 1 }),
    };
  });
