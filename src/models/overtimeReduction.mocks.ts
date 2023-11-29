import { faker } from "@faker-js/faker";
import { OvertimeReduction } from "./overtimeReduction.js";
import { isoDateFromDateTime } from "../lib/dateTime.js";

type Options = {
  count?: number;
  hoursMinMax?: [number, number];
};

export const createOvertimeReductionMocks = ({
  count = 1,
  hoursMinMax = [0, 100],
}: Options = {}) => {
  return Array.from({ length: count }, (_, index): OvertimeReduction => {
    return {
      id: index,
      usersId: 0,
      addedByUsersId: 1,
      addedAt: isoDateFromDateTime(faker.date.past()),
      date: isoDateFromDateTime(faker.date.past()),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      hours: faker.datatype.number({
        min: hoursMinMax[0],
        max: hoursMinMax[1],
      }),
    };
  });
};
