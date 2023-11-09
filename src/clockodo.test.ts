import qs from "qs";
import nock from "nock";
import {
  Clockodo,
  Config,
  Billability,
  UserRole,
  AbsenceType,
  AbsenceStatus,
  mapRequestBody,
} from "./index.js";

const CLOCKODO_API = "https://my.clockodo.com/api";
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
          })
      ).toThrowErrorMatchingInlineSnapshot(
        `"name should be a string but given value undefined is typeof undefined"`
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
          })
      ).toThrowErrorMatchingInlineSnapshot(
        `"email should be a string but given value undefined is typeof undefined"`
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
          })
      ).toThrowErrorMatchingInlineSnapshot(
        `"user should be a string but given value undefined is typeof undefined"`
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
          })
      ).toThrowErrorMatchingInlineSnapshot(
        `"apiKey should be a string but given value undefined is typeof undefined"`
      );
    });
    it("throws an error when constructor has baseUrl with type other than string", () => {
      expect(
        () =>
          new Clockodo({
            ...config,
            // @ts-expect-error 2322
            baseUrl: 5678,
          })
      ).toThrowErrorMatchingInlineSnapshot(
        `"baseUrl should be undefined or a string but given value 5678 is typeof number"`
      );
    });
  });

  describe("Config", () => {
    describe("locale", () => {
      it("sends request with the given Accept-Language header", async () => {
        const nockScope = nock(CLOCKODO_API, {
          reqheaders: {
            "Accept-Language": "de-DE",
          },
        })
          .get("/anything")
          .reply(200, {});

        clockodo.api.config({
          locale: "de-DE",
        });

        await clockodo.api.get("/anything");

        nockScope.done();
      });
    });
  });

  describe("GET", () => {
    describe("getAbsence()", () => {
      it("correctly builds getAbsence() request", async () => {
        const nockScope = nock(CLOCKODO_API).get("/absences/7").reply(200, {});

        await clockodo.getAbsence({ id: 7 });

        nockScope.done();
      });
    });

    describe("getAbsences()", () => {
      it("correctly builds getAbsences() request", async () => {
        const expectedParameters = {
          year: 218,
        };

        const nockScope = nock(CLOCKODO_API)
          .get("/absences?" + qs.stringify(expectedParameters))
          .reply(200, {});

        await clockodo.getAbsences({ year: 218 });

        nockScope.done();
      });
    });

    describe("getClock()", () => {
      it("correctly builds getClock() request", async () => {
        const nockScope = nock(CLOCKODO_API).get("/v2/clock").reply(200, {});

        await clockodo.getClock();

        nockScope.done();
      });
    });

    describe("getCustomer()", () => {
      it("correctly builds getCustomer() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/v2/customers/777")
          .reply(200, {});

        await clockodo.getCustomer({ id: 777 });

        nockScope.done();
      });
    });

    describe("getCustomersPage()", () => {
      it("correctly builds getCustomersPage() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/v2/customers")
          .reply(200, {});

        await clockodo.getCustomersPage();

        nockScope.done();
      });
    });

    describe("getCustomers()", () => {
      it("requests all customer pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v2/customers?",
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
        const nockScope = nock(CLOCKODO_API)
          .get("/v3/lumpsumservices/777")
          .reply(200, {});

        await clockodo.getLumpSumService({ id: 777 });

        nockScope.done();
      });
    });

    describe("getLumpSumServicesPage()", () => {
      it("correctly builds getLumpSumServicesPage() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/v3/lumpsumservices")
          .reply(200, {});

        await clockodo.getLumpSumServicesPage();

        nockScope.done();
      });
    });

    describe("getLumpSumServices()", () => {
      it("requests all lumpSumService pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v3/lumpsumservices?",
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
        const nockScope = nock(CLOCKODO_API)
          .get("/v2/entries/4")
          .reply(200, {});

        await clockodo.getEntry({ id: 4 });

        nockScope.done();
      });
    });

    describe.skip("splitAllEntriesAtMidnight()", () => {
      it("correctly builds splitAllEntriesAtMidnight() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .put("/v2/entries/splitAllAtMidnight")
          .reply(200, {});

        await clockodo.splitAllEntriesAtMidnight({
          day: "2022-12-19",
          usersId: 1,
        });

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

        const nockScope = nock(CLOCKODO_API)
          .get("/v2/entries?" + qs.stringify(expectedParameters))
          .reply(200, {});

        await clockodo.getEntriesPage({
          timeSince: "2017-08-18 00:00:00",
          timeUntil: "2018-02-09 00:00:00",
          filterBillable: Billability.Billed,
        });

        nockScope.done();
      });
      it("throws an error when getEntriesPage() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntriesPage({
            timeSince: "2017-08-18 00:00:00",
          })
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

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntries({
            timeSince: "2017-08-18 00:00:00",
          })
        ).rejects.toThrowError('Missing required parameter "timeUntil"');
      });
    });

    describe("getEntriesTexts()", () => {
      it("requests all entries texts pages", async () => {
        const expectedParameters = {
          text: "Some text",
        };
        const nockScope = setupPaginatedApiMock({
          baseUrl: `/v2/entriesTexts?${qs.stringify(expectedParameters)}&`,
          countPages: 3,
          createPageResponse: (page) => ({ texts: { [page]: true } }),
        });

        const { texts } = await clockodo.getEntriesTexts({
          text: "Some text",
        });

        expect(texts).toMatchObject({ 1: true, 2: true, 3: true });

        nockScope.done();
      });
      it("throws an error when getEntriesTexts() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntriesTexts({})
        ).rejects.toThrowError('Missing required parameter "text"');
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

        const nockScope = nock(CLOCKODO_API)
          .get(
            "/v2/entrygroups?" +
              qs.stringify(timeRangeParameters) +
              "&" +
              qs.stringify(groupingParameters, {
                arrayFormat: "brackets",
              }) +
              "&" +
              qs.stringify(optionalParameters)
          )
          .reply(200, {});

        await clockodo.getEntryGroups({
          timeSince: "2017-08-18 00:00:00",
          timeUntil: "2018-02-09 00:00:00",
          grouping: ["customers_id", "projects_id"],
          roundToMinutes: 15,
        });

        nockScope.done();
      });
      it("throws an error when getEntryGroups() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.getEntryGroups({
            timeSince: "2017-08-18 00:00:00",
            timeUntil: "2018-02-09 00:00:00",
          })
        ).rejects.toThrowError('Missing required parameter "grouping"');
      });
    });

    describe("getProject()", () => {
      it("correctly builds getProject() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/v2/projects/1985")
          .reply(200, {});

        await clockodo.getProject({ id: 1985 });

        nockScope.done();
      });
    });

    describe("getProjectsPage()", () => {
      it("correctly builds getProjectsPage() request", async () => {
        const nockScope = nock(CLOCKODO_API).get("/v2/projects").reply(200, {});

        await clockodo.getProjectsPage();

        nockScope.done();
      });
    });

    describe("getProjects()", () => {
      it("requests all projects pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v2/projects?",
          countPages: 3,
          createPageResponse: (page) => ({ projects: [page] }),
        });

        const { projects } = await clockodo.getProjects();

        expect(projects).toMatchObject([1, 2, 3]);

        nockScope.done();
      });
    });

    describe("getService()", () => {
      it("correctly builds getService() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/v3/services/10")
          .reply(200, {});

        await clockodo.getService({ id: 10 });

        nockScope.done();
      });
    });

    describe("getServicesPage()", () => {
      it("correctly builds getServicesPage() request", async () => {
        const nockScope = nock(CLOCKODO_API).get("/v3/services").reply(200, {});

        await clockodo.getServicesPage();

        nockScope.done();
      });
    });

    describe("getServices()", () => {
      it("requests all getServices pages", async () => {
        const nockScope = setupPaginatedApiMock({
          baseUrl: "/v3/services?",
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
        const nockScope = nock(CLOCKODO_API)
          .get("/targethours/1234")
          .reply(200, {});

        await clockodo.getTargethoursRow({ id: 1234 });

        nockScope.done();
      });
    });

    describe("getTargetHours", () => {
      it("correctly builds getTargetHours() request", async () => {
        const nockScope = nock(CLOCKODO_API).get("/targethours").reply(200, {});

        await clockodo.getTargethours();

        nockScope.done();
      });
    });

    describe("getUser()", () => {
      it("correctly builds getUser() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/v2/users/1263")
          .reply(200, {});

        await clockodo.getUser({ id: 1263 });

        nockScope.done();
      });
    });

    describe("getUsers()", () => {
      it("correctly builds getUsers() request", async () => {
        const nockScope = nock(CLOCKODO_API).get("/v2/users").reply(200, {});

        await clockodo.getUsers();

        nockScope.done();
      });
    });

    describe("getUserReport()", () => {
      it("correctly builds getUserReport() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/userreports/1263?" + qs.stringify({ year: 217 }))
          .reply(200, {});

        await clockodo.getUserReport({ usersId: 1263, year: 217 });

        nockScope.done();
      });
      it("throws an error when getUserReport() is missing param", async () => {
        expect.assertions(1);

        return expect(
          clockodo.getUserReport(
            // @ts-expect-error Year is missing
            { usersId: 200 }
          )
        ).rejects.toThrowError('Missing required parameter "year"');
      });
    });

    describe("getUserReports()", () => {
      it("correctly builds getUserReports() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/userreports?" + qs.stringify({ year: 217 }))
          .reply(200, {});

        await clockodo.getUserReports({ year: 217 });

        nockScope.done();
      });
    });

    describe("getNonbusinessGroups()", () => {
      it("correctly builds getNonbusinessGroups() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/nonbusinessgroups")
          .reply(200, {});

        await clockodo.getNonbusinessGroups();

        nockScope.done();
      });
    });

    describe("getNonbusinessDays()", () => {
      it("correctly builds getNonbusinessDays() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get(
            "/nonbusinessdays?" +
              qs.stringify(
                { nonbusinessgroups_id: [123], year: 2021 },
                { arrayFormat: "brackets" }
              )
          )
          .reply(200, {});

        await clockodo.getNonbusinessDays({
          nonbusinessgroupsId: [123],
          year: 2021,
        });

        nockScope.done();
      });

      it("throws an error when getNonbusinessDays() is missing param", async () => {
        expect.assertions(1);

        return expect(
          clockodo.getNonbusinessDays(
            // @ts-expect-error Year is missing
            { nonbusinessgroupsId: 123 }
          )
        ).rejects.toThrowError('Missing required parameter "year"');
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
        const nockScope = nock(CLOCKODO_API)
          .get("/overtimecarry?users_id=17&year=2028")
          .reply(200, {});

        await clockodo.getOvertimecarry({ usersId: 17, year: 2028 });

        nockScope.done();
      });
    });

    describe("getHolidaysquota()", () => {
      it("correctly builds getHolidaysquota() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/holidaysquota?users_id=17")
          .reply(200, {});

        await clockodo.getHolidaysquota({ usersId: 17 });

        nockScope.done();
      });
    });

    describe("getHolidayscarry()", () => {
      it("correctly builds getHolidayscarry() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .get("/holidayscarry?users_id=17&year=2028")
          .reply(200, {});

        await clockodo.getHolidayscarry({ usersId: 17, year: 2028 });

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

        const nockScope = nock(CLOCKODO_API)
          .post("/v2/clock", expectedParameters)
          .reply(200, {});

        await clockodo.startClock({
          customersId: 24,
          servicesId: 7,
          projectsId: 365,
          billable: Billability.Billable,
        });

        nockScope.done();
      });
      it("throws an error when startClock() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.startClock({
            customersId: 24,
          })
        ).rejects.toThrowError('Missing required parameter "servicesId"');
      });
    });

    describe("addCustomer()", () => {
      it("correctly builds addCustomer() request", async () => {
        const expectedParameters = {
          name: "Weyland-Yutani",
          billable_default: Billability.Billable,
        };

        const nockScope = nock(CLOCKODO_API)
          .post("/v2/customers", expectedParameters)
          .reply(200, {});

        await clockodo.addCustomer({
          name: "Weyland-Yutani",
          billableDefault: Billability.Billable,
        });

        nockScope.done();
      });
    });

    describe("addLumpsumService()", () => {
      it("correctly builds addLumpsumService() request", async () => {
        const expectedParameters = {
          name: "Weyland-Yutani",
          price: 1,
        };

        const nockScope = nock(CLOCKODO_API)
          .post("/v3/lumpsumservices", expectedParameters)
          .reply(200, {});

        await clockodo.addLumpsumService({
          name: "Weyland-Yutani",
          price: 1,
        });

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

        const nockScope = nock(CLOCKODO_API)
          .post("/v2/projects", expectedParameters)
          .reply(200, {});

        await clockodo.addProject({
          name: "Clockodo Api Wrapper",
          customersId: 1,
          active: true,
        });

        nockScope.done();
      });
    });

    describe("addService()", () => {
      it("correctly builds addService() request", async () => {
        const expectedParameters = {
          name: "Thinking",
          active: true,
        };

        const nockScope = nock(CLOCKODO_API)
          .post("/v3/services", expectedParameters)
          .reply(200, {});

        await clockodo.addService({ name: "Thinking", active: true });

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

        const nockScope = nock(CLOCKODO_API)
          .post("/v2/users", expectedParameters)
          .reply(200, {});

        await clockodo.addUser({
          name: "Merkel",
          number: "8",
          email: "angela@eu.eu",
          role: UserRole.Owner,
        });

        nockScope.done();
      });
      it("throws an error when addUser() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addUser({
            name: "Merkel",
            number: "8",
            email: "angela@eu.eu",
          })
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

        const nockScope = nock(CLOCKODO_API)
          .post("/v2/entries", expectedParameters)
          .reply(200, {});

        await clockodo.addEntry({
          customersId: 1,
          servicesId: 2,
          billable: Billability.Billable,
          timeSince: "2020-06-02 00:00:00",
          timeUntil: "2020-06-02 00:00:01",
          text: "this is an optional description",
        });

        nockScope.done();
      });
      it("throws an error when addEntry() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addEntry({
            customersId: 1,
            servicesId: 2,
            timeSince: "2020-06-02 00:00:00",
            timeUntil: "2020-06-02 00:00:01",
          })
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

        const nockScope = nock(CLOCKODO_API)
          .post("/absences", expectedParameters)
          .reply(200, {});

        await clockodo.addAbsence({
          dateSince: "2017-08-18",
          dateUntil: "2018-02-09",
          type: AbsenceType.SpecialLeave,
          note: "elternzeit",
        });

        nockScope.done();
      });
      it("throws an error when addAbsence() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.addAbsence({
            dateSince: "2017-08-18",
            dateUntil: "2018-02-09",
          })
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

        const nockScope = nock(CLOCKODO_API)
          .post("/register", expectedParameters)
          .reply(200, {});

        await clockodo.register({
          companiesName: "Acme Corporation",
          name: "Looney Tunes",
          email: "looney@tunes.com",
          gtcAgreed: true,
        });

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
        const nockScope = nock(CLOCKODO_API)
          .post("/v2/workTimes/changeRequests", expectedParameters)
          .reply(200, {});

        await clockodo.addWorkTimesChangeRequest({
          date: "2023-01-01",
          usersId: 12,
          changes: [],
        });

        nockScope.done();
      });
    });

    describe("approveWorkTimesChangeRequest()", () => {
      it("correctly builds approveWorkTimesChangeRequest() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .post("/v2/workTimes/changeRequests/17/approve")
          .reply(200, {});

        await clockodo.approveWorkTimesChangeRequest({
          id: 17,
        });

        nockScope.done();
      });
    });

    describe("declineWorkTimesChangeRequest()", () => {
      it("correctly builds declineWorkTimesChangeRequest() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .post("/v2/workTimes/changeRequests/17/decline")
          .reply(200, {});

        await clockodo.declineWorkTimesChangeRequest({
          id: 17,
        });

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

        const nockScope = nock(CLOCKODO_API)
          .put("/v2/clock/782", expectedParameters)
          .reply(200, {});

        await clockodo.changeClockDuration({
          entriesId: 782,
          duration: 540,
          durationBefore: 300,
        });

        nockScope.done();
      });
      it("throws an error when getUserReports() is missing param", async () => {
        expect.assertions(1);

        return expect(
          // @ts-expect-error Intentional error just for the test
          clockodo.changeClockDuration({
            entriesId: 782,
            durationBefore: 540,
          })
        ).rejects.toThrowError('Missing required parameter "duration"');
      });
    });

    describe("editCustomer()", () => {
      it("correctly builds editCustomer() request", async () => {
        const customer = {
          id: 15,
          name: "Mystery Gang",
        };

        const nockScope = nock(CLOCKODO_API)
          .put("/v2/customers/15", mapRequestBody(customer))
          .reply(200, {});

        await clockodo.editCustomer(customer);

        nockScope.done();
      });
    });

    describe("editLumpsumService()", () => {
      it("correctly builds editLumpsumService() request", async () => {
        const lumpsumService = {
          id: 15,
          name: "Mystery Gang",
        };

        const nockScope = nock(CLOCKODO_API)
          .put("/v3/lumpsumservices/15", mapRequestBody(lumpsumService))
          .reply(200, {});

        await clockodo.editLumpsumService(lumpsumService);

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

        const nockScope = nock(CLOCKODO_API)
          .put("/v2/projects/20", mapRequestBody(project))
          .reply(200, {});

        await clockodo.editProject(project);

        nockScope.done();
      });
    });

    describe("editService()", () => {
      it("correctly builds editService() request", async () => {
        const service = {
          id: 23,
          name: "room service",
        };

        const nockScope = nock(CLOCKODO_API)
          .put("/v3/services/23", mapRequestBody(service))
          .reply(200, {});

        await clockodo.editService(service);

        nockScope.done();
      });
    });

    describe("editUser()", () => {
      it("correctly builds editUser() request", async () => {
        const user = {
          id: 33,
          name: "Moalo Loco",
        };

        const nockScope = nock(CLOCKODO_API)
          .put("/v2/users/33", mapRequestBody(user))
          .reply(200, {});

        await clockodo.editUser(user);

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

        const nockScope = nock(CLOCKODO_API)
          .put("/v2/entrygroups", mapRequestBody(entryGroup))
          .reply(200, {});

        await clockodo.editEntryGroup(entryGroup);

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

        const nockScope = nock(CLOCKODO_API)
          .put("/absences/74", mapRequestBody(absence))
          .reply(200, {});

        await clockodo.editAbsence(absence);

        nockScope.done();
      });
    });

    describe("editEntry()", () => {
      it("correctly builds editEntry() request", async () => {
        const entry = {
          id: 365,
          duration: 540,
        };

        const nockScope = nock(CLOCKODO_API)
          .put("/v2/entries/365", mapRequestBody(entry))
          .reply(200, {});

        await clockodo.editEntry(entry);

        nockScope.done();
      });
    });
  });

  describe("DELETE", () => {
    describe("stopClock()", () => {
      it("correctly builds stopClock() request without optional usersId", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/clock/782")
          .reply(200, {});

        await clockodo.stopClock({ entriesId: 782 });

        nockScope.done();
      });

      it("correctly builds stopClock() request with optional usersId", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/clock/782", { users_id: 123 })
          .reply(200, {});

        await clockodo.stopClock({ entriesId: 782, usersId: 123 });

        nockScope.done();
      });
    });

    describe("deleteCustomer()", () => {
      it("correctly builds deleteCustomer() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/customers/343")
          .reply(200, {});

        await clockodo.deleteCustomer({ id: 343 });

        nockScope.done();
      });
    });

    describe("deleteProject()", () => {
      it("correctly builds deleteProject() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/projects/8")
          .reply(200, {});

        await clockodo.deleteProject({ id: 8 });

        nockScope.done();
      });
    });

    describe("deleteService()", () => {
      it("correctly builds deleteService() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v3/services/94")
          .reply(200, {});

        await clockodo.deleteService({ id: 94 });

        nockScope.done();
      });
    });

    describe("deleteLumpsumService()", () => {
      it("correctly builds deleteLumpsumService() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v3/lumpsumservices/94")
          .reply(200, {});

        await clockodo.deleteLumpsumService({ id: 94 });

        nockScope.done();
      });
    });

    describe("deleteUser()", () => {
      it("correctly builds deleteUser() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/users/7")
          .reply(200, {});

        await clockodo.deleteUser({ id: 7 });

        nockScope.done();
      });
    });

    describe("deleteEntry()", () => {
      it("correctly builds deleteEntry() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/entries/45")
          .reply(200, {});

        await clockodo.deleteEntry({ id: 45 });

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

        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/entrygroups", mapRequestBody(entryGroup))
          .reply(200, {});

        await clockodo.deleteEntryGroup(entryGroup);

        nockScope.done();
      });
    });

    describe("deleteAbsence()", () => {
      it("correctly builds deleteAbsence() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/absences/31")
          .reply(200, {});

        await clockodo.deleteAbsence({ id: 31 });

        nockScope.done();
      });
    });

    describe("withdrawWorkTimesChangeRequest()", () => {
      it("correctly builds withdrawWorkTimesChangeRequest() request", async () => {
        const nockScope = nock(CLOCKODO_API)
          .delete("/v2/workTimes/changeRequests/17")
          .reply(200, {});

        await clockodo.withdrawWorkTimesChangeRequest({
          id: 17,
        });

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
  let nockScope = nock(CLOCKODO_API);

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
