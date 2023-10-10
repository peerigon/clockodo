import { faker } from "@faker-js/faker";
import { HolidaysquotaRow } from "./holidaysquota.js";

export const createHolidaysquotaMocks = ({
  count = 1,
  usersId = 0,
}: { count?: number; usersId?: number } = {}) => {
  return Array.from({ length: count }, (_, index): HolidaysquotaRow => {
    const id = index;

    return {
      id,
      usersId,
      yearSince: faker.datatype.number({ min: 2020, max: 2021 }),
      yearUntil: faker.datatype.boolean()
        ? faker.datatype.number({ min: 2021, max: 2022 })
        : null,
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      count: faker.datatype.number({ min: 0, max: 100 }),
    };
  });
};
