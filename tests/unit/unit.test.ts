// We need to disable the camelcase rule since the Clockodo API is using snake_case
/* eslint-disable @typescript-eslint/naming-convention */
import qs from "qs";
import nock from "nock";
import { Clockodo, Config } from "../../src";
import { cachePlugin } from "../../src/plugins/cache";
import { AbsenceType, Billability } from "../../src/internals/enums";

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

            const userId = 7;
            let requestCounter = 0;

            const nockScope = nock(CLOCKODO_API)
                .get(`/users/${userId}`)
                .twice()
                .reply(200, () => {
                    requestCounter++;
                });

            await clockodoWithCache.getUser({
                id: userId,
            });
            expect(requestCounter).toBe(1);
            await clockodoWithCache.getUser({
                id: userId,
            });
            // If cache is not working this would fail
            expect(requestCounter).toBe(1);

            await new Promise((resolve) => setTimeout(resolve, 50));

            await clockodoWithCache.getUser({
                id: userId,
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
                const parameters = {
                    filterBillable: Billability.Billed,
                };

                const expectedParameters = {
                    time_since: "2017-08-18 00:00:00",
                    time_until: "2018-02-09 00:00:00",
                    "filter[billable]": Billability.Billed,
                };

                const nockScope = nock(CLOCKODO_API)
                    .get("/v2/entries?" + qs.stringify(expectedParameters))
                    .reply(200);

                await clockodo.getEntries(
                    {
                        timeSince: "2017-08-18 00:00:00",
                        timeUntil: "2018-02-09 00:00:00",
                    },
                    parameters
                );

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

                await clockodo.getEntryGroups(
                    {
                        timeSince: "2017-08-18 00:00:00",
                        timeUntil: "2018-02-09 00:00:00",
                        grouping: ["customers_id", "projects_id"],
                    },
                    { roundToMinutes: 15 }
                );

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
        describe("getTasks()", () => {
            it("correctly builds getTasks() request", async () => {
                const parameters = {
                    count: 6,
                };

                const nockScope = nock(CLOCKODO_API)
                    .get("/tasks?" + qs.stringify(parameters))
                    .reply(200);

                await clockodo.getTasks(parameters);

                nockScope.done();
            });
        });
        describe("getTaskDuration()", () => {
            it("correctly builds getTaskDuration() request", async () => {
                const givenParameters = {
                    taskCustomersId: 23,
                    taskProjectsId: 25,
                    taskServicesId: 42,
                    taskText: "clean the dishes",
                    taskBillable: 1,
                };

                const expectedParameters = {
                    "task[customers_id]": 23,
                    "task[projects_id]": 25,
                    "task[services_id]": 42,
                    "task[text]": "clean the dishes",
                    "task[billable]": 1,
                };

                const groupingParams = { excludeIds: [217, 450] };

                const nockScope = nock(CLOCKODO_API)
                    .get(
                        "/tasks/duration?" +
                            qs.stringify(expectedParameters) +
                            "&" +
                            qs.stringify(groupingParams, {
                                arrayFormat: "repeat",
                            })
                    )
                    .reply(200);

                await clockodo.getTaskDuration(givenParameters, groupingParams);

                nockScope.done();
            });
            it("throws an error when getTaskDuration() is missing param", async () => {
                expect.assertions(1);

                const badParams = {
                    taskCustomersId: 23,
                    taskProjectsId: 25,
                    taskServicesId: 42,
                    taskText: "clean the dishes",
                };

                return expect(
                    clockodo.getTaskDuration(badParams as any)
                ).rejects.toThrowError(
                    'Missing required parameter "taskBillable"'
                );
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

                await clockodo.getUserReport({ id: 1263, year: 217 });

                nockScope.done();
            });
            it("throws an error when getUserReport() is missing param", async () => {
                expect.assertions(1);

                return expect(
                    clockodo.getUserReport({ id: 200 } as any)
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
                const params = {
                    projectsId: 365,
                };

                const expectedParameters = {
                    customers_id: 24,
                    services_id: 7,
                    projects_id: 365,
                    billable: Billability.Billable,
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/v2/clock", expectedParameters)
                    .reply(200);

                await clockodo.startClock(
                    {
                        customersId: 24,
                        servicesId: 7,
                        billable: Billability.Billable,
                    },
                    params
                );

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
                const params = {
                    billableDefault: Billability.Billable,
                };

                const expectedParameters = {
                    name: "Weyland-Yutani",
                    billable_default: Billability.Billable,
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/customers", expectedParameters)
                    .reply(200);

                await clockodo.addCustomer({ name: "Weyland-Yutani" }, params);

                nockScope.done();
            });
        });
        describe("addProject()", () => {
            it("correctly builds addProject() request", async () => {
                const params = {
                    active: true,
                };

                const expectedParameters = {
                    name: "Clockodo Api Wrapper",
                    customers_id: 1,
                    active: true,
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/projects", expectedParameters)
                    .reply(200);

                await clockodo.addProject(
                    { name: "Clockodo Api Wrapper", customersId: 1 },
                    params
                );

                nockScope.done();
            });
        });
        describe("addService()", () => {
            it("correctly builds addService() request", async () => {
                const params = {
                    active: true,
                };

                const expectedParameters = {
                    name: "Thinking",
                    active: true,
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/services", expectedParameters)
                    .reply(200);

                await clockodo.addService({ name: "Thinking" }, params);

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
                const params = {
                    text: "this is an optional description",
                };

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

                await clockodo.addEntry(
                    {
                        customersId: 1,
                        servicesId: 2,
                        billable: Billability.Billable,
                        timeSince: "2020-06-02 00:00:00",
                        timeUntil: "2020-06-02 00:00:01",
                    },
                    params
                );

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
                const params = {
                    note: "elternzeit",
                };

                const expectedParameters = {
                    date_since: "2017-08-18 00:00:00",
                    date_until: "2018-02-09 00:00:00",
                    type: AbsenceType.SpecialLeave,
                    note: "elternzeit",
                };

                const nockScope = nock(CLOCKODO_API)
                    .post("/absences", expectedParameters)
                    .reply(200);

                await clockodo.addAbsence(
                    {
                        dateSince: "2017-08-18 00:00:00",
                        dateUntil: "2018-02-09 00:00:00",
                        type: AbsenceType.SpecialLeave,
                    },
                    params
                );

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
                const params = {
                    offsetBefore: 60,
                };

                const expectedParameters = {
                    duration_before: 300,
                    duration: 540,
                    offset_before: 60,
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/v2/clock/782", expectedParameters)
                    .reply(200);

                await clockodo.changeClockDuration(
                    { entryId: 782, duration: 540, durationBefore: 300 },
                    params
                );

                nockScope.done();
            });
            it("throws an error when getUserReports() is missing param", async () => {
                expect.assertions(1);

                return expect(
                    clockodo.changeClockDuration({
                        entryId: 782,
                        durationBefore: 540,
                    } as any)
                ).rejects.toThrowError('Missing required parameter "duration"');
            });
        });

        describe("editCustomer()", () => {
            it("correctly builds editCustomer() request", async () => {
                const params = {
                    name: "Mystery Gang",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/customers/15", params)
                    .reply(200);

                await clockodo.editCustomer({ customersId: 15 }, params);

                nockScope.done();
            });
        });

        describe("editProject()", () => {
            it("correctly builds editProject() request", async () => {
                const params = {
                    name: "power level",
                    hourlyRate: "91",
                };

                const expectedParameters = {
                    name: "power level",
                    hourly_rate: "91",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/projects/20", expectedParameters)
                    .reply(200);

                await clockodo.editProject({ projectsId: 20 }, params);

                nockScope.done();
            });
        });

        describe("editService()", () => {
            it("correctly builds editService() request", async () => {
                const params = {
                    name: "room service",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/services/23", params)
                    .reply(200);

                await clockodo.editService({ servicesId: 23 }, params);

                nockScope.done();
            });
        });

        describe("editUser()", () => {
            it("correctly builds editUser() request", async () => {
                const params = {
                    name: "Moalo Loco",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/users/33", params)
                    .reply(200);

                await clockodo.editUser({ usersId: 33 }, params);

                nockScope.done();
            });
        });

        describe("editEntryGroup()", () => {
            it("correctly builds editEntryGroup() request", async () => {
                const params = {
                    text: "chillin everyday",
                };

                const expectedParameters = {
                    time_since: "2017-08-18 00:00:00",
                    time_until: "2018-02-09 00:00:00",
                    text: "chillin everyday",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/entrygroups", expectedParameters)
                    .reply(200);

                await clockodo.editEntryGroup(
                    {
                        timeSince: "2017-08-18 00:00:00",
                        timeUntil: "2018-02-09 00:00:00",
                    },
                    params
                );

                nockScope.done();
            });
        });

        /**
         * ? Why does nock not match the requests when there is a value other than a string in my param object?
         * ? If I put 'status: Clockodo.ABSENCE_STATUS_APPROVED', it treats the params object like it isn't an object
         */
        describe("editAbsence()", () => {
            it("correctly builds editAbsence() request", async () => {
                const params = {
                    note: "seems fishy to me",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/absences/74", params)
                    .reply(200);

                await clockodo.editAbsence({ absenceId: 74 }, params);

                nockScope.done();
            });
        });

        describe("editEntry()", () => {
            it("correctly builds editEntry() request", async () => {
                const params = {
                    duration: "540",
                };

                const nockScope = nock(CLOCKODO_API)
                    .put("/v2/entries/365", params)
                    .reply(200);

                await clockodo.editEntry({ entryId: 365 }, params);

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

                await clockodo.stopClock({ entryId: 782 });

                nockScope.done();
            });
        });
        describe("deactivateCustomer()", () => {
            it("correctly builds deactivateCustomer() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/customers/343")
                    .reply(200);

                await clockodo.deactivateCustomer({ customersId: 343 });

                nockScope.done();
            });
        });

        describe("deactivateProject()", () => {
            it("correctly builds deactivateProject() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/projects/8")
                    .reply(200);

                await clockodo.deactivateProject({ projectsId: 8 });

                nockScope.done();
            });
        });

        describe("deactivateService()", () => {
            it("correctly builds deactivateService() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/services/94")
                    .reply(200);

                await clockodo.deactivateService({ servicesId: 94 });

                nockScope.done();
            });
        });

        describe("deactivateUser()", () => {
            it("correctly builds deactivateUser() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/users/7")
                    .reply(200);

                await clockodo.deactivateUser({ usersId: 7 });

                nockScope.done();
            });
        });

        describe("deleteEntry()", () => {
            it("correctly builds deleteEntry() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/v2/entries/45")
                    .reply(200);

                await clockodo.deleteEntry({ entryId: 45 });

                nockScope.done();
            });
        });

        describe("deleteEntryGroup()", () => {
            it("correctly builds deleteEntryGroup() request", async () => {
                const params = {
                    text: "chilin everyday",
                };

                const expectedParameters = {
                    text: "chilin everyday",
                    time_since: "2017-08-18 00:00:00",
                    time_until: "2018-02-09 00:00:00",
                };

                const nockScope = nock(CLOCKODO_API)
                    .delete("/entrygroups", expectedParameters)
                    .reply(200);

                await clockodo.deleteEntryGroup(
                    {
                        timeSince: "2017-08-18 00:00:00",
                        timeUntil: "2018-02-09 00:00:00",
                    },
                    params
                );

                nockScope.done();
            });
        });
        describe("deleteAbsence()", () => {
            it("correctly builds deleteAbsence() request", async () => {
                const nockScope = nock(CLOCKODO_API)
                    .delete("/absences/31")
                    .reply(200);

                await clockodo.deleteAbsence({ absenceId: 31 });

                nockScope.done();
            });
        });
    });
});
