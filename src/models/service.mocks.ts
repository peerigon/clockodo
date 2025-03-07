import { faker } from "@faker-js/faker";
import { type Service } from "./service.js";

export const createServiceMocks = ({ count = 1 }: { count?: number } = {}) =>
  Array.from({ length: count }, (_, index): Service => {
    return {
      id: index,
      name: faker.commerce.productName(),
      number: faker.string.hexadecimal(),
      active: faker.datatype.boolean(),
      note:
        index % 2 === 0
          ? null
          : faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    };
  });
