import { faker } from "@faker-js/faker";
import { OvertimereducedRow } from "./overtimereduced.js";
import { isoDateFromDateTime } from "../lib/dateTime.js";

type Options = {
  count?: number;
  hoursMinMax?: [number, number];
};

export const createOvertimereducedMocks = ({
  count = 1,
  hoursMinMax = [0, 100],
}: Options = {}) => {
  return Array.from({ length: count }, (_, index): OvertimereducedRow => {
    return {
      id: index,
      usersId: 0,
      usersIdAdded: 1,
      dateAdded: isoDateFromDateTime(faker.date.past()),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      hours: faker.datatype.number({
        min: hoursMinMax[0],
        max: hoursMinMax[1],
      }),
      createdAfterEndOfMonth: faker.datatype.boolean(),
    };
  });
};
