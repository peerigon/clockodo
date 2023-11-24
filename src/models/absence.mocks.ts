import { faker } from "@faker-js/faker";
import { isoDateFromDateTime } from "../lib/dateTime.js";
import {
  endOfYear,
  generateRandomDates,
  ONE_DAY,
  startOfDay,
  toPairs,
} from "../lib/mocks.js";
import { AbsenceStatus, AbsenceType, Absence } from "./absence.js";

const DEFAULT_FROM = new Date(2020, 0);
const DEFAULT_TO = new Date(2021, 0);

const absenceStatuses = Object.values(AbsenceStatus).filter(
  (status): status is AbsenceStatus => typeof status === "number"
);
const absenceTypesWithoutOvertimeReduction = Object.values(AbsenceType).filter(
  (status): status is Exclude<AbsenceType, AbsenceType.ReductionOfOvertime> =>
    typeof status === "number" && status !== AbsenceType.ReductionOfOvertime
);

export const createAbsenceMocks = ({
  count = 1,
  dateSinceBetween: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: { count?: number; dateSinceBetween?: readonly [Date, Date] } = {}) => {
  const dayPairs = toPairs(
    generateRandomDates({
      count: count * 2,
      between: [from, to],
      maxDuplicates: 2,
    })
  );

  return dayPairs.map(([from, to], index): Absence => {
    const isOvertimeReduction = faker.datatype.number({ min: 0, max: 10 }) > 6;
    const isHalfDay =
      isOvertimeReduction === false &&
      faker.datatype.number({ min: 0, max: 10 }) > 6;
    const hasNote = faker.datatype.number({ min: 0, max: 10 }) > 2;

    const absencesId = index;

    const dateSince = startOfDay(faker.date.between(from, to));
    const dateUntil = isHalfDay
      ? dateSince
      : new Date(
          Math.min(
            to,
            // Make sure that we don't get absences that are too long
            dateSince.getTime() +
              faker.datatype.number({ min: 0, max: 30 }) * ONE_DAY,
            // Clockodo makes sure that dateSince and dateUntil are always within the same year
            endOfYear(dateSince).getTime()
          )
        );

    const status =
      faker.datatype.number({ min: 0, max: 10 }) > 4
        ? AbsenceStatus.Approved
        : faker.helpers.arrayElement(absenceStatuses);
    const dateEnquiredDateTime = new Date(
      dateSince.getTime() -
        faker.datatype.number({ min: 5, max: 200 }) * ONE_DAY
    );

    const commonAbsence = {
      id: absencesId,
      usersId: 0,
      dateSince: isoDateFromDateTime(dateSince),
      dateUntil: isoDateFromDateTime(dateUntil),
      status,
      note: hasNote
        ? faker.lorem.words(faker.datatype.number({ min: 2, max: 10 }))
        : null,
      dateEnquired:
        faker.datatype.number({ min: 0, max: 10 }) > 6
          ? null
          : isoDateFromDateTime(dateEnquiredDateTime),
      dateApproved:
        status === AbsenceStatus.Approved
          ? isoDateFromDateTime(
              new Date(
                dateEnquiredDateTime.getTime() +
                  faker.datatype.number({ min: 0, max: 4 }) * ONE_DAY
              )
            )
          : null,
      approvedBy: status === AbsenceStatus.Approved ? 1 : null,
    };

    if (isOvertimeReduction) {
      return {
        ...commonAbsence,
        type: AbsenceType.ReductionOfOvertime,
        countDays: null,
        countHours: faker.datatype.float({ min: 0.1, max: 8 }),
      };
    }

    return {
      ...commonAbsence,
      // Make sure that we get the most important absence types
      // also for lower mock counts.
      type: absenceTypesWithoutOvertimeReduction[
        index % absenceTypesWithoutOvertimeReduction.length
      ],
      countDays: isHalfDay
        ? 0.5
        : Math.max(
            (dateUntil.getTime() - dateSince.getTime()) / ONE_DAY -
              faker.datatype.number({ min: 0, max: 3 }),
            1
          ),
      countHours: null,
    };
  });
};
