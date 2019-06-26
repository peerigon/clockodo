import { Absence, Customer, Project, Service, User, Entry, Paging, Filter, Task, EntryGroup, UserReport, TargetHoursRow } from "./interfaces";
export declare type AbsenceReturnType = Promise<{
    absence: Absence;
}>;
export declare type AbsencesReturnType = Promise<{
    absences: Absence[];
}>;
export declare type DeleteReturnType = Promise<{
    success: true;
}>;
export declare type CustomerReturnType = Promise<{
    customer: Customer;
}>;
export declare type CustomersReturnType = Promise<{
    customers: Customer[];
}>;
export declare type ProjectReturnType = Promise<{
    project: Project;
}>;
export declare type ServiceReturnType = Promise<{
    service: Service;
}>;
export declare type ServicesReturnType = Promise<{
    services: Service[];
}>;
export declare type UserReturnType = Promise<{
    user: User;
}>;
export declare type UsersReturnType = Promise<{
    users: User[];
}>;
export declare type EntryReturnType = Promise<{
    entry: Entry;
}>;
export declare type EntriesReturnType = Promise<{
    paging: Paging;
    filter: Filter | null;
    entries: Entry[];
}>;
export declare type TaskDurationReturnType = Promise<{
    task: {
        duration: number;
    };
}>;
export declare type TasksReturnType = Promise<{
    days: {
        date: string;
        dateText: string;
        duration: number;
        durationText: string;
        tasks: Task[];
    }[];
}>;
export declare type EntryGroupsReturnType = Promise<{
    groups: EntryGroup[];
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
    userreports: UserReport[];
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
    services: Service[];
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
    texts: string[];
}>;
export declare type TargetHourReturnType = Promise<{
    targethours: TargetHoursRow;
}>;
export declare type TargetHoursReturnType = Promise<{
    targethours: TargetHoursRow[];
}>;
export declare type AddUserReturnType = Promise<{
    success: "true";
    user: User;
    apikey: string;
}>;
