/* eslint-disable @typescript-eslint/require-array-sort-compare */
import {Clockodo, ENTRY_BILLABLE} from "../../src/internals/api";

const TIME_SINCE = "2018-10-01 00:00:00";
const TIME_UNTIL = "2018-12-30 00:00:00";
// These tests depend on our real Clockodo account.
// They should only be executed by our clockodo-dev user or Travis CI.
const hasCredentials = typeof process.env.CLOCKODO_USER === "string" && typeof process.env.CLOCKODO_API_KEY === "string";

(hasCredentials ? describe : describe.skip)("Clockodo", () => {
    const clockodo = new Clockodo({
        user: process.env.CLOCKODO_USER,
        apiKey: process.env.CLOCKODO_API_KEY,
    });

    const entryShape = {
        id: expect.any(Number),
        usersId: expect.any(Number),
        timeSince: expect.stringMatching(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d$/),
    };

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

                const data = await clockodo.getEntries({
                    timeSince: TIME_SINCE,
                    timeUntil: TIME_UNTIL,
                }, parameters);

                expect(data.entries[0]).toHaveProperty("id");
                expect(data.entries[0]).toHaveProperty("duration");
                expect(data.entries[0]).toHaveProperty("budget");
            },
            10000
        );
    });

    describe("addEntry(), getEntry(), editEntry(), and deleteEntry()", () => {
        it(
            "returns expected data format and throws no error",
            async () => {
                const addEntryResponse = await clockodo.addEntry(
                    {
                        customersId: 619336,
                        servicesId: 288646,
                        billable: 1,
                        timeSince: "2020-06-02 00:00:00",
                        timeUntil: "2020-06-02 00:00:01",
                    },
                    {
                        text: "Time entry",
                    },
                );

                await clockodo.addEntry(
                    {
                        customersId: 619336,
                        servicesId: 288646,
                        billable: 2,
                        timeSince: "2020-06-02 00:00:00",
                        lumpSum: 123,
                    },
                    {
                        text: "Lumpsum entry",
                    },
                );

                expect(addEntryResponse).toMatchObject({
                    entry: entryShape,
                });

                const getEntryResponse = await clockodo.getEntry({
                    id: addEntryResponse.entry.id,
                });

                expect(getEntryResponse).toMatchObject(addEntryResponse);

                const editEntryResponse = await clockodo.editEntry({entryId: addEntryResponse.entry.id}, {billable: 2});

                expect(editEntryResponse).toMatchObject({
                    entry: {
                        ...entryShape,
                        billable: 1,
                        billed: true,
                    },
                });

                const deleteEntryResponse = await clockodo.deleteEntry({entryId: addEntryResponse.entry.id});

                expect(deleteEntryResponse).toMatchObject({
                    success: true,
                });
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

    describe("addEntry() and getEntry()", () => {
        it(
            "adds and retrieves lump sum entries",
            async () => {
                const lumpSum = {
                    customersId: 619336,
                    lumpSumsId: 4966,
                    lumpSumsAmount: 6.8,
                    billable: 1,
                    billed: true,
                    timeSince: "2019-12-16 14:59:00",
                    text: "desc",
                };

                expect.assertions(2);
                const data = await clockodo.addEntry({
                    customersId: lumpSum.customersId,
                    lumpSumsId: lumpSum.lumpSumsId,
                    lumpSumsAmount: lumpSum.lumpSumsAmount,
                    billable: 2,
                    timeSince: lumpSum.timeSince,
                }, {
                    text: lumpSum.text,
                });

                expect(data.entry).toMatchObject(lumpSum);

                const result = await clockodo.getLumpSumEntriesByUserId({
                    lumpSumEntryId: 4966,
                    timeSince: "2019-12-16 00:01:00",
                    timeUntil: "2019-12-16 23:59:00",
                    usersId: 62488,
                });

                expect(result.entries[0]).toMatchObject(lumpSum);

                await clockodo.deleteEntry({
                    entryId: data.entry.id,
                });
            },
            10000
        );
    });
});
