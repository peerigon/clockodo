"use strict";

require("dotenv").config();

const { Clockodo } = require("../../dist/api");

// These tests depend on our real Clockodo account.
// They can only be executed by Peerigon members or Travis CI.
const hasCredentials = Boolean(process.env.CLOCKODO_USER && process.env.CLOCKODO_API_KEY);

(hasCredentials ? describe : describe.skip)("Clockodo", () => {
    const clockodo = new Clockodo({ user: process.env.CLOCKODO_USER, apiKey: process.env.CLOCKODO_API_KEY });

    console.log(process.env);
    describe("getUsers()", () => {
        it("returns expected data format", async () => {
            const expectedKeys = ["id", "name", "number", "email", "role", "active", "editLock"];

            expect.assertions(1);

            const data = await clockodo.getUsers();

            expect(Object.keys(data.users[0]).sort()).toEqual(expectedKeys.sort());
        });
    });

    describe("getEntries()", () => {
        it(
            "returns expected data format",
            async () => {
                const parameters = {
                    filterBillable: 2,
                    filterUserId: 38557,
                };

                expect.assertions(5);

                const data = await clockodo.getEntries(
                    { timeSince: "2017-08-18 00:00:00", timeUntil: "2018-02-09 00:00:00" },
                    parameters
                );

                expect(data).toHaveProperty("entries");
                expect(data.entries.length).toBeGreaterThan(0);

                expect(data.entries[0]).toHaveProperty("id");
                expect(data.entries[0]).toHaveProperty("duration");
                expect(data.entries[0]).toHaveProperty("budget");
            },
            10000
        );
    });

    describe("getEntryGroups()", () => {
        it(
            "returns expected data format with one group passed",
            async () => {
                expect.assertions(5);

                const data = await clockodo.getEntryGroups({
                    timeSince: "2017-08-18 00:00:00",
                    timeUntil: "2017-09-09 00:00:00",
                    grouping: ["customers_id"],
                });

                expect(data).toHaveProperty("groups");
                expect(data.groups.length).toBeGreaterThan(0);

                expect(data.groups[0]).toHaveProperty("group");
                expect(data.groups[0]).toHaveProperty("groupedBy");
                expect(data.groups[0]).toHaveProperty("name");
            },
            10000
        );
        it(
            "returns expected data format with multiple groups passed",
            async () => {
                expect.assertions(5);

                const data = await clockodo.getEntryGroups({
                    timeSince: "2017-08-18 00:00:00",
                    timeUntil: "2017-09-09 00:00:00",
                    grouping: ["projects_id", "services_id"],
                });

                expect(data).toHaveProperty("groups");
                expect(data.groups.length).toBeGreaterThan(0);

                expect(data.groups[0]).toHaveProperty("group");
                expect(data.groups[0]).toHaveProperty("groupedBy");
                expect(data.groups[0]).toHaveProperty("name");
            },
            10000
        );
    });

    describe("getClock()", () => {
        it(
            "returns expected data format",
            async () => {
                expect.assertions(1);

                const data = await clockodo.getClock();

                expect(data).toHaveProperty("running");
            },
            10000
        );
    });
});
