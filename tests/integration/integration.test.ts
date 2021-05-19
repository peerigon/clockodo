import { Billability, Clockodo, Config } from "../../src/index";

const TIME_SINCE = "2018-10-01T00:00:00Z";
const TIME_UNTIL = "2018-12-30T00:00:00Z";
// These tests depend on our real Clockodo account.
// They should only be executed by our clockodo-dev user or Travis CI.
const hasCredentials =
    typeof process.env.CLOCKODO_USER === "string" &&
    typeof process.env.CLOCKODO_API_KEY === "string";
const config: Config = {
    client: {
        name: "Clockodo SDK Integration Test",
        email: "johannes.ewald@peerigon.com",
    },
};

(hasCredentials ? describe : describe.skip)("Clockodo", () => {
    const clockodo = new Clockodo(config);

    const entryShape = {
        id: expect.any(Number),
        usersId: expect.any(Number),
        timeSince: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
        ),
    };

    beforeAll(() => {
        jest.setTimeout(10000);

        clockodo.api.config({
            authentication: {
                user: process.env.CLOCKODO_USER!,
                apiKey: process.env.CLOCKODO_API_KEY!,
            },
        });
    });

    describe("getUsers()", () => {
        it("returns expected data format", async () => {
            const expectedKeys = [
                "active",
                "canAddCustomers",
                "canGenerallyManageAbsences",
                "canGenerallySeeAbsences",
                "editLock",
                "editLockDyn",
                "editLockSync",
                "email",
                "id",
                "language",
                "name",
                "number",
                "role",
                "timeformat12H",
                "timezone",
                "wageType",
                "weekendFriday",
                "weekstartMonday",
                "worktimeRegulationId",
            ];

            const data = await clockodo.getUsers();

            expect(Object.keys(data.users[0]).sort()).toMatchObject(
                expectedKeys
            );
        });
    });

    describe("getEntries()", () => {
        it("returns expected data format", async () => {
            const parameters = {
                filterBillable: Billability.Billable,
            };

            const data = await clockodo.getEntries(
                {
                    timeSince: TIME_SINCE,
                    timeUntil: TIME_UNTIL,
                },
                parameters
            );

            expect(data.entries[0]).toHaveProperty("id");
            expect(data.entries[0]).toHaveProperty("type");
            expect(data.entries[0]).toHaveProperty("timeSince");
        });
    });

    describe("addEntry(), getEntry(), editEntry(), and deleteEntry()", () => {
        it("returns expected data format and throws no error", async () => {
            const addEntryResponse = await clockodo.addEntry(
                {
                    customersId: 619336,
                    servicesId: 288646,
                    billable: 1,
                    timeSince: "2020-06-02T00:00:00Z",
                    timeUntil: "2020-06-02T00:00:01Z",
                },
                {
                    text: "Time entry",
                }
            );

            await clockodo.addEntry(
                {
                    customersId: 619336,
                    servicesId: 288646,
                    billable: 2,
                    timeSince: "2020-06-02T00:00:00Z",
                    lumpsum: 123,
                },
                {
                    text: "Lumpsum entry",
                }
            );

            expect(addEntryResponse).toMatchObject({
                entry: entryShape,
            });

            const getEntryResponse = await clockodo.getEntry({
                id: addEntryResponse.entry.id,
            });

            expect(getEntryResponse).toMatchObject(addEntryResponse);

            const editEntryResponse = await clockodo.editEntry(
                { entryId: addEntryResponse.entry.id },
                { billable: 2 }
            );

            expect(editEntryResponse).toMatchObject({
                entry: {
                    ...entryShape,
                    billable: 2,
                },
            });

            const deleteEntryResponse = await clockodo.deleteEntry({
                entryId: addEntryResponse.entry.id,
            });

            expect(deleteEntryResponse).toMatchObject({
                success: true,
            });
        });
    });

    describe("getEntryGroups()", () => {
        const expectedKeys = [
            "budgetUsed",
            "duration",
            "group",
            "groupedBy",
            "hasBudgetRevenuesBilled",
            "hasBudgetRevenuesNotBilled",
            "hasNonBudgetRevenuesBilled",
            "hasNonBudgetRevenuesNotBilled",
            "hourlyRate",
            "hourlyRateIsEqualAndHasNoLumpsums",
            "name",
            "note",
            "number",
            "restrictions",
            "revenue",
        ];

        it("returns expected data format with one group passed", async () => {
            const data = await clockodo.getEntryGroups({
                timeSince: TIME_SINCE,
                timeUntil: TIME_UNTIL,
                grouping: ["customers_id"],
            });

            expect(Object.keys(data.groups[0]).sort()).toMatchObject(
                expectedKeys.concat([]).sort()
            );
        });

        it("returns expected data format with multiple groups passed", async () => {
            const data = await clockodo.getEntryGroups({
                timeSince: TIME_SINCE,
                timeUntil: TIME_UNTIL,
                // Should both support camelCase and snake_case
                grouping: ["projectsId", "services_id"],
            });

            expect(Object.keys(data.groups[0]).sort()).toMatchObject(
                expectedKeys.concat(["subGroups"]).sort()
            );
        });
    });

    describe("getClock()", () => {
        it("returns expected data format", async () => {
            const data = await clockodo.getClock();

            expect(data).toHaveProperty("running");
        });
    });
});
