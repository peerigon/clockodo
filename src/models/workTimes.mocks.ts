import { faker } from "@faker-js/faker";
import {
  generateRandomDates,
  generateWithMaxDuplicates,
  isoDateFromDateTime,
  startOfDay,
} from "../lib/mocks.js";
import {
  WorkTimeDayVariant,
  WorkTimeDayVariantStatus,
  WorkTimeInterval,
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
}) => {
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

  return pointsInTime.reduce<
    Array<{ interval: WorkTimeInterval; duration: number }>
  >((sum, pointInTime, index) => {
    // Endpunkte werden nicht selbst verarbeitet, sondern wurden bereits
    // in der Iteration zuvor verwendet
    if (index % 2 === 1) return sum;

    // Die Dauer wird direkt mit errechnet und zurückgegeben
    const duration = (pointsInTime[index + 1] - pointsInTime[index]) / 1000;
    const interval = {
      timeSince: new Date(pointInTime).toISOString(),
      timeUntil: new Date(pointsInTime[index + 1]).toISOString(),
    };

    return [...sum, { interval, duration }];
  }, []);
};

const sumDurations = (sum: number, { duration }: { duration: number }) =>
  sum + duration;
const pickIntervals = <T>({ interval }: { interval: T }): T => interval;

const createWorkTimeDayVariant = ({
  status,
  date,
  id,
}: {
  status: WorkTimeDayVariantStatus;
  date: Date;
  id: number;
}) => {
  const intervalsWithDurations = generateIntervals({
    count: faker.datatype.number({ min: 1, max: 4 }),
    date,
  });
  const intervals = intervalsWithDurations.map(pickIntervals);
  const duration = intervalsWithDurations.reduce(sumDurations, 0);

  return {
    id,
    clocking: false,
    date: isoDateFromDateTime(date),
    duration,
    usersId: 0,
    intervals,
    status,
  };
};

export const createWorkTimesMocks = ({
  count = 1,
  dateBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
  status = WorkTimeDayVariantStatus.Approved,
}: {
  count?: number;
  dateBetween?: readonly [Date, Date];
  status: WorkTimeDayVariantStatus;
}) => {
  let id = -1;

  return generateRandomDates({
    count,
    between: [from, to],
  }).map((timestamp): Array<WorkTimeDayVariant> => {
    id = id + 1;
    const date = startOfDay(new Date(timestamp));

    switch (status) {
      case WorkTimeDayVariantStatus.Requested: {
        return [
          createWorkTimeDayVariant({
            date,
            id,
            status: WorkTimeDayVariantStatus.Requested,
          }),
        ];
      }
      case WorkTimeDayVariantStatus.Approved: {
        return [
          createWorkTimeDayVariant({
            date,
            id,
            status: WorkTimeDayVariantStatus.Approved,
          }),
        ];
      }
      default: {
        console.error("Unknown WorkTimeDayVariantStatus value");

        return [];
      }
    }
  });
};
