"use strict";

const { stringify } = require("querystring");
const qs = require("qs");
const nock = require("nock");
const Clockodo = require("../../lib/api");

describe("Clockodo (instance)", () => {
    const userClockodo = new Clockodo("test", "test");

    describe("HTTP Request For All API Methods", () => {
        function getNock(path) {
            return nock("https://my.clockodo.com/api")
                .get(path)
                .reply(200);
        }

        it("correctly builds getAbsence() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/absences/007");

            await userClockodo.getAbsence("007");

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getAbsences() request", async () => {
            expect.assertions(1);

            const parameters = {
                year: 2018,
            };
            const nockScope = getNock("/absences?" + stringify(parameters));

            await userClockodo.getAbsences(parameters);

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getClock() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/clock");

            await userClockodo.getClock();

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getClockUpdate() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/clock/update");

            await userClockodo.getClockUpdate();

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getCustomer() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/customers/777");

            await userClockodo.getCustomer("777");

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getCustomers() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/customers");

            await userClockodo.getCustomers();

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getEntries() request", async () => {
            expect.assertions(1);

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
            const nockScope = getNock("/entries?" + stringify(expectedParameters));

            await userClockodo.getEntries(givenParameters);

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getEntryGroups() request", async () => {
            expect.assertions(1);

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
            const nockScope = getNock(
                "/entrygroups?" +
                    stringify(expectedParameters) +
                    "&" +
                    qs.stringify(groupingParams, { arrayFormat: "brackets" })
            );

            await userClockodo.getEntryGroups(givenParameters);

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getProject() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/projects/1985");

            await userClockodo.getProject("1985");

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getService() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/services/10");

            await userClockodo.getService("10");

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getServices() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/services");

            await userClockodo.getServices();

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getTasks() request", async () => {
            expect.assertions(1);

            const parameters = {
                count: 6,
            };
            const nockScope = getNock("/tasks?" + stringify(parameters));

            await userClockodo.getTasks(parameters);

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getTaskDuration() request", async () => {
            expect.assertions(1);

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
            const nockScope = getNock(
                "/tasks/duration?" +
                    stringify(expectedParameters) +
                    "&" +
                    qs.stringify(groupingParams, { arrayFormat: "brackets" })
            );

            await userClockodo.getTaskDuration(givenParameters);

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getUser() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/users/1263");

            await userClockodo.getUser("1263");

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getUsers() request", async () => {
            expect.assertions(1);

            const nockScope = getNock("/users");

            await userClockodo.getUsers();

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getUserReport() request", async () => {
            expect.assertions(1);

            const params = { year: "2017" };
            const nockScope = getNock("/userreports/1263?" + stringify(params));

            await userClockodo.getUserReport("1263", params);

            expect(nockScope.isDone()).toBe(true);
        });

        it("correctly builds getUserReports() request", async () => {
            expect.assertions(1);

            const params = { year: "2017" };
            const nockScope = getNock("/userreports?" + stringify(params));

            await userClockodo.getUserReports(params);

            expect(nockScope.isDone()).toBe(true);
        });
    });

    describe("Required Parameters For API Methods", () => {
        it("throws an error when getAbsences() is missing param", async () => {
            expect.assertions(1);

            try {
                await userClockodo.getAbsences({});
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "year"'));
            }
        });
        it("throws an error when getEntries() is missing param", async () => {
            expect.assertions(1);

            const parameters = {
                begin: "2017-08-18 00:00:00",
                filterBillable: 2,
                filterUserId: 38557,
            };

            try {
                await userClockodo.getEntries(parameters);
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "end"'));
            }
        });
        it("throws an error when getEntryGroups() is missing param", async () => {
            expect.assertions(1);

            const parameters = {
                begin: "2017-08-18 00:00:00",
                end: "2017-09-09 00:00:00",
            };

            try {
                await userClockodo.getEntryGroups(parameters);
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "grouping"'));
            }
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
                await userClockodo.getTaskDuration(parameters);
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "taskBillable"'));
            }
        });
        it("throws an error when getUserReport() is missing param", async () => {
            expect.assertions(1);

            try {
                await userClockodo.getUserReport("200", {});
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "year"'));
            }
        });
        it("throws an error when getUserReports() is missing param", async () => {
            expect.assertions(1);

            try {
                await userClockodo.getUserReports({});
            } catch (e) {
                expect(e).toEqual(Error('Missing required parameter "year"'));
            }
        });
    });

    describe("Clockodo Constructor", () => {
        /* eslint-disable no-unused-vars */
        it("throws an error when constructor is missing user email", () => {
            try {
                const clockodoMissingUser = new Clockodo(undefined, "dfdsg34t643");
            } catch (error) {
                expect(error).toEqual(Error("No Clockodo 'user' set"));
            }
        });
        it("throws an error when constructor is missing API key", () => {
            try {
                const clockodoMissingUser = new Clockodo("test@gmail.com", undefined);
            } catch (error) {
                expect(error).toEqual(Error("No Clockodo 'apiKey' set"));
            }
        });
    });
});
