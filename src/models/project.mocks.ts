import { faker } from "@faker-js/faker";
import {
  isoDateFromDateTime,
  isoUtcDateTimeFromDateTime,
} from "../lib/dateTime.js";
import { type Project } from "./project.js";

export const createProjectMocks = ({
  count = 1,
  refDate,
}: {
  count?: number;
  refDate?: Date;
} = {}): Array<Project> =>
  Array.from({ length: count }, (_, index): Project => {
    const projectId = index;
    const completed = faker.datatype.boolean();
    const budgetAmount =
      faker.number.int({ min: 0, max: 10 }) > 2
        ? faker.number.int({ min: 10, max: 999_999 })
        : null;
    const budget =
      faker.number.int({ min: 0, max: 10 }) > 3
        ? {
            monetary: faker.datatype.boolean(),
            hard: faker.datatype.boolean(),
            fromSubprojects: faker.datatype.boolean(),
            interval: faker.helpers.arrayElement([0, 1, 2, 3, null] as const),
            amount: budgetAmount,
          }
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
        budgetAmount === null
          ? null
          : billedCompletely === true
            ? budgetAmount
            : faker.number.int({ min: 0, max: budgetAmount }),
      billedCompletely,
      completed,
      completedAt: completed
        ? isoUtcDateTimeFromDateTime(
            faker.date.recent({ ...(refDate ? { refDate } : {}) }),
          )
        : null,
      testData: faker.datatype.boolean(),
      countSubprojects: faker.number.int({ min: 0, max: 10 }),
      deadline: faker.datatype.boolean()
        ? isoDateFromDateTime(
            faker.date.soon({ ...(refDate ? { refDate } : {}) }),
          )
        : null,
      startDate: isoDateFromDateTime(
        faker.date.past({ ...(refDate ? { refDate } : {}) }),
      ),
      automaticCompletion: faker.datatype.boolean(),
      budget,
      billServiceId: faker.datatype.boolean()
        ? faker.string.alphanumeric(6)
        : null,
      revenueFactor:
        faker.number.int({ min: 0, max: 10 }) > 2
          ? 1
          : faker.number.int({ min: 0.1, max: 1 }),
    };
  });
