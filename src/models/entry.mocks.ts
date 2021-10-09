import faker from "faker";
import { dateToClockodoIsoString } from "../lib/dateTime.js";
import {
  Billability,
  TimeEntry,
  LumpsumValueEntry,
  LumpsumServiceEntry,
} from "./entry.js";

export const createEntryMocks = ({
  count,
  timeSinceBetween: [from, to],
}: {
  count: number;
  timeSinceBetween: [Date, Date];
}) =>
  Array.from({ length: count }, (_, index) => {
    const typeSeed = faker.datatype.number({ min: 0, max: 10 });
    const hasText = faker.datatype.number({ min: 0, max: 10 }) > 2;
    const timeSince = faker.date.between(from, to);
    const timeUntil = new Date(
      timeSince.getTime() +
        faker.datatype.number({ min: 1, max: 8 * 60 * 60 }) * 1000
    );
    const timeSinceAsIsoString = dateToClockodoIsoString(timeSince);
    const commonEntry = {
      id: index,
      customersId: 0,
      projectsId: null,
      usersId: 0,
      textsId: hasText ? index : null,
      text: hasText
        ? faker.lorem.words(faker.datatype.number({ min: 2, max: 10 }))
        : null,
      timeSince: timeSinceAsIsoString,
      timeInsert: timeSinceAsIsoString,
      timeLastChange: timeSinceAsIsoString,
    };

    if (typeSeed > 2) {
      const timeEntry: Required<TimeEntry> = {
        ...commonEntry,
        type: 1,
        servicesId: 0,
        timeClockedSince: timeSinceAsIsoString,
        timeUntil: dateToClockodoIsoString(timeUntil),
        timeLastChangeWorkTime: timeSinceAsIsoString,
        billable: [
          Billability.NotBillable,
          Billability.Billable,
          Billability.Billed,
        ][faker.datatype.number({ min: 0, max: 2 })],
        duration: Math.floor(
          (timeUntil.getTime() - timeSince.getTime()) / 1000
        ),
        offset: null,
        clocked: faker.datatype.boolean(),
        clockedOffline: faker.datatype.number({ min: 0, max: 10 }) < 1,
        hourlyRate: faker.datatype.number({ min: 40, max: 150 }),
      };

      return timeEntry;
    }

    if (typeSeed > 1) {
      const lumpsumValueEntry: Required<LumpsumValueEntry> = {
        ...commonEntry,
        type: 2,
        timeUntil: dateToClockodoIsoString(timeSince),
        billable: [Billability.Billable as const, Billability.Billed as const][
          index % 1
        ],
        servicesId: 0,
        lumpsum: faker.datatype.float({ min: 0.2, max: 150 }),
      };

      return lumpsumValueEntry;
    }

    const lumpsumServiceEntry: Required<LumpsumServiceEntry> = {
      ...commonEntry,
      type: 3,
      timeUntil: dateToClockodoIsoString(timeSince),
      billable: [Billability.Billable as const, Billability.Billed as const][
        index % 1
      ],
      lumpsumServicesId: 0,
      lumpsumServicesAmount: faker.datatype.float({ min: 0.2, max: 150 }),
    };

    return lumpsumServiceEntry;
  });
