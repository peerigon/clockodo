import {Absence, Customer, Project, Service, User, Entry, Paging, Filter, Task, EntryGroup, UserReport, TargetHoursRow} from "./interfaces";

export type AbsenceReturnType = Promise<{ absence: Absence }>;
export type AbsencesReturnType = Promise<{ absences: Array<Absence> }>;
export type DeleteReturnType = Promise<{ success: true }>;
export type CustomerReturnType = Promise<{ customer: Customer }>;
export type CustomersReturnType = Promise<{ customers: Array<Customer> }>;
export type ProjectReturnType = Promise<{ project: Project }>;
export type ServiceReturnType = Promise<{ service: Service }>;
export type ServicesReturnType = Promise<{ services: Array<Service> }>;
export type UserReturnType = Promise<{ user: User }>;
export type UsersReturnType = Promise<{ users: Array<User> }>;
export type EntryReturnType = Promise<{ entry: Entry }>;
export type EntriesReturnType = Promise<{ paging: Paging; filter: Filter | null; entries: Array<Entry> }>;
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
export type ClockReturnType = Promise<{ running: null | Entry }>;
export type ClockStopReturnType = Promise<{ stopped: Entry; running: null | Entry }>;
export type ClockEditReturnType = Promise<{ updated: Entry; running: null | Entry }>;
export type ClockUpdateReturnType = Promise<{
    running: null | Entry;
    services: Array<Service>;
    projects: Array<{ id: number; name: string; access: { add: boolean; edit: boolean } }>;
    billable: { [key: string]: number };
    user: User;
}>;
export type SearchTextsReturnType = Promise<{ texts: Array<string> }>;
export type TargetHourReturnType = Promise<{ targethours: TargetHoursRow }>;
export type TargetHoursReturnType = Promise<{ targethours: Array<TargetHoursRow> }>;
export type AddUserReturnType = Promise<{ success: "true"; user: User; apikey: string }>;
