import { beforeAll, describe, expect, it } from "vitest";
import { Billability, Clockodo, UserReportType, type Config } from "./index.js";
import { assertExists } from "./lib/assert.ts";

const TIME_SINCE = "2018-10-01T00:00:00Z";
const TIME_UNTIL = "2018-12-30T00:00:00Z";
const config: Config = {
  client: {
    name: "SDK Integration Test",
    email: "johannes.ewald@peerigon.com",
  },
};

describe("Clockodo", { timeout: 20_000 }, () => {
  const { CLOCKODO_USER: user, CLOCKODO_API_KEY: apiKey } = process.env;

  if (!user || !apiKey) {
    throw new Error("Cannot run tests: Credentials are missing");
  }

  const clockodo = new Clockodo(config);

  const entryShape = {
    id: expect.any(Number),
    usersId: expect.any(Number),
    timeSince: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/),
  };

  beforeAll(() => {
    clockodo.api.config = {
      authentication: {
        user,
        apiKey,
      },
    };
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
      const firstUser = assertExists(data.users[0]);

      expect(Object.keys(firstUser)).toEqual(
        expect.arrayContaining(expectedKeys),
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
        filter: {
          customersId: -1,
        },
      });

      expect(projects).toHaveLength(0);
    });
  });

  describe("getEntries()", () => {
    it("returns expected data format", async () => {
      const data = await clockodo.getEntries({
        timeSince: TIME_SINCE,
        timeUntil: TIME_UNTIL,
        filter: {
          billable: Billability.Billable,
        },
      });

      expect(data.entries[0]).toHaveProperty("id");
      expect(data.entries[0]).toHaveProperty("type");
      expect(data.entries[0]).toHaveProperty("timeSince");
    });
  });

  describe("addEntry(), getEntry(), editEntry(), and deleteEntry()", () => {
    it("returns expected data format and throws no error", async () => {
      const addTimeEntryResponse = await clockodo.addEntry({
        customersId: 619_336,
        servicesId: 288_646,
        billable: Billability.Billable,
        timeSince: "2020-06-02T00:00:00Z",
        timeUntil: "2020-06-02T00:00:01Z",
        text: "Time entry",
      });

      expect(addTimeEntryResponse).toMatchObject({
        entry: {
          customersId: 619_336,
          servicesId: 288_646,
          billable: Billability.Billable,
          timeSince: "2020-06-02T00:00:00Z",
          timeUntil: "2020-06-02T00:00:01Z",
          text: "Time entry",
        },
      });

      const addLumpsumValueEntryResponse = await clockodo.addEntry({
        customersId: 619_336,
        servicesId: 288_646,
        billable: Billability.Billed,
        timeSince: "2020-06-02T00:00:00Z",
        lumpsum: 123,
        text: "Lumpsum value entry",
      });

      expect(addLumpsumValueEntryResponse).toMatchObject({
        entry: {
          customersId: 619_336,
          servicesId: 288_646,
          billable: Billability.Billed,
          timeSince: "2020-06-02T00:00:00Z",
          lumpsum: 123,
          text: "Lumpsum value entry",
        },
      });

      const addLumpsumServiceEntryResponse = await clockodo.addEntry({
        customersId: 619_336,
        billable: Billability.Billed,
        timeSince: "2020-06-02T00:00:00Z",
        lumpsumServicesId: 4966,
        lumpsumServicesAmount: 100,
        text: "Lumpsum service entry",
      });

      expect(addLumpsumServiceEntryResponse).toMatchObject({
        entry: {
          customersId: 619_336,
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
      const firstGroup = assertExists(data.groups[0]);

      expect(Object.keys(firstGroup)).toEqual(
        expect.arrayContaining(expectedKeys),
      );
    });

    it("returns expected data format with multiple groups passed", async () => {
      const data = await clockodo.getEntryGroups({
        timeSince: TIME_SINCE,
        timeUntil: TIME_UNTIL,
        // Should both support camelCase and snake_case
        grouping: ["projectsId", "services_id"],
      });
      const firstGroup = assertExists(data.groups[0]);

      expect(Object.keys(firstGroup)).toEqual(
        expect.arrayContaining([...expectedKeys, "subGroups"]),
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
      const firstLumpsumService = assertExists(lumpSumServices[0]);

      expect(Object.keys(firstLumpsumService)).toEqual(
        expect.arrayContaining(expectedKeys),
      );

      const getLumpSumServiceResponse = await clockodo.getLumpSumService({
        id: firstLumpsumService.id,
      });

      expect(Object.keys(getLumpSumServiceResponse.lumpSumService)).toEqual(
        expect.arrayContaining(expectedKeys),
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

      const firstUserReport = assertExists(userreports[0]);

      const { userreport } = await clockodo.getUserReport({
        year: 2019,
        usersId: firstUserReport.usersId,
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
      const { nonbusinessGroups } = await clockodo.getNonbusinessGroups();

      expect(nonbusinessGroups.length).toBeGreaterThan(0);
      nonbusinessGroups.forEach((nonbusinessGroup) => {
        expect(nonbusinessGroup).toHaveProperty("id");
        expect(nonbusinessGroup).toHaveProperty("name");
      });

      const firstNonbusinessGroup = assertExists(nonbusinessGroups[0]);

      const { nonbusinessDays } = await clockodo.getNonbusinessDays({
        nonbusinessGroupId: firstNonbusinessGroup.id,
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

  describe("getMe()", () => {
    it("returns expected data format", async () => {
      const me = await clockodo.getMe();
      const { user, company } = me;

      expect(user).toHaveProperty("id");
      expect(company).toHaveProperty("id");
      expect(me).toHaveProperty("worktimeRegulation");
    });
  });
});
