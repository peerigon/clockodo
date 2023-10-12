import { faker } from "@faker-js/faker";
import { OvertimereducedRow } from "./overtimereduced.js";
import { isoDateFromDateTime } from "../lib/dateTime.js";

export const createOvertimereducedMocks = ({
  count = 1,
  usersId = 0,
  usersIdAdded = 1,
}: { count?: number; usersId?: number; usersIdAdded?: number } = {}) => {
  return Array.from({ length: count }, (_, index): OvertimereducedRow => {
    return {
      id: index,
      usersId,
      usersIdAdded,
      dateAdded: isoDateFromDateTime(faker.date.past()),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      hours: faker.datatype.number({ min: 0, max: 100 }),
      createdAfterEndOfMonth: faker.datatype.boolean(),
    };
  });
};
