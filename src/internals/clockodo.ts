import snakecaseKeys from "snakecase-keys";
import { Api, Config } from "./utilities/api";
import * as REQUIRED from "./utilities/requiredParams";
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
} from "./returnTypes";
import { ClockingTimeEntryBillability, TimeEntryBillability } from "./enums";
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
} from "./interfaces";

type Params<
    RequiredParams extends Record<string, unknown> = Record<string, unknown>
> = RequiredParams & Record<string, unknown>;

export class Clockodo {
    api: Api;

    constructor(config: Config) {
        this.api = new Api(config);
    }

    use = (plugin: (clockodo: Clockodo) => void) => {
        plugin(this);
    };

    getAbsence = async (
        params: Params<{ id: Absence["id"] }>
    ): AbsenceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCE);

        const { id, ...rest } = params;

        return this.api.get("/absences/" + id, rest);
    };

    getAbsences = async (
        params: Params<{ year: number }>
    ): AbsencesReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCES);

        return this.api.get("/absences", params);
    };

    getClock = async (params?: Params): ClockReturnType => {
        return this.api.get("/v2/clock", params);
    };

    getCustomer = async (
        params: Params<{ id: Customer["id"] }>
    ): CustomerReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_CUSTOMER);

        const { id, ...rest } = params;

        return this.api.get("/customers/" + id, rest);
    };

    getCustomers = async (params?: Params): CustomersReturnType => {
        return this.api.get("/customers", params);
    };

    getEntry = async (params: Params<{ id: Entry["id"] }>): EntryReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY);

        const { id, ...rest } = params;

        return this.api.get("/v2/entries/" + id, rest);
    };

    getEntries = async (
        params: Params<{
            timeSince: string;
            timeUntil: string;
        }>
    ): EntriesReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

        return this.api.get("/v2/entries", params);
    };

    getEntryGroups = async (
        params: Params<{
            timeSince: string;
            timeUntil: string;
            grouping: Array<string>;
        }>
    ): EntryGroupsReturnType => {
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
    };

    getProject = async (
        params: Params<{ id: Project["id"] }>
    ): ProjectReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_PROJECT);

        const { id, ...rest } = params;

        return this.api.get("/projects/" + id, rest);
    };

    getSearchTexts = async (params?: Params): SearchTextsReturnType => {
        return this.api.get("/clock/searchtexts", params);
    };

    getService = async (
        params: Params<{ id: Service["id"] }>
    ): ServiceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_SERVICE);

        const { id, ...rest } = params;

        return this.api.get("/services/" + id, rest);
    };

    getServices = async (params?: Params): ServicesReturnType => {
        return this.api.get("/services", params);
    };

    // This endpoint still uses the old lumpSum casing
    getLumpSumService = async (
        params: Params<{ id: LumpsumService["id"] }>
    ): LumpsumServiceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_LUMPSUM_SERVICE);

        const { id, ...rest } = params;

        return this.api.get("/lumpsumservices/" + id, rest);
    };

    // This endpoint still uses the old lumpSum casing
    getLumpSumServices = async (params?: Params): LumpsumServicesReturnType => {
        return this.api.get("/lumpsumservices", params);
    };

    getTargethoursRow = async (
        params: Params<{ id: TargethoursRow["id"] }>
    ): TargethoursRowReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_TARGETHOURS_ROW);

        const { id, ...rest } = params;

        return this.api.get("/targethours/" + id, rest);
    };

    getTargethours = async (params?: Params): TargethoursReturnType => {
        return this.api.get("/targethours", params);
    };

    /** @deprecated */
    getTaskDuration = async (
        params: Params<{
            taskCustomersId: number;
            taskProjectsId: number;
            taskServicesId: number;
            taskText: string;
            taskBillable: TimeEntryBillability;
        }>
    ): TaskDurationReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_TASK_DURATION);

        return this.api.get("/tasks/duration", params);
    };

    /** @deprecated */
    getTasks = async (params?: Params): TasksReturnType => {
        return this.api.get("/tasks", params);
    };

    getUser = async (params: Params<{ id: User["id"] }>): UserReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_USER);

        const { id, ...rest } = params;

        return this.api.get("/users/" + id, rest);
    };

    getUsers = async (params?: Params): UsersReturnType => {
        return this.api.get("/users", params);
    };

    getUserReport = async (
        params: Params<{ usersId: User["id"]; year: number }>
    ): UserReportReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORT);

        const { usersId, ...rest } = params;

        return this.api.get("/userreports/" + usersId, rest);
    };

    getUserReports = async (
        params: Params<{ year: number }>
    ): UserReportsReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORTS);

        return this.api.get("/userreports", params);
    };

    addAbsence = async (
        params: Params<Pick<Absence, typeof REQUIRED.ADD_ABSENCE[number]>>
    ): AbsenceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.ADD_ABSENCE);

        return this.api.post("/absences", params);
    };

    addCustomer = async (
        params: Params<Pick<Customer, typeof REQUIRED.ADD_CUSTOMER[number]>>
    ): CustomerReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.ADD_CUSTOMER);

        return this.api.post("/customers", params);
    };

    addEntry = async (
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
    ): AddEntryReturnType => {
        if ("lumpsumServicesId" in params) {
            REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY);
        } else if ("lumpsum" in params) {
            REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_VALUE_ENTRY);
        } else {
            REQUIRED.checkRequired(params, REQUIRED.ADD_TIME_ENTRY);
        }

        return this.api.post("/v2/entries", params);
    };

    addProject = async (
        params: Params<Pick<Project, typeof REQUIRED.ADD_PROJECT[number]>>
    ): ProjectReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.ADD_PROJECT);

        return this.api.post("/projects", params);
    };

    addService = async (
        params: Params<Pick<Service, typeof REQUIRED.ADD_SERVICE[number]>>
    ): ServiceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.ADD_SERVICE);

        return this.api.post("/services", params);
    };

    addUser = async (
        params: Params<Pick<User, typeof REQUIRED.ADD_USER[number]>>
    ): AddUserReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.ADD_USER);

        return this.api.post("/users", params);
    };

    startClock = async (
        params: Params<
            Pick<TimeEntry, typeof REQUIRED.START_CLOCK[number]> & {
                billable: ClockingTimeEntryBillability;
            }
        >
    ): ClockStartReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.START_CLOCK);

        return this.api.post("/v2/clock", params);
    };

    changeClockDuration = async (
        params: Params<{
            entriesId: Entry["id"];
            durationBefore: number;
            duration: number;
        }>
    ): ClockEditReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.CHANGE_CLOCK_DURATION);

        const { entriesId, ...rest } = params;

        return this.api.put("/v2/clock/" + entriesId, rest);
    };

    editAbsence = async (
        params: Params<Pick<Absence, typeof REQUIRED.EDIT_ABSENCE[number]>>
    ): AbsenceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_ABSENCE);

        const { id } = params;

        return this.api.put("/absences/" + id, params);
    };

    editCustomer = async (
        params: Params<Pick<Customer, typeof REQUIRED.EDIT_CUSTOMER[number]>>
    ) => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_CUSTOMER);

        const { id } = params;

        return this.api.put("/customers/" + id, params);
    };

    editEntry = async (
        params: Params<Pick<Entry, typeof REQUIRED.EDIT_ENTRY[number]>>
    ): EditEntryReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY);

        const { id } = params;

        return this.api.put("/v2/entries/" + id, params);
    };

    editEntryGroup = async (
        params: Params<{ timeSince: string; timeUntil: string }>
    ): EditEntryGroupsReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY_GROUP);

        return this.api.put("/entrygroups", params);
    };

    editProject = async (
        params: Params<Pick<Project, typeof REQUIRED.EDIT_PROJECT[number]>>
    ): ProjectReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_PROJECT);

        const { id } = params;

        return this.api.put("/projects/" + id, params);
    };

    editService = async (
        params: Params<Pick<Service, typeof REQUIRED.EDIT_SERVICE[number]>>
    ): ServiceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_SERVICE);

        const { id } = params;

        return this.api.put("/services/" + id, params);
    };

    editUser = async (
        params: Params<Pick<User, typeof REQUIRED.EDIT_USER[number]>>
    ): UserReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.EDIT_USER);

        const { id } = params;

        return this.api.put("/users/" + id, params);
    };

    deactivateCustomer = async (
        params: Params<
            Pick<Customer, typeof REQUIRED.DEACTIVATE_CUSTOMER[number]>
        >
    ): CustomerReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_CUSTOMER);

        const { id } = params;

        return this.api.delete("/customers/" + id, params);
    };

    deactivateProject = async (
        params: Params<
            Pick<Project, typeof REQUIRED.DEACTIVATE_PROJECT[number]>
        >
    ): ProjectReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_PROJECT);

        const { id } = params;

        return this.api.delete("/projects/" + id, params);
    };

    deactivateService = async (
        params: Params<
            Pick<Service, typeof REQUIRED.DEACTIVATE_SERVICE[number]>
        >
    ): ServiceReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_SERVICE);

        const { id } = params;

        return this.api.delete("/services/" + id, params);
    };

    deactivateUser = async (
        params: Params<Pick<User, typeof REQUIRED.DEACTIVATE_USER[number]>>
    ): UserReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_USER);

        const { id } = params;

        return this.api.delete("/users/" + id, params);
    };

    deleteAbsence = async (
        params: Params<Pick<Absence, typeof REQUIRED.DELETE_ABSENCE[number]>>
    ): DeleteReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DELETE_ABSENCE);

        const { id } = params;

        return this.api.delete("/absences/" + id, params);
    };

    deleteEntry = async (
        params: Params<Pick<Entry, typeof REQUIRED.DELETE_ENTRY[number]>>
    ): DeleteReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY);

        const { id } = params;

        return this.api.delete("/v2/entries/" + id, params);
    };

    deleteEntryGroup = async (
        params: Params<{ timeSince: string; timeUntil: string }>
    ): DeleteEntryGroupsReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY_GROUP);

        return this.api.delete("/entrygroups", params);
    };

    stopClock = async (
        params: Params<{ entriesId: Entry["id"] }>
    ): ClockStopReturnType => {
        REQUIRED.checkRequired(params, REQUIRED.STOP_CLOCK);

        const { entriesId, ...rest } = params;

        return this.api.delete("/v2/clock/" + entriesId, rest);
    };
}
