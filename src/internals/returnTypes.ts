import {
    Absence,
    Customer,
    Project,
    Service,
    User,
    TimeEntry,
    Entry,
    Paging,
    Filter,
    Task,
    EntryGroup,
    UserReport,
    TargetHoursRow,
    LumpSumService,
} from "./interfaces";

export type AbsenceReturnType = Promise<{ absence: Absence }>;
export type AbsencesReturnType = Promise<{ absences: Array<Absence> }>;
export type DeleteReturnType = Promise<{ success: true }>;
export type CustomerReturnType = Promise<{ customer: Customer }>;
export type CustomersReturnType = Promise<{ customers: Array<Customer> }>;
export type ProjectReturnType = Promise<{ project: Project }>;
export type ServiceReturnType = Promise<{ service: Service }>;
export type ServicesReturnType = Promise<{ services: Array<Service> }>;
export type LumpSumServicesReturnType = Promise<{
    lumpSumServices: Array<LumpSumService>;
}>;
export type UserReturnType = Promise<{ user: User }>;
export type UsersReturnType = Promise<{ users: Array<User> }>;
export type EntryReturnType = Promise<{ entry: Entry }>;
export type AddEntryReturnType = Promise<{ entry: Entry; stopped?: Entry }>;
export type EditEntryReturnType = Promise<{
    entry: Entry;
    running: null | TimeEntry;
}>;
export type EntriesReturnType = Promise<{
    paging: Paging;
    filter: Filter | null;
    entries: Array<Entry>;
}>;
export type TaskDurationReturnType = Promise<{ task: { duration: number } }>;
export type TasksReturnType = Promise<{
    days: Array<{
        date: string;
        dateText: string;
        duration: number;
        durationText: string;
        tasks: Array<Task>;
    }>;
}>;
export type EntryGroupsReturnType = Promise<{ groups: Array<EntryGroup> }>;
export type EditEntryGroupsReturnType = Promise<
    | { confirmKey: string; affectedEntries: number }
    | { success: true; editedEntries: number }
>;
export type DeleteEntryGroupsReturnType = Promise<
    | { confirmKey: string; affectedEntries: number }
    | { success: true; deletedEntries: number }
>;
export type UserReportReturnType = Promise<{ userreport: UserReport }>;
export type UserReportsReturnType = Promise<{ userreports: Array<UserReport> }>;
export type ClockReturnType = Promise<{ running: null | TimeEntry }>;
export type ClockStartReturnType = Promise<{
    running: TimeEntry;
    stopped?: TimeEntry;
}>;
export type ClockStopReturnType = Promise<{
    stopped: TimeEntry;
    running: null | TimeEntry;
}>;
export type ClockEditReturnType = Promise<{
    updated: TimeEntry;
    running: null | TimeEntry;
}>;
export type ClockUpdateReturnType = Promise<{
    running: null | TimeEntry;
    services: Array<Service>;
    projects: Array<{
        id: number;
        name: string;
        access: { add: boolean; edit: boolean };
    }>;
    billable: { [key: string]: number };
    user: User;
}>;
export type SearchTextsReturnType = Promise<{ texts: Array<string> }>;
export type TargetHourReturnType = Promise<{ targethours: TargetHoursRow }>;
export type TargetHoursReturnType = Promise<{
    targethours: Array<TargetHoursRow>;
}>;
export type AddUserReturnType = Promise<{
    success: "true";
    user: User;
    apikey: string;
}>;
