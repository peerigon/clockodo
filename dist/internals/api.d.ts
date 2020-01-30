import { AbsenceReturnType, AbsencesReturnType, DeleteReturnType, CustomerReturnType, CustomersReturnType, ProjectReturnType, ServiceReturnType, ServicesReturnType, UserReturnType, UsersReturnType, EntryReturnType, EntriesReturnType, TasksReturnType, TaskDurationReturnType, DeleteEntryGroupsReturnType, EditEntryGroupsReturnType, UserReportReturnType, UserReportsReturnType, ClockReturnType, ClockUpdateReturnType, ClockEditReturnType, ClockStopReturnType, TargetHoursReturnType, TargetHourReturnType, AddUserReturnType, SearchTextsReturnType, EntryGroupsReturnType } from "./returnTypes";
export declare const ENTRY_UNBILLABLE = 0;
export declare const ENTRY_BILLABLE = 1;
export declare const ENTRY_BILLED = 2;
export declare const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
export declare const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
export declare const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
export declare const ABSENCE_TYPE_SICK_DAY = 4;
export declare const ABSENCE_TYPE_SICK_DAY_OF_CHILD = 5;
export declare const ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION = 6;
export declare const ABSENCE_TYPE_MATERNITY_PROTECTION = 7;
export declare const ABSENCE_TYPE_HOME_OFFICE = 8;
export declare const ABSENCE_TYPE_WORK_OUT_OF_OFFICE = 9;
export declare const ABSENCE_STATUS_REPORTED = 0;
export declare const ABSENCE_STATUS_APPROVED = 1;
export declare const ABSENCE_STATUS_DECLINED = 2;
export declare const ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
export declare const ABSENCE_STATUS_REQUEST_CANCELLED = 4;
declare const enum Billable {
    ENTRY_UNBILLABLE = 0,
    ENTRY_BILLABLE = 1,
    ENTRY_BILLED = 2
}
declare const enum AbsenceType {
    ABSENCE_TYPE_REGULAR_HOLIDAY = 1,
    ABSENCE_TYPE_SPECIAL_LEAVE = 2,
    ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3,
    ABSENCE_TYPE_SICK_DAY = 4,
    ABSENCE_TYPE_SICK_DAY_OF_CHILD = 5,
    ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION = 6,
    ABSENCE_TYPE_MATERNITY_PROTECTION = 7,
    ABSENCE_TYPE_HOME_OFFICE = 8,
    ABSENCE_TYPE_WORK_OUT_OF_OFFICE = 9
}
export declare class Clockodo {
    constructor({ user, apiKey, cacheTime }: {
        user: string;
        apiKey: string;
        cacheTime?: number;
    });
    getAbsence({ id }: {
        id: number;
    }): AbsenceReturnType;
    getAbsences({ year }: {
        year: number;
    }): AbsencesReturnType;
    getClock(): ClockReturnType;
    getClockUpdate(): ClockUpdateReturnType;
    getCustomer({ id }: {
        id: number;
    }): CustomerReturnType;
    getCustomers(): CustomersReturnType;
    getEntry({ id }: {
        id: number;
    }): EntryReturnType;
    getEntries({ timeSince, timeUntil }: {
        timeSince: string;
        timeUntil: string;
    }, options?: object): EntriesReturnType;
    getEntryGroups({ timeSince, timeUntil, grouping }: {
        timeSince: string;
        timeUntil: string;
        grouping: Array<string>;
    }, options?: object): EntryGroupsReturnType;
    getProject({ id }: {
        id: number;
    }): ProjectReturnType;
    getSearchTexts(options?: object): SearchTextsReturnType;
    getService({ id }: {
        id: number;
    }): ServiceReturnType;
    getServices(): ServicesReturnType;
    getSingleTargetHourSet({ id }: {
        id: number;
    }): TargetHourReturnType;
    getTargetHours(options?: object): TargetHoursReturnType;
    getTaskDuration({ taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable, }: {
        taskCustomerId: number;
        taskProjectId: number;
        taskServiceId: number;
        taskText: string;
        taskBillable: Billable;
    }, options?: object): TaskDurationReturnType;
    getTasks(options?: object): TasksReturnType;
    getUser({ id }: {
        id: number;
    }): UserReturnType;
    getUsers(): UsersReturnType;
    getUserReport({ id, year }: {
        id: number;
        year: number;
    }, options?: object): UserReportReturnType;
    getUserReports({ year }: {
        year: number;
    }, options?: object): UserReportsReturnType;
    changeClockDuration({ entryId, durationBefore, duration }: {
        entryId: number;
        durationBefore: number;
        duration: number;
    }, options?: object): ClockEditReturnType;
    startClock({ customerId, serviceId, billable }: {
        customerId: number;
        serviceId: number;
        billable: Billable;
    }, options?: object): ClockReturnType;
    addCustomer({ name }: {
        name: string;
    }, options?: object): CustomerReturnType;
    addProject({ name, customerId }: {
        name: string;
        customerId: number;
    }, options?: object): ProjectReturnType;
    addService({ name }: {
        name: string;
    }, options?: object): ServiceReturnType;
    addUser({ name, number, email, role }: {
        name: string;
        number: string;
        email: string;
        role: string;
    }, options?: object): AddUserReturnType;
    addEntry({ customerId, serviceId, billable }: {
        customerId: number;
        serviceId: number;
        billable: Billable;
    }, options?: object): EntryReturnType;
    addAbsence({ dateSince, dateUntil, type }: {
        dateSince: string;
        dateUntil: string;
        type: AbsenceType;
    }, options?: object): AbsenceReturnType;
    stopClock({ entryId }: {
        entryId: number;
    }, options?: object): ClockStopReturnType;
    deactivateCustomer({ customerId }: {
        customerId: number;
    }, options?: object): CustomerReturnType;
    deactivateProject({ projectId }: {
        projectId: number;
    }, options?: object): ProjectReturnType;
    deactivateService({ serviceId }: {
        serviceId: number;
    }, options?: object): ServiceReturnType;
    deactivateUser({ userId }: {
        userId: number;
    }, options?: object): UserReturnType;
    deleteEntry({ entryId }: {
        entryId: number;
    }, options?: object): DeleteReturnType;
    deleteEntryGroup({ timeSince, timeUntil }: {
        timeSince: string;
        timeUntil: string;
    }, options?: object): DeleteEntryGroupsReturnType;
    deleteAbsence({ absenceId }: {
        absenceId: number;
    }, options?: object): DeleteReturnType;
    editCustomer({ customerId }: {
        customerId: number;
    }, options?: object): Promise<any>;
    editProject({ projectId }: {
        projectId: number;
    }, options?: object): ProjectReturnType;
    editService({ serviceId }: {
        serviceId: number;
    }, options?: object): ServiceReturnType;
    editUser({ userId }: {
        userId: number;
    }, options?: object): UserReturnType;
    editEntryGroup({ timeSince, timeUntil }: {
        timeSince: string;
        timeUntil: string;
    }, options?: object): EditEntryGroupsReturnType;
    editAbsence({ absenceId }: {
        absenceId: number;
    }, options?: object): AbsenceReturnType;
    editEntry({ entryId }: {
        entryId: number;
    }, options?: object): EntryReturnType;
    getLumpSumEntriesByUserId({ lumpSumEntryId, timeUntil, timeSince, userId, }: {
        lumpSumEntryId: number;
        userId: number;
        timeUntil: string;
        timeSince: string;
    }, options?: object): EntriesReturnType;
    addLumpSumEntry({ customerId, projectId, lumpSumAmount, lumpSumId, text, timeSince, userId, }: {
        customerId: number;
        projectId?: number;
        lumpSumId: number;
        lumpSumAmount: number;
        timeSince: string;
        text: string;
        userId?: number;
    }, options?: object): EntryReturnType;
}
export {};
