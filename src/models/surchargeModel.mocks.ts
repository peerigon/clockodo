import { faker } from "@faker-js/faker";
import { type SurchargeModel } from "./surchargeModel.js";

export const createSurchargeModelMocks = ({
  count = 1,
}: { count?: number } = {}) =>
  Array.from({ length: count }, (_, index): SurchargeModel => {
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
