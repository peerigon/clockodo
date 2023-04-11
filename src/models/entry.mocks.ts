import { faker } from "@faker-js/faker";
import { isoUtcDateTimeFromDateTime } from "../lib/dateTime.js";
import {
  Billability,
  Entry,
  TimeEntry,
  LumpsumValueEntry,
  LumpsumServiceEntry,
} from "./entry.js";

type CommonOptions = {
  count?: number;
  timeSinceBetween?: readonly [Date, Date];
};

const DEFAULT_FROM = new Date(2020, 0);
const DEFAULT_TO = new Date(2021, 0);

const createCommonEntryMock = (from: Date, to: Date) => {
  const hasText = faker.datatype.number({ min: 0, max: 10 }) > 2;
  const timeSince = faker.date.between(from, to);
  const timeSinceAsIsoString = isoUtcDateTimeFromDateTime(timeSince);

  return {
    id: 0,
    customersId: 0,
    projectsId: null,
    usersId: 0,
    textsId: hasText ? 0 : null,
    text: hasText
      ? faker.lorem.words(faker.datatype.number({ min: 2, max: 10 }))
      : null,
    timeSince: timeSinceAsIsoString,
    timeUntil: timeSinceAsIsoString,
    timeInsert: timeSinceAsIsoString,
    timeLastChange: timeSinceAsIsoString,
  };
};

export const createTimeEntryMocks = ({
  count = 1,
  timeSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
  timeEntryTypes = ["clocking", "clocked", "manual"],
}: CommonOptions & {
  timeEntryTypes?: Array<"clocking" | "clocked" | "manual">;
} = {}) =>
  Array.from({ length: count }, (_, index): TimeEntry => {
    const commonEntry = createCommonEntryMock(from, to);
    const timeEntryType =
      timeEntryTypes[
        faker.datatype.number({
          min: 0,
          max: timeEntryTypes.length - 1,
        })
      ] ?? "clocked";
    const timeUntil =
      timeEntryType === "clocking"
        ? null
        : isoUtcDateTimeFromDateTime(
            new Date(
              new Date(commonEntry.timeSince).getTime() +
                faker.datatype.number({ min: 1, max: 8 * 60 * 60 }) * 1000
            )
          );

    return {
      ...commonEntry,
      id: index,
      type: 1,
      servicesId: 0,
      timeUntil,
      timeClockedSince:
        timeEntryType === "manual" ? null : commonEntry.timeSince,
      timeLastChangeWorkTime: commonEntry.timeSince,
      billable: [
        Billability.NotBillable,
        Billability.Billable,
        Billability.Billed,
      ][faker.datatype.number({ min: 0, max: 2 })],
      duration:
        timeUntil === null
          ? null
          : Math.floor(
              (new Date(timeUntil).getTime() -
                new Date(commonEntry.timeSince).getTime()) /
                1000
            ),
      clocked: timeEntryType !== "manual",
      clockedOffline:
        timeEntryType === "manual"
          ? false
          : faker.datatype.number({ min: 0, max: 10 }) < 1,
      hourlyRate: faker.datatype.number({ min: 40, max: 150 }),
    };
  });

export const createLumpsumValueEntryMocks = ({
  count = 1,
  timeSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: CommonOptions = {}) =>
  Array.from({ length: count }, (_, index): LumpsumValueEntry => {
    const commonEntry = createCommonEntryMock(from, to);

    return {
      ...commonEntry,
      id: index,
      type: 2,
      billable: [Billability.Billable as const, Billability.Billed as const][
        index % 2
      ],
      servicesId: 0,
      lumpsum: faker.datatype.float({ min: 0.2, max: 150 }),
    };
  });

export const createLumpsumServiceEntryMocks = ({
  count = 1,
  timeSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: CommonOptions = {}) =>
  Array.from({ length: count }, (_, index): LumpsumServiceEntry => {
    const commonEntry = createCommonEntryMock(from, to);

    return {
      ...commonEntry,
      id: index,
      type: 3,
      billable: [Billability.Billable as const, Billability.Billed as const][
        index % 2
      ],
      lumpsumServicesId: 0,
      lumpsumServicesAmount: faker.datatype.float({ min: 0.2, max: 150 }),
    };
  });

export const createEntryMocks = (options: CommonOptions = {}) => {
  const { count = 1 } = options;
  const timeEntryMocks = createTimeEntryMocks(options);
  const lumpsumValueEntryMocks = createLumpsumValueEntryMocks(options);
  const lumpsumServiceEntryMocks = createLumpsumServiceEntryMocks(options);

  return Array.from({ length: count }, (_, index): Entry => {
    const typeSeed = faker.datatype.number({ min: 0, max: 10 });
    const entry =
      typeSeed > 2
        ? timeEntryMocks[index]
        : typeSeed > 1
        ? lumpsumValueEntryMocks[index]
        : lumpsumServiceEntryMocks[index];

    return {
      ...entry,
      id: index,
    };
  });
};
