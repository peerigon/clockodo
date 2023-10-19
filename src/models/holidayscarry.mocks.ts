import { faker } from "@faker-js/faker";
import { HolidayscarryRow } from "./holidayscarry.js";

type Options = {
  count?: number;
  yearMinMax?: [number, number];
};

export const createHolidayscarryMocks = ({
  count = 1,
  yearMinMax = [1900, 2024],
}: Options = {}) => {
  return Array.from({ length: count }, (): HolidayscarryRow => {
    return {
      usersId: 0,
      year: faker.datatype.number({ min: yearMinMax[0], max: yearMinMax[1] }),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      count: faker.datatype.number({ min: 0, max: 100 }),
    };
  });
};
