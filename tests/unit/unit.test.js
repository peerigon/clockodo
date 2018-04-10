"use strict";

const { stringify } = require("querystring");
const qs = require("qs");
const nock = require("nock");
const Clockodo = require("../../lib/api");

describe("Api.js", () => {
    const userClockodo = new Clockodo("test", "test");

    describe("HTTP Request For All API Methods", () => {
        function getNock(path) {
            return nock("https://my.clockodo.com/api")
                .get(path)
                .reply(200);
        }

        it("correctly builds getAbsence() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/absences/007");

            await userClockodo.getAbsence("007");

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getAbsences() request", async () => {
            expect.assertions(1);

            const parameters = {
                year: 2018,
            };
            const nockObj = getNock("/absences?" + stringify(parameters));

            await userClockodo.getAbsences(parameters);

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getClockRunning() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/clock");

            await userClockodo.getClockRunning();

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getClockStatus() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/clock/update");

            await userClockodo.getClockStatus();

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getCustomer() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/customers/777");

            await userClockodo.getCustomer("777");

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getCustomers() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/customers");

            await userClockodo.getCustomers();

            expect(nockObj.isDone()).toBe(true);
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
            const nockObj = getNock("/entries?" + stringify(expectedParameters));

            await userClockodo.getEntries(givenParameters);

            expect(nockObj.isDone()).toBe(true);
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
            const nockObj = getNock(
                "/entrygroups?" +
                    stringify(expectedParameters) +
                    "&" +
                    qs.stringify(groupingParams, { arrayFormat: "brackets" })
            );

            await userClockodo.getEntryGroups(givenParameters);

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getProject() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/projects/1985");

            await userClockodo.getProject("1985");

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getService() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/services/10");

            await userClockodo.getService("10");

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getServices() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/services");

            await userClockodo.getServices();

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getTasks() request", async () => {
            expect.assertions(1);

            const parameters = {
                count: 6,
            };
            const nockObj = getNock("/tasks?" + stringify(parameters));

            await userClockodo.getTasks(parameters);

            expect(nockObj.isDone()).toBe(true);
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
            const nockObj = getNock(
                "/tasks/duration?" +
                    stringify(expectedParameters) +
                    "&" +
                    qs.stringify(groupingParams, { arrayFormat: "brackets" })
            );

            await userClockodo.getTaskDuration(givenParameters);

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getUser() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/users/1263");

            await userClockodo.getUser("1263");

            expect(nockObj.isDone()).toBe(true);
        });

        it("correctly builds getUsers() request", async () => {
            expect.assertions(1);

            const nockObj = getNock("/users");

            await userClockodo.getUsers();

            expect(nockObj.isDone()).toBe(true);
        });
    });
});
