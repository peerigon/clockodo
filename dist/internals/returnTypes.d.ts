import { Absence, Customer, Project, Service, User, Entry, Paging, Filter, Task, EntryGroup, UserReport, TargetHoursRow } from "./interfaces";
export declare type AbsenceReturnType = Promise<{
    absence: Absence;
}>;
export declare type AbsencesReturnType = Promise<{
    absences: Array<Absence>;
}>;
export declare type DeleteReturnType = Promise<{
    success: true;
}>;
export declare type CustomerReturnType = Promise<{
    customer: Customer;
}>;
export declare type CustomersReturnType = Promise<{
    customers: Array<Customer>;
}>;
export declare type ProjectReturnType = Promise<{
    project: Project;
}>;
export declare type ServiceReturnType = Promise<{
    service: Service;
}>;
export declare type ServicesReturnType = Promise<{
    services: Array<Service>;
}>;
export declare type UserReturnType = Promise<{
    user: User;
}>;
export declare type UsersReturnType = Promise<{
    users: Array<User>;
}>;
export declare type EntryReturnType = Promise<{
    entry: Entry;
}>;
export declare type EntriesReturnType = Promise<{
    paging: Paging;
    filter: Filter | null;
    entries: Array<Entry>;
}>;
export declare type TaskDurationReturnType = Promise<{
    task: {
        duration: number;
    };
}>;
export declare type TasksReturnType = Promise<{
    days: Array<{
        date: string;
        dateText: string;
        duration: number;
        durationText: string;
        tasks: Array<Task>;
    }>;
}>;
export declare type EntryGroupsReturnType = Promise<{
    groups: Array<EntryGroup>;
}>;
export declare type EditEntryGroupsReturnType = Promise<{
    confirmKey: string;
    affectedEntries: number;
} | {
    success: true;
    editedEntries: number;
}>;
export declare type DeleteEntryGroupsReturnType = Promise<{
    confirmKey: string;
    affectedEntries: number;
} | {
    success: true;
    deletedEntries: number;
}>;
export declare type UserReportReturnType = Promise<{
    userreport: UserReport;
}>;
export declare type UserReportsReturnType = Promise<{
    userreports: Array<UserReport>;
}>;
export declare type ClockReturnType = Promise<{
    running: Entry;
}>;
export declare type ClockStopReturnType = Promise<{
    stopped: Entry;
    running: Entry;
}>;
export declare type ClockEditReturnType = Promise<{
    updated: Entry;
    running: Entry;
}>;
export declare type ClockUpdateReturnType = Promise<{
    running: Entry;
    services: Array<Service>;
    projects: Array<{
        id: number;
        name: string;
        access: {
            add: boolean;
            edit: boolean;
        };
    }>;
    billable: {
        [key: string]: number;
    };
    user: User;
}>;
export declare type SearchTextsReturnType = Promise<{
    texts: Array<string>;
}>;
export declare type TargetHourReturnType = Promise<{
    targethours: TargetHoursRow;
}>;
export declare type TargetHoursReturnType = Promise<{
    targethours: Array<TargetHoursRow>;
}>;
export declare type AddUserReturnType = Promise<{
    success: "true";
    user: User;
    apikey: string;
}>;
