import { faker } from "@faker-js/faker";
import { isoDateFromDateTime } from "../lib/mocks.js";
import { NonbusinessDay } from "./nonbusinessDay.js";

const DEFAULT_FROM = new Date("2020");
const DEFAULT_TO = new Date("2021");

export const createNonbusinessDaysMocks = ({
  count = 1,
  dateBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: { count?: number; dateBetween?: [Date, Date] } = {}) => {
  const nextIdPerYear = new Map<number, number>();

  const getNextIdForYear = (year: number) => {
    const nextId = nextIdPerYear.get(year) ?? 0;

    nextIdPerYear.set(year, nextId + 1);

    return nextId;
  };

  return Array.from({ length: count }, (): NonbusinessDay => {
    const date = faker.date.between(from, to);
    const isoDate = isoDateFromDateTime(date);
    const id = getNextIdForYear(date.getFullYear());
    const name = faker.lorem.words();
    const isHalfDay = faker.datatype.number({ min: 0, max: 10 }) > 8;

    return {
      date: isoDate,
      id,
      name,
      halfDay: isHalfDay,
    };
  });
};
