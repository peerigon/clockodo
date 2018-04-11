"use strict";

require("dotenv").config();

const Clockodo = require("../../lib/api");
const { ClockodoLib } = require("../../lib/lib");

// These tests depend on our real Clockodo account.
// They can only be executed by Peerigon members or Travis CI.
const hasCredentials = Boolean(process.env.CLOCKODO_USER && process.env.CLOCKODO_API_KEY);

(hasCredentials ? describe : describe.skip)("Clockodo", () => {
    let userClockodo;

    beforeEach(() => {
        userClockodo = new Clockodo(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
    });

    describe("getUsers()", () => {
        it("returns expected data format", () => {
            const expectedKeys = ["id", "name", "number", "email", "role", "active", "editLock"];

            expect.assertions(1);

            return userClockodo.getUsers().then(data => {
                expect(Object.keys(data.users[0]).sort()).toEqual(expectedKeys.sort());
            });
        });
    });

    describe("getEntries()", () => {
        it(
            "returns expected data format",
            () => {
                const expectedKeys = [
                    "billable",
                    "billed",
                    "budget",
                    "budgetIsHours",
                    "budgetIsNotStrict",
                    "clocked",
                    "customersId",
                    "customersName",
                    "duration",
                    "durationTime",
                    "hourlyRate",
                    "id",
                    "isClocking",
                    "lumpSum",
                    "offset",
                    "offsetTime",
                    "projectsId",
                    "projectsName",
                    "revenue",
                    "servicesId",
                    "servicesName",
                    "text",
                    "textsId",
                    "timeInsert",
                    "timeLastChange",
                    "timeLastChangeWorkTime",
                    "timeSince",
                    "timeUntil",
                    "usersId",
                    "usersName",
                ];
                const parameters = {
                    begin: "2017-08-18 00:00:00",
                    end: "2018-02-09 00:00:00",
                    filterBillable: 2,
                    filterUserId: 38557,
                };

                expect.assertions(1);

                return userClockodo.getEntries(parameters).then(data => {
                    expect(Object.keys(data.entries[0]).sort()).toEqual(expectedKeys.sort());
                });
            },
            10000
        );
    });

    describe("getEntryGroups()", () => {
        it(
            "returns expected data format with one group passed",
            () => {
                const expectedKeys = [
                    "budgetUsed",
                    "duration",
                    "durationTime",
                    "group",
                    "groupedBy",
                    "hasBudgetRevenuesBilled",
                    "hasBudgetRevenuesNotBilled",
                    "hasNonBudgetRevenuesBilled",
                    "hasNonBudgetRevenuesNotBilled",
                    "hourlyRate",
                    "hourlyRateIsEqualAndHasNoLumpSums",
                    "name",
                    "note",
                    "restrictions",
                    "revenue",
                ];
                const parameters = {
                    begin: "2017-08-18 00:00:00",
                    end: "2017-09-09 00:00:00",
                    grouping: ["customers_id"],
                };

                expect.assertions(1);

                return userClockodo.getEntryGroups(parameters).then(data => {
                    expect(Object.keys(data.groups[0]).sort()).toEqual(expectedKeys.sort());
                });
            },
            10000
        );
        it(
            "returns expected data format with multiple groups passed",
            () => {
                const expectedKeys = [
                    "budgetUsed",
                    "duration",
                    "durationTime",
                    "group",
                    "groupedBy",
                    "hasBudgetRevenuesBilled",
                    "hasBudgetRevenuesNotBilled",
                    "hasNonBudgetRevenuesBilled",
                    "hasNonBudgetRevenuesNotBilled",
                    "hourlyRate",
                    "hourlyRateIsEqualAndHasNoLumpSums",
                    "name",
                    "note",
                    "restrictions",
                    "revenue",
                    "subGroups",
                ];
                const parameters = {
                    begin: "2017-08-18 00:00:00",
                    end: "2017-09-09 00:00:00",
                    grouping: ["customers_id", "projects_id"],
                };

                expect.assertions(1);

                return userClockodo.getEntryGroups(parameters).then(data => {
                    expect(Object.keys(data.groups[0]).sort()).toEqual(expectedKeys.sort());
                });
            },
            10000
        );
    });

    describe("getClock()", () => {
        it(
            "returns expected data format",
            () => {
                const expectedKeys = ["running"];

                expect.assertions(1);

                return userClockodo.getClock().then(data => {
                    expect(Object.keys(data).sort()).toEqual(expectedKeys.sort());
                });
            },
            10000
        );
    });
});

(hasCredentials ? describe : describe.skip)("Lib.js get()", () => {
    let libClockodo;

    beforeEach(() => {
        libClockodo = new ClockodoLib({ user: process.env.CLOCKODO_USER, apiKey: process.env.CLOCKODO_API_KEY });
    });

    it("rejects and throws an error if passed a bad resource", () => {
        const badResource = "thisdoesntexist";
        const params = {};
        const expectedError = "Request failed with status code 404";

        expect.assertions(1);

        return expect(libClockodo.get(badResource, params)).rejects.toThrow(expectedError);
    });

    it("resolves when given a valid resource (with no params passed)", () => {
        const goodResource = "users";

        expect.assertions(1);

        return expect(libClockodo.get(goodResource)).resolves.toHaveProperty("users");
    });

    it("returns with immediate access to data", () => {
        const getUser = "/users/" + process.env.CLOCKODO_TEST_ID;
        const expectedName = process.env.CLOCKODO_TEST_NAME;

        expect.assertions(1);

        return libClockodo.get(getUser).then(data => {
            expect(data.user.name).toBe(expectedName);
        });
    });
});
