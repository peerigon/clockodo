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
            const data = await clockodo.getEntries({
                timeSince: TIME_SINCE,
                timeUntil: TIME_UNTIL,
                filterBillable: Billability.Billable,
            });

            expect(data.entries[0]).toHaveProperty("id");
            expect(data.entries[0]).toHaveProperty("type");
            expect(data.entries[0]).toHaveProperty("timeSince");
        });
    });

    describe("addEntry(), getEntry(), editEntry(), and deleteEntry()", () => {
        it("returns expected data format and throws no error", async () => {
            const addTimeEntryResponse = await clockodo.addEntry({
                customersId: 619336,
                servicesId: 288646,
                billable: Billability.Billable,
                timeSince: "2020-06-02T00:00:00Z",
                timeUntil: "2020-06-02T00:00:01Z",
                text: "Time entry",
            });

            expect(addTimeEntryResponse).toMatchObject({
                entry: {
                    customersId: 619336,
                    servicesId: 288646,
                    billable: Billability.Billable,
                    timeSince: "2020-06-02T00:00:00Z",
                    timeUntil: "2020-06-02T00:00:01Z",
                    text: "Time entry",
                },
            });

            const addLumpsumValueEntryResponse = await clockodo.addEntry({
                customersId: 619336,
                servicesId: 288646,
                billable: Billability.Billed,
                timeSince: "2020-06-02T00:00:00Z",
                lumpsum: 123,
                text: "Lumpsum value entry",
            });

            expect(addLumpsumValueEntryResponse).toMatchObject({
                entry: {
                    customersId: 619336,
                    servicesId: 288646,
                    billable: Billability.Billed,
                    timeSince: "2020-06-02T00:00:00Z",
                    lumpsum: 123,
                    text: "Lumpsum value entry",
                },
            });

            const addLumpsumServiceEntryResponse = await clockodo.addEntry({
                customersId: 619336,
                billable: Billability.Billed,
                timeSince: "2020-06-02T00:00:00Z",
                lumpsumServicesId: 4966,
                lumpsumServicesAmount: 100,
                text: "Lumpsum service entry",
            });

            expect(addLumpsumServiceEntryResponse).toMatchObject({
                entry: {
                    customersId: 619336,
                    billable: Billability.Billed,
                    timeSince: "2020-06-02T00:00:00Z",
                    lumpsumServicesId: 4966,
                    lumpsumServicesAmount: 100,
                    text: "Lumpsum service entry",
                },
            });

            const getEntryResponse = await clockodo.getEntry({
                id: addTimeEntryResponse.entry.id,
            });

            expect(getEntryResponse).toMatchObject(addTimeEntryResponse);

            const editEntryResponse = await clockodo.editEntry({
                id: addTimeEntryResponse.entry.id,
                billable: Billability.Billed,
            });

            expect(editEntryResponse).toMatchObject({
                entry: {
                    ...entryShape,
                    billable: Billability.Billed,
                },
            });

            const deleteEntryResponse = await Promise.all([
                clockodo.deleteEntry(addTimeEntryResponse.entry),
                clockodo.deleteEntry(addLumpsumValueEntryResponse.entry),
                clockodo.deleteEntry(addLumpsumServiceEntryResponse.entry),
            ]);

            expect(deleteEntryResponse).toMatchObject([
                {
                    success: true,
                },
                {
                    success: true,
                },
                {
                    success: true,
                },
            ]);
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

    describe("getLumpSumServices() and getLumpSumService()", () => {
        const expectedKeys = [
            "id",
            "name",
            "price",
            "unit",
            "active",
            "number",
            "note",
        ];

        it("returns expected data format", async () => {
            const { lumpSumServices } = await clockodo.getLumpSumServices();
            const [lumpSumService] = lumpSumServices;

            expect(Object.keys(lumpSumService).sort()).toMatchObject(
                expectedKeys.concat([]).sort()
            );

            const getLumpSumServiceResponse = await clockodo.getLumpSumService({
                id: lumpSumService.id,
            });

            expect(
                Object.keys(getLumpSumServiceResponse.lumpSumService).sort()
            ).toMatchObject(expectedKeys.concat([]).sort());
        });
    });
});
