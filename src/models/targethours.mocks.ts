import { faker } from "@faker-js/faker";
import {
  ONE_YEAR,
  ONE_DAY,
  generateRandomDates,
  generateRandomMonths,
  isoDateFromDateTime,
  isoDateFromTimestamp,
  toPairs,
  endOfMonth,
  nextDay,
} from "../lib/mocks.js";
import {
  TargethoursRow,
  TargethoursRowMonthly,
  TargethoursRowType,
  TargethoursRowWeekly,
} from "./targethours.js";

type CommonOptions = {
  count?: number;
  dateSinceBetween?: [Date, Date];
};

const DEFAULT_FROM = new Date(2019, 0);
const DEFAULT_TO = new Date(2022, 0);

const createCommonTargethoursRowMock = (dateSince: Date) => {
  return {
    id: 0,
    dateSince: isoDateFromDateTime(dateSince),
    dateUntil: null,
    compensationMonthly: faker.datatype.number({ min: 0, max: 8 }),
    usersId: 0,
  };
};

export const createTargethoursRowWeeklyMocks = ({
  count = 1,
  dateSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: CommonOptions = {}) => {
  const dayPairs = toPairs(
    generateRandomDates({
      count: count * 2,
      between: [from, to],
      maxDuplicates: 2,
    })
  );
  let previousTo: undefined | number;

  return dayPairs.map(([from, to], index): TargethoursRowWeekly => {
    const dateSince =
      // Make it more unlikely that there are "holes" between to and from
      previousTo !== undefined && faker.datatype.number({ min: 0, max: 10 }) < 7
        ? nextDay(new Date(previousTo))
        : new Date(from);
    const commonTargethoursRow = createCommonTargethoursRowMock(dateSince);
    const isLastOne = index === count - 1;
    const typicalHours = [
      0,
      0,
      faker.datatype.number({ min: 1, max: 4 }),
      faker.datatype.number({ min: 4, max: 8 }),
      parseFloat(faker.datatype.float({ min: 0, max: 8 }).toFixed(2)),
      24,
    ];

    faker.helpers.shuffle(typicalHours);

    previousTo = to;

    return {
      ...commonTargethoursRow,
      id: index,
      dateUntil:
        isLastOne && faker.datatype.boolean() ? null : isoDateFromTimestamp(to),
      type: TargethoursRowType.Weekly,
      monday: typicalHours[0 % typicalHours.length],
      tuesday: typicalHours[1 % typicalHours.length],
      wednesday: typicalHours[2 % typicalHours.length],
      thursday: typicalHours[3 % typicalHours.length],
      friday: typicalHours[4 % typicalHours.length],
      saturday: typicalHours[5 % typicalHours.length],
      sunday: typicalHours[6 % typicalHours.length],
      absenceFixedCredit: faker.datatype.boolean(),
      compensationDaily: faker.datatype.number({ min: 0, max: 60 }),
    };
  });
};

export const createTargethoursRowMonthlyMocks = ({
  count = 1,
  dateSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: CommonOptions = {}) => {
  const monthPairs = toPairs(
    generateRandomMonths({
      count: count * 2,
      between: [from, to],
    })
  );

  return monthPairs.map(([from, to], index): TargethoursRowMonthly => {
    const commonTargethoursRow = createCommonTargethoursRowMock(new Date(from));
    const isLastOne = index === count - 1;
    const typicalHours = [
      0,
      0,
      faker.datatype.number({ min: 1, max: 4 }),
      faker.datatype.number({ min: 4, max: 8 }),
      parseFloat(faker.datatype.float({ min: 0, max: 8 }).toFixed(2)),
      24,
    ];

    faker.helpers.shuffle(typicalHours);

    return {
      ...commonTargethoursRow,
      id: index,
      dateUntil:
        isLastOne && faker.datatype.boolean()
          ? null
          : isoDateFromDateTime(endOfMonth(new Date(to))),
      type: TargethoursRowType.Monthly,
      monthlyTarget: faker.datatype.number(),
      workdayMonday: faker.datatype.boolean(),
      workdayTuesday: faker.datatype.boolean(),
      workdayWednesday: faker.datatype.boolean(),
      workdayThursday: faker.datatype.boolean(),
      workdayFriday: faker.datatype.boolean(),
      workdaySaturday: faker.datatype.boolean(),
      workdaySunday: faker.datatype.boolean(),
    };
  });
};

export const createTargethoursRowMocks = (
  options: CommonOptions = {}
): Array<TargethoursRow> => {
  const {
    count = 1,
    dateSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
  } = options;
  const dateRangeIsLongEnough = to.getTime() - from.getTime() > 1.5 * ONE_YEAR;

  // If the date range is long enough, the first year will use monthly target hours
  const monthlyTargethoursRows = dateRangeIsLongEnough
    ? createTargethoursRowMonthlyMocks({
        ...options,
        dateSinceBetween: [from, new Date(from.getTime() + ONE_YEAR)],
        count: Math.min(count, 3),
      }).filter((targethoursRow) => targethoursRow.dateUntil !== null)
    : [];

  const countOfWeeklyTargethoursRows = count - monthlyTargethoursRows.length;

  const weeklyTargethoursRows = createTargethoursRowWeeklyMocks({
    ...options,
    dateSinceBetween: [
      dateRangeIsLongEnough
        ? new Date(from.getTime() + ONE_YEAR + ONE_DAY)
        : from,
      to,
    ],
    count: countOfWeeklyTargethoursRows,
  });

  return [...monthlyTargethoursRows, ...weeklyTargethoursRows].map(
    (targethoursRow, index) => ({
      ...targethoursRow,
      id: index,
    })
  );
};
