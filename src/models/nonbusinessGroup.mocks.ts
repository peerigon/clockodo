import { faker } from "@faker-js/faker";
import { NonbusinessGroup } from "./nonbusinessGroup.js";

export const createNonbusinessGroupMocks = ({
  count = 1,
}: {
  count?: number;
  dateBetween?: readonly [Date, Date];
}) =>
  Array.from({ length: count }, (_, index): NonbusinessGroup => {
    return {
      id: index,
      name: faker.commerce.productName(),
    };
  });
