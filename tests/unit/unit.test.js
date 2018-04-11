"use strict";

const { stringify } = require("querystring");
const qs = require("qs");
const nock = require("nock");
const Clockodo = require("../../lib/api");

const CLOCKODO_API = "https://my.clockodo.com/api";

describe("Clockodo (instance)", () => {
    const clockodo = new Clockodo({ user: "test", apiKey: "test" });

    describe("getAbsence()", () => {
        it("correctly builds getAbsence() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/absences/007")
                .reply(200);

            await clockodo.getAbsence("007");

            nockScope.done();
        });
        it("throws an error when getAbsences() is missing param", async () => {
            expect.assertions(1);

            try {
                await clockodo.getAbsences({});
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "year"'));
            }
        });
    });
    describe("getAbsences()", () => {
        it("correctly builds getAbsences() request", async () => {
            const parameters = {
                year: 2018,
            };
            const nockScope = nock(CLOCKODO_API)
                .get("/absences?" + stringify(parameters))
                .reply(200);

            await clockodo.getAbsences(parameters);

            nockScope.done();
        });
    });
    describe("getClock()", () => {
        it("correctly builds getClock() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/clock")
                .reply(200);

            await clockodo.getClock();

            nockScope.done();
        });
    });
    describe("getClockUpdate()", () => {
        it("correctly builds getClockUpdate() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/clock/update")
                .reply(200);

            await clockodo.getClockUpdate();

            nockScope.done();
        });
    });
    describe("getCustomer()", () => {
        it("correctly builds getCustomer() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/customers/777")
                .reply(200);

            await clockodo.getCustomer("777");

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
    describe("getEntries()", () => {
        it("correctly builds getEntries() request", async () => {
            const givenParameters = {
                begin: "2017-08-18 00:00:00",
                end: "2018-02-09 00:00:00",
                filterBillable: 2,
            };
            const expectedParameters = {
                time_since: "2017-08-18 00:00:00",
                time_until: "2018-02-09 00:00:00",
                "filter[billable]": 2,
            };
            const nockScope = nock(CLOCKODO_API)
                .get("/entries?" + stringify(expectedParameters))
                .reply(200);

            await clockodo.getEntries(givenParameters);

            nockScope.done();
        });
        it("throws an error when getEntries() is missing param", async () => {
            expect.assertions(1);

            const parameters = {
                begin: "2017-08-18 00:00:00",
                filterBillable: 2,
                filterUserId: 38557,
            };

            try {
                await clockodo.getEntries(parameters);
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "end"'));
            }
        });
    });
    describe("getEntryGroups()", () => {
        it("correctly builds getEntryGroups() request", async () => {
            const givenParameters = {
                begin: "2017-08-18 00:00:00",
                end: "2018-02-09 00:00:00",
                roundBy: 15,
                grouping: ["customers_id", "projects_id"],
            };
            const expectedParameters = {
                time_since: "2017-08-18 00:00:00",
                time_until: "2018-02-09 00:00:00",
                round_to_minutes: 15,
            };
            const groupingParams = { grouping: ["customers_id", "projects_id"] };
            const nockScope = nock(CLOCKODO_API)
                .get(
                    "/entrygroups?" +
                        stringify(expectedParameters) +
                        "&" +
                        qs.stringify(groupingParams, { arrayFormat: "brackets" })
                )
                .reply(200);

            await clockodo.getEntryGroups(givenParameters);

            nockScope.done();
        });
        it("throws an error when getEntryGroups() is missing param", async () => {
            expect.assertions(1);

            const parameters = {
                begin: "2017-08-18 00:00:00",
                end: "2017-09-09 00:00:00",
            };

            try {
                await clockodo.getEntryGroups(parameters);
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "grouping"'));
            }
        });
    });
    describe("getProject()", () => {
        it("correctly builds getProject() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/projects/1985")
                .reply(200);

            await clockodo.getProject("1985");

            nockScope.done();
        });
    });
    describe("getService()", () => {
        it("correctly builds getService() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/services/10")
                .reply(200);

            await clockodo.getService("10");

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
    describe("getTasks()", () => {
        it("correctly builds getTasks() request", async () => {
            const parameters = {
                count: 6,
            };
            const nockScope = nock(CLOCKODO_API)
                .get("/tasks?" + stringify(parameters))
                .reply(200);

            await clockodo.getTasks(parameters);

            nockScope.done();
        });
    });
    describe("getTaskDuration()", () => {
        it("correctly builds getTaskDuration() request", async () => {
            const givenParameters = {
                taskCustomerId: "23",
                taskProjectId: "25",
                taskServiceId: "42",
                taskText: "clean the dishes",
                taskBillable: 1,
                excludeIds: ["217", "450"],
            };
            const expectedParameters = {
                "task[customers_id]": "23",
                "task[projects_id]": "25",
                "task[services_id]": "42",
                "task[text]": "clean the dishes",
                "task[billable]": 1,
            };
            const groupingParams = { excludeIds: ["217", "450"] };
            const nockScope = nock(CLOCKODO_API)
                .get(
                    "/tasks/duration?" +
                        stringify(expectedParameters) +
                        "&" +
                        qs.stringify(groupingParams, { arrayFormat: "brackets" })
                )
                .reply(200);

            await clockodo.getTaskDuration(givenParameters);

            nockScope.done();
        });
        it("throws an error when getTaskDuration() is missing param", async () => {
            expect.assertions(1);

            const parameters = {
                taskCustomerId: "23",
                taskProjectId: "25",
                taskServiceId: "42",
                taskText: "clean the dishes",
            };

            try {
                await clockodo.getTaskDuration(parameters);
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "taskBillable"'));
            }
        });
    });
    describe("getUser()", () => {
        it("correctly builds getUser() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/users/1263")
                .reply(200);

            await clockodo.getUser("1263");

            nockScope.done();
        });
    });
    describe("getUsers()", () => {
        it("correctly builds getUsers() request", async () => {
            const nockScope = nock(CLOCKODO_API)
                .get("/users")
                .reply(200);

            await clockodo.getUsers();

            nockScope.done();
        });
    });
    describe("getUserReport()", () => {
        it("correctly builds getUserReport() request", async () => {
            const params = { year: "2017" };
            const nockScope = nock(CLOCKODO_API)
                .get("/userreports/1263?" + stringify(params))
                .reply(200);

            await clockodo.getUserReport("1263", params);

            nockScope.done();
        });
        it("throws an error when getUserReport() is missing param", async () => {
            expect.assertions(1);

            try {
                await clockodo.getUserReport("200", {});
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "year"'));
            }
        });
    });
    describe("getUserReports()", () => {
        it("correctly builds getUserReports() request", async () => {
            const params = { year: "2017" };
            const nockScope = nock(CLOCKODO_API)
                .get("/userreports?" + stringify(params))
                .reply(200);

            await clockodo.getUserReports(params);

            nockScope.done();
        });
        it("throws an error when getUserReports() is missing param", async () => {
            expect.assertions(1);

            try {
                await clockodo.getUserReports({});
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "year"'));
            }
        });
    });

    describe("Clockodo Constructor", () => {
        /* eslint-disable no-unused-vars */
        it("throws an error when constructor is missing user email", () => {
            try {
                const clockodoMissingUser = new Clockodo({ user: undefined, apiKey: "dfdsg34t643" });
            } catch (error) {
                expect(error).toEqual(Error("Clockodo user expected to be a string, is typeof: undefined"));
            }
        });
        it("throws an error when constructor is missing API key", () => {
            try {
                const clockodoMissingUser = new Clockodo({ user: "test@gmail.com", apiKey: undefined });
            } catch (error) {
                expect(error).toEqual(Error("Clockodo apikey expected to be a string, is typeof: undefined"));
            }
        });
    });
});
