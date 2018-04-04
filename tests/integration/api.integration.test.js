"use strict";

require("dotenv").config();

const Clockodo = require("../../lib/api");

let clockodo;

beforeEach(() => {
    clockodo = new Clockodo(process.env.CLOCKODO_USER, process.env.CLOCKODO_API_KEY);
});

describe("getUsers()", () => {
    it("returns expected data format", () => {
        const mockResponse = {
            users: [
                {
                    id: 2323,
                    name: "Harry Potter",
                    number: "7",
                    email: "boywholived@hogwarts.com",
                    role: "wizard",
                    active: true,
                    editLock: null,
                },
            ],
        };

        expect.assertions(1);

        return clockodo.getUsers().then(data => {
            expect(Object.keys(data.users[0]).sort()).toEqual(Object.keys(mockResponse.users[0]).sort());
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
                begin: "03-12-2016",
                end: "08-18-2017",
                filterBillable: 2,
                filterUserId: 38557,
            };

            expect.assertions(1);

            return clockodo.getEntries(parameters).then(data => {
                expect(Object.keys(data.entries[0]).sort()).toEqual(expectedKeys.sort());
            });
        },
        10000
    );
    it(
        "throws an error with missing required parameter",
        async () => {
            const parameters = {
                begin: "03-12-2016",
                filterBillable: 2,
                filterUserId: 38557,
            };
            const missingParamName = "end";
            const expectedError = new Error(`Missing Required Parameter "${ missingParamName }"`);

            expect.assertions(1);

            try {
                await clockodo.getEntries(parameters);
            } catch (e) {
                expect(e).toEqual(expectedError);
            }
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
                "restrictions",
                "revenue",
            ];
            const parameters = {
                begin: "03-12-2016",
                end: "08-18-2017",
                grouping: ["customers_id"],
            };

            expect.assertions(1);

            return clockodo.getEntryGroups(parameters).then(data => {
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
                "restrictions",
                "revenue",
                "subGroups",
            ];
            const parameters = {
                begin: "03-12-2016",
                end: "08-18-2017",
                grouping: ["customers_id", "projects_id"],
            };

            expect.assertions(1);

            return clockodo.getEntryGroups(parameters).then(data => {
                expect(Object.keys(data.groups[0]).sort()).toEqual(expectedKeys.sort());
            });
        },
        10000
    );
    it(
        "throws an error with missing required parameter",
        async () => {
            const parameters = {
                begin: "03-12-2016",
                end: "08-18-2017",
            };
            const missingParamName = "grouping";
            const expectedError = new Error(`Missing Required Parameter "${ missingParamName }"`);

            expect.assertions(1);

            try {
                await clockodo.getEntryGroups(parameters);
            } catch (e) {
                expect(e).toEqual(expectedError);
            }
        },
        10000
    );
});

describe("getClockRunning()", () => {
    it(
        "returns expected data format",
        () => {
            const expectedKeys = ["running"];

            expect.assertions(1);

            return clockodo.getClockRunning().then(data => {
                console.log(data);
                expect(Object.keys(data).sort()).toEqual(expectedKeys.sort());
            });
        },
        10000
    );
});
