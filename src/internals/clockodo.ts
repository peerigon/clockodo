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
    TargetHoursReturnType,
    TargetHourReturnType,
    AddUserReturnType,
    EntryGroupsReturnType,
    ClockStartReturnType,
    AddEntryReturnType,
    EditEntryReturnType,
    LumpSumServicesReturnType,
} from "./returnTypes";

// TODO: Change naming convention of exported constants and enums
export const ENTRY_UNBILLABLE = 0;
export const ENTRY_BILLABLE = 1;
export const ENTRY_BILLED = 2;
export const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
export const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
export const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
export const ABSENCE_TYPE_SICK_DAY = 4;
export const ABSENCE_TYPE_SICK_DAY_OF_CHILD = 5;
export const ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION = 6;
export const ABSENCE_TYPE_MATERNITY_PROTECTION = 7;
export const ABSENCE_TYPE_HOME_OFFICE = 8;
export const ABSENCE_TYPE_WORK_OUT_OF_OFFICE = 9;
export const ABSENCE_STATUS_REPORTED = 0;
export const ABSENCE_STATUS_APPROVED = 1;
export const ABSENCE_STATUS_DECLINED = 2;
export const ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
export const ABSENCE_STATUS_REQUEST_CANCELLED = 4;

export enum Billable {
    /* eslint-disable @typescript-eslint/naming-convention */
    ENTRY_UNBILLABLE,
    ENTRY_BILLABLE,
    ENTRY_BILLED,
    /* eslint-enable @typescript-eslint/naming-convention */
}

// Cannot set the variables to the enum like ABSENCE_TYPE_REGULAR_HOLIDAY = ABSENCE_TYPE_REGULAR_HOLIDAY due to the error "Computed values are not permitted in an enum with string valued members."
export enum AbsenceType {
    /* eslint-disable @typescript-eslint/naming-convention */
    ABSENCE_TYPE_REGULAR_HOLIDAY = 1,
    ABSENCE_TYPE_SPECIAL_LEAVE,
    ABSENCE_TYPE_REDUCTION_OF_OVERTIME,
    ABSENCE_TYPE_SICK_DAY,
    ABSENCE_TYPE_SICK_DAY_OF_CHILD,
    ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION,
    ABSENCE_TYPE_MATERNITY_PROTECTION,
    ABSENCE_TYPE_HOME_OFFICE,
    ABSENCE_TYPE_WORK_OUT_OF_OFFICE,
    /* eslint-enable @typescript-eslint/naming-convention */
}

export class Clockodo {
    api: Api;

    constructor(config: Config = {}) {
        this.api = new Api(config);
    }

    use = (plugin: (clockodo: Clockodo) => void) => {
        plugin(this);
    };

    getAbsence = async ({ id }: { id: number }): AbsenceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ABSENCE);

        return this.api.get("/absences/" + id);
    };

    getAbsences = async ({ year }: { year: number }): AbsencesReturnType => {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_ABSENCES);

        return this.api.get("/absences", { year });
    };

    getClock = async (): ClockReturnType => {
        return this.api.get("/v2/clock");
    };

    getCustomer = async ({ id }: { id: number }): CustomerReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_CUSTOMER);

        return this.api.get("/customers/" + id);
    };

    getCustomers = async (): CustomersReturnType => {
        return this.api.get("/customers");
    };

    getEntry = async ({ id }: { id: number }): EntryReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ENTRY);

        return this.api.get("/v2/entries/" + id);
    };

    getEntries = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): EntriesReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);

        return this.api.get("/v2/entries", {
            ...requiredArguments,
            ...options,
        });
    };

    getEntryGroups = async (
        {
            timeSince,
            timeUntil,
            grouping,
        }: { timeSince: string; timeUntil: string; grouping: Array<string> },
        options?: Record<string, unknown>
    ): EntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil, grouping };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);

        return this.api.get("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    getProject = async ({ id }: { id: number }): ProjectReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_PROJECT);

        return this.api.get("/projects/" + id);
    };

    getService = async ({ id }: { id: number }): ServiceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SERVICE);

        return this.api.get("/services/" + id);
    };

    getServices = async (): ServicesReturnType => {
        return this.api.get("/services");
    };

    getLumpSumServices = async (): LumpSumServicesReturnType => {
        return this.api.get("/lumpSumServices");
    };

    getSingleTargetHourSet = async ({
        id,
    }: {
        id: number;
    }): TargetHourReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);

        return this.api.get("/targethours/" + id);
    };

    getTargetHours = async (
        options?: Record<string, unknown>
    ): TargetHoursReturnType => {
        return this.api.get("/targethours", options);
    };

    getTaskDuration = async (
        {
            taskCustomersId,
            taskProjectsId,
            taskServicesId,
            taskText,
            taskBillable,
        }: {
            taskCustomersId: number;
            taskProjectsId: number;
            taskServicesId: number;
            taskText: string;
            taskBillable: Billable;
        },
        options?: Record<string, unknown>
    ): TaskDurationReturnType => {
        const requiredArguments = {
            taskCustomersId,
            taskProjectsId,
            taskServicesId,
            taskText,
            taskBillable,
        };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);

        return this.api.get("/tasks/duration", {
            ...requiredArguments,
            ...options,
        });
    };

    getTasks = async (options?: Record<string, unknown>): TasksReturnType => {
        return this.api.get("/tasks", options);
    };

    getUser = async ({ id }: { id: number }): UserReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_USER);

        return this.api.get("/users/" + id);
    };

    getUsers = async (): UsersReturnType => {
        return this.api.get("/users");
    };

    getUserReport = async (
        { id, year }: { id: number; year: number },
        options?: Record<string, unknown>
    ): UserReportReturnType => {
        REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);

        return this.api.get("/userreports/" + id, {
            year,
            ...options,
        });
    };

    getUserReports = async (
        { year }: { year: number },
        options?: Record<string, unknown>
    ): UserReportsReturnType => {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_USER_REPORTS);

        return this.api.get("/userreports", { year, ...options });
    };

    changeClockDuration = async (
        {
            entryId,
            durationBefore,
            duration,
        }: { entryId: number; durationBefore: number; duration: number },
        options?: Record<string, unknown>
    ): ClockEditReturnType => {
        const requiredArguments = { durationBefore, duration };

        REQUIRED.checkRequired(
            { entryId, ...requiredArguments },
            REQUIRED.CHANGE_CLOCK_DURATION
        );

        return this.api.put("/v2/clock/" + entryId, {
            ...requiredArguments,
            ...options,
        });
    };

    startClock = async (
        {
            customersId,
            servicesId,
            billable,
        }: { customersId: number; servicesId: number; billable: Billable },
        options?: Record<string, unknown>
    ): ClockStartReturnType => {
        const requiredArguments = { customersId, servicesId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);

        return this.api.post("/v2/clock", {
            ...requiredArguments,
            ...options,
        });
    };

    addCustomer = async (
        { name }: { name: string },
        options?: Record<string, unknown>
    ): CustomerReturnType => {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_CUSTOMER);

        return this.api.post("/customers", { name, ...options });
    };

    addProject = async (
        { name, customersId }: { name: string; customersId: number },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ name, customersId }, REQUIRED.ADD_PROJECT);

        return this.api.post("/projects", {
            name,
            customersId,
            ...options,
        });
    };

    addService = async (
        { name }: { name: string },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_SERVICE);

        return this.api.post("/services", { name, ...options });
    };

    addUser = async (
        {
            name,
            number,
            email,
            role,
        }: { name: string; number: string; email: string; role: string },
        options?: Record<string, unknown>
    ): AddUserReturnType => {
        const requiredArguments = { name, number, email, role };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);

        return this.api.post("/users", {
            ...requiredArguments,
            ...options,
        });
    };

    addEntry = async (
        requiredArguments:
            | {
                  customersId: number;
                  servicesId: number;
                  billable: Billable;
                  timeSince: string;
                  timeUntil: string;
              }
            | {
                  customersId: number;
                  servicesId: number;
                  billable: Billable;
                  timeSince: string;
                  lumpSum: number;
              }
            | {
                  customersId: number;
                  lumpSumsId: number;
                  lumpSumsAmount: number;
                  billable: Billable;
                  timeSince: string;
              },
        options?: Record<string, unknown>
    ): AddEntryReturnType => {
        if ("timeUntil" in requiredArguments) {
            REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_TIME_ENTRY);
        } else if ("lumpSum" in requiredArguments) {
            REQUIRED.checkRequired(
                requiredArguments,
                REQUIRED.ADD_LUMP_SUM_ENTRY
            );
        } else {
            REQUIRED.checkRequired(
                requiredArguments,
                REQUIRED.ADD_RECURRING_LUMP_SUM_ENTRY
            );
        }

        return this.api.post("/entries", {
            ...requiredArguments,
            ...options,
        });
    };

    addAbsence = async (
        {
            dateSince,
            dateUntil,
            type,
        }: { dateSince: string; dateUntil: string; type: AbsenceType },
        options?: Record<string, unknown>
    ): AbsenceReturnType => {
        const requiredArguments = { dateSince, dateUntil, type };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);

        return this.api.post("/absences", {
            ...requiredArguments,
            ...options,
        });
    };

    stopClock = async (
        { entryId }: { entryId: number },
        options?: Record<string, unknown>
    ): ClockStopReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.STOP_CLOCK);

        return this.api.delete("/v2/clock/" + entryId, options);
    };

    deactivateCustomer = async (
        { customersId }: { customersId: number },
        options?: Record<string, unknown>
    ): CustomerReturnType => {
        REQUIRED.checkRequired({ customersId }, REQUIRED.DEACTIVATE_CUSTOMER);

        return this.api.delete("/customers/" + customersId, options);
    };

    deactivateProject = async (
        { projectsId }: { projectsId: number },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ projectsId }, REQUIRED.DEACTIVATE_PROJECT);

        return this.api.delete("/projects/" + projectsId, options);
    };

    deactivateService = async (
        { servicesId }: { servicesId: number },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ servicesId }, REQUIRED.DEACTIVATE_SERVICE);

        return this.api.delete("/services/" + servicesId, options);
    };

    deactivateUser = async (
        { usersId }: { usersId: number },
        options?: Record<string, unknown>
    ): UserReturnType => {
        REQUIRED.checkRequired({ usersId }, REQUIRED.DEACTIVATE_USER);

        return this.api.delete("/users/" + usersId, options);
    };

    deleteEntry = async (
        { entryId }: { entryId: number },
        options?: Record<string, unknown>
    ): DeleteReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);

        return this.api.delete("/entries/" + entryId, options);
    };

    deleteEntryGroup = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): DeleteEntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);

        return this.api.delete("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    deleteAbsence = async (
        { absenceId }: { absenceId: number },
        options?: Record<string, unknown>
    ): DeleteReturnType => {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);

        return this.api.delete("/absences/" + absenceId, options);
    };

    editCustomer = async (
        { customersId }: { customersId: number },
        options?: Record<string, unknown>
    ) => {
        REQUIRED.checkRequired({ customersId }, REQUIRED.EDIT_CUSTOMER);

        return this.api.put("/customers/" + customersId, options);
    };

    editProject = async (
        { projectsId }: { projectsId: number },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ projectsId }, REQUIRED.EDIT_PROJECT);

        return this.api.put("/projects/" + projectsId, options);
    };

    editService = async (
        { servicesId }: { servicesId: number },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ servicesId }, REQUIRED.EDIT_SERVICE);

        return this.api.put("/services/" + servicesId, options);
    };

    editUser = async (
        { usersId }: { usersId: number },
        options?: Record<string, unknown>
    ): UserReturnType => {
        REQUIRED.checkRequired({ usersId }, REQUIRED.EDIT_USER);

        return this.api.put("/users/" + usersId, options);
    };

    editEntryGroup = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): EditEntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);

        return this.api.put("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    editAbsence = async (
        { absenceId }: { absenceId: number },
        options?: Record<string, unknown>
    ): AbsenceReturnType => {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);

        return this.api.put("/absences/" + absenceId, options);
    };

    editEntry = async (
        { entryId }: { entryId: number },
        options?: Record<string, unknown>
    ): EditEntryReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);

        return this.api.put("/entries/" + entryId, options);
    };

    getLumpSumEntriesByUserId = async (
        {
            lumpSumEntryId,
            timeUntil,
            timeSince,
            usersId,
        }: {
            lumpSumEntryId: number;
            usersId: number;
            timeUntil: string;
            timeSince: string;
        },
        options?: Record<string, unknown>
    ): EntriesReturnType => {
        REQUIRED.checkRequired(
            { lumpSumEntryId, timeUntil, timeSince, usersId },
            REQUIRED.GET_LUMP_SUM
        );

        return this.api.get("/entries/", {
            filterLumpSumsId: lumpSumEntryId,
            timeSince,
            timeUntil,
            filterUsersId: usersId,
            ...options,
        });
    };
}
