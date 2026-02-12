// These date helpers are not meant to replace an actual date library.
// They are inaccurate and sometimes just wrong, see https://gist.github.com/timvisee/fcda9bbdff88d45cc9061606b4b923ca
// They should only be used for generating mock data.

import { faker } from "@faker-js/faker";

/**
 * Sets the seed for Faker.js (which is used by the mocks).
 *
 * @see https://github.com/Marak/Faker.js
 */
export const setFakerSeed = (seed: number): void => {
  faker.seed(seed);
};

/** The number of milliseconds on a typical day. */
export const ONE_DAY = 24 * 60 * 60 * 1000;

/** The number of milliseconds on a typical year. */
export const ONE_YEAR = 356 * ONE_DAY;

const MAX_ITERATION_COUNT = 10_000;

export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
};

export const endOfYear = (dateTime: Date): Date => {
  return new Date(dateTime.getFullYear() + 1, 0, 0, 23, 59, 59, 999);
};

export const startOfNextDay = (date: Date): Date => {
  const nextDay = new Date(startOfDay(date).getTime() + 1.5 * ONE_DAY);

  return new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
};

const generateWithMaxDuplicates = <Value>({
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
This usually happens when the generated values create too many conflicts (e.g. too many dates on a small date range).`,
      );
    }
    const value = generate();
    const duplicates = accepted.get(value) ?? [];

    if (duplicates.length >= maxDuplicates) continue;

    duplicates.push(value);
    accepted.set(value, duplicates);
    acceptedCount++;
  }

  return [...accepted.values()].flat().toSorted();
};

export const generateRandomDateTimes = ({
  count,
  between: [from, to],
  maxDuplicates = 1,
}: {
  count: number;
  between: readonly [Date, Date];
  maxDuplicates?: number;
}): Array<number> => {
  return generateWithMaxDuplicates({
    count,
    maxDuplicates,
    generate: () => {
      return faker.date.between({ from, to }).getTime();
    },
  });
};

export const generateRandomDates = ({
  count,
  between: [from, to],
  maxDuplicates = 1,
}: {
  count: number;
  between: readonly [Date, Date];
  maxDuplicates?: number;
}): Array<number> => {
  return generateWithMaxDuplicates({
    count,
    maxDuplicates,
    generate: () => {
      const randomDate = faker.date.between({ from, to });

      return new Date(
        randomDate.getFullYear(),
        randomDate.getMonth(),
        randomDate.getDate(),
      ).getTime();
    },
  });
};

export const generateRandomMonths = ({
  count,
  between: [from, to],
  maxDuplicates = 1,
}: {
  count: number;
  between: readonly [Date, Date];
  maxDuplicates?: number;
}): Array<number> => {
  return generateWithMaxDuplicates({
    count,
    maxDuplicates,
    generate: () => {
      const randomDate = faker.date.between({ from, to });

      return new Date(
        randomDate.getFullYear(),
        randomDate.getMonth(),
      ).getTime();
    },
  });
};

export const toPairs = <Item>(array: Array<Item>): Array<[Item, Item]> => {
  if (array.length % 2 !== 0) {
    throw new Error("Cannot create pairs: Array length must be divisible by 2");
  }

  const count = array.length / 2;
  const pairs: Array<[Item, Item]> = Array.from({ length: count });

  for (let i = 0; i < count; i++) {
    pairs[i] = [array[i * 2]!, array[i * 2 + 1]!];
  }

  return pairs;
};
