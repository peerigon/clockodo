import { faker } from "@faker-js/faker";
import { IsoDate, IsoUtcDateTime } from "../models/dateTime.js";

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_YEAR = 356 * ONE_DAY;

const MAX_ITERATION_COUNT = 10000;

export const isoDateFromDateTime = (dateTime: Date) => {
  return [
    dateTime.getFullYear(),
    String(dateTime.getMonth() + 1).padStart(2, "0"),
    String(dateTime.getDate()).padStart(2, "0"),
  ].join("-") as IsoDate;
};

export const isoUtcDateTimeFromDateTime = (dateTime: Date) => {
  return dateTime.toJSON().replace(/\.\d{3}Z$/, "Z") as IsoUtcDateTime;
};

export const isoMonthFromDateTime = (dateTime: Date) => {
  return [
    dateTime.getFullYear(),
    String(dateTime.getMonth() + 1).padStart(2, "0"),
  ].join("-");
};

export const isoDateFromTimestamp = (timestamp: number) => {
  return isoDateFromDateTime(new Date(timestamp));
};

export const startOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const endOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
};

export const endOfYear = (dateTime: Date) => {
  return new Date(dateTime.getFullYear() + 1, 0, 0, 23, 59, 59, 999);
};

export const nextDay = (date: Date) => {
  const nextDay = new Date(date.getTime() + ONE_DAY);

  return new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
};

export const generateWithMaxDuplicates = <Value>({
  count,
  maxDuplicates = 1,
  generate,
}: {
  count: number;
  maxDuplicates?: number;
  generate: () => Value;
}) => {
  const accepted = new Map<Value, Array<Value>>();
  let acceptedCount = 0;

  for (let i = 0; acceptedCount < count; i++) {
    if (i === MAX_ITERATION_COUNT) {
      throw new Error(
        `Couldn't generate enough unique values before reaching the max iteration count.
This usually happens when the generated values create too many conflicts (e.g. too many dates on a small date range).`
      );
    }
    const value = generate();
    const duplicates = accepted.get(value) ?? [];

    if (duplicates.length >= maxDuplicates) continue;

    duplicates.push(value);
    accepted.set(value, duplicates);
    acceptedCount++;
  }

  return Array.from(accepted.values()).flatMap((values) => values);
};

export const generateRandomDates = ({
  count,
  between: [from, to],
  maxDuplicates = 1,
}: {
  count: number;
  between: readonly [Date, Date];
  maxDuplicates?: number;
}) => {
  return generateWithMaxDuplicates({
    count,
    maxDuplicates,
    generate: () => {
      const randomDate = faker.date.between(from, to);

      return new Date(
        randomDate.getFullYear(),
        randomDate.getMonth(),
        randomDate.getDate()
      ).getTime();
    },
  }).sort();
};

export const generateRandomMonths = ({
  count,
  between: [from, to],
  maxDuplicates = 1,
}: {
  count: number;
  between: readonly [Date, Date];
  maxDuplicates?: number;
}) => {
  return generateWithMaxDuplicates({
    count,
    maxDuplicates,
    generate: () => {
      const randomDate = faker.date.between(from, to);

      return new Date(
        randomDate.getFullYear(),
        randomDate.getMonth()
      ).getTime();
    },
  }).sort();
};

export const toPairs = <Item>(array: Array<Item>) => {
  if (array.length % 2 !== 0) {
    throw new Error("Cannot create pairs: Array length must be divisible by 2");
  }

  const count = array.length / 2;
  const pairs = new Array<[Item, Item]>(count);

  for (let i = 0; i < count; i++) {
    pairs[i] = [array[i * 2], array[i * 2 + 1]];
  }

  return pairs;
};
