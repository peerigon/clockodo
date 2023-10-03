import { faker } from "@faker-js/faker";
import { HolidayscarryRow } from "./holidayscarry.js";

export const createHolidayscarryMocks = ({
  count = 1,
  usersId = 0,
}: { count?: number; usersId?: number } = {}) => {
  return Array.from({ length: count }, (): HolidayscarryRow => {
    return {
      usersId,
      year: faker.datatype.number({ min: 1900, max: 2024 }),
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      count: faker.datatype.number({ min: 0, max: 100 }),
    };
  });
};
