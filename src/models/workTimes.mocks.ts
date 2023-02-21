import { faker } from "@faker-js/faker";
import {
  generateRandomDates,
  generateWithMaxDuplicates,
  isoDateFromDateTime,
  isoUtcDateTimeFromDateTime,
  startOfDay,
} from "../lib/mocks.js";
import {
  WorkTimeChangeRequest,
  WorkTimeChangeRequestInterval,
  WorkTimeChangeRequestIntervalType,
  WorkTimeDay,
  WorkTimeDayInterval,
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
}): Array<WorkTimeDayInterval> => {
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

  return pointsInTime.reduce<Array<WorkTimeDayInterval>>(
    (acc, pointInTime, index) => {
      // Endpunkte werden nicht selbst verarbeitet, sondern wurden bereits
      // in der Iteration zuvor verwendet
      if (index % 2 === 1) return acc;

      const interval: WorkTimeDayInterval = {
        timeSince: isoUtcDateTimeFromDateTime(new Date(pointInTime)),
        timeUntil: isoUtcDateTimeFromDateTime(
          new Date(pointsInTime[index + 1])
        ),
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
}): Array<WorkTimeChangeRequestInterval> => {
  return generateIntervals({ count, date }).map((interval, index) => {
    return {
      ...interval,
      timeUntil: interval.timeUntil!,
      type: faker.datatype.boolean()
        ? WorkTimeChangeRequestIntervalType.Add
        : WorkTimeChangeRequestIntervalType.Remove,
    };
  });
};

const createChangeRequest = ({
  date,
  id,
}: {
  date: Date;
  id: number;
}): WorkTimeChangeRequest => {
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

export const createWorkTimeChangeRequestMocks = ({
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
  }).map((timestamp): WorkTimeChangeRequest => {
    id = id + 1;
    const date = startOfDay(new Date(timestamp));

    return createChangeRequest({
      date,
      id,
    });
  });
};
