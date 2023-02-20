import { faker } from "@faker-js/faker";
import {
  generateRandomDates,
  generateWithMaxDuplicates,
  isoDateFromDateTime,
  startOfDay,
} from "../lib/mocks.js";
import {
  ChangeRequest,
  ChangeRequestTimeInterval,
  ChangeRequestTimeIntervalType,
  WorkTimeDay,
  WorkTimeDayTimeInterval,
} from "./workTimes.js";

const DEFAULT_FROM = new Date(2020, 0);
const DEFAULT_TO = new Date(2021, 0);

/**
 * Generiert auf Basis eines Datums (also eines Tages) ein oder mehrere
 * nicht-dublette Zeitstempel, die im nächsten Schritt als Start- bzw.
 * Endpunkte der Intervalle verwendet werden.
 */
const generateIntervals = ({
  count = 1,
  date = DEFAULT_FROM,
}: {
  count?: number;
  date: Date;
}): Array<WorkTimeDayTimeInterval> => {
  const pointsInTime = generateWithMaxDuplicates({
    // Wir stellen sicher, dass immer ein Start- und ein Endpunkt existieren
    count: count * 2,
    maxDuplicates: 1,
    generate: () => {
      const hoursInMilliseconds =
        faker.datatype.number({ min: 6, max: 18 }) * 60 * 60 * 1000;
      const minutesInMilliseconds =
        faker.datatype.number({ min: 0, max: 59 }) * 60 * 1000;
      const secondsInMilliseconds =
        faker.datatype.number({ min: 0, max: 59 }) * 1000;

      const result =
        startOfDay(date).valueOf() +
        hoursInMilliseconds +
        minutesInMilliseconds +
        secondsInMilliseconds;

      return result;
    },
  }).sort();

  return pointsInTime.reduce<Array<WorkTimeDayTimeInterval>>(
    (acc, pointInTime, index) => {
      // Endpunkte werden nicht selbst verarbeitet, sondern wurden bereits
      // in der Iteration zuvor verwendet
      if (index % 2 === 1) return acc;

      const interval: WorkTimeDayTimeInterval = {
        timeSince: new Date(pointInTime).toISOString(),
        timeUntil: new Date(pointsInTime[index + 1]).toISOString(),
      };

      return [...acc, interval];
    },
    []
  );
};

const createWorkTimeDayMock = ({ date }: { date: Date }): WorkTimeDay => {
  const intervals = generateIntervals({
    count: faker.datatype.number({ min: 1, max: 4 }),
    date,
  });

  return {
    date: isoDateFromDateTime(date),
    usersId: 0,
    intervals,
    offset: 0,
  };
};

export const createWorkTimeDayMocks = ({
  count = 1,
  dateBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: {
  count?: number;
  dateBetween?: readonly [Date, Date];
}) => {
  let id = -1;

  return generateRandomDates({
    count,
    between: [from, to],
  }).map((timestamp): WorkTimeDay => {
    id = id + 1;
    const date = startOfDay(new Date(timestamp));

    return createWorkTimeDayMock({
      date,
    });
  });
};

const generateChangeRequestChanges = ({
  count = 1,
  date = DEFAULT_FROM,
}): Array<ChangeRequestTimeInterval> => {
  return generateIntervals({ count, date }).map((interval, index) => {
    return {
      ...interval,
      timeUntil: interval.timeUntil!,
      type: faker.datatype.boolean()
        ? ChangeRequestTimeIntervalType.Add
        : ChangeRequestTimeIntervalType.Remove,
    };
  });
};

const createChangeRequest = ({
  date,
  id,
}: {
  date: Date;
  id: number;
}): ChangeRequest => {
  const changes = generateChangeRequestChanges({
    count: faker.datatype.number({ min: 1, max: 4 }),
    date,
  });

  return {
    id,
    date: isoDateFromDateTime(date),
    usersId: 0,
    changes,
  };
};

export const createChangeRequestMocks = ({
  count = 1,
  dateBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: {
  count?: number;
  dateBetween?: readonly [Date, Date];
}) => {
  let id = -1;

  return generateRandomDates({
    count,
    between: [from, to],
  }).map((timestamp): ChangeRequest => {
    id = id + 1;
    const date = startOfDay(new Date(timestamp));

    return createChangeRequest({
      date,
      id,
    });
  });
};
