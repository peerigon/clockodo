import { faker } from "@faker-js/faker";
import { type NonbusinessGroup } from "./nonbusinessGroup.js";

export const createNonbusinessGroupMocks = ({
  count = 1,
}: {
  count?: number;
  dateBetween?: readonly [Date, Date];
}): Array<NonbusinessGroup> =>
  Array.from({ length: count }, (_, index): NonbusinessGroup => {
    return {
      id: index,
      name: faker.commerce.productName(),
      companyDefault: index === 0,
    };
  });
