import { faker } from "@faker-js/faker";
import {
  isoDateFromDateTime,
  isoUtcDateTimeFromDateTime,
  isoUtcDateTimeFromTimestamp,
} from "../lib/dateTime.js";
import {
  generateRandomDates,
  generateRandomDateTimes,
  startOfDay,
  startOfNextDay,
  toPairs,
} from "../lib/mocks.js";
import {
  WorkTimeChangeRequest,
  WorkTimeChangeRequestInterval,
  WorkTimeChangeRequestIntervalType,
  WorkTimeChangeRequestStatus,
  WorkTimeDay,
} from "./workTimes.js";

const DEFAULT_FROM = new Date(2020, 0);
const DEFAULT_TO = new Date(2021, 0);

const generateIntervals = ({
  count = 1,
  date = DEFAULT_FROM,
}: {
  count?: number;
  date: Date;
}) => {
  const dateTimes = generateRandomDateTimes({
    count: count * 2,
    between: [startOfDay(date), startOfNextDay(date)],
  });

  return toPairs(dateTimes).map(([start, end]) => ({
    timeSince: isoUtcDateTimeFromTimestamp(start),
    timeUntil: isoUtcDateTimeFromTimestamp(end),
  }));
};

const createWorkTimeDayMock = ({ date }: { date: Date }): WorkTimeDay => {
  const intervals = generateIntervals({
    count: faker.number.int({ min: 1, max: 4 }),
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
  const workTimeDays = generateRandomDates({
    count,
    between: [from, to],
  }).map((timestamp) => {
    const date = startOfDay(new Date(timestamp));

    return createWorkTimeDayMock({
      date,
    });
  });

  const lastWorkTimeDay = workTimeDays.at(-1);

  if (lastWorkTimeDay) {
    const [firstInterval] = lastWorkTimeDay.intervals;

    // Now let's simulate an unfinished WorkTimeDay
    // We take the first interval on purpose because it's technically possible
    // to have future work times.
    firstInterval.timeUntil = null;
  }

  return workTimeDays;
};

const generateChangeRequestChanges = ({ count = 1, date = DEFAULT_FROM }) => {
  return generateIntervals({ count, date }).map(
    (interval): WorkTimeChangeRequestInterval => {
      return {
        ...interval,
        type: faker.datatype.boolean()
          ? WorkTimeChangeRequestIntervalType.Add
          : WorkTimeChangeRequestIntervalType.Remove,
      };
    },
  );
};

const createChangeRequest = ({
  date,
  id,
  status = WorkTimeChangeRequestStatus.Requested,
  createdAt,
}: {
  date: Date;
  id: number;
  status?: WorkTimeChangeRequestStatus;
  createdAt?: Date;
}): WorkTimeChangeRequest => {
  const changes = generateChangeRequestChanges({
    count: faker.number.int({ min: 1, max: 4 }),
    date,
  });
  const isoDate = isoDateFromDateTime(date);
  const isoCreatedAt = isoUtcDateTimeFromDateTime(createdAt ?? new Date());

  return {
    id,
    date: isoDate,
    usersId: 0,
    changes,
    createdAt: isoCreatedAt,
    ...(status === WorkTimeChangeRequestStatus.Declined
      ? {
          status: WorkTimeChangeRequestStatus.Declined,
          declinedAt: isoDate,
          declinedBy: 0,
        }
      : {
          status: WorkTimeChangeRequestStatus.Requested,
        }),
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
  }).map((timestamp) => {
    id = id + 1;
    const date = startOfDay(new Date(timestamp));

    return createChangeRequest({
      date,
      id,
      createdAt: date,
    });
  });
};
