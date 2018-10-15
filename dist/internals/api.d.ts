export declare const ENTRY_UNBILLABLE = 0;
export declare const ENTRY_BILLABLE = 1;
export declare const ENTRY_BILLED = 2;
export declare const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
export declare const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
export declare const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
export declare const ABSENCE_TYPE_SICK_DAY = 4;
export declare const ABSENCE_STATUS_APPROVED = 0;
export declare const ABSENCE_STATUS_DECLINED = 1;
export declare const ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
export declare const ABSENCE_STATUS_REQUEST_CANCELLED = 4;
export declare class Clockodo {
    constructor({ user, apiKey }: {
        user: any;
        apiKey: any;
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
    }, options: any): Promise<any>;
    getEntryGroups({ timeSince, timeUntil, grouping }: {
        timeSince: any;
        timeUntil: any;
        grouping: any;
    }, options: any): Promise<any>;
    getProject({ id }: {
        id: any;
    }): Promise<any>;
    getSearchTexts(options: any): Promise<any>;
    getService({ id }: {
        id: any;
    }): Promise<any>;
    getServices(): Promise<any>;
    getTaskDuration({ taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable }: {
        taskCustomerId: any;
        taskProjectId: any;
        taskServiceId: any;
        taskText: any;
        taskBillable: any;
    }, options: any): Promise<any>;
    getTasks(options: any): Promise<any>;
    getUser({ id }: {
        id: any;
    }): Promise<any>;
    getUsers(): Promise<any>;
    getUserReport({ id, year }: {
        id: any;
        year: any;
    }, options: any): Promise<any>;
    getUserReports({ year }: {
        year: any;
    }, options: any): Promise<any>;
    changeClockDuration({ entryId, durationBefore, duration }: {
        entryId: any;
        durationBefore: any;
        duration: any;
    }, options: any): Promise<any>;
    startClock({ customerId, serviceId, billable }: {
        customerId: any;
        serviceId: any;
        billable: any;
    }, options: any): Promise<any>;
    addCustomer({ name }: {
        name: any;
    }, options: any): Promise<any>;
    addProject({ name, customerId }: {
        name: any;
        customerId: any;
    }, options: any): Promise<any>;
    addService({ name }: {
        name: any;
    }, options: any): Promise<any>;
    addUser({ name, number, email, role }: {
        name: any;
        number: any;
        email: any;
        role: any;
    }, options: any): Promise<any>;
    addEntry({ customerId, serviceId, billable }: {
        customerId: any;
        serviceId: any;
        billable: any;
    }, options: any): Promise<any>;
    addAbsence({ dateSince, dateUntil, type }: {
        dateSince: any;
        dateUntil: any;
        type: any;
    }, options: any): Promise<any>;
    stopClock({ entryId }: {
        entryId: any;
    }, options: any): Promise<any>;
    deactivateCustomer({ customerId }: {
        customerId: any;
    }, options: any): Promise<any>;
    deactivateProject({ projectId }: {
        projectId: any;
    }, options: any): Promise<any>;
    deactivateService({ serviceId }: {
        serviceId: any;
    }, options: any): Promise<any>;
    deactivateUser({ userId }: {
        userId: any;
    }, options: any): Promise<any>;
    deleteEntry({ entryId }: {
        entryId: any;
    }, options: any): Promise<any>;
    deleteEntryGroup({ timeSince, timeUntil }: {
        timeSince: any;
        timeUntil: any;
    }, options: any): Promise<any>;
    deleteAbsence({ absenceId }: {
        absenceId: any;
    }, options: any): Promise<any>;
    editCustomer({ customerId }: {
        customerId: any;
    }, options: any): Promise<any>;
    editProject({ projectId }: {
        projectId: any;
    }, options: any): Promise<any>;
    editService({ serviceId }: {
        serviceId: any;
    }, options: any): Promise<any>;
    editUser({ userId }: {
        userId: any;
    }, options: any): Promise<any>;
    editEntryGroup({ timeSince, timeUntil }: {
        timeSince: any;
        timeUntil: any;
    }, options: any): Promise<any>;
    editAbsence({ absenceId }: {
        absenceId: any;
    }, options: any): Promise<any>;
    editEntry({ entryId }: {
        entryId: any;
    }, options: any): Promise<any>;
}
