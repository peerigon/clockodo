import faker from "faker";
import { AbsenceStatus, AbsenceType, Absence } from "./absence.js";

const DEFAULT_FROM = new Date("2020");
const DEFAULT_TO = new Date("2021");
const ONE_DAY = 24 * 60 * 60 * 1000;

const absenceStatuses = Object.values(AbsenceStatus).filter(
  (status): status is AbsenceStatus => typeof status === "number"
);
const absenceTypesWithoutOvertimeReduction = Object.values(AbsenceType).filter(
  (status): status is AbsenceType =>
    typeof status === "number" && status !== AbsenceType.ReductionOfOvertime
);

export const createAbsencesMocks = ({
  count = 1,
  between: [from, to] = [DEFAULT_FROM, DEFAULT_TO],
}: { count?: number; between?: [Date, Date] } = {}) => {
  return Array.from({ length: count }, (_, index): Absence => {
    const isOvertimeReduction = faker.datatype.number({ min: 0, max: 10 }) > 6;
    const isHalfDay =
      isOvertimeReduction === false &&
      faker.datatype.number({ min: 0, max: 10 }) > 6;
    const hasNote = faker.datatype.number({ min: 0, max: 10 }) > 2;

    const absencesId = index;

    let dateSinceDateTime = faker.date.between(from, to);
    let dateUntilDateTime = isHalfDay
      ? dateSinceDateTime
      : new Date(
          Math.min(
            dateSinceDateTime.getTime() +
              faker.datatype.number({ min: 0, max: 5 }) * ONE_DAY,
            to.getTime()
          )
        );

    const dateSince = isoDateFromDateTime(dateSinceDateTime);
    const dateUntil = isoDateFromDateTime(dateUntilDateTime);

    dateSinceDateTime = new Date(dateSince);
    dateUntilDateTime = new Date(dateUntil);

    const status =
      faker.datatype.number({ min: 0, max: 10 }) > 4
        ? AbsenceStatus.Approved
        : faker.random.arrayElement(absenceStatuses);
    const dateEnquiredDateTime = new Date(
      dateSinceDateTime.getTime() -
        faker.datatype.number({ min: 5, max: 200 }) * ONE_DAY
    );

    return {
      id: absencesId,
      usersId: 0,
      dateSince,
      dateUntil,
      status,
      type: isOvertimeReduction
        ? AbsenceType.ReductionOfOvertime
        : // Make sure that we get the most important absence types
          // also for lower mock counts.
          absenceTypesWithoutOvertimeReduction[
            index % absenceTypesWithoutOvertimeReduction.length
          ],
      note: hasNote
        ? faker.lorem.words(faker.datatype.number({ min: 2, max: 10 }))
        : null,
      countDays: isOvertimeReduction
        ? null
        : isHalfDay
        ? 0.5
        : Math.max(
            (dateUntilDateTime.getTime() - dateSinceDateTime.getTime()) /
              ONE_DAY -
              faker.datatype.number({ min: 0, max: 3 }),
            1
          ),
      countHours: isOvertimeReduction
        ? faker.datatype.float({ min: 0.1, max: 8 })
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
  });
};

const isoDateFromDateTime = (dateTime: Date) => {
  return dateTime.toISOString().replace(/T.*/, "");
};
