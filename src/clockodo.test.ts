// The Clockodo instance is just too big. We should split it into smaller files.
/* eslint-disable max-lines */
import nock from "nock";
import qs from "qs";
import { afterAll, describe, expect, it } from "vitest";
import { CLOCKODO_API_BASE_URL } from "./consts.js";
import {
  AbsenceStatus,
  AbsenceType,
  Billability,
  Clockodo,
  mapRequestBody,
  UserRole,
  type Config,
} from "./index.js";

const config: Config = {
  client: {
    name: "Clockodo SDK Unit Test",
    email: "johannes.ewald@peerigon.com",
  },
};

describe("Clockodo (instance)", () => {
  const clockodo = new Clockodo(config);

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe("Clockodo Constructor", () => {
    it("throws an error when constructor is missing client name", () => {
      expect(
        () =>
          new Clockodo({
            // @ts-expect-error 2322
            client: {},
          }),
      ).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: name should be a string but given value undefined is typeof undefined]`,
      );
    });
    it("throws an error when constructor is missing client email", () => {
      expect(
        () =>
          new Clockodo({
            // @ts-expect-error 2322
            client: {
              name: config.client.name,
            },
          }),
      ).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: email should be a string but given value undefined is typeof undefined]`,
      );
    });
    it("throws an error when constructor is missing user email", () => {
      expect(
        () =>
          new Clockodo({
            ...config,
            authentication: {
              // @ts-expect-error 2322
              user: undefined,
              apiKey: "dfdsg34t643",
            },
          }),
      ).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: user should be a string but given value undefined is typeof undefined]`,
      );
    });
    it("throws an error when constructor is missing API key", () => {
      expect(
        () =>
          new Clockodo({
            ...config,
            authentication: {
              user: "test@gmail.com",
              // @ts-expect-error 2322
              apiKey: undefined,
            },
          }),
      ).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: apiKey should be a string but given value undefined is typeof undefined]`,
      );
    });
    it("throws an error when constructor has baseUrl with type other than string", () => {
      expect(
        () =>
          new Clockodo({
            ...config,
            // @ts-expect-error 2322
            baseUrl: 5678,
          }),
      ).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: baseUrl should be undefined or a string but given value 5678 is typeof number]`,
      );
    });
  });

  describe("Config", () => {
    describe("locale", () => {
      it("sends request with the given Accept-Language header", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL, {
          reqheaders: {
            "Accept-Language": "de-DE",
          },
        })
          .get("/anything")
          .reply(200, {});

        clockodo.api.config = {
          locale: "de-DE",
        };

        await expect(clockodo.api.get("/anything")).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });
  });

  describe("GET", () => {
    describe("getAbsence()", () => {
      it("correctly builds getAbsence() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/absences/7")
          .reply(200, {});

        await expect(
          clockodo.getAbsence({ id: 7 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getAbsences()", () => {
      it("correctly builds getAbsences() request", async () => {
        const expectedParameters = {
          year: 218,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/absences?" + qs.stringify(expectedParameters))
          .reply(200, {});

        await expect(
          clockodo.getAbsences({ year: 218 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getClock()", () => {
      it("correctly builds getClock() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/clock")
          .reply(200, {});

        await expect(clockodo.getClock()).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getCustomer()", () => {
      it("correctly builds getCustomer() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/customers/777")
          .reply(200, {});

        await expect(
          clockodo.getCustomer({ id: 777 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getCustomersPage()", () => {
      it("correctly builds getCustomersPage() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/customers")
          .reply(200, {});

        await expect(clockodo.getCustomersPage()).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("getCustomers()", () => {
      it("requests all customer pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v3/customers?",
          countPages: 3,
          createPageResponse: (page) => ({ customers: [page] }),
        });

        const { customers } = await clockodo.getCustomers();

        expect(customers).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getLumpSumService()", () => {
      it("correctly builds getLumpSumService() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/lumpSumServices/777")
          .reply(200, {});

        await expect(
          clockodo.getLumpSumService({ id: 777 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getLumpSumServicesPage()", () => {
      it("correctly builds getLumpSumServicesPage() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/lumpSumServices")
          .reply(200, {});

        await expect(
          clockodo.getLumpSumServicesPage(),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getLumpSumServices()", () => {
      it("requests all lumpSumService pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v4/lumpSumServices?",
          countPages: 3,
          createPageResponse: (page) => ({ lumpSumServices: [page] }),
        });

        const { lumpSumServices } = await clockodo.getLumpSumServices();

        expect(lumpSumServices).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getEntry()", () => {
      it("correctly builds getEntry() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/entries/4")
          .reply(200, {});

        await expect(clockodo.getEntry({ id: 4 })).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("splitAllEntriesAtMidnight()", () => {
      it("correctly builds splitAllEntriesAtMidnight() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/entries/splitAllAtMidnight")
          .reply(200, {});

        await expect(
          clockodo.splitAllEntriesAtMidnight({
            day: "2022-12-19",
            usersId: 1,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getEntriesPage()", () => {
      it("correctly builds getEntriesPage() request", async () => {
        const expectedParameters = {
          time_since: "2017-08-18 00:00:00",
          time_until: "2018-02-09 00:00:00",
          "filter[billable]": Billability.Billed,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/entries?" + qs.stringify(expectedParameters))
          .reply(200, {});

        await expect(
          clockodo.getEntriesPage({
            timeSince: "2017-08-18 00:00:00",
            timeUntil: "2018-02-09 00:00:00",
            filter: {
              billable: Billability.Billed,
            },
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when getEntriesPage() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntriesPage({
            timeSince: "2017-08-18 00:00:00",
          }),
        ).rejects.toThrowError('Missing required parameter "timeUntil"');
      });
    });

    describe("getEntries()", () => {
      it("requests all entries pages", async () => {
        const expectedParameters = {
          time_since: "2017-08-18 00:00:00",
          time_until: "2018-02-09 00:00:00",
        };
        const nockScope = setupPaginatedApiMock({
          baseUrl: `/v2/entries?${qs.stringify(expectedParameters)}&`,
          countPages: 3,
          createPageResponse: (page) => ({ entries: [page] }),
        });

        const { entries } = await clockodo.getEntries({
          timeSince: "2017-08-18 00:00:00",
          timeUntil: "2018-02-09 00:00:00",
        });

        expect(entries).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
      it("throws an error when getEntries() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntries({
            timeSince: "2017-08-18 00:00:00",
          }),
        ).rejects.toThrowError('Missing required parameter "timeUntil"');
      });
    });

    describe("getEntriesTexts()", () => {
      it("requests all entries texts pages", async () => {
        const expectedParameters = {
          term: "Some text",
        };
        const nockScope = setupPaginatedApiMock({
          baseUrl: `/v3/entriesTexts?${qs.stringify(expectedParameters)}&`,
          countPages: 3,
          createPageResponse: (page) => ({ texts: { [page]: true } }),
        });

        const { texts } = await clockodo.getEntriesTexts({
          term: "Some text",
        });

        expect(texts).toMatchObject({ 1: true, 2: true, 3: true });

        nockScope.done();
      });
      it("throws an error when getEntriesTexts() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntriesTexts({}),
        ).rejects.toThrowError('Missing required parameter "term"');
      });
    });

    describe("getEntryGroups()", () => {
      it("correctly builds getEntryGroups() request", async () => {
        const timeRangeParameters = {
          time_since: "2017-08-18 00:00:00",
          time_until: "2018-02-09 00:00:00",
        };

        const groupingParameters = {
          grouping: ["customers_id", "projects_id"],
        };

        const optionalParameters = {
          round_to_minutes: 15,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get(
            "/v2/entrygroups?" +
              qs.stringify(timeRangeParameters) +
              "&" +
              qs.stringify(groupingParameters, {
                arrayFormat: "brackets",
              }) +
              "&" +
              qs.stringify(optionalParameters),
          )
          .reply(200, {});

        await expect(
          clockodo.getEntryGroups({
            timeSince: "2017-08-18 00:00:00",
            timeUntil: "2018-02-09 00:00:00",
            grouping: ["customers_id", "projects_id"],
            roundToMinutes: 15,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when getEntryGroups() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntryGroups({
            timeSince: "2017-08-18 00:00:00",
            timeUntil: "2018-02-09 00:00:00",
          }),
        ).rejects.toThrowError('Missing required parameter "grouping"');
      });
    });

    describe("getProject()", () => {
      it("correctly builds getProject() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/projects/1985")
          .reply(200, {});

        await expect(
          clockodo.getProject({ id: 1985 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getProjectsPage()", () => {
      it("correctly builds getProjectsPage() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/projects")
          .reply(200, {});

        await expect(clockodo.getProjectsPage()).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("getProjects()", () => {
      it("requests all projects pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v4/projects?",
          countPages: 3,
          createPageResponse: (page) => ({ projects: [page] }),
        });

        const { projects } = await clockodo.getProjects();

        expect(projects).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getProjectsReportsPage()", () => {
      it("correctly builds getProjectsReportsPage() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/projects/reports")
          .reply(200, {});

        await expect(
          clockodo.getProjectsReportsPage(),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getProjectsReports()", () => {
      it("requests all projects report pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v4/projects/reports?",
          countPages: 3,
          createPageResponse: (page) => ({ data: [page] }),
        });

        const { data } = await clockodo.getProjectsReports();

        expect(data).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getSubproject()", () => {
      it("correctly builds getSubproject() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/subprojects/11")
          .reply(200, {});

        await expect(
          clockodo.getSubproject({ id: 11 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getSubprojectsPage()", () => {
      it("correctly builds getSubprojectsPage() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/subprojects")
          .reply(200, {});

        await expect(clockodo.getSubprojectsPage()).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("getSubprojects()", () => {
      it("requests all subproject pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v3/subprojects?",
          countPages: 3,
          createPageResponse: (page) => ({ data: [page] }),
        });

        const { data } = await clockodo.getSubprojects();

        expect(data).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getService()", () => {
      it("correctly builds getService() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/services/10")
          .reply(200, {});

        await expect(
          clockodo.getService({ id: 10 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getServicesPage()", () => {
      it("correctly builds getServicesPage() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v4/services")
          .reply(200, {});

        await expect(clockodo.getServicesPage()).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("getServices()", () => {
      it("requests all getServices pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v4/services?",
          countPages: 3,
          createPageResponse: (page) => ({ services: [page] }),
        });

        const { services } = await clockodo.getServices();

        expect(services).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getSingleTargetHourSet", () => {
      it("correctly builds getSingleTargetHourSet() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/targethours/1234")
          .reply(200, {});

        await expect(
          clockodo.getTargethoursRow({ id: 1234 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getTargetHours", () => {
      it("correctly builds getTargetHours() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/targethours")
          .reply(200, {});

        await expect(clockodo.getTargethours()).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("getUser()", () => {
      it("correctly builds getUser() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/users/1263")
          .reply(200, {});

        await expect(
          clockodo.getUser({ id: 1263 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getUsers()", () => {
      it("correctly builds getUsers() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/users")
          .reply(200, {});

        await expect(clockodo.getUsers()).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getUserReport()", () => {
      it("correctly builds getUserReport() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/userreports/1263?" + qs.stringify({ year: 217 }))
          .reply(200, {});

        await expect(
          clockodo.getUserReport({ usersId: 1263, year: 217 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when getUserReport() is missing param", async () => {
        expect.assertions(1);

        await expect(
          clockodo.getUserReport(
            // @ts-expect-error Year is missing
            { usersId: 200 },
          ),
        ).rejects.toThrowError('Missing required parameter "year"');
      });
    });

    describe("getUserReports()", () => {
      it("correctly builds getUserReports() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/userreports?" + qs.stringify({ year: 217 }))
          .reply(200, {});

        await expect(
          clockodo.getUserReports({ year: 217 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getNonbusinessGroups()", () => {
      it("correctly builds getNonbusinessGroups() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/nonbusinessGroups")
          .reply(200, {});

        await expect(
          clockodo.getNonbusinessGroups(),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getNonbusinessGroup()", () => {
      it("correctly builds getNonbusinessGroup() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/nonbusinessGroups/123")
          .reply(200, {});

        await expect(
          clockodo.getNonbusinessGroup({ id: 123 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getNonbusinessDays()", () => {
      it("correctly builds getNonbusinessDays() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get(
            "/v2/nonbusinessDays?" +
              qs.stringify(
                { nonbusinessgroups_id: [123], year: 2021 },
                { arrayFormat: "brackets" },
              ),
          )
          .reply(200, {});

        await expect(
          clockodo.getNonbusinessDays({
            nonbusinessgroupsId: [123],
            year: 2021,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });

      it("throws an error when getNonbusinessDays() is missing param", async () => {
        expect.assertions(1);

        await expect(
          clockodo.getNonbusinessDays(
            // @ts-expect-error Year is missing
            { nonbusinessgroupsId: 123 },
          ),
        ).rejects.toThrowError('Missing required parameter "year"');
      });
    });

    describe("getNonbusinessDay()", () => {
      it("correctly builds getNonbusinessDay() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/nonbusinessDays/12?year=2026")
          .reply(200, {});

        await expect(
          clockodo.getNonbusinessDay({ id: 12, year: 2026 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getWorkTimes()", () => {
      it("requests all workTimes pages", async () => {
        const baseUrl = `/v2/workTimes?${qs.stringify({
          date_since: "2023-01-01",
          date_until: "2023-01-07",
          users_id: 123,
        })}&`;

        const nockScope = setupPaginatedApiMock({
          baseUrl,
          countPages: 3,
          createPageResponse: (page) => ({ workTimeDays: [page] }),
        });

        const { workTimeDays } = await clockodo.getWorkTimes({
          dateSince: "2023-01-01",
          dateUntil: "2023-01-07",
          usersId: 123,
        });

        expect(workTimeDays).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getWorkTimesChangeRequests()", () => {
      it("requests all change request pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: `/v2/workTimes/changeRequests?${qs.stringify({
            date_since: "2023-01-01",
            date_until: "2023-01-07",
            users_id: 123,
          })}&`,
          countPages: 3,
          createPageResponse: (page) => ({ changeRequests: [page] }),
        });

        const { changeRequests } = await clockodo.getWorkTimesChangeRequests({
          dateSince: "2023-01-01",
          dateUntil: "2023-01-07",
          usersId: 123,
        });

        expect(changeRequests).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getOvertimecarry()", () => {
      it("correctly builds getOvertimecarry() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/overtimeCarry?users_id=17&year=2028")
          .reply(200, {});

        await expect(
          clockodo.getOvertimecarry({ usersId: 17, year: 2028 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getOvertimecarryRow()", () => {
      it("correctly builds getOvertimecarryRow() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/overtimeCarry/7")
          .reply(200, {});

        await expect(
          clockodo.getOvertimecarryRow({ id: 7 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getHolidaysQuotas()", () => {
      it("correctly builds getHolidaysQuotas() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/holidaysQuota?users_id=17&year=2028")
          .reply(200, {});

        await expect(
          clockodo.getHolidaysQuotas({ usersId: 17, year: 2028 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getHolidaysQuota()", () => {
      it("correctly builds getHolidaysQuota() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/holidaysQuota/7")
          .reply(200, {});

        await expect(
          clockodo.getHolidaysQuota({ id: 7 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getHolidaysCarryovers()", () => {
      it("correctly builds getHolidaysCarryovers() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/holidaysCarry?users_id=17&year=2028")
          .reply(200, {});

        await expect(
          clockodo.getHolidaysCarryovers({ usersId: 17, year: 2028 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getHolidaysCarryover()", () => {
      it("correctly builds getHolidaysCarryover() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v3/holidaysCarry/7")
          .reply(200, {});

        await expect(
          clockodo.getHolidaysCarryover({ id: 7 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getSurchargeModel()", () => {
      it("correctly builds getSurchargeModel() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/surchargeModels/7")
          .reply(200, {});

        await expect(
          clockodo.getSurchargeModel({ id: 7 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("getSurchargeModels()", () => {
      it("correctly builds getSurchargeModels() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .get("/v2/surchargeModels")
          .reply(200, {});

        await expect(clockodo.getSurchargeModels()).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });
  });

  describe("POST", () => {
    describe("startClock()", () => {
      it("correctly builds startClock() request", async () => {
        const expectedParameters = {
          customers_id: 24,
          services_id: 7,
          projects_id: 365,
          billable: Billability.Billable,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/clock", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.startClock({
            customersId: 24,
            servicesId: 7,
            projectsId: 365,
            billable: Billability.Billable,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when startClock() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.startClock({
            customersId: 24,
          }),
        ).rejects.toThrowError('Missing required parameter "servicesId"');
      });
    });

    describe("addCustomer()", () => {
      it("correctly builds addCustomer() request", async () => {
        const expectedParameters = {
          name: "Weyland-Yutani",
          billable_default: Billability.Billable,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v3/customers", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addCustomer({
            name: "Weyland-Yutani",
            billableDefault: Billability.Billable,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addNonbusinessGroup()", () => {
      it("correctly builds addNonbusinessGroup() request", async () => {
        const expectedParameters = {
          name: "NRW",
          preset: "",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/nonbusinessGroups", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addNonbusinessGroup({
            name: "NRW",
            preset: "",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });

      it("throws an error when addNonbusinessGroup() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addNonbusinessGroup({}),
        ).rejects.toThrowError('Missing required parameter "name"');
      });
    });

    describe("addNonbusinessDay()", () => {
      it("correctly builds addNonbusinessDay() request", async () => {
        const expectedParameters = {
          nonbusiness_group_id: 2,
          type: "DISTINCT_ONCE",
          name: "Labor Day",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/nonbusinessDays", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addNonbusinessDay({
            nonbusinessGroupId: 2,
            type: "DISTINCT_ONCE",
            name: "Labor Day",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addOvertimecarry()", () => {
      it("correctly builds addOvertimecarry() request", async () => {
        const expectedParameters = {
          users_id: 17,
          year: 2028,
          hours: 8,
          note: "carryover",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v3/overtimeCarry", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addOvertimecarry({
            usersId: 17,
            year: 2028,
            hours: 8,
            note: "carryover",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addHolidaysQuota()", () => {
      it("correctly builds addHolidaysQuota() request", async () => {
        const expectedParameters = {
          users_id: 17,
          year_since: 2028,
          count: 30,
          note: "default",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/holidaysQuota", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addHolidaysQuota({
            usersId: 17,
            yearSince: 2028,
            count: 30,
            note: "default",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addHolidaysCarryover()", () => {
      it("correctly builds addHolidaysCarryover() request", async () => {
        const expectedParameters = {
          users_id: 17,
          year: 2028,
          count: 5,
          note: "carry",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v3/holidaysCarry", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addHolidaysCarryover({
            usersId: 17,
            year: 2028,
            count: 5,
            note: "carry",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addLumpsumService()", () => {
      it("correctly builds addLumpsumService() request", async () => {
        const expectedParameters = {
          name: "Weyland-Yutani",
          price: 1,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v4/lumpSumServices", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addLumpsumService({
            name: "Weyland-Yutani",
            price: 1,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addProject()", () => {
      it("correctly builds addProject() request", async () => {
        const expectedParameters = {
          name: "Clockodo Api Wrapper",
          customers_id: 1,
          active: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v4/projects", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addProject({
            name: "Clockodo Api Wrapper",
            customersId: 1,
            active: true,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addSubproject()", () => {
      it("correctly builds addSubproject() request", async () => {
        const expectedParameters = {
          projects_id: 1,
          name: "SDK Migration",
          billable_default: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v3/subprojects", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addSubproject({
            projectsId: 1,
            name: "SDK Migration",
            billableDefault: true,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addService()", () => {
      it("correctly builds addService() request", async () => {
        const expectedParameters = {
          name: "Thinking",
          active: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v4/services", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addService({ name: "Thinking", active: true }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addUser()", () => {
      it("correctly builds addUser() request", async () => {
        const expectedParameters = {
          name: "Merkel",
          number: "8",
          email: "angela@eu.eu",
          role: UserRole.Owner,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v3/users", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addUser({
            name: "Merkel",
            number: "8",
            email: "angela@eu.eu",
            role: UserRole.Owner,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when addUser() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addUser({
            name: "Merkel",
            number: "8",
            email: "angela@eu.eu",
          }),
        ).rejects.toThrowError('Missing required parameter "role"');
      });
    });

    describe("addEntry()", () => {
      it("correctly builds addEntry() request", async () => {
        const expectedParameters = {
          customers_id: 1,
          services_id: 2,
          billable: Billability.Billable,
          time_since: "2020-06-02 00:00:00",
          time_until: "2020-06-02 00:00:01",
          text: "this is an optional description",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/entries", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addEntry({
            customersId: 1,
            servicesId: 2,
            billable: Billability.Billable,
            timeSince: "2020-06-02 00:00:00",
            timeUntil: "2020-06-02 00:00:01",
            text: "this is an optional description",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when addEntry() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addEntry({
            customersId: 1,
            servicesId: 2,
            timeSince: "2020-06-02 00:00:00",
            timeUntil: "2020-06-02 00:00:01",
          }),
        ).rejects.toThrowError('Missing required parameter "billable"');
      });
    });

    describe("addAbsence()", () => {
      it("correctly builds addAbsence() request", async () => {
        const expectedParameters = {
          date_since: "2017-08-18",
          date_until: "2018-02-09",
          type: AbsenceType.SpecialLeave,
          note: "elternzeit",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v4/absences", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addAbsence({
            dateSince: "2017-08-18",
            dateUntil: "2018-02-09",
            type: AbsenceType.SpecialLeave,
            note: "elternzeit",
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when addAbsence() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addAbsence({
            dateSince: "2017-08-18",
            dateUntil: "2018-02-09",
          }),
        ).rejects.toThrowError('Missing required parameter "type"');
      });
    });
    describe("register()", () => {
      it("correctly builds register() request", async () => {
        const expectedParameters = {
          companies_name: "Acme Corporation",
          name: "Looney Tunes",
          email: "looney@tunes.com",
          gtc_agreed: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/register", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.register({
            companiesName: "Acme Corporation",
            name: "Looney Tunes",
            email: "looney@tunes.com",
            gtcAgreed: true,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addChangeRequest()", () => {
      it("correctly builds addChangeRequest() request", async () => {
        const expectedParameters = {
          date: "2023-01-01",
          users_id: 12,
          changes: [],
        };
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/workTimes/changeRequests", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addWorkTimesChangeRequest({
            date: "2023-01-01",
            usersId: 12,
            changes: [],
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("approveWorkTimesChangeRequest()", () => {
      it("correctly builds approveWorkTimesChangeRequest() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v3/workTimes/changeRequests/17/approve")
          .reply(200, {});

        await expect(
          clockodo.approveWorkTimesChangeRequest({
            id: 17,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("declineWorkTimesChangeRequest()", () => {
      it("correctly builds declineWorkTimesChangeRequest() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/workTimes/changeRequests/17/decline")
          .reply(200, {});

        await expect(
          clockodo.declineWorkTimesChangeRequest({
            id: 17,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("addSurchargeModel()", () => {
      it("correctly builds addSurchargeModel() request", async () => {
        const expectedParameters = {
          name: "Weyland-Yutani",
          accumulation: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .post("/v2/surchargeModels", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.addSurchargeModel({
            name: "Weyland-Yutani",
            accumulation: true,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });
  });

  describe("PUT", () => {
    describe("changeClockDuration()", () => {
      it("correctly builds changeClockDuration() request", async () => {
        const expectedParameters = {
          duration_before: 300,
          duration: 540,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/clock/782", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.changeClockDuration({
            entriesId: 782,
            duration: 540,
            durationBefore: 300,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
      it("throws an error when getUserReports() is missing param", async () => {
        expect.assertions(1);

        await expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.changeClockDuration({
            entriesId: 782,
            durationBefore: 540,
          }),
        ).rejects.toThrowError('Missing required parameter "duration"');
      });
    });

    describe("editCustomer()", () => {
      it("correctly builds editCustomer() request", async () => {
        const customer = {
          id: 15,
          name: "Mystery Gang",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/customers/15", mapRequestBody(customer))
          .reply(200, {});

        await expect(
          clockodo.editCustomer(customer),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editLumpsumService()", () => {
      it("correctly builds editLumpsumService() request", async () => {
        const lumpsumService = {
          id: 15,
          name: "Mystery Gang",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v4/lumpSumServices/15", mapRequestBody(lumpsumService))
          .reply(200, {});

        await expect(
          clockodo.editLumpsumService(lumpsumService),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editProject()", () => {
      it("correctly builds editProject() request", async () => {
        const project = {
          id: 20,
          name: "power level",
          hourlyRate: 91,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v4/projects/20", mapRequestBody(project))
          .reply(200, {});

        await expect(clockodo.editProject(project)).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("completeProject()", () => {
      it("correctly builds completeProject() request", async () => {
        const expectedParameters = {
          completed: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v4/projects/20/complete", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.completeProject({ id: 20, completed: true }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("setProjectBilled()", () => {
      it("correctly builds setProjectBilled() request", async () => {
        const expectedParameters = {
          billed: true,
          billed_money: 1234.5,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/projects/20/setBilled", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.setProjectBilled({
            id: 20,
            billed: true,
            billedMoney: 1234.5,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editSubproject()", () => {
      it("correctly builds editSubproject() request", async () => {
        const subproject = {
          id: 20,
          name: "SDK Migration Phase 2",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/subprojects/20", mapRequestBody(subproject))
          .reply(200, {});

        await expect(
          clockodo.editSubproject(subproject),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("completeSubproject()", () => {
      it("correctly builds completeSubproject() request", async () => {
        const expectedParameters = {
          completed: true,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/subprojects/20/complete", expectedParameters)
          .reply(200, {});

        await expect(
          clockodo.completeSubproject({ id: 20, completed: true }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editService()", () => {
      it("correctly builds editService() request", async () => {
        const service = {
          id: 23,
          name: "room service",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v4/services/23", mapRequestBody(service))
          .reply(200, {});

        await expect(clockodo.editService(service)).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("editUser()", () => {
      it("correctly builds editUser() request", async () => {
        const user = {
          id: 33,
          name: "Moalo Loco",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/users/33", mapRequestBody(user))
          .reply(200, {});

        await expect(clockodo.editUser(user)).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("editEntryGroup()", () => {
      it("correctly builds editEntryGroup() request", async () => {
        const entryGroup = {
          timeSince: "2017-08-18 00:00:00",
          timeUntil: "2018-02-09 00:00:00",
          text: "chillin everyday",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/entrygroups", mapRequestBody(entryGroup))
          .reply(200, {});

        await expect(
          clockodo.editEntryGroup(entryGroup),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editAbsence()", () => {
      it("correctly builds editAbsence() request", async () => {
        const absence = {
          id: 74,
          note: "seems fishy to me",
          status: AbsenceStatus.Approved,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v4/absences/74", mapRequestBody(absence))
          .reply(200, {});

        await expect(clockodo.editAbsence(absence)).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("editEntry()", () => {
      it("correctly builds editEntry() request", async () => {
        const entry = {
          id: 365,
          duration: 540,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/entries/365", mapRequestBody(entry))
          .reply(200, {});

        await expect(clockodo.editEntry(entry)).resolves.not.toBeInstanceOf(
          Error,
        );

        nockScope.done();
      });
    });

    describe("editSurchargeModel()", () => {
      it("correctly builds editSurchargeModel() request", async () => {
        const entry = {
          id: 365,
          name: "ABC",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/surchargeModels/365", mapRequestBody(entry))
          .reply(200, {});

        await expect(
          clockodo.editSurchargeModel(entry),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editNonbusinessGroup()", () => {
      it("correctly builds editNonbusinessGroup() request", async () => {
        const nonbusinessGroup = {
          id: 2,
          name: "Holidays",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/nonbusinessGroups/2", mapRequestBody(nonbusinessGroup))
          .reply(200, {});

        await expect(
          clockodo.editNonbusinessGroup(nonbusinessGroup),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editNonbusinessDay()", () => {
      it("correctly builds editNonbusinessDay() request", async () => {
        const nonbusinessDay = {
          id: 2,
          name: "Holiday",
          type: "DISTINCT_RECURRING" as const,
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/nonbusinessDays/2", mapRequestBody(nonbusinessDay))
          .reply(200, {});

        await expect(
          clockodo.editNonbusinessDay(nonbusinessDay),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editOvertimecarry()", () => {
      it("correctly builds editOvertimecarry() request", async () => {
        const overtimecarryRow = {
          id: 2,
          hours: 8,
          note: "updated",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/overtimeCarry/2", mapRequestBody(overtimecarryRow))
          .reply(200, {});

        await expect(
          clockodo.editOvertimecarry(overtimecarryRow),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editHolidaysQuota()", () => {
      it("correctly builds editHolidaysQuota() request", async () => {
        const holidaysQuota = {
          id: 2,
          count: 25,
          note: "updated",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v2/holidaysQuota/2", mapRequestBody(holidaysQuota))
          .reply(200, {});

        await expect(
          clockodo.editHolidaysQuota(holidaysQuota),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("editHolidaysCarryover()", () => {
      it("correctly builds editHolidaysCarryover() request", async () => {
        const holidaysCarryover = {
          id: 2,
          count: 5,
          note: "updated",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .put("/v3/holidaysCarry/2", mapRequestBody(holidaysCarryover))
          .reply(200, {});

        await expect(
          clockodo.editHolidaysCarryover(holidaysCarryover),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });
  });

  describe("DELETE", () => {
    describe("stopClock()", () => {
      it("correctly builds stopClock() request without optional usersId", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/clock/782")
          .reply(200, {});

        await expect(
          clockodo.stopClock({ entriesId: 782 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });

      it("correctly builds stopClock() request with optional usersId", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/clock/782", { users_id: 123 })
          .reply(200, {});

        await expect(
          clockodo.stopClock({ entriesId: 782, usersId: 123 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteCustomer()", () => {
      it("correctly builds deleteCustomer() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v3/customers/343")
          .reply(200, {});

        await expect(
          clockodo.deleteCustomer({ id: 343 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteProject()", () => {
      it("correctly builds deleteProject() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v4/projects/8")
          .reply(200, {});

        await expect(
          clockodo.deleteProject({ id: 8 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteSubproject()", () => {
      it("correctly builds deleteSubproject() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v3/subprojects/8")
          .reply(200, {});

        await expect(
          clockodo.deleteSubproject({ id: 8 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteService()", () => {
      it("correctly builds deleteService() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v4/services/94")
          .reply(200, {});

        await expect(
          clockodo.deleteService({ id: 94 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteLumpsumService()", () => {
      it("correctly builds deleteLumpsumService() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v4/lumpSumServices/94")
          .reply(200, {});

        await expect(
          clockodo.deleteLumpsumService({ id: 94 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteUser()", () => {
      it("correctly builds deleteUser() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v3/users/7")
          .reply(200, {});

        await expect(
          clockodo.deleteUser({ id: 7 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteEntry()", () => {
      it("correctly builds deleteEntry() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/entries/45")
          .reply(200, {});

        await expect(
          clockodo.deleteEntry({ id: 45 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteEntryGroup()", () => {
      it("correctly builds deleteEntryGroup() request", async () => {
        const entryGroup = {
          timeSince: "2017-08-18 00:00:00",
          timeUntil: "2018-02-09 00:00:00",
          text: "chilin everyday",
        };

        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/entrygroups", mapRequestBody(entryGroup))
          .reply(200, {});

        await expect(
          clockodo.deleteEntryGroup(entryGroup),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteAbsence()", () => {
      it("correctly builds deleteAbsence() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v4/absences/31")
          .reply(200, {});

        await expect(
          clockodo.deleteAbsence({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("withdrawWorkTimesChangeRequest()", () => {
      it("correctly builds withdrawWorkTimesChangeRequest() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/workTimes/changeRequests/17")
          .reply(200, {});

        await expect(
          clockodo.withdrawWorkTimesChangeRequest({
            id: 17,
          }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteSurchargeModel()", () => {
      it("correctly builds deleteSurchargeModel() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/surchargeModels/31")
          .reply(200, {});

        await expect(
          clockodo.deleteSurchargeModel({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteNonbusinessGroup()", () => {
      it("correctly builds deleteNonbusinessGroup() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/nonbusinessGroups/31")
          .reply(200, {});

        await expect(
          clockodo.deleteNonbusinessGroup({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteNonbusinessDay()", () => {
      it("correctly builds deleteNonbusinessDay() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/nonbusinessDays/31")
          .reply(200, {});

        await expect(
          clockodo.deleteNonbusinessDay({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteOvertimecarry()", () => {
      it("correctly builds deleteOvertimecarry() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v3/overtimeCarry/31")
          .reply(200, {});

        await expect(
          clockodo.deleteOvertimecarry({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteHolidaysQuota()", () => {
      it("correctly builds deleteHolidaysQuota() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v2/holidaysQuota/31")
          .reply(200, {});

        await expect(
          clockodo.deleteHolidaysQuota({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });

    describe("deleteHolidaysCarryover()", () => {
      it("correctly builds deleteHolidaysCarryover() request", async () => {
        const nockScope = nock(CLOCKODO_API_BASE_URL)
          .delete("/v3/holidaysCarry/31")
          .reply(200, {});

        await expect(
          clockodo.deleteHolidaysCarryover({ id: 31 }),
        ).resolves.not.toBeInstanceOf(Error);

        nockScope.done();
      });
    });
  });
});

const setupPaginatedApiMock = ({
  baseUrl,
  countPages,
  createPageResponse,
}: {
  baseUrl: string;
  countPages: number;
  createPageResponse: (page: number) => Record<string, unknown>;
}) => {
  let nockScope = nock(CLOCKODO_API_BASE_URL);

  Array.from({ length: countPages }).forEach((_, index) => {
    const page = index + 1;

    nockScope = nockScope.get(`${baseUrl}page=${page}`).reply(200, {
      ...createPageResponse(page),
      paging: {
        items_per_page: 1,
        current_page: 1,
        count_pages: countPages,
        count_items: countPages,
      },
    });
  });

  return nockScope;
};
