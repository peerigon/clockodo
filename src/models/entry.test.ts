import faker from "faker";
import { advanceTo } from "jest-date-mock";
import { createProjectMocks } from "./project.mocks.js";
import {
  Billability,
  getEntryDurationUntilNow,
  getEntryRevenue,
} from "./entry.js";
import {
  createTimeEntryMocks,
  createLumpsumValueEntryMocks,
  createLumpsumServiceEntryMocks,
} from "./entry.mocks.js";
import { createLumpsumServiceMocks } from "./lumpsumService.mocks.js";

beforeEach(() => {
  faker.seed(123);
  advanceTo("2020-01-01T01:00:00Z");
});

describe("getEntryDurationUntilNow()", () => {
  test("It returns the duration in seconds plus offset", () => {
    const { clockedTimeEntry } = createMocks();

    clockedTimeEntry.duration = 30;
    clockedTimeEntry.offset = 15;

    expect(getEntryDurationUntilNow(clockedTimeEntry)).toBe(45);
  });

  test("It returns the duration in seconds until now for clocking time entries", () => {
    const { clockingTimeEntry } = createMocks();

    clockingTimeEntry.timeSince = "2020-01-01T00:00:00Z";

    expect(getEntryDurationUntilNow(clockingTimeEntry)).toBe(1 * 60 * 60);
  });

  test("It returns 0 for non-time entries", () => {
    const { lumpsumValueEntry, lumpsumServiceEntry } = createMocks();

    expect(getEntryDurationUntilNow(lumpsumValueEntry)).toBe(0);
    expect(getEntryDurationUntilNow(lumpsumServiceEntry)).toBe(0);
  });
});

describe("getEntryRevenue()", () => {
  test("It calculates the revenue based on the hourly rate for entries without a project", () => {
    const { clockedTimeEntry } = createMocks();

    clockedTimeEntry.hourlyRate = 100;
    clockedTimeEntry.duration = 1.5 * 60 * 60;

    expect(getEntryRevenue({ entry: clockedTimeEntry })).toBe(1.5 * 100);
  });

  test("It calculates the revenue based on the hourly rate and the revenue factor", () => {
    const { clockedTimeEntry, project } = createMocks();

    clockedTimeEntry.hourlyRate = 100;
    clockedTimeEntry.duration = 1.5 * 60 * 60;
    clockedTimeEntry.projectsId = project.id;
    project.revenueFactor = 0.25;

    expect(getEntryRevenue({ entry: clockedTimeEntry, project })).toBe(
      0.25 * 1.5 * 100
    );
  });

  test("It calculates the revenue until now for clocking time entries", () => {
    const { clockingTimeEntry } = createMocks();

    clockingTimeEntry.hourlyRate = 100;
    clockingTimeEntry.timeSince = "2020-01-01T00:00:00Z";

    expect(getEntryRevenue({ entry: clockingTimeEntry })).toBe(100);
  });

  test("It returns 0 for unfinished projects with hard budget", () => {
    const { clockedTimeEntry, project } = createMocks();

    clockedTimeEntry.hourlyRate = 100;
    clockedTimeEntry.duration = 1.5 * 60 * 60;
    clockedTimeEntry.projectsId = project.id;
    project.revenueFactor = null;

    expect(getEntryRevenue({ entry: clockedTimeEntry, project })).toBe(0);
  });

  test("It returns 0 if the time entry is not billable", () => {
    const { clockedTimeEntry } = createMocks();

    clockedTimeEntry.billable = Billability.NotBillable;
    clockedTimeEntry.hourlyRate = 100;
    clockedTimeEntry.duration = 1.5 * 60 * 60;

    expect(getEntryRevenue({ entry: clockedTimeEntry })).toBe(0);
  });

  // If the user has not enough access rights, entries do not contain enough information
  // in order to calculate the revenue. This needs to be adressed by the application.
  test("It returns undefined if the entry did not contain enough information", () => {
    const { clockedTimeEntry, project } = createMocks();

    clockedTimeEntry.hourlyRate = undefined;

    expect(getEntryRevenue({ entry: clockedTimeEntry })).toBe(undefined);

    clockedTimeEntry.hourlyRate = 100;
    clockedTimeEntry.duration = 1.5 * 60 * 60;
    clockedTimeEntry.projectsId = project.id;
    project.revenueFactor = undefined;

    expect(getEntryRevenue({ entry: clockedTimeEntry, project })).toBe(
      undefined
    );
  });

  test("It just returns the lumpsum value for lumpsum value entries", () => {
    const { lumpsumValueEntry, project } = createMocks();

    // It should ignore the revenue factor
    project.revenueFactor = 0.5;
    lumpsumValueEntry.lumpsum = 100;

    expect(getEntryRevenue({ entry: lumpsumValueEntry, project })).toBe(100);
  });

  test("It calculates the revenue based on the amount and the lumpsum service price", () => {
    const { lumpsumServiceEntry, project, lumpsumService } = createMocks();

    // It should ignore the revenue factor
    project.revenueFactor = 0.5;
    lumpsumServiceEntry.lumpsumServicesAmount = 2;
    lumpsumService.price = 100;

    expect(
      getEntryRevenue({ entry: lumpsumServiceEntry, project, lumpsumService })
    ).toBe(200);
  });

  test("It throws an error if the entry's projectsId does not match the project's id", () => {
    const { clockedTimeEntry, project } = createMocks();

    clockedTimeEntry.projectsId = 1;
    project.id = 2;

    expect(() =>
      getEntryRevenue({ entry: clockedTimeEntry, project })
    ).toThrowErrorMatchingInlineSnapshot(
      `"The entries projects id (1) does not match the project's id (2)"`
    );
  });

  test("It throws an error if the entry's lumpsumServicesId does not match the lumpsum services's id", () => {
    const { lumpsumServiceEntry, lumpsumService } = createMocks();

    lumpsumServiceEntry.lumpsumServicesId = 1;
    lumpsumService.id = 2;

    expect(() =>
      getEntryRevenue({ entry: lumpsumServiceEntry, lumpsumService })
    ).toThrowErrorMatchingInlineSnapshot(
      `"The entries lumpsum services id (1) does not match the lumpsum service's id (2)"`
    );
  });
});

const createMocks = () => {
  const [clockingTimeEntry] = createTimeEntryMocks({
    timeEntryTypes: ["clocking"],
  });
  const [clockedTimeEntry] = createTimeEntryMocks({
    timeEntryTypes: ["clocked"],
  });
  const [manualTimeEntry] = createTimeEntryMocks({
    timeEntryTypes: ["manual"],
  });
  const [lumpsumValueEntry] = createLumpsumValueEntryMocks();
  const [lumpsumServiceEntry] = createLumpsumServiceEntryMocks();
  const [project] = createProjectMocks();
  const [lumpsumService] = createLumpsumServiceMocks();

  return {
    clockingTimeEntry,
    clockedTimeEntry,
    manualTimeEntry,
    lumpsumValueEntry,
    lumpsumServiceEntry,
    project,
    lumpsumService,
  };
};
