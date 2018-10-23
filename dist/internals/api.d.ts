export declare const ENTRY_UNBILLABLE = 0;
export declare const ENTRY_BILLABLE = 1;
export declare const ENTRY_BILLED = 2;
export declare const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
export declare const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
export declare const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
export declare const ABSENCE_TYPE_SICK_DAY = 4;
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
    ABSENCE_TYPE_SICK_DAY = 4
}
export declare class Clockodo {
    constructor({ user, apiKey }: {
        user: string;
        apiKey: string;
    });
    getAbsence({ id }: {
        id: string;
    }): Promise<any>;
    getAbsences({ year }: {
        year: number;
    }): Promise<any>;
    getClock(): Promise<any>;
    getClockUpdate(): Promise<any>;
    getCustomer({ id }: {
        id: string;
    }): Promise<any>;
    getCustomers(): Promise<any>;
    getEntry({ id }: {
        id: string;
    }): Promise<any>;
    getEntries({ timeSince, timeUntil }: {
        timeSince: string;
        timeUntil: string;
    }, options?: object): Promise<any>;
    getEntryGroups({ timeSince, timeUntil, grouping }: {
        timeSince: string;
        timeUntil: string;
        grouping: string[];
    }, options?: object): Promise<any>;
    getProject({ id }: {
        id: string;
    }): Promise<any>;
    getSearchTexts(options?: object): Promise<any>;
    getService({ id }: {
        id: string;
    }): Promise<any>;
    getServices(): Promise<any>;
    getSingleTargetHourSet({ id }: {
        id: string;
    }): Promise<any>;
    getTargetHours(options?: object): Promise<any>;
    getTaskDuration({ taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable, }: {
        taskCustomerId: string;
        taskProjectId: string;
        taskServiceId: string;
        taskText: string;
        taskBillable: Billable;
    }, options?: object): Promise<any>;
    getTasks(options?: object): Promise<any>;
    getUser({ id }: {
        id: string;
    }): Promise<any>;
    getUsers(): Promise<any>;
    getUserReport({ id, year }: {
        id: string;
        year: number;
    }, options?: object): Promise<any>;
    getUserReports({ year }: {
        year: number;
    }, options?: object): Promise<any>;
    changeClockDuration({ entryId, durationBefore, duration }: {
        entryId: string;
        durationBefore: number;
        duration: number;
    }, options?: object): Promise<any>;
    startClock({ customerId, serviceId, billable }: {
        customerId: string;
        serviceId: string;
        billable: Billable;
    }, options?: object): Promise<any>;
    addCustomer({ name }: {
        name: string;
    }, options?: object): Promise<any>;
    addProject({ name, customerId }: {
        name: string;
        customerId: string;
    }, options?: object): Promise<any>;
    addService({ name }: {
        name: string;
    }, options?: object): Promise<any>;
    addUser({ name, number, email, role }: {
        name: string;
        number: string;
        email: string;
        role: string;
    }, options?: object): Promise<any>;
    addEntry({ customerId, serviceId, billable }: {
        customerId: string;
        serviceId: string;
        billable: Billable;
    }, options?: object): Promise<any>;
    addAbsence({ dateSince, dateUntil, type }: {
        dateSince: string;
        dateUntil: string;
        type: AbsenceType;
    }, options?: object): Promise<any>;
    stopClock({ entryId }: {
        entryId: string;
    }, options?: object): Promise<any>;
    deactivateCustomer({ customerId }: {
        customerId: string;
    }, options?: object): Promise<any>;
    deactivateProject({ projectId }: {
        projectId: string;
    }, options?: object): Promise<any>;
    deactivateService({ serviceId }: {
        serviceId: string;
    }, options?: object): Promise<any>;
    deactivateUser({ userId }: {
        userId: string;
    }, options?: object): Promise<any>;
    deleteEntry({ entryId }: {
        entryId: string;
    }, options?: object): Promise<any>;
    deleteEntryGroup({ timeSince, timeUntil }: {
        timeSince: string;
        timeUntil: string;
    }, options?: object): Promise<any>;
    deleteAbsence({ absenceId }: {
        absenceId: string;
    }, options?: object): Promise<any>;
    editCustomer({ customerId }: {
        customerId: string;
    }, options?: object): Promise<any>;
    editProject({ projectId }: {
        projectId: string;
    }, options?: object): Promise<any>;
    editService({ serviceId }: {
        serviceId: string;
    }, options?: object): Promise<any>;
    editUser({ userId }: {
        userId: string;
    }, options?: object): Promise<any>;
    editEntryGroup({ timeSince, timeUntil }: {
        timeSince: string;
        timeUntil: string;
    }, options?: object): Promise<any>;
    editAbsence({ absenceId }: {
        absenceId: string;
    }, options?: object): Promise<any>;
    editEntry({ entryId }: {
        entryId: string;
    }, options?: object): Promise<any>;
}
export {};
