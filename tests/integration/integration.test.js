"use strict";

require("dotenv").config();

const {Clockodo, ENTRY_BILLABLE} = require("../../dist/internals/api");

const TIME_SINCE = "2018-10-01 00:00:00";
const TIME_UNTIL = "2018-12-30 00:00:00";
// These tests depend on our real Clockodo account.
// They can only be executed by Peerigon members or Travis CI.
const hasCredentials = Boolean(process.env.CLOCKODO_USER && process.env.CLOCKODO_API_KEY);

(hasCredentials ? describe : describe.skip)("Clockodo", () => {
    const clockodo = new Clockodo({user: process.env.CLOCKODO_USER, apiKey: process.env.CLOCKODO_API_KEY});

    describe("getUsers()", () => {
        it("returns expected data format", async () => {
            const expectedKeys = ["id", "name", "number", "email", "role", "active", "editLock", "editLockDyn"];

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
                    filterBillable: ENTRY_BILLABLE,
                };

                expect.assertions(3);

                const data = await clockodo.getEntries({timeSince: TIME_SINCE, timeUntil: TIME_UNTIL}, parameters);

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
                expect.assertions(3);

                const data = await clockodo.getEntryGroups({
                    timeSince: TIME_SINCE,
                    timeUntil: TIME_UNTIL,
                    grouping: ["customers_id"],
                });

                expect(data.groups[0]).toHaveProperty("group");
                expect(data.groups[0]).toHaveProperty("groupedBy");
                expect(data.groups[0]).toHaveProperty("name");
            },
            10000
        );
        it(
            "returns expected data format with multiple groups passed",
            async () => {
                expect.assertions(3);

                const data = await clockodo.getEntryGroups({
                    timeSince: TIME_SINCE,
                    timeUntil: TIME_UNTIL,
                    grouping: ["projects_id", "services_id"],
                });

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

    describe("can create and retrieve lump sums", () => {
        it(
            "adds, retrieves and deletes lump sum entries",
            async () => {
                const lumpSum = {
                    customerId: 619336,
                    lumpSumId: 4966,
                    billable: 1,
                    lumpSumAmount: 6.8,
                    timeSince: "2019-12-16 14:59:00",
                    text: "desc",
                };

                expect.assertions(2);
                const data = await clockodo.addLumpSumEntryByUserId({
                    ...lumpSum,
                });

                expect(data.entry).toMatchObject({
                    customersId: 619336,
                    lumpSumsId: 4966,
                    billable: 1,
                    lumpSumsAmount: 6.8,
                    timeSince: "2019-12-16 14:59:00",
                    text: "desc",
                });

                const result = await clockodo.getLumpSumEntriesByUserId({
                    lumpSumEntryId: 4966,
                    timeSince: "2019-12-16 00:01:00",
                    timeUntil: "2019-12-16 23:59:00",
                    userId: 62488,
                });

                expect(result.entries[0]).toMatchObject({
                    customersId: 619336,
                    lumpSumsId: 4966,
                    billable: 1,
                    lumpSumsAmount: 6.8,
                    timeSince: "2019-12-16 14:59:00",
                    text: "desc",
                });

                await clockodo.deleteEntry({
                    entryId: data.entry.id,
                });
            },
            10000
        );
    });
});
