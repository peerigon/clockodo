import { faker } from "@faker-js/faker";
import { type LumpsumService } from "./lumpsumService.js";

export const createLumpsumServiceMocks = ({
  count = 1,
}: { count?: number } = {}) =>
  Array.from({ length: count }, (_, index): LumpsumService => {
    return {
      id: index,
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 0.01, max: 9999 }),
      unit: index % 2 === 0 ? faker.lorem.word() : null,
      number: faker.string.hexadecimal(),
      active: faker.datatype.boolean(),
      note:
        index % 2 === 0
          ? null
          : faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    };
  });
