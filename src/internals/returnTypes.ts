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
    TargethoursRow,
    LumpsumService,
} from "./interfaces";

export type AbsenceReturnType = Promise<{ absence: Absence }>;
export type AbsencesReturnType = Promise<{ absences: Array<Absence> }>;
export type DeleteReturnType = Promise<{ success: true }>;
export type CustomerReturnType = Promise<{ customer: Customer }>;
export type CustomersReturnType = Promise<{ customers: Array<Customer> }>;
export type ProjectReturnType = Promise<{ project: Project }>;
export type ServiceReturnType = Promise<{ service: Service }>;
export type ServicesReturnType = Promise<{ services: Array<Service> }>;
export type LumpsumServiceReturnType = Promise<{
    // This endpoint still uses the old lumpSum casing
    lumpSumService: LumpsumService;
}>;
export type LumpsumServicesReturnType = Promise<{
    // This endpoint still uses the old lumpSum casing
    lumpSumServices: Array<LumpsumService>;
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
export type ClockReturnType = Promise<{
    running: null | TimeEntry;
    currentTime: string;
}>;
export type ClockStartReturnType = Promise<{
    running: TimeEntry;
    stopped?: TimeEntry;
    currentTime: string;
}>;
export type ClockStopReturnType = Promise<{
    stopped: TimeEntry;
    running: null | TimeEntry;
    currentTime: string;
}>;
export type ClockEditReturnType = Promise<{
    updated: TimeEntry;
    running: null | TimeEntry;
    currentTime: string;
}>;
export type SearchTextsReturnType = Promise<{ texts: Array<string> }>;

export type TargethoursRowReturnType = Promise<{
    targethoursRow: TargethoursRow;
}>;
export type TargethoursReturnType = Promise<{
    targethours: Array<TargethoursRow>;
}>;
export type AddUserReturnType = Promise<{
    success: "true";
    user: User;
    apikey: string;
}>;
