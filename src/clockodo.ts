import snakecaseKeys from "snakecase-keys";
import { Api, Config } from "./utilities/api.js";
import * as REQUIRED from "./utilities/requiredParams.js";
import {
    AbsenceReturnType,
    AbsencesReturnType,
    DeleteReturnType,
    CustomerReturnType,
    CustomersReturnType,
    ProjectReturnType,
    ServiceReturnType,
    ServicesReturnType,
    UserReturnType,
    UsersReturnType,
    EntryReturnType,
    EntriesReturnType,
    TasksReturnType,
    TaskDurationReturnType,
    DeleteEntryGroupsReturnType,
    EditEntryGroupsReturnType,
    UserReportReturnType,
    UserReportsReturnType,
    ClockReturnType,
    ClockEditReturnType,
    ClockStopReturnType,
    TargethoursReturnType,
    TargethoursRowReturnType,
    AddUserReturnType,
    EntryGroupsReturnType,
    ClockStartReturnType,
    AddEntryReturnType,
    EditEntryReturnType,
    LumpsumServicesReturnType,
    SearchTextsReturnType,
    LumpsumServiceReturnType,
} from "./returnTypes.js";
import { ClockingTimeEntryBillability, TimeEntryBillability } from "./enums.js";
import {
    Absence,
    Customer,
    Entry,
    LumpsumService,
    LumpsumServiceEntry,
    LumpsumValueEntry,
    Project,
    Service,
    TargethoursRow,
    TimeEntry,
    User,
} from "./interfaces.js";

type Params<
    RequiredParams extends Record<string, unknown> = Record<string, unknown>
> = RequiredParams & Record<string, unknown>;

export class Clockodo {
    api: Api;

    constructor(config: Config) {
        this.api = new Api(config);
    }

    use(plugin: (clockodo: Clockodo) => void) {
        plugin(this);
    }

    async getAbsence(
        params: Params<{ id: Absence["id"] }>
    ): Promise<AbsenceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCE);

        const { id, ...rest } = params;

        return this.api.get("/absences/" + id, rest);
    }

    async getAbsences(
        params: Params<{ year: number }>
    ): Promise<AbsencesReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCES);

        return this.api.get("/absences", params);
    }

    async getClock(params?: Params): Promise<ClockReturnType> {
        return this.api.get("/v2/clock", params);
    }

    async getCustomer(
        params: Params<{ id: Customer["id"] }>
    ): Promise<CustomerReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_CUSTOMER);

        const { id, ...rest } = params;

        return this.api.get("/customers/" + id, rest);
    }

    async getCustomers(params?: Params): Promise<CustomersReturnType> {
        return this.api.get("/customers", params);
    }

    async getEntry(
        params: Params<{ id: Entry["id"] }>
    ): Promise<EntryReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY);

        const { id, ...rest } = params;

        return this.api.get("/v2/entries/" + id, rest);
    }

    async getEntries(
        params: Params<{
            timeSince: string;
            timeUntil: string;
        }>
    ): Promise<EntriesReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

        return this.api.get("/v2/entries", params);
    }

    async getEntryGroups(
        params: Params<{
            timeSince: string;
            timeUntil: string;
            grouping: Array<string>;
        }>
    ): Promise<EntryGroupsReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY_GROUPS);

        // Could be replaced with Object.fromEntries() once it's supported everywhere
        const camelCaseGrouping: Record<string, boolean> = {};

        params.grouping.forEach((key) => {
            camelCaseGrouping[key] = true;
        });

        return this.api.get("/v2/entrygroups", {
            ...params,
            grouping: Object.keys(snakecaseKeys(camelCaseGrouping)),
        });
    }

    async getProject(
        params: Params<{ id: Project["id"] }>
    ): Promise<ProjectReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_PROJECT);

        const { id, ...rest } = params;

        return this.api.get("/projects/" + id, rest);
    }

    async getSearchTexts(params?: Params): Promise<SearchTextsReturnType> {
        return this.api.get("/clock/searchtexts", params);
    }

    async getService(
        params: Params<{ id: Service["id"] }>
    ): Promise<ServiceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_SERVICE);

        const { id, ...rest } = params;

        return this.api.get("/services/" + id, rest);
    }

    async getServices(params?: Params): Promise<ServicesReturnType> {
        return this.api.get("/services", params);
    }

    // This endpoint still uses the old lumpSum casing
    async getLumpSumService(
        params: Params<{ id: LumpsumService["id"] }>
    ): Promise<LumpsumServiceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_LUMPSUM_SERVICE);

        const { id, ...rest } = params;

        return this.api.get("/lumpsumservices/" + id, rest);
    }

    // This endpoint still uses the old lumpSum casing
    async getLumpSumServices(
        params?: Params
    ): Promise<LumpsumServicesReturnType> {
        return this.api.get("/lumpsumservices", params);
    }

    async getTargethoursRow(
        params: Params<{ id: TargethoursRow["id"] }>
    ): Promise<TargethoursRowReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_TARGETHOURS_ROW);

        const { id, ...rest } = params;

        return this.api.get("/targethours/" + id, rest);
    }

    async getTargethours(params?: Params): Promise<TargethoursReturnType> {
        return this.api.get("/targethours", params);
    }

    /** @deprecated */
    async getTaskDuration(
        params: Params<{
            taskCustomersId: number;
            taskProjectsId: number;
            taskServicesId: number;
            taskText: string;
            taskBillable: TimeEntryBillability;
        }>
    ): Promise<TaskDurationReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_TASK_DURATION);

        return this.api.get("/tasks/duration", params);
    }

    /** @deprecated */
    async getTasks(params?: Params): Promise<TasksReturnType> {
        return this.api.get("/tasks", params);
    }

    async getUser(params: Params<{ id: User["id"] }>): Promise<UserReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_USER);

        const { id, ...rest } = params;

        return this.api.get("/users/" + id, rest);
    }

    async getUsers(params?: Params): Promise<UsersReturnType> {
        return this.api.get("/users", params);
    }

    async getUserReport(
        params: Params<{ usersId: User["id"]; year: number }>
    ): Promise<UserReportReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORT);

        const { usersId, ...rest } = params;

        return this.api.get("/userreports/" + usersId, rest);
    }

    async getUserReports(
        params: Params<{ year: number }>
    ): Promise<UserReportsReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORTS);

        return this.api.get("/userreports", params);
    }

    async addAbsence(
        params: Params<Pick<Absence, typeof REQUIRED.ADD_ABSENCE[number]>>
    ): Promise<AbsenceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.ADD_ABSENCE);

        return this.api.post("/absences", params);
    }

    async addCustomer(
        params: Params<Pick<Customer, typeof REQUIRED.ADD_CUSTOMER[number]>>
    ): Promise<CustomerReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.ADD_CUSTOMER);

        return this.api.post("/customers", params);
    }

    async addEntry(
        params: Params<
            | Pick<TimeEntry, typeof REQUIRED.ADD_TIME_ENTRY[number]>
            | Pick<
                  LumpsumValueEntry,
                  typeof REQUIRED.ADD_LUMPSUM_VALUE_ENTRY[number]
              >
            | Pick<
                  LumpsumServiceEntry,
                  typeof REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY[number]
              >
        >
    ): Promise<AddEntryReturnType> {
        if ("lumpsumServicesId" in params) {
            REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY);
        } else if ("lumpsum" in params) {
            REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_VALUE_ENTRY);
        } else {
            REQUIRED.checkRequired(params, REQUIRED.ADD_TIME_ENTRY);
        }

        return this.api.post("/v2/entries", params);
    }

    async addProject(
        params: Params<Pick<Project, typeof REQUIRED.ADD_PROJECT[number]>>
    ): Promise<ProjectReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.ADD_PROJECT);

        return this.api.post("/projects", params);
    }

    async addService(
        params: Params<Pick<Service, typeof REQUIRED.ADD_SERVICE[number]>>
    ): Promise<ServiceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.ADD_SERVICE);

        return this.api.post("/services", params);
    }

    async addUser(
        params: Params<Pick<User, typeof REQUIRED.ADD_USER[number]>>
    ): Promise<AddUserReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.ADD_USER);

        return this.api.post("/users", params);
    }

    async startClock(
        params: Params<
            Pick<TimeEntry, typeof REQUIRED.START_CLOCK[number]> & {
                billable: ClockingTimeEntryBillability;
            }
        >
    ): Promise<ClockStartReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.START_CLOCK);

        return this.api.post("/v2/clock", params);
    }

    async changeClockDuration(
        params: Params<{
            entriesId: Entry["id"];
            durationBefore: number;
            duration: number;
        }>
    ): Promise<ClockEditReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.CHANGE_CLOCK_DURATION);

        const { entriesId, ...rest } = params;

        return this.api.put("/v2/clock/" + entriesId, rest);
    }

    async editAbsence(
        params: Params<Pick<Absence, typeof REQUIRED.EDIT_ABSENCE[number]>>
    ): Promise<AbsenceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_ABSENCE);

        const { id } = params;

        return this.api.put("/absences/" + id, params);
    }

    async editCustomer(
        params: Params<Pick<Customer, typeof REQUIRED.EDIT_CUSTOMER[number]>>
    ) {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_CUSTOMER);

        const { id } = params;

        return this.api.put("/customers/" + id, params);
    }

    async editEntry(
        params: Params<Pick<Entry, typeof REQUIRED.EDIT_ENTRY[number]>>
    ): Promise<EditEntryReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY);

        const { id } = params;

        return this.api.put("/v2/entries/" + id, params);
    }

    async editEntryGroup(
        params: Params<{ timeSince: string; timeUntil: string }>
    ): Promise<EditEntryGroupsReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY_GROUP);

        return this.api.put("/entrygroups", params);
    }

    async editProject(
        params: Params<Pick<Project, typeof REQUIRED.EDIT_PROJECT[number]>>
    ): Promise<ProjectReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_PROJECT);

        const { id } = params;

        return this.api.put("/projects/" + id, params);
    }

    async editService(
        params: Params<Pick<Service, typeof REQUIRED.EDIT_SERVICE[number]>>
    ): Promise<ServiceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_SERVICE);

        const { id } = params;

        return this.api.put("/services/" + id, params);
    }

    async editUser(
        params: Params<Pick<User, typeof REQUIRED.EDIT_USER[number]>>
    ): Promise<UserReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_USER);

        const { id } = params;

        return this.api.put("/users/" + id, params);
    }

    async deactivateCustomer(
        params: Params<
            Pick<Customer, typeof REQUIRED.DEACTIVATE_CUSTOMER[number]>
        >
    ): Promise<CustomerReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_CUSTOMER);

        const { id } = params;

        return this.api.delete("/customers/" + id, params);
    }

    async deactivateProject(
        params: Params<
            Pick<Project, typeof REQUIRED.DEACTIVATE_PROJECT[number]>
        >
    ): Promise<ProjectReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_PROJECT);

        const { id } = params;

        return this.api.delete("/projects/" + id, params);
    }

    async deactivateService(
        params: Params<
            Pick<Service, typeof REQUIRED.DEACTIVATE_SERVICE[number]>
        >
    ): Promise<ServiceReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_SERVICE);

        const { id } = params;

        return this.api.delete("/services/" + id, params);
    }

    async deactivateUser(
        params: Params<Pick<User, typeof REQUIRED.DEACTIVATE_USER[number]>>
    ): Promise<UserReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_USER);

        const { id } = params;

        return this.api.delete("/users/" + id, params);
    }

    async deleteAbsence(
        params: Params<Pick<Absence, typeof REQUIRED.DELETE_ABSENCE[number]>>
    ): Promise<DeleteReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DELETE_ABSENCE);

        const { id } = params;

        return this.api.delete("/absences/" + id, params);
    }

    async deleteEntry(
        params: Params<Pick<Entry, typeof REQUIRED.DELETE_ENTRY[number]>>
    ): Promise<DeleteReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY);

        const { id } = params;

        return this.api.delete("/v2/entries/" + id, params);
    }

    async deleteEntryGroup(
        params: Params<{ timeSince: string; timeUntil: string }>
    ): Promise<DeleteEntryGroupsReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY_GROUP);

        return this.api.delete("/entrygroups", params);
    }

    async stopClock(
        params: Params<{ entriesId: Entry["id"] }>
    ): Promise<ClockStopReturnType> {
        REQUIRED.checkRequired(params, REQUIRED.STOP_CLOCK);

        const { entriesId, ...rest } = params;

        return this.api.delete("/v2/clock/" + entriesId, rest);
    }
}
