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
} from "./interfaces.js";

export type AbsenceReturnType = { absence: Absence };
export type AbsencesReturnType = { absences: Array<Absence> };
export type DeleteReturnType = { success: true };
export type CustomerReturnType = { customer: Customer };
export type CustomersReturnType = { customers: Array<Customer> };
export type ProjectReturnType = { project: Project };
export type ServiceReturnType = { service: Service };
export type ServicesReturnType = { services: Array<Service> };
export type LumpsumServiceReturnType = {
    // This endpoint still uses the old lumpSum casing
    lumpSumService: LumpsumService;
};
export type LumpsumServicesReturnType = {
    // This endpoint still uses the old lumpSum casing
    lumpSumServices: Array<LumpsumService>;
};
export type UserReturnType = { user: User };
export type UsersReturnType = { users: Array<User> };
export type EntryReturnType = { entry: Entry };
export type AddEntryReturnType = { entry: Entry; stopped?: Entry };
export type EditEntryReturnType = {
    entry: Entry;
    running: null | TimeEntry;
};
export type EntriesReturnType = {
    paging: Paging;
    filter: Filter | null;
    entries: Array<Entry>;
};
export type TaskDurationReturnType = { task: { duration: number } };
export type TasksReturnType = {
    days: Array<{
        date: string;
        dateText: string;
        duration: number;
        durationText: string;
        tasks: Array<Task>;
    }>;
};
export type EntryGroupsReturnType = { groups: Array<EntryGroup> };
export type EditEntryGroupsReturnType =
    | { confirmKey: string; affectedEntries: number }
    | { success: true; editedEntries: number };
export type DeleteEntryGroupsReturnType =
    | { confirmKey: string; affectedEntries: number }
    | { success: true; deletedEntries: number };
export type UserReportReturnType = { userreport: UserReport };
export type UserReportsReturnType = { userreports: Array<UserReport> };
export type ClockReturnType = {
    running: null | TimeEntry;
    currentTime: string;
};
export type ClockStartReturnType = {
    running: TimeEntry;
    stopped?: TimeEntry;
    currentTime: string;
};
export type ClockStopReturnType = {
    stopped: TimeEntry;
    running: null | TimeEntry;
    currentTime: string;
};
export type ClockEditReturnType = {
    updated: TimeEntry;
    running: null | TimeEntry;
    currentTime: string;
};
export type SearchTextsReturnType = { texts: Array<string> };

export type TargethoursRowReturnType = {
    targethoursRow: TargethoursRow;
};
export type TargethoursReturnType = {
    targethours: Array<TargethoursRow>;
};
export type AddUserReturnType = {
    success: "true";
    user: User;
    apikey: string;
};
