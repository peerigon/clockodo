import { faker } from "@faker-js/faker";
import { OvertimecarryRow } from "./overtimecarry.js";

type Options = {
  count?: number;
  hoursMinMax?: [number, number];
  yearMinMax?: [number, number];
};

export const createOvertimecarryMocks = ({
  count = 1,
  hoursMinMax = [0, 100],
  yearMinMax = [1900, 2024],
}: Options = {}) => {
  return Array.from({ length: count }, (): OvertimecarryRow => {
    return {
      usersId: 0,
      year: faker.number.int({ min: yearMinMax[0], max: yearMinMax[1] }),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      hours: faker.number.int({
        min: hoursMinMax[0],
        max: hoursMinMax[1],
      }),
    };
  });
};
