import { faker } from "@faker-js/faker";
import { type HolidaysCarryover } from "./holidaysCarryover.js";

type Options = {
  count?: number;
  yearMinMax?: [number, number];
};

export const createHolidaysCarryoverMocks = ({
  count = 1,
  yearMinMax = [1900, 2024],
}: Options = {}): Array<HolidaysCarryover> => {
  return Array.from({ length: count }, (_, index): HolidaysCarryover => {
    return {
      id: index,
      usersId: 0,
      year: faker.number.int({ min: yearMinMax[0], max: yearMinMax[1] }),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      count: faker.number.int({ min: 0, max: 100 }),
    };
  });
};
