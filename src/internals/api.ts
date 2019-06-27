"use strict";

import { ClockodoLib } from "./utilities/lib";
import * as REQUIRED from "./utilities/requiredParams";
import { AbsenceReturnType, AbsencesReturnType, DeleteReturnType, CustomerReturnType, CustomersReturnType, ProjectReturnType, ServiceReturnType, ServicesReturnType, UserReturnType, UsersReturnType, EntryReturnType, EntriesReturnType, TasksReturnType, TaskDurationReturnType, DeleteEntryGroupsReturnType, EditEntryGroupsReturnType, UserReportReturnType, UserReportsReturnType, ClockReturnType, ClockUpdateReturnType, ClockEditReturnType, ClockStopReturnType, TargetHoursReturnType, TargetHourReturnType, AddUserReturnType, SearchTextsReturnType, EntryGroupsReturnType } from "../internals/returnTypes";

const clockodoApi = Symbol("api");

export const ENTRY_UNBILLABLE = 0;
export const ENTRY_BILLABLE = 1;
export const ENTRY_BILLED = 2;
export const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
export const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
export const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
export const ABSENCE_TYPE_SICK_DAY = 4;
export const ABSENCE_STATUS_REPORTED = 0;
export const ABSENCE_STATUS_APPROVED = 1;
export const ABSENCE_STATUS_DECLINED = 2;
export const ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
export const ABSENCE_STATUS_REQUEST_CANCELLED = 4;

const enum Billable {
    ENTRY_UNBILLABLE,
    ENTRY_BILLABLE,
    ENTRY_BILLED,
}

// Cannot set the variables to the enum like ABSENCE_TYPE_REGULAR_HOLIDAY = ABSENCE_TYPE_REGULAR_HOLIDAY due to the error "Computed values are not permitted in an enum with string valued members."
const enum AbsenceType {
    ABSENCE_TYPE_REGULAR_HOLIDAY = 1,
    ABSENCE_TYPE_SPECIAL_LEAVE,
    ABSENCE_TYPE_REDUCTION_OF_OVERTIME,
    ABSENCE_TYPE_SICK_DAY,
}

/* eslint-disable max-len */
export class Clockodo {
    constructor({ user, apiKey }: { user: string; apiKey: string }) {
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }

        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }

        this[clockodoApi] = new ClockodoLib(user, apiKey);
    }

    async getAbsence({ id }: { id: string }): AbsenceReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ABSENCE);

        return this[clockodoApi].get("/absences/" + id);
    }

    async getAbsences({ year }: { year: number }): AbsencesReturnType {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_ABSENCES);

        return this[clockodoApi].get("/absences", { year });
    }

    async getClock(): ClockReturnType {
        return this[clockodoApi].get("/clock");
    }

    async getClockUpdate(): ClockUpdateReturnType {
        return this[clockodoApi].get("/clock/update");
    }

    async getCustomer({ id }: { id: string }): CustomerReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_CUSTOMER);

        return this[clockodoApi].get("/customers/" + id);
    }

    async getCustomers(): CustomersReturnType {
        return this[clockodoApi].get("/customers");
    }

    async getEntry({ id }: { id: string }): EntryReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ENTRY);

        return this[clockodoApi].get("/entries/" + id);
    }

    async getEntries({ timeSince, timeUntil }: { timeSince: string; timeUntil: string }, options?: object): EntriesReturnType {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);

        return this[clockodoApi].get("/entries", { ...requiredArguments, ...options });
    }

    async getEntryGroups(
        { timeSince, timeUntil, grouping }: { timeSince: string; timeUntil: string; grouping: string[] },
        options?: object
    ): EntryGroupsReturnType {
        const requiredArguments = { timeSince, timeUntil, grouping };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);

        return this[clockodoApi].get("/entrygroups", { ...requiredArguments, ...options });
    }

    async getProject({ id }: { id: string }): ProjectReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_PROJECT);

        return this[clockodoApi].get("/projects/" + id);
    }

    async getSearchTexts(options?: object): SearchTextsReturnType {
        return this[clockodoApi].get("/searchtexts", options);
    }

    async getService({ id }: { id: string }): ServiceReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SERVICE);

        return this[clockodoApi].get("/services/" + id);
    }

    async getServices(): ServicesReturnType {
        return this[clockodoApi].get("/services");
    }

    async getSingleTargetHourSet({ id }: { id: string }): TargetHourReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);

        return this[clockodoApi].get("/targethours/" + id);
    }

    async getTargetHours(options?: object): TargetHoursReturnType {
        return this[clockodoApi].get("/targethours", options );
    }

    async getTaskDuration(
        {
            taskCustomerId,
            taskProjectId,
            taskServiceId,
            taskText,
            taskBillable,
        }: {
            taskCustomerId: string;
            taskProjectId: string;
            taskServiceId: string;
            taskText: string;
            taskBillable: Billable;
        },
        options?: object
    ): TaskDurationReturnType {
        const requiredArguments = { taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);

        return this[clockodoApi].get("/tasks/duration", { ...requiredArguments, ...options });
    }

    async getTasks(options?: object): TasksReturnType {
        return this[clockodoApi].get("/tasks", options);
    }

    async getUser({ id }: { id: string }): UserReturnType {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_USER);

        return this[clockodoApi].get("/users/" + id);
    }

    async getUsers(): UsersReturnType {
        return this[clockodoApi].get("/users");
    }

    async getUserReport({ id, year }: { id: string; year: number }, options?: object): UserReportReturnType {
        REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports/" + id, { year, ...options });
    }

    async getUserReports({ year }: { year: number }, options?: object): UserReportsReturnType {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports", { year, ...options });
    }

    async changeClockDuration(
        { entryId, durationBefore, duration }: { entryId: string; durationBefore: number; duration: number },
        options?: object
    ): ClockEditReturnType {
        const requiredArguments = { durationBefore, duration };

        REQUIRED.checkRequired({ entryId, ...requiredArguments }, REQUIRED.CHANGE_CLOCK_DURATION);

        return this[clockodoApi].put("/clock/" + entryId, { ...requiredArguments, ...options });
    }

    async startClock(
        { customerId, serviceId, billable }: { customerId: string; serviceId: string; billable: Billable },
        options?: object
    ): ClockReturnType {
        const requiredArguments = { customerId, serviceId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);

        return this[clockodoApi].post("/clock", { ...requiredArguments, ...options });
    }

    async addCustomer({ name }: { name: string }, options?: object): CustomerReturnType {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_CUSTOMER);

        return this[clockodoApi].post("/customers", { name, ...options });
    }

    async addProject({ name, customerId }: { name: string; customerId: string }, options?: object): ProjectReturnType {
        REQUIRED.checkRequired({ name, customerId }, REQUIRED.ADD_PROJECT);

        return this[clockodoApi].post("/projects", { name, customerId, ...options });
    }

    async addService({ name }: { name: string }, options?: object): ServiceReturnType {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_SERVICE);

        return this[clockodoApi].post("/services", { name, ...options });
    }

    async addUser(
        { name, number, email, role }: { name: string; number: string; email: string; role: string },
        options?: object
    ): AddUserReturnType {
        const requiredArguments = { name, number, email, role };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);

        return this[clockodoApi].post("/users", { ...requiredArguments, ...options });
    }

    async addEntry(
        { customerId, serviceId, billable }: { customerId: string; serviceId: string; billable: Billable },
        options?: object
    ): EntryReturnType {
        const requiredArguments = { customerId, serviceId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ENTRY);

        return this[clockodoApi].post("/entries", { ...requiredArguments, ...options });
    }

    async addAbsence(
        { dateSince, dateUntil, type }: { dateSince: string; dateUntil: string; type: AbsenceType },
        options?: object
    ): AbsenceReturnType {
        const requiredArguments = { dateSince, dateUntil, type };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);

        return this[clockodoApi].post("/absences", { ...requiredArguments, ...options });
    }

    async stopClock({ entryId }: { entryId: string }, options?: object): ClockStopReturnType {
        REQUIRED.checkRequired({ entryId }, REQUIRED.STOP_CLOCK);

        return this[clockodoApi].delete("/clock/" + entryId, options);
    }

    async deactivateCustomer({ customerId }: { customerId: string }, options?: object): CustomerReturnType {
        REQUIRED.checkRequired({ customerId }, REQUIRED.DEACTIVATE_CUSTOMER);

        return this[clockodoApi].delete("/customers/" + customerId, options);
    }

    async deactivateProject({ projectId }: { projectId: string }, options?: object): ProjectReturnType {
        REQUIRED.checkRequired({ projectId }, REQUIRED.DEACTIVATE_PROJECT);

        return this[clockodoApi].delete("/projects/" + projectId, options);
    }

    async deactivateService({ serviceId }: { serviceId: string }, options?: object): ServiceReturnType {
        REQUIRED.checkRequired({ serviceId }, REQUIRED.DEACTIVATE_SERVICE);

        return this[clockodoApi].delete("/services/" + serviceId, options);
    }

    async deactivateUser({ userId }: { userId: string }, options?: object): UserReturnType {
        REQUIRED.checkRequired({ userId }, REQUIRED.DEACTIVATE_USER);

        return this[clockodoApi].delete("/users/" + userId, options);
    }

    async deleteEntry({ entryId }: { entryId: string }, options?: object): DeleteReturnType {
        REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);

        return this[clockodoApi].delete("/entries/" + entryId, options);
    }

    async deleteEntryGroup({ timeSince, timeUntil }: { timeSince: string; timeUntil: string }, options?: object): DeleteEntryGroupsReturnType {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);

        return this[clockodoApi].delete("/entrygroups", { ...requiredArguments, ...options });
    }

    async deleteAbsence({ absenceId }: { absenceId: string }, options?: object): DeleteReturnType {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);

        return this[clockodoApi].delete("/absences/" + absenceId, options);
    }

    async editCustomer({ customerId }: { customerId: string }, options?: object) {
        REQUIRED.checkRequired({ customerId }, REQUIRED.EDIT_CUSTOMER);

        return this[clockodoApi].put("/customers/" + customerId, options);
    }

    async editProject({ projectId }: { projectId: string }, options?: object): ProjectReturnType {
        REQUIRED.checkRequired({ projectId }, REQUIRED.EDIT_PROJECT);

        return this[clockodoApi].put("/projects/" + projectId, options);
    }

    async editService({ serviceId }: { serviceId: string }, options?: object): ServiceReturnType {
        REQUIRED.checkRequired({ serviceId }, REQUIRED.EDIT_SERVICE);

        return this[clockodoApi].put("/services/" + serviceId, options);
    }

    async editUser({ userId }: { userId: string }, options?: object): UserReturnType {
        REQUIRED.checkRequired({ userId }, REQUIRED.EDIT_USER);

        return this[clockodoApi].put("/users/" + userId, options);
    }

    async editEntryGroup({ timeSince, timeUntil }: { timeSince: string; timeUntil: string }, options?: object): EditEntryGroupsReturnType {
        const requiredArguments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);

        return this[clockodoApi].put("/entrygroups", { ...requiredArguments, ...options });
    }

    async editAbsence({ absenceId }: { absenceId: string }, options?: object): AbsenceReturnType {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);

        return this[clockodoApi].put("/absences/" + absenceId, options);
    }

    async editEntry({ entryId }: { entryId: string }, options?: object): EntryReturnType {
        REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);

        return this[clockodoApi].put("/entries/" + entryId, options);
    }
}
