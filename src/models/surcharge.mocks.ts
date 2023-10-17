import { faker } from "@faker-js/faker";
import { Surcharge } from "./surcharge.js";

export const createSurchargeMocks = ({ count = 1 }: { count?: number } = {}) =>
  Array.from({ length: count }, (_, index): Surcharge => {
    return {
      id: index,
      name: faker.commerce.productName(),
      accumulation: faker.datatype.boolean(),
      night: null,
      nightIncreased: null,
      nonbusiness: null,
      nonbusinessSpecial: null,
      sunday: null,
      saturday: null,
    };
  });
