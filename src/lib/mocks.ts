import { faker } from "@faker-js/faker";

export const ONE_DAY = 24 * 60 * 60 * 1000;
const MAX_ITERATION_COUNT = 10000;

export const isoDateFromDateTime = (dateTime: Date) => {
  return dateTime.toISOString().replace(/T.*/, "");
};

export const isoMonthFromDateTime = (dateTime: Date) => {
  return dateTime.toISOString().replace(/-\d\dT.*/, "");
};

export const isoDateFromTimestamp = (timestamp: number) => {
  return isoDateFromDateTime(new Date(timestamp));
};

export const timestampFromIsoDate = (isoDate: string) => {
  return new Date(isoDate).getTime();
};

export const endOfMonth = (date: Date) => {
  let startOfNextMonth = new Date(date.getTime());

  startOfNextMonth.setMonth(date.getMonth() + 1);

  if (startOfNextMonth.getMonth() === 0) {
    startOfNextMonth.setFullYear(date.getFullYear() + 1);
  }

  startOfNextMonth = new Date(isoMonthFromDateTime(startOfNextMonth));

  const endOfMonth = new Date(startOfNextMonth);

  endOfMonth.setTime(endOfMonth.getTime() - ONE_DAY / 2);

  return new Date(isoDateFromDateTime(endOfMonth));
};

export const endOfYear = (dateTime: Date) => {
  return new Date(`${dateTime.getFullYear()}-12-31T23:59:59.999Z`);
};

export const nextDay = (date: Date) => {
  return new Date(isoDateFromDateTime(new Date(date.getTime() + ONE_DAY)));
};

export const generateUnique = <Value>({
  count,
  generate,
}: {
  count: number;
  generate: () => Value;
}) => {
  const generated = new Set<Value>();

  for (let i = 0; generated.size < count; i++) {
    if (i === MAX_ITERATION_COUNT) {
      throw new Error(
        `Couldn't generate enough unique values before reaching the max iteration count.
This usually happens when the generated values create too many conflicts (e.g. too many dates on a small date range).`
      );
    }
    generated.add(generate());
  }

  return generated;
};

export const generateDayRange = ({
  count,
  between: [from, to],
}: {
  count: number;
  between: [Date, Date];
}) => {
  return Array.from(
    generateUnique({
      count,
      generate: () => {
        const randomDay = isoDateFromDateTime(faker.date.between(from, to));

        return timestampFromIsoDate(randomDay);
      },
    })
  ).sort();
};

export const generateMonthRange = ({
  count,
  between: [from, to],
}: {
  count: number;
  between: [Date, Date];
}) => {
  return Array.from(
    generateUnique({
      count,
      generate: () => {
        const randomMonth = isoMonthFromDateTime(faker.date.between(from, to));

        return timestampFromIsoDate(randomMonth);
      },
    })
  ).sort();
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
