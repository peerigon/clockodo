import { faker } from "@faker-js/faker";
import { Service } from "./service.js";

export const createServiceMocks = ({ count = 1 }: { count?: number } = {}) =>
  Array.from({ length: count }, (_, index): Service => {
    return {
      id: index,
      name: faker.commerce.productName(),
      number: faker.datatype.hexadecimal(),
      active: faker.datatype.boolean(),
      note:
        index % 2 === 0
          ? null
          : faker.lorem.sentences(faker.datatype.number({ min: 1, max: 3 })),
    };
  });
