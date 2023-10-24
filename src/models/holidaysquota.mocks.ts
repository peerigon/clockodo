import { faker } from "@faker-js/faker";
import { HolidaysquotaRow } from "./holidaysquota.js";

type Options = {
  count?: number;
  yearSinceMinMax?: [number, number];
  yearUntilMinMax?: [number, number];
};

export const createHolidaysquotaMocks = ({
  count = 1,
  yearSinceMinMax = [2020, 2021],
  yearUntilMinMax = [2021, 2022],
}: Options = {}) => {
  return Array.from({ length: count }, (_, index): HolidaysquotaRow => {
    const id = index;

    return {
      id,
      usersId: 0,
      yearSince: faker.datatype.number({
        min: yearSinceMinMax[0],
        max: yearSinceMinMax[1],
      }),
      yearUntil: faker.datatype.boolean()
        ? faker.datatype.number({
            min: yearUntilMinMax[0],
            max: yearUntilMinMax[1],
          })
        : null,
      note: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
      count: faker.datatype.number({ min: 0, max: 100 }),
    };
  });
};
