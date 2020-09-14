import {clockodoApi} from "./utilities/symbols";
import {ClockodoLib} from "./utilities/lib";
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
    ENTRY_UNBILLABLE,
    ENTRY_BILLABLE,
    ENTRY_BILLED,
}

// Cannot set the variables to the enum like ABSENCE_TYPE_REGULAR_HOLIDAY = ABSENCE_TYPE_REGULAR_HOLIDAY due to the error "Computed values are not permitted in an enum with string valued members."
export enum AbsenceType {
    ABSENCE_TYPE_REGULAR_HOLIDAY = 1,
    ABSENCE_TYPE_SPECIAL_LEAVE,
    ABSENCE_TYPE_REDUCTION_OF_OVERTIME,
    ABSENCE_TYPE_SICK_DAY,
    ABSENCE_TYPE_SICK_DAY_OF_CHILD,
    ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION,
    ABSENCE_TYPE_MATERNITY_PROTECTION,
    ABSENCE_TYPE_HOME_OFFICE,
    ABSENCE_TYPE_WORK_OUT_OF_OFFICE,
}

/* eslint-disable max-len */

export class Clockodo {
    constructor({user, apiKey, baseUrl}: { user: string; apiKey: string; baseUrl?: string}) {
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }

        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }

        if (baseUrl !== undefined && typeof baseUrl !== "string") {
            throw new Error("Clockodo baseUrl expected to be a string, is typeof: " + typeof baseUrl);
        }

        this[clockodoApi] = new ClockodoLib({user, apiKey, baseUrl});
    }

    use(plugin: (clockodo: Clockodo) => void) {
        plugin(this);
    }

    async getAbsence({id}: { id: number }): AbsenceReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_ABSENCE);

        return this[clockodoApi].get("/absences/" + id);
    }

    async getAbsences({year}: { year: number }): AbsencesReturnType {
        REQUIRED.checkRequired({year}, REQUIRED.GET_ABSENCES);

        return this[clockodoApi].get("/absences", {year});
    }

    async getClock(): ClockReturnType {
        return this[clockodoApi].get("/clock");
    }

    async getClockUpdate(): ClockUpdateReturnType {
        return this[clockodoApi].get("/clock/update");
    }

    async getCustomer({id}: { id: number }): CustomerReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_CUSTOMER);

        return this[clockodoApi].get("/customers/" + id);
    }

    async getCustomers(): CustomersReturnType {
        return this[clockodoApi].get("/customers");
    }

    async getEntry({id}: { id: number }): EntryReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_ENTRY);

        return this[clockodoApi].get("/entries/" + id);
    }

    async getEntries({timeSince, timeUntil}: { timeSince: string; timeUntil: string }, options?: object): EntriesReturnType {
        const requiredArguments = {timeSince, timeUntil};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);

        return this[clockodoApi].get("/entries", {...requiredArguments, ...options});
    }

    async getEntryGroups(
        {timeSince, timeUntil, grouping}: { timeSince: string; timeUntil: string; grouping: Array<string> },
        options?: object
    ): EntryGroupsReturnType {
        const requiredArguments = {timeSince, timeUntil, grouping};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);

        return this[clockodoApi].get("/entrygroups", {...requiredArguments, ...options});
    }

    async getProject({id}: { id: number }): ProjectReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_PROJECT);

        return this[clockodoApi].get("/projects/" + id);
    }

    async getSearchTexts(options?: object): SearchTextsReturnType {
        return this[clockodoApi].get("/searchtexts", options);
    }

    async getService({id}: { id: number }): ServiceReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_SERVICE);

        return this[clockodoApi].get("/services/" + id);
    }

    async getServices(): ServicesReturnType {
        return this[clockodoApi].get("/services");
    }

    async getSingleTargetHourSet({id}: { id: number }): TargetHourReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);

        return this[clockodoApi].get("/targethours/" + id);
    }

    async getTargetHours(options?: object): TargetHoursReturnType {
        return this[clockodoApi].get("/targethours", options);
    }

    async getTaskDuration(
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
        options?: object
    ): TaskDurationReturnType {
        const requiredArguments = {taskCustomersId, taskProjectsId, taskServicesId, taskText, taskBillable};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);

        return this[clockodoApi].get("/tasks/duration", {...requiredArguments, ...options});
    }

    async getTasks(options?: object): TasksReturnType {
        return this[clockodoApi].get("/tasks", options);
    }

    async getUser({id}: { id: number }): UserReturnType {
        REQUIRED.checkRequired({id}, REQUIRED.GET_USER);

        return this[clockodoApi].get("/users/" + id);
    }

    async getUsers(): UsersReturnType {
        return this[clockodoApi].get("/users");
    }

    async getUserReport({id, year}: { id: number; year: number }, options?: object): UserReportReturnType {
        REQUIRED.checkRequired({id, year}, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports/" + id, {year, ...options});
    }

    async getUserReports({year}: { year: number }, options?: object): UserReportsReturnType {
        REQUIRED.checkRequired({year}, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports", {year, ...options});
    }

    async changeClockDuration(
        {entryId, durationBefore, duration}: { entryId: number; durationBefore: number; duration: number },
        options?: object
    ): ClockEditReturnType {
        const requiredArguments = {durationBefore, duration};

        REQUIRED.checkRequired({entryId, ...requiredArguments}, REQUIRED.CHANGE_CLOCK_DURATION);

        return this[clockodoApi].put("/clock/" + entryId, {...requiredArguments, ...options});
    }

    async startClock(
        {customersId, servicesId, billable}: { customersId: number; servicesId: number; billable: Billable },
        options?: object
    ): ClockReturnType {
        const requiredArguments = {customersId, servicesId, billable};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);

        return this[clockodoApi].post("/clock", {...requiredArguments, ...options});
    }

    async addCustomer({name}: { name: string }, options?: object): CustomerReturnType {
        REQUIRED.checkRequired({name}, REQUIRED.ADD_CUSTOMER);

        return this[clockodoApi].post("/customers", {name, ...options});
    }

    async addProject({name, customersId}: { name: string; customersId: number }, options?: object): ProjectReturnType {
        REQUIRED.checkRequired({name, customersId}, REQUIRED.ADD_PROJECT);

        return this[clockodoApi].post("/projects", {name, customersId, ...options});
    }

    async addService({name}: { name: string }, options?: object): ServiceReturnType {
        REQUIRED.checkRequired({name}, REQUIRED.ADD_SERVICE);

        return this[clockodoApi].post("/services", {name, ...options});
    }

    async addUser(
        {name, number, email, role}: { name: string; number: string; email: string; role: string },
        options?: object
    ): AddUserReturnType {
        const requiredArguments = {name, number, email, role};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);

        return this[clockodoApi].post("/users", {...requiredArguments, ...options});
    }

    async addEntry(
        {customersId, servicesId, billable}: { customersId: number; servicesId: number; billable: Billable },
        options?: object
    ): EntryReturnType {
        const requiredArguments = {customersId, servicesId, billable};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ENTRY);

        return this[clockodoApi].post("/entries", {...requiredArguments, ...options});
    }

    async addAbsence(
        {dateSince, dateUntil, type}: { dateSince: string; dateUntil: string; type: AbsenceType },
        options?: object
    ): AbsenceReturnType {
        const requiredArguments = {dateSince, dateUntil, type};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);

        return this[clockodoApi].post("/absences", {...requiredArguments, ...options});
    }

    async stopClock({entryId}: { entryId: number }, options?: object): ClockStopReturnType {
        REQUIRED.checkRequired({entryId}, REQUIRED.STOP_CLOCK);

        return this[clockodoApi].delete("/clock/" + entryId, options);
    }

    async deactivateCustomer({customersId}: { customersId: number }, options?: object): CustomerReturnType {
        REQUIRED.checkRequired({customersId}, REQUIRED.DEACTIVATE_CUSTOMER);

        return this[clockodoApi].delete("/customers/" + customersId, options);
    }

    async deactivateProject({projectsId}: { projectsId: number }, options?: object): ProjectReturnType {
        REQUIRED.checkRequired({projectsId}, REQUIRED.DEACTIVATE_PROJECT);

        return this[clockodoApi].delete("/projects/" + projectsId, options);
    }

    async deactivateService({servicesId}: { servicesId: number }, options?: object): ServiceReturnType {
        REQUIRED.checkRequired({servicesId}, REQUIRED.DEACTIVATE_SERVICE);

        return this[clockodoApi].delete("/services/" + servicesId, options);
    }

    async deactivateUser({usersId}: { usersId: number }, options?: object): UserReturnType {
        REQUIRED.checkRequired({usersId}, REQUIRED.DEACTIVATE_USER);

        return this[clockodoApi].delete("/users/" + usersId, options);
    }

    async deleteEntry({entryId}: { entryId: number }, options?: object): DeleteReturnType {
        REQUIRED.checkRequired({entryId}, REQUIRED.DELETE_ENTRY);

        return this[clockodoApi].delete("/entries/" + entryId, options);
    }

    async deleteEntryGroup({timeSince, timeUntil}: { timeSince: string; timeUntil: string }, options?: object): DeleteEntryGroupsReturnType {
        const requiredArguments = {timeSince, timeUntil};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);

        return this[clockodoApi].delete("/entrygroups", {...requiredArguments, ...options});
    }

    async deleteAbsence({absenceId}: { absenceId: number }, options?: object): DeleteReturnType {
        REQUIRED.checkRequired({absenceId}, REQUIRED.DELETE_ABSENCE);

        return this[clockodoApi].delete("/absences/" + absenceId, options);
    }

    async editCustomer({customersId}: { customersId: number }, options?: object) {
        REQUIRED.checkRequired({customersId}, REQUIRED.EDIT_CUSTOMER);

        return this[clockodoApi].put("/customers/" + customersId, options);
    }

    async editProject({projectsId}: { projectsId: number }, options?: object): ProjectReturnType {
        REQUIRED.checkRequired({projectsId}, REQUIRED.EDIT_PROJECT);

        return this[clockodoApi].put("/projects/" + projectsId, options);
    }

    async editService({servicesId}: { servicesId: number }, options?: object): ServiceReturnType {
        REQUIRED.checkRequired({servicesId}, REQUIRED.EDIT_SERVICE);

        return this[clockodoApi].put("/services/" + servicesId, options);
    }

    async editUser({usersId}: { usersId: number }, options?: object): UserReturnType {
        REQUIRED.checkRequired({usersId}, REQUIRED.EDIT_USER);

        return this[clockodoApi].put("/users/" + usersId, options);
    }

    async editEntryGroup({timeSince, timeUntil}: { timeSince: string; timeUntil: string }, options?: object): EditEntryGroupsReturnType {
        const requiredArguments = {timeSince, timeUntil};

        REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);

        return this[clockodoApi].put("/entrygroups", {...requiredArguments, ...options});
    }

    async editAbsence({absenceId}: { absenceId: number }, options?: object): AbsenceReturnType {
        REQUIRED.checkRequired({absenceId}, REQUIRED.EDIT_ABSENCE);

        return this[clockodoApi].put("/absences/" + absenceId, options);
    }

    async editEntry({entryId}: { entryId: number }, options?: object): EntryReturnType {
        REQUIRED.checkRequired({entryId}, REQUIRED.EDIT_ENTRY);

        return this[clockodoApi].put("/entries/" + entryId, options);
    }

    async getLumpSumEntriesByUserId({
        lumpSumEntryId,
        timeUntil,
        timeSince,
        usersId,
    }: {
        lumpSumEntryId: number;
        usersId: number;
        timeUntil: string;
        timeSince: string;
    }, options?: object): EntriesReturnType {
        REQUIRED.checkRequired({lumpSumEntryId, timeUntil, timeSince, usersId}, REQUIRED.GET_LUMP_SUM);

        return this[clockodoApi].get("/entries/", {
            filterLumpSumsId: lumpSumEntryId,
            timeSince,
            timeUntil,
            filterUsersId: usersId,
            ...options,
        });
    }

    async addLumpSumEntry({
        customersId,
        lumpSumsAmount,
        lumpSumsId,
        billable,
        timeSince,
    }: {
        customersId: number;
        lumpSumsId: number;
        lumpSumsAmount: number;
        billable: Billable;
        timeSince: string;
    }, options?: object): EntryReturnType {
        REQUIRED.checkRequired({
            customersId,
            lumpSumsId,
            lumpSumsAmount,
            billable,
            timeSince,
        }, REQUIRED.ADD_LUMP_SUM);

        return this[clockodoApi].post("/entries/", {
            billable,
            customersId,
            lumpSumsAmount,
            lumpSumsId,
            timeSince,
            ...options,
        });
    }
}
