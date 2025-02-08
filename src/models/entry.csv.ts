import { assertExists } from "../lib/assert.ts";
import { isoUtcDateTimeFromDateTime } from "../lib/dateTime.js";
import {
  Billability,
  EntryType,
  type Entry,
  type LumpsumEntryBillability,
  type TimeEntry,
  type TimeEntryBillability,
} from "./entry.js";

const EXPECTED_COLUMN_COUNT = 27;

/**
 * Transforms a row from the CSV entry backup to an entry object.
 *
 * Please note: Entries before 2014-09 will have their timeLastChange and
 * timeLastChangeWorkTime set to timeInsert since these properties didn't exist
 * back then.
 */
export const parseEntryFromCsv = (row: Array<string>): Entry => {
  if (row.length !== EXPECTED_COLUMN_COUNT) {
    throw new Error(
      `Expected row to have ${EXPECTED_COLUMN_COUNT} columns instead of ${row.length}`,
    );
  }

  const id = assertExists(row[0]);
  const usersId = assertExists(row[1]);
  const projectsId = assertExists(row[2]);
  const customersId = assertExists(row[3]);
  const servicesId = assertExists(row[4]);
  const textsId = assertExists(row[5]);
  const hourlyRate = assertExists(row[6]);
  const timeInsert = assertExists(row[7]);
  const timeLastChange = assertExists(row[8]);
  const timeLastChangeWorkTime = assertExists(row[9]);
  const timeClockedSince = assertExists(row[10]);
  const timeSince = assertExists(row[11]);
  const timeUntil = assertExists(row[12]);
  const offset = assertExists(row[13]);
  const duration = assertExists(row[14]);
  const clocked = assertExists(row[15]);
  const clockedOffline = assertExists(row[16]);
  const lumpsum = assertExists(row[17]);
  const lumpsumServicesId = assertExists(row[18]);
  const lumpsumServicesAmount = assertExists(row[19]);
  const billable = assertExists(row[20]);
  const _user = assertExists(row[21]);
  const _project = assertExists(row[22]);
  const _customer = assertExists(row[23]);
  const _service = assertExists(row[24]);
  const _lumpsumService = assertExists(row[25]);
  const text = assertExists(row[26]);

  const commonEntry = {
    id: parseNumber("id", id, "int"),
    customersId: parseNumber("customersId", customersId, "int"),
    projectsId: parseOptionalNumber("projectsId", projectsId, "int"),
    usersId: parseNumber("usersId", usersId, "int"),
    textsId: parseOptionalNumber("textsId", textsId, "int"),
    text: textsId === "" ? null : text,
    timeSince: parseIsoUtcDateTime(timeSince),
    timeInsert: parseIsoUtcDateTime(timeInsert),
    timeLastChange: parseIsoUtcDateTime(
      timeLastChange === "" ? timeInsert : timeLastChange,
    ),
  };

  if (lumpsumServicesId !== "") {
    return {
      type: EntryType.LumpsumService,
      ...commonEntry,
      timeUntil: parseIsoUtcDateTime(timeUntil),
      billable: parseLumpsumEntryBillability("billable", billable),
      lumpsumServicesId: parseNumber(
        "lumpsumServicesId",
        lumpsumServicesId,
        "int",
      ),
      lumpsumServicesAmount: parseNumber(
        "lumpsumServicesAmount",
        lumpsumServicesAmount,
        "float",
      ),
    };
  }

  if (lumpsum !== "") {
    return {
      type: EntryType.LumpsumValue,
      ...commonEntry,
      timeUntil: parseIsoUtcDateTime(timeUntil),
      billable: parseLumpsumEntryBillability("billable", billable),
      servicesId: parseNumber("servicesId", servicesId, "int"),
      lumpsum: parseNumber("lumpsum", lumpsum, "float"),
    };
  }

  const timeEntry: TimeEntry = {
    type: EntryType.Time,
    ...commonEntry,
    servicesId: parseNumber("servicesId", servicesId, "int"),
    timeClockedSince: timeClockedSince
      ? parseIsoUtcDateTime(timeClockedSince)
      : null,
    timeUntil: timeUntil ? parseIsoUtcDateTime(timeUntil) : null,
    timeLastChangeWorkTime: parseIsoUtcDateTime(
      timeLastChangeWorkTime === "" ? timeInsert : timeLastChangeWorkTime,
    ),
    billable: parseTimeEntryBillability("billable", billable),
    duration: parseOptionalNumber("duration", duration, "int"),
    clocked: parseBoolean("clocked", clocked),
    clockedOffline: parseBoolean("clockedOffline", clockedOffline),
    hourlyRate: parseNumber("hourlyRate", hourlyRate, "float"),
  };

  if (offset !== "0") {
    timeEntry.offset = parseNumber("offset", offset, "int");
  }

  return timeEntry;
};

const parseBoolean = (columnName: string, columnValue: string) => {
  switch (columnValue) {
    case "0": {
      return false;
    }
    case "1": {
      return true;
    }
    default: {
      throw new Error(
        `Could not parse ${columnName} "${columnValue}" as a boolean`,
      );
    }
  }
};

type NumberType = "int" | "float";

const parseNumber = (
  columnName: string,
  columnValue: string,
  numberType: "int" | "float",
) => {
  const number =
    numberType === "int"
      ? Number.parseInt(columnValue)
      : Number.parseFloat(columnValue);

  if (Number.isNaN(number)) {
    throw new TypeError(
      `Could not parse ${columnName} "${columnValue}" as a number`,
    );
  }

  return number;
};

const parseOptionalNumber = (
  columnName: string,
  columnValue: string,
  numberType: NumberType,
) => {
  if (columnValue === "") return null;

  return parseNumber(columnName, columnValue, numberType);
};

const parseIsoUtcDateTime = (isoDateTime: string) => {
  return isoUtcDateTimeFromDateTime(new Date(isoDateTime));
};

const parseTimeEntryBillability = (
  columnName: string,
  columnValue: string,
): TimeEntryBillability => {
  switch (columnValue) {
    case "0": {
      return Billability.NotBillable;
    }
    case "1": {
      return Billability.Billable;
    }
    case "2": {
      return Billability.Billed;
    }
    default: {
      throw new Error(
        `Could not parse ${columnName} "${columnValue}" as a valid TimeEntryBillability value`,
      );
    }
  }
};

const parseLumpsumEntryBillability = (
  columnName: string,
  columnValue: string,
): LumpsumEntryBillability => {
  switch (columnValue) {
    case "1": {
      return Billability.Billable;
    }
    case "2": {
      return Billability.Billed;
    }
    default: {
      throw new Error(
        `Could not parse ${columnName} "${columnValue}" as a valid LumpsumEntryBillability value`,
      );
    }
  }
};
