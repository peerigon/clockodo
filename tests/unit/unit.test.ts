// We need to disable the camelcase rule since the Clockodo API is using snake_case
/* eslint-disable @typescript-eslint/naming-convention */
import qs from "qs";
import nock from "nock";
import snakecaseKeys from "snakecase-keys";
import { Clockodo, Config } from "../../src";
import { cachePlugin } from "../../src/plugins/cache";
import {
    AbsenceStatus,
    AbsenceType,
    Billability,
} from "../../src/internals/enums";

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
                `"name should be a string but is typeof: undefined"`
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
                `"email should be a string but is typeof: undefined"`
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
                `"user should be a string but is typeof: undefined"`
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
                `"apiKey should be a string but is typeof: undefined"`
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
                `"baseUrl should be a string but is typeof: number"`
            );
        });
    });

    describe("Cache", () => {
        it("should cache the first request for cacheTime", async () => {
            const clockodoWithCache = new Clockodo(config);

            clockodoWithCache.use(cachePlugin({ cacheTime: 50 }));

            const usersId = 7;
            let requestCounter = 0;

            const nockScope = nock(CLOCKODO_API)
                .get(`/users/${usersId}`)
                .twice()
                .reply(200, () => {
                    requestCounter++;
                });

            await clockodoWithCache.getUser({
                id: usersId,
            });
            expect(requestCounter).toBe(1);
            await clockodoWithCache.getUser({
                id: usersId,
            });
            // If cache is not working this would fail
            expect(requestCounter).toBe(1);

            await new Promise((resolve) => setTimeout(resolve, 50));

            await clockodoWithCache.getUser({
                id: usersId,
            });
            expect(requestCounter).toBe(2);

            nockScope.done();
        });
    });

    describe("GET", () => {
        describe("getAbsence()", () => {
            it("correctly builds getAbsence() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/absences/7")
                    .reply(200);

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
                    .reply(200);

                await clockodo.getAbsences({ year: 218 });

                nockScope.done();
            });
        });

        describe("getClock()", () => {
            it("correctly builds getClock() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/v2/clock")
                    .reply(200);

                await clockodo.getClock();

                nockScope.done();
            });
        });

        describe("getCustomer()", () => {
            it("correctly builds getCustomer() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/customers/777")
                    .reply(200);

                await clockodo.getCustomer({ id: 777 });

                nockScope.done();
            });
        });

        describe("getCustomers()", () => {
            it("correctly builds getCustomers() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/customers")
                    .reply(200);

                await clockodo.getCustomers();

                nockScope.done();
            });
        });

        describe("getEntry()", () => {
            it("correctly builds getEntry() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/v2/entries/4")
                    .reply(200);

                await clockodo.getEntry({ id: 4 });

                nockScope.done();
            });
        });

        describe("getEntries()", () => {
            it("correctly builds getEntries() request", async () => {
                const expectedParameters = {
                    time_since: "2017-08-18 00:00:00",
                    time_until: "2018-02-09 00:00:00",
                    "filter[billable]": Billability.Billed,
                };

                const nockScope = nock(CLOCKODO_API)
                    .get("/v2/entries?" + qs.stringify(expectedParameters))
                    .reply(200);

                await clockodo.getEntries({
                    timeSince: "2017-08-18 00:00:00",
                    timeUntil: "2018-02-09 00:00:00",
                    filterBillable: Billability.Billed,
                });

                nockScope.done();
            });
            it("throws an error when getEntries() is missing param", async () => {
                expect.assertions(1);

                return expect(
                    clockodo.getEntries({
                        timeSince: "2017-08-18 00:00:00",
                    } as any)
                ).rejects.toThrowError(
                    'Missing required parameter "timeUntil"'
                );
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
                    .reply(200);

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
                    clockodo.getEntryGroups({
                        timeSince: "2017-08-18 00:00:00",
                        timeUntil: "2018-02-09 00:00:00",
                    } as any)
                ).rejects.toThrowError('Missing required parameter "grouping"');
            });
        });

        describe("getProject()", () => {
            it("correctly builds getProject() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/projects/1985")
                    .reply(200);

                await clockodo.getProject({ id: 1985 });

                nockScope.done();
            });
        });

        describe("getService()", () => {
            it("correctly builds getService() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/services/10")
                    .reply(200);

                await clockodo.getService({ id: 10 });

                nockScope.done();
            });
        });

        describe("getServices()", () => {
            it("correctly builds getServices() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/services")
                    .reply(200);

                await clockodo.getServices();

                nockScope.done();
            });
        });

        describe("getSingleTargetHourSet", () => {
            it("correctly builds getSingleTargetHourSet() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/targethours/1234")
                    .reply(200);

                await clockodo.getTargethoursRow({ id: 1234 });

                nockScope.done();
            });
        });

        describe("getTargetHours", () => {
            it("correctly builds getTargetHours() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/targethours")
                    .reply(200);

                await clockodo.getTargethours();

                nockScope.done();
            });
        });

        describe("getUser()", () => {
            it("correctly builds getUser() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/users/1263")
                    .reply(200);

                await clockodo.getUser({ id: 1263 });

                nockScope.done();
            });
        });

        describe("getUsers()", () => {
            it("correctly builds getUsers() request", async () => {
                const nockScope = nock(CLOCKODO_API).get("/users").reply(200);

                await clockodo.getUsers();

                nockScope.done();
            });
        });

        describe("getUserReport()", () => {
            it("correctly builds getUserReport() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .get("/userreports/1263?" + qs.stringify({ year: 217 }))
                    .reply(200);

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
                    .reply(200);

                await clockodo.getUserReports({ year: 217 });

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
                    .reply(200);

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
                    clockodo.startClock({
                        customersId: 24,
                        servicesId: 7,
                    } as any)
                ).rejects.toThrowError('Missing required parameter "billable"');
            });
        });

        describe("addCustomer()", () => {
            it("correctly builds addCustomer() request", async () => {
                const expectedParameters = {
                    name: "Weyland-Yutani",
                    billable_default: Billability.Billable,
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/customers", expectedParameters)
                    .reply(200);

                await clockodo.addCustomer({
                    name: "Weyland-Yutani",
                    billableDefault: Billability.Billable,
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
                    .post("/projects", expectedParameters)
                    .reply(200);

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
                    .post("/services", expectedParameters)
                    .reply(200);

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
                    role: "Chancellor",
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/users", expectedParameters)
                    .reply(200);

                await clockodo.addUser({
                    name: "Merkel",
                    number: "8",
                    email: "angela@eu.eu",
                    role: "Chancellor",
                });

                nockScope.done();
            });
            it("throws an error when addUser() is missing param", async () => {
                expect.assertions(1);

                return expect(
                    clockodo.addUser({
                        name: "Merkel",
                        number: "8",
                        email: "angela@eu.eu",
                    } as any)
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
                    .reply(200);

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
                    clockodo.addEntry({
                        customersId: 1,
                        servicesId: 2,
                        timeSince: "2020-06-02 00:00:00",
                        timeUntil: "2020-06-02 00:00:01",
                    } as any)
                ).rejects.toThrowError('Missing required parameter "billable"');
            });
        });

        describe("addAbsence()", () => {
            it("correctly builds addAbsence() request", async () => {
                const expectedParameters = {
                    date_since: "2017-08-18 00:00:00",
                    date_until: "2018-02-09 00:00:00",
                    type: AbsenceType.SpecialLeave,
                    note: "elternzeit",
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/absences", expectedParameters)
                    .reply(200);

                await clockodo.addAbsence({
                    dateSince: "2017-08-18 00:00:00",
                    dateUntil: "2018-02-09 00:00:00",
                    type: AbsenceType.SpecialLeave,
                    note: "elternzeit",
                });

                nockScope.done();
            });
            it("throws an error when addAbsence() is missing param", async () => {
                expect.assertions(1);

                return expect(
                    clockodo.addAbsence({
                        dateSince: "2017-08-18 00:00:00",
                        dateUntil: "2018-02-09 00:00:00",
                    } as any)
                ).rejects.toThrowError('Missing required parameter "type"');
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
                    .reply(200);

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
                    clockodo.changeClockDuration({
                        entriesId: 782,
                        durationBefore: 540,
                    } as any)
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
                    .put("/customers/15", snakecaseKeys(customer))
                    .reply(200);

                await clockodo.editCustomer(customer);

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
                    .put("/projects/20", snakecaseKeys(project))
                    .reply(200);

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
                    .put("/services/23", snakecaseKeys(service))
                    .reply(200);

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
                    .put("/users/33", snakecaseKeys(user))
                    .reply(200);

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
                    .put("/entrygroups", snakecaseKeys(entryGroup))
                    .reply(200);

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
                    .put("/absences/74", snakecaseKeys(absence))
                    .reply(200);

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
                    .put("/v2/entries/365", snakecaseKeys(entry))
                    .reply(200);

                await clockodo.editEntry(entry);

                nockScope.done();
            });
        });
    });

    describe("DELETE", () => {
        describe("stopClock()", () => {
            it("correctly builds stopClock() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/v2/clock/782")
                    .reply(200);

                await clockodo.stopClock({ entriesId: 782 });

                nockScope.done();
            });
        });

        describe("deactivateCustomer()", () => {
            it("correctly builds deactivateCustomer() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/customers/343")
                    .reply(200);

                await clockodo.deactivateCustomer({ id: 343 });

                nockScope.done();
            });
        });

        describe("deactivateProject()", () => {
            it("correctly builds deactivateProject() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/projects/8")
                    .reply(200);

                await clockodo.deactivateProject({ id: 8 });

                nockScope.done();
            });
        });

        describe("deactivateService()", () => {
            it("correctly builds deactivateService() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/services/94")
                    .reply(200);

                await clockodo.deactivateService({ id: 94 });

                nockScope.done();
            });
        });

        describe("deactivateUser()", () => {
            it("correctly builds deactivateUser() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/users/7")
                    .reply(200);

                await clockodo.deactivateUser({ id: 7 });

                nockScope.done();
            });
        });

        describe("deleteEntry()", () => {
            it("correctly builds deleteEntry() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/v2/entries/45")
                    .reply(200);

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
                    .delete("/entrygroups", snakecaseKeys(entryGroup))
                    .reply(200);

                await clockodo.deleteEntryGroup(entryGroup);

                nockScope.done();
            });
        });

        describe("deleteAbsence()", () => {
            it("correctly builds deleteAbsence() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/absences/31")
                    .reply(200);

                await clockodo.deleteAbsence({ id: 31 });

                nockScope.done();
            });
        });
    });
});
