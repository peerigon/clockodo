import { faker } from "@faker-js/faker";
import { isoDateFromDateTime } from "../lib/dateTime.js";
import { generateRandomDates } from "../lib/mocks.js";
import { NonbusinessDay } from "./nonbusinessDay.js";

const DEFAULT_FROM = new Date(2020, 0);
const DEFAULT_TO = new Date(2021, 0);

export const createNonbusinessDayMocks = ({
  count = 1,
  dateBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: {
  count?: number;
  dateBetween?: readonly [Date, Date];
}) => {
  const nextIdPerYear = new Map<number, number>();

  const getNextIdForYear = (year: number) => {
    const nextId = nextIdPerYear.get(year) ?? 0;

    nextIdPerYear.set(year, nextId + 1);

    return nextId;
  };

  return generateRandomDates({
    count,
    between: [from, to],
  }).map((timestamp): NonbusinessDay => {
    const dateTime = new Date(timestamp);
    const id = getNextIdForYear(dateTime.getFullYear());
    const name = faker.lorem.words();
    const isHalfDay = faker.datatype.number({ min: 0, max: 10 }) > 8;

    const periodic = faker.datatype.boolean();

    return {
      date: isoDateFromDateTime(dateTime),
      id,
      nonbusinessgroupsId: 0,
      name,
      halfDay: isHalfDay,
      surchargeSpecial: faker.datatype.boolean(),
      periodic,
      differentPerYear: periodic ? faker.datatype.boolean() : false,
    };
  });
};
