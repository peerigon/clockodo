import { faker } from "@faker-js/faker";
import { OvertimeCarryover } from "./overtimeCarryover.js";

type Options = {
  count?: number;
  hoursMinMax?: [number, number];
  yearMinMax?: [number, number];
};

export const createOvertimeCarryoverMocks = ({
  count = 1,
  hoursMinMax = [0, 100],
  yearMinMax = [1900, 2024],
}: Options = {}) => {
  return Array.from({ length: count }, (_, index): OvertimeCarryover => {
    return {
      id: index,
      usersId: 0,
      year: faker.datatype.number({ min: yearMinMax[0], max: yearMinMax[1] }),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      hours: faker.datatype.number({
        min: hoursMinMax[0],
        max: hoursMinMax[1],
      }),
    };
  });
};
