import { describe, expect, test } from "vitest";
import { parseEntryFromCsv } from "./entry.csv.js";
import {
  Billability,
  EntryType,
  type LumpsumServiceEntry,
  type LumpsumValueEntry,
  type TimeEntry,
} from "./entry.js";

describe("parseEntryFromCsv()", () => {
  test("It parses time entries correctly", () => {
    const csvRow = {
      Id: "1",
      "Co-worker Id": "2",
      "Project Id": "3",
      "Customer Id": "4",
      "Service Id": "5",
      "Description Id": "6",
      "Hourly rate": "90.5",
      "Created (UTC)": "2021-10-19T14:58:40Z",
      "Last change (UTC)": "2021-10-19T14:58:40Z",
      "Last change of work time (UTC)": "2021-10-19T11:11:19Z",
      "Clock started (UTC)": "",
      "Begin (UTC)": "2021-10-19T12:58:36Z",
      "End (UTC)": "2021-10-19T13:22:12Z",
      "Correction of time in seconds": "0",
      Duration: "6437",
      "Time clocked": "0",
      "Clocked offline": "0",
      "Lump sum value": "",
      "Lump sum service Id": "",
      Amount: "",
      "Billable/Billed": "0",
      "Co-worker": "John Doe",
      Project: "Some project",
      Customer: "Some customer",
      Service: "Some service",
      "Lump sum service": "",
      Description: "Some description",
    };
    const entry: TimeEntry = {
      billable: Billability.NotBillable,
      clocked: false,
      clockedOffline: false,
      customersId: 4,
      duration: 6437,
      hourlyRate: 90.5,
      id: 1,
      projectsId: 3,
      servicesId: 5,
      text: "Some description",
      textsId: 6,
      timeClockedSince: null,
      timeInsert: "2021-10-19T14:58:40Z",
      timeLastChange: "2021-10-19T14:58:40Z",
      timeLastChangeWorkTime: "2021-10-19T11:11:19Z",
      timeSince: "2021-10-19T12:58:36Z",
      timeUntil: "2021-10-19T13:22:12Z",
      type: EntryType.Time,
      usersId: 2,
    };

    const testCases: Array<{ input: typeof csvRow; expected: TimeEntry }> = [
      // Manual time entry
      {
        input: csvRow,
        expected: entry,
      },
      // Clocked time entry
      {
        input: {
          ...csvRow,
          "Time clocked": "1",
          "Clock started (UTC)": "2021-10-19T12:58:36Z",
        },
        expected: {
          ...entry,
          clocked: true,
          timeClockedSince: "2021-10-19T12:58:36Z",
        },
      },
      // Clocking time entry
      {
        input: {
          ...csvRow,
          "Time clocked": "1",
          "Clock started (UTC)": "2021-10-19T12:58:36Z",
          "End (UTC)": "",
        },
        expected: {
          ...entry,
          clocked: true,
          timeClockedSince: "2021-10-19T12:58:36Z",
          timeUntil: null,
        },
      },
      // Parses boolean values correctly
      {
        input: {
          ...csvRow,
          "Time clocked": "1",
          "Clocked offline": "1",
        },
        expected: {
          ...entry,
          clocked: true,
          clockedOffline: true,
        },
      },
      // Parses Billability.Billable correctly
      {
        input: {
          ...csvRow,
          "Billable/Billed": "1",
        },
        expected: {
          ...entry,
          billable: Billability.Billable,
        },
      },
      // Parses Billability.Billed correctly
      {
        input: {
          ...csvRow,
          "Billable/Billed": "2",
        },
        expected: {
          ...entry,
          billable: Billability.Billed,
        },
      },
      // Handles missing text correctly
      {
        input: {
          ...csvRow,
          "Description Id": "",
          Description: "",
        },
        expected: {
          ...entry,
          textsId: null,
          text: null,
        },
      },
      // Handles offset correctly
      {
        input: {
          ...csvRow,
          "Correction of time in seconds": "123",
        },
        expected: {
          ...entry,
          offset: 123,
        },
      },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(parseEntryFromCsv(Object.values(input))).toMatchObject(expected);
    });
  });

  test("It parses lumpsum value entries correctly", () => {
    const csvRow = {
      Id: "1",
      "Co-worker Id": "2",
      "Project Id": "3",
      "Customer Id": "4",
      "Service Id": "5",
      "Description Id": "6",
      "Hourly rate": "",
      "Created (UTC)": "2021-10-19T14:58:40Z",
      "Last change (UTC)": "2021-10-19T14:58:40Z",
      "Last change of work time (UTC)": "2021-10-19T14:58:40Z",
      "Clock started (UTC)": "",
      "Begin (UTC)": "2021-10-19T12:58:36Z",
      "End (UTC)": "2021-10-19T12:58:36Z",
      "Correction of time in seconds": "0",
      Duration: "0",
      "Time clocked": "0",
      "Clocked offline": "0",
      "Lump sum value": "50.12",
      "Lump sum service Id": "",
      Amount: "",
      "Billable/Billed": "1",
      "Co-worker": "John Doe",
      Project: "Some project",
      Customer: "Some customer",
      Service: "Some service",
      "Lump sum service": "",
      Description: "Some description",
    };
    const entry: LumpsumValueEntry = {
      billable: Billability.Billable,
      customersId: 4,
      id: 1,
      projectsId: 3,
      servicesId: 5,
      text: "Some description",
      textsId: 6,
      timeInsert: "2021-10-19T14:58:40Z",
      timeLastChange: "2021-10-19T14:58:40Z",
      timeSince: "2021-10-19T12:58:36Z",
      timeUntil: "2021-10-19T12:58:36Z",
      type: EntryType.LumpsumValue,
      lumpsum: 50.12,
      usersId: 2,
    };

    const testCases: Array<{
      input: typeof csvRow;
      expected: LumpsumValueEntry;
    }> = [
      // Basic test
      {
        input: csvRow,
        expected: entry,
      },
      // Parses Billability.Billed correctly
      {
        input: {
          ...csvRow,
          "Billable/Billed": "2",
        },
        expected: {
          ...entry,
          billable: Billability.Billed,
        },
      },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(parseEntryFromCsv(Object.values(input))).toMatchObject(expected);
    });
  });

  test("It parses lumpsum service entries correctly", () => {
    const csvRow = {
      Id: "1",
      "Co-worker Id": "2",
      "Project Id": "3",
      "Customer Id": "4",
      "Service Id": "",
      "Description Id": "5",
      "Hourly rate": "",
      "Created (UTC)": "2021-10-19T14:58:40Z",
      "Last change (UTC)": "2021-10-19T14:58:40Z",
      "Last change of work time (UTC)": "2021-10-19T14:58:40Z",
      "Clock started (UTC)": "",
      "Begin (UTC)": "2021-10-19T12:58:36Z",
      "End (UTC)": "2021-10-19T12:58:36Z",
      "Correction of time in seconds": "0",
      Duration: "0",
      "Time clocked": "0",
      "Clocked offline": "0",
      "Lump sum value": "",
      "Lump sum service Id": "6",
      Amount: "3.7",
      "Billable/Billed": "1",
      "Co-worker": "John Doe",
      Project: "Some project",
      Customer: "Some customer",
      Service: "Some service",
      "Lump sum service": "",
      Description: "Some description",
    };
    const entry: LumpsumServiceEntry = {
      billable: Billability.Billable,
      customersId: 4,
      id: 1,
      projectsId: 3,
      lumpsumServicesId: 6,
      lumpsumServicesAmount: 3.7,
      text: "Some description",
      textsId: 5,
      timeInsert: "2021-10-19T14:58:40Z",
      timeLastChange: "2021-10-19T14:58:40Z",
      timeSince: "2021-10-19T12:58:36Z",
      timeUntil: "2021-10-19T12:58:36Z",
      type: EntryType.LumpsumService,
      usersId: 2,
    };

    const testCases: Array<{
      input: typeof csvRow;
      expected: LumpsumServiceEntry;
    }> = [
      // Basic test
      {
        input: csvRow,
        expected: entry,
      },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(parseEntryFromCsv(Object.values(input))).toMatchObject(expected);
    });
  });
});
