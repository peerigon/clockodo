import { jest } from "@jest/globals";
import { Billability, Clockodo, Config, UserReportType } from "./index.js";

const TIME_SINCE = "2018-10-01T00:00:00Z";
const TIME_UNTIL = "2018-12-30T00:00:00Z";
// These tests depend on our real Clockodo account.
// They should only be executed by our clockodo-dev user or Travis CI.
const hasCredentials =
  typeof process.env.CLOCKODO_USER === "string" &&
  typeof process.env.CLOCKODO_API_KEY === "string";
const config: Config = {
  client: {
    name: "SDK Integration Test",
    email: "johannes.ewald@peerigon.com",
  },
};

describe("Clockodo", () => {
  if (hasCredentials === false) {
    if (process.env.CI)
      throw new Error("Cannot run tests: Credentials are missing");

    it("cannot run tests because credentials are missing", () => {});

    return;
  }

  const clockodo = new Clockodo(config);

  const entryShape = {
    id: expect.any(Number),
    usersId: expect.any(Number),
    timeSince: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/),
  };

  beforeAll(() => {
    jest.setTimeout(10000);

    clockodo.api.config({
      authentication: {
        user: process.env.CLOCKODO_USER!,
        apiKey: process.env.CLOCKODO_API_KEY!,
      },
    });
  });

  describe("getUsers()", () => {
    const expectedKeys = [
      "active",
      "canAddCustomers",
      "canGenerallyManageAbsences",
      "canGenerallySeeAbsences",
      "editLock",
      "editLockDyn",
      "editLockSync",
      "email",
      "id",
      "initials",
      "language",
      "name",
      "number",
      "role",
      "teamsId",
      "timeformat12H",
      "timezone",
      "wageType",
      "weekendFriday",
      "weekstartMonday",
      "worktimeRegulationId",
    ];

    it("returns expected data format", async () => {
      const data = await clockodo.getUsers();

      expect(Object.keys(data.users[0])).toEqual(
        expect.arrayContaining(expectedKeys)
      );
    });
  });

  describe("getProjects()", () => {
    it("returns expected data format", async () => {
      const {
        projects: [project],
      } = await clockodo.getProjects();

      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("customersId");
      expect(project).toHaveProperty("billableDefault");
      expect(project).toHaveProperty("completed");

      // Check if the filter is working as expected
      const { projects } = await clockodo.getProjects({
        filterCustomersId: -1,
      });

      expect(projects).toHaveLength(0);
    });
  });

  describe("getEntries()", () => {
    it("returns expected data format", async () => {
      const data = await clockodo.getEntries({
        timeSince: TIME_SINCE,
        timeUntil: TIME_UNTIL,
        filterBillable: Billability.Billable,
      });

      expect(data.entries[0]).toHaveProperty("id");
      expect(data.entries[0]).toHaveProperty("type");
      expect(data.entries[0]).toHaveProperty("timeSince");
    });
  });

  describe("addEntry(), getEntry(), editEntry(), and deleteEntry()", () => {
    it("returns expected data format and throws no error", async () => {
      const addTimeEntryResponse = await clockodo.addEntry({
        customersId: 619336,
        servicesId: 288646,
        billable: Billability.Billable,
        timeSince: "2020-06-02T00:00:00Z",
        timeUntil: "2020-06-02T00:00:01Z",
        text: "Time entry",
      });

      expect(addTimeEntryResponse).toMatchObject({
        entry: {
          customersId: 619336,
          servicesId: 288646,
          billable: Billability.Billable,
          timeSince: "2020-06-02T00:00:00Z",
          timeUntil: "2020-06-02T00:00:01Z",
          text: "Time entry",
        },
      });

      const addLumpsumValueEntryResponse = await clockodo.addEntry({
        customersId: 619336,
        servicesId: 288646,
        billable: Billability.Billed,
        timeSince: "2020-06-02T00:00:00Z",
        lumpsum: 123,
        text: "Lumpsum value entry",
      });

      expect(addLumpsumValueEntryResponse).toMatchObject({
        entry: {
          customersId: 619336,
          servicesId: 288646,
          billable: Billability.Billed,
          timeSince: "2020-06-02T00:00:00Z",
          lumpsum: 123,
          text: "Lumpsum value entry",
        },
      });

      const addLumpsumServiceEntryResponse = await clockodo.addEntry({
        customersId: 619336,
        billable: Billability.Billed,
        timeSince: "2020-06-02T00:00:00Z",
        lumpsumServicesId: 4966,
        lumpsumServicesAmount: 100,
        text: "Lumpsum service entry",
      });

      expect(addLumpsumServiceEntryResponse).toMatchObject({
        entry: {
          customersId: 619336,
          billable: Billability.Billed,
          timeSince: "2020-06-02T00:00:00Z",
          lumpsumServicesId: 4966,
          lumpsumServicesAmount: 100,
          text: "Lumpsum service entry",
        },
      });

      const getEntryResponse = await clockodo.getEntry({
        id: addTimeEntryResponse.entry.id,
      });

      expect(getEntryResponse).toMatchObject(addTimeEntryResponse);

      const editEntryResponse = await clockodo.editEntry({
        id: addTimeEntryResponse.entry.id,
        billable: Billability.Billed,
      });

      expect(editEntryResponse).toMatchObject({
        entry: {
          ...entryShape,
          billable: Billability.Billed,
        },
      });

      const deleteEntryResponse = await Promise.all([
        clockodo.deleteEntry(addTimeEntryResponse.entry),
        clockodo.deleteEntry(addLumpsumValueEntryResponse.entry),
        clockodo.deleteEntry(addLumpsumServiceEntryResponse.entry),
      ]);

      expect(deleteEntryResponse).toMatchObject([
        {
          success: true,
        },
        {
          success: true,
        },
        {
          success: true,
        },
      ]);
    });
  });

  describe("getEntryGroups()", () => {
    const expectedKeys = [
      "budgetUsed",
      "duration",
      "group",
      "groupedBy",
      "hasBudgetRevenuesBilled",
      "hasBudgetRevenuesNotBilled",
      "hasNonBudgetRevenuesBilled",
      "hasNonBudgetRevenuesNotBilled",
      "hourlyRate",
      "hourlyRateIsEqualAndHasNoLumpsums",
      "name",
      "note",
      "number",
      "restrictions",
      "revenue",
    ];

    it("returns expected data format with one group passed", async () => {
      const data = await clockodo.getEntryGroups({
        timeSince: TIME_SINCE,
        timeUntil: TIME_UNTIL,
        grouping: ["customers_id"],
      });

      expect(Object.keys(data.groups[0])).toEqual(
        expect.arrayContaining(expectedKeys)
      );
    });

    it("returns expected data format with multiple groups passed", async () => {
      const data = await clockodo.getEntryGroups({
        timeSince: TIME_SINCE,
        timeUntil: TIME_UNTIL,
        // Should both support camelCase and snake_case
        grouping: ["projectsId", "services_id"],
      });

      expect(Object.keys(data.groups[0])).toEqual(
        expect.arrayContaining(expectedKeys.concat(["subGroups"]))
      );
    });
  });

  describe("getClock()", () => {
    it("returns expected data format", async () => {
      const data = await clockodo.getClock();

      expect(data).toHaveProperty("running");
    });
  });

  describe("getLumpSumServices() and getLumpSumService()", () => {
    const expectedKeys = [
      "id",
      "name",
      "price",
      "unit",
      "active",
      "number",
      "note",
    ];

    it("returns expected data format", async () => {
      const { lumpSumServices } = await clockodo.getLumpSumServices();
      const [lumpSumService] = lumpSumServices;

      expect(Object.keys(lumpSumService)).toEqual(
        expect.arrayContaining(expectedKeys)
      );

      const getLumpSumServiceResponse = await clockodo.getLumpSumService({
        id: lumpSumService.id,
      });

      expect(Object.keys(getLumpSumServiceResponse.lumpSumService)).toEqual(
        expect.arrayContaining(expectedKeys)
      );
    });
  });

  describe("getUserReports() / getUserReport()", () => {
    it("returns expected data format", async () => {
      const { userreports } = await clockodo.getUserReports({
        year: 2019,
        type: UserReportType.YearAndMonths,
      });

      expect(userreports.length).toBeGreaterThan(0);
      userreports.forEach((userreport) => {
        expect(userreport).toHaveProperty("usersId");
        expect(userreport).toHaveProperty("sumTarget");
        expect(userreport.monthDetails.length).toBeGreaterThan(0);
        userreport.monthDetails.forEach((monthDetails) => {
          expect(monthDetails).toHaveProperty("nr");
          expect(monthDetails).toHaveProperty("sumTarget");
        });
      });

      const { userreport } = await clockodo.getUserReport({
        year: 2019,
        usersId: userreports[0].usersId,
        type: UserReportType.YearMonthsWeeksAndDays,
      });

      expect(userreport).toHaveProperty("usersId");
      expect(userreport).toHaveProperty("sumTarget");
      expect(userreport.monthDetails.length).toBeGreaterThan(0);
      userreport.monthDetails.forEach((monthDetails) => {
        expect(monthDetails).toHaveProperty("nr");
        expect(monthDetails).toHaveProperty("sumTarget");
        expect(monthDetails.weekDetails.length).toBeGreaterThan(0);
        monthDetails.weekDetails.forEach((weekDetails) => {
          expect(weekDetails).toHaveProperty("nr");
          expect(weekDetails).toHaveProperty("sumTarget");
          expect(weekDetails.dayDetails.length).toBeGreaterThan(0);
          weekDetails.dayDetails.forEach((dayDetails) => {
            expect(dayDetails).toHaveProperty("date");
            expect(dayDetails).toHaveProperty("weekday");
          });
        });
      });
    });
  });

  describe("getNonbusinessGroups() / getNonbusinessDays()", () => {
    it("returns expected data format", async () => {
      const { nonbusinessgroups: nonbusinessGroups } =
        await clockodo.getNonbusinessGroups();

      expect(nonbusinessGroups.length).toBeGreaterThan(0);
      nonbusinessGroups.forEach((nonbusinessGroup) => {
        expect(nonbusinessGroup).toHaveProperty("id");
        expect(nonbusinessGroup).toHaveProperty("name");
      });

      const [firstNonbusinessGroup] = nonbusinessGroups;

      const { nonbusinessdays: nonbusinessDays } =
        await clockodo.getNonbusinessDays({
          nonbusinessgroupsId: firstNonbusinessGroup.id,
          year: 2021,
        });

      expect(nonbusinessDays.length).toBeGreaterThan(0);
      nonbusinessDays.forEach((nonbusinessDay) => {
        expect(nonbusinessDay).toHaveProperty("date");
        expect(nonbusinessDay).toHaveProperty("id");
        expect(nonbusinessDay).toHaveProperty("name");
        expect(nonbusinessDay).toHaveProperty("halfDay");
      });
    });
  });

  describe("getAggregatesUsersMe()", () => {
    it("returns expected data format", async () => {
      const { user, company, worktimeRegulation } =
        await clockodo.getAggregatesUsersMe();

      expect(user).toHaveProperty("id");
      expect(company).toHaveProperty("id");
      expect(worktimeRegulation).toBe(null);
    });
  });

  (process.env.LC_ALL === "tr" ? describe : describe.skip)(
    "using a Turkish locale",
    () => {
      // The Turkish language has uncommon capitalization rules that
      // mess with some snake_case to camelCase libraries
      // See https://github.com/peerigon/clockodo/issues/74
      it("transforms snake_case to camelCase correctly", async () => {
        // Safety assertion that we're using the Turkish locale
        expect("i".toLocaleUpperCase()).toBe("İ");

        const {
          entries: [firstEntry],
        } = await clockodo.getEntries({
          timeSince: TIME_SINCE,
          timeUntil: TIME_UNTIL,
          filterBillable: Billability.Billable,
        });

        expect(firstEntry).toMatchObject({
          usersId: expect.any(Number),
          customersId: expect.any(Number),
        });
      });
    }
  );
});
