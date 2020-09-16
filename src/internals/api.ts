import { clockodoApi } from "./utilities/symbols";
import { ClockodoLib } from "./utilities/lib";
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
    ClockUpdateReturnType,
    ClockEditReturnType,
    ClockStopReturnType,
    TargetHoursReturnType,
    TargetHourReturnType,
    AddUserReturnType,
    SearchTextsReturnType,
    EntryGroupsReturnType,
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
    [clockodoApi]: ClockodoLib;

    constructor({
        user,
        apiKey,
        baseUrl,
    }: {
        user: string;
        apiKey: string;
        baseUrl?: string;
    }) {
        if (typeof user !== "string") {
            throw new Error(
                "Clockodo user expected to be a string, is typeof: " +
                    typeof user
            );
        }

        if (typeof apiKey !== "string") {
            throw new Error(
                "Clockodo apikey expected to be a string, is typeof: " +
                    typeof apiKey
            );
        }

        if (baseUrl !== undefined && typeof baseUrl !== "string") {
            throw new Error(
                "Clockodo baseUrl expected to be a string, is typeof: " +
                    typeof baseUrl
            );
        }

        this[clockodoApi] = new ClockodoLib({ user, apiKey, baseUrl });
    }

    use = (plugin: (clockodo: Clockodo) => void) => {
        plugin(this);
    };

    getAbsence = async ({ id }: { id: number }): AbsenceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ABSENCE);

        return this[clockodoApi].get("/absences/" + id);
    };

    getAbsences = async ({ year }: { year: number }): AbsencesReturnType => {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_ABSENCES);

        return this[clockodoApi].get("/absences", { year });
    };

    getClock = async (): ClockReturnType => {
        return this[clockodoApi].get("/clock");
    };

    getClockUpdate = async (): ClockUpdateReturnType => {
        return this[clockodoApi].get("/clock/update");
    };

    getCustomer = async ({ id }: { id: number }): CustomerReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_CUSTOMER);

        return this[clockodoApi].get("/customers/" + id);
    };

    getCustomers = async (): CustomersReturnType => {
        return this[clockodoApi].get("/customers");
    };

    getEntry = async ({ id }: { id: number }): EntryReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ENTRY);

        return this[clockodoApi].get("/entries/" + id);
    };

    getEntries = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): EntriesReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);

        return this[clockodoApi].get("/entries", {
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

        return this[clockodoApi].get("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    getProject = async ({ id }: { id: number }): ProjectReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_PROJECT);

        return this[clockodoApi].get("/projects/" + id);
    };

    getSearchTexts = async (
        options?: Record<string, unknown>
    ): SearchTextsReturnType => {
        return this[clockodoApi].get("/searchtexts", options);
    };

    getService = async ({ id }: { id: number }): ServiceReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SERVICE);

        return this[clockodoApi].get("/services/" + id);
    };

    getServices = async (): ServicesReturnType => {
        return this[clockodoApi].get("/services");
    };

    getSingleTargetHourSet = async ({
        id,
    }: {
        id: number;
    }): TargetHourReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);

        return this[clockodoApi].get("/targethours/" + id);
    };

    getTargetHours = async (
        options?: Record<string, unknown>
    ): TargetHoursReturnType => {
        return this[clockodoApi].get("/targethours", options);
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

        return this[clockodoApi].get("/tasks/duration", {
            ...requiredArguments,
            ...options,
        });
    };

    getTasks = async (options?: Record<string, unknown>): TasksReturnType => {
        return this[clockodoApi].get("/tasks", options);
    };

    getUser = async ({ id }: { id: number }): UserReturnType => {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_USER);

        return this[clockodoApi].get("/users/" + id);
    };

    getUsers = async (): UsersReturnType => {
        return this[clockodoApi].get("/users");
    };

    getUserReport = async (
        { id, year }: { id: number; year: number },
        options?: Record<string, unknown>
    ): UserReportReturnType => {
        REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports/" + id, {
            year,
            ...options,
        });
    };

    getUserReports = async (
        { year }: { year: number },
        options?: Record<string, unknown>
    ): UserReportsReturnType => {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports", { year, ...options });
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

        return this[clockodoApi].put("/clock/" + entryId, {
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
    ): ClockReturnType => {
        const requiredArguments = { customersId, servicesId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);

        return this[clockodoApi].post("/clock", {
            ...requiredArguments,
            ...options,
        });
    };

    addCustomer = async (
        { name }: { name: string },
        options?: Record<string, unknown>
    ): CustomerReturnType => {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_CUSTOMER);

        return this[clockodoApi].post("/customers", { name, ...options });
    };

    addProject = async (
        { name, customersId }: { name: string; customersId: number },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ name, customersId }, REQUIRED.ADD_PROJECT);

        return this[clockodoApi].post("/projects", {
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

        return this[clockodoApi].post("/services", { name, ...options });
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

        return this[clockodoApi].post("/users", {
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
    ): EntryReturnType => {
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

        return this[clockodoApi].post("/entries", {
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

        return this[clockodoApi].post("/absences", {
            ...requiredArguments,
            ...options,
        });
    };

    stopClock = async (
        { entryId }: { entryId: number },
        options?: Record<string, unknown>
    ): ClockStopReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.STOP_CLOCK);

        return this[clockodoApi].delete("/clock/" + entryId, options);
    };

    deactivateCustomer = async (
        { customersId }: { customersId: number },
        options?: Record<string, unknown>
    ): CustomerReturnType => {
        REQUIRED.checkRequired({ customersId }, REQUIRED.DEACTIVATE_CUSTOMER);

        return this[clockodoApi].delete("/customers/" + customersId, options);
    };

    deactivateProject = async (
        { projectsId }: { projectsId: number },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ projectsId }, REQUIRED.DEACTIVATE_PROJECT);

        return this[clockodoApi].delete("/projects/" + projectsId, options);
    };

    deactivateService = async (
        { servicesId }: { servicesId: number },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ servicesId }, REQUIRED.DEACTIVATE_SERVICE);

        return this[clockodoApi].delete("/services/" + servicesId, options);
    };

    deactivateUser = async (
        { usersId }: { usersId: number },
        options?: Record<string, unknown>
    ): UserReturnType => {
        REQUIRED.checkRequired({ usersId }, REQUIRED.DEACTIVATE_USER);

        return this[clockodoApi].delete("/users/" + usersId, options);
    };

    deleteEntry = async (
        { entryId }: { entryId: number },
        options?: Record<string, unknown>
    ): DeleteReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);

        return this[clockodoApi].delete("/entries/" + entryId, options);
    };

    deleteEntryGroup = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): DeleteEntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);

        return this[clockodoApi].delete("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    deleteAbsence = async (
        { absenceId }: { absenceId: number },
        options?: Record<string, unknown>
    ): DeleteReturnType => {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);

        return this[clockodoApi].delete("/absences/" + absenceId, options);
    };

    editCustomer = async (
        { customersId }: { customersId: number },
        options?: Record<string, unknown>
    ) => {
        REQUIRED.checkRequired({ customersId }, REQUIRED.EDIT_CUSTOMER);

        return this[clockodoApi].put("/customers/" + customersId, options);
    };

    editProject = async (
        { projectsId }: { projectsId: number },
        options?: Record<string, unknown>
    ): ProjectReturnType => {
        REQUIRED.checkRequired({ projectsId }, REQUIRED.EDIT_PROJECT);

        return this[clockodoApi].put("/projects/" + projectsId, options);
    };

    editService = async (
        { servicesId }: { servicesId: number },
        options?: Record<string, unknown>
    ): ServiceReturnType => {
        REQUIRED.checkRequired({ servicesId }, REQUIRED.EDIT_SERVICE);

        return this[clockodoApi].put("/services/" + servicesId, options);
    };

    editUser = async (
        { usersId }: { usersId: number },
        options?: Record<string, unknown>
    ): UserReturnType => {
        REQUIRED.checkRequired({ usersId }, REQUIRED.EDIT_USER);

        return this[clockodoApi].put("/users/" + usersId, options);
    };

    editEntryGroup = async (
        { timeSince, timeUntil }: { timeSince: string; timeUntil: string },
        options?: Record<string, unknown>
    ): EditEntryGroupsReturnType => {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);

        return this[clockodoApi].put("/entrygroups", {
            ...requiredArguments,
            ...options,
        });
    };

    editAbsence = async (
        { absenceId }: { absenceId: number },
        options?: Record<string, unknown>
    ): AbsenceReturnType => {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);

        return this[clockodoApi].put("/absences/" + absenceId, options);
    };

    editEntry = async (
        { entryId }: { entryId: number },
        options?: Record<string, unknown>
    ): EntryReturnType => {
        REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);

        return this[clockodoApi].put("/entries/" + entryId, options);
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

        return this[clockodoApi].get("/entries/", {
            filterLumpSumsId: lumpSumEntryId,
            timeSince,
            timeUntil,
            filterUsersId: usersId,
            ...options,
        });
    };
}
