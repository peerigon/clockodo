export enum EntryType {
  Time = 1,
  LumpsumValue = 2,
  LumpsumService = 3,
}

export enum Billability {
  NotBillable = 0,
  Billable = 1,
  Billed = 2,
}

export type TimeEntryBillability =
  | Billability.NotBillable
  | Billability.Billable
  | Billability.Billed;

export type ClockingTimeEntryBillability =
  | Billability.NotBillable
  | Billability.Billable;

export type LumpsumEntryBillability = Billability.Billable | Billability.Billed;

type CommonEntry = {
  id: number;
  customersId: number;
  projectsId: number | null;
  usersId: number;
  textsId: number | null;
  text: string | null;
  timeSince: string;
  timeInsert: string;
  timeLastChange: string;
};

export type TimeEntry = CommonEntry & {
  type: EntryType.Time;
  servicesId: number;
  /** Will be null if clocked is false */
  timeClockedSince: string | null;
  timeUntil: string | null;
  timeLastChangeWorkTime: string;
  billable: TimeEntryBillability;
  duration: number | null;
  clocked: boolean;
  clockedOffline: boolean;
  /** Only present with sufficient access rights */
  hourlyRate?: number;
};

export type ClockingTimeEntry = TimeEntry & {
  timeUntil: null;
  timeClockedSince: string;
  clocked: true;
};

export type ClockedTimeEntry = TimeEntry & {
  timeUntil: string;
  timeClockedSince: string;
  clocked: true;
};

export type ClockTimeEntry = ClockingTimeEntry | ClockedTimeEntry;

export type ManualTimeEntry = TimeEntry & {
  timeUntil: string;
  timeClockedSince: null;
  clocked: false;
  clockedOffline: false;
};

export type LumpsumValueEntry = CommonEntry & {
  type: EntryType.LumpsumValue;
  timeUntil: string;
  billable: LumpsumEntryBillability;
  servicesId: number;
  lumpsum: number;
};

export type LumpsumServiceEntry = CommonEntry & {
  type: EntryType.LumpsumService;
  timeUntil: string;
  billable: LumpsumEntryBillability;
  lumpsumServicesId: number;
  lumpsumServicesAmount: number;
};

export type LumpsumEntry = LumpsumValueEntry | LumpsumServiceEntry;

export type Entry = TimeEntry | LumpsumEntry;

export const isClockingTimeEntry = (
  entry: Entry
): entry is ClockingTimeEntry => {
  return entry.type === EntryType.Time && entry.timeUntil === null;
};

export const isClockedTimeEntry = (entry: Entry): entry is ClockedTimeEntry => {
  return (
    entry.type === EntryType.Time &&
    entry.clocked === true &&
    typeof entry.timeUntil === "string"
  );
};

export const isClockTimeEntry = (entry: Entry): entry is ClockTimeEntry => {
  return isClockedTimeEntry(entry) || isClockingTimeEntry(entry);
};

export const isManualTimeEntry = (entry: Entry): entry is ClockTimeEntry => {
  return entry.type === EntryType.Time && entry.clocked === false;
};

export const isTimeEntry = (entry: Entry): entry is TimeEntry => {
  return isClockTimeEntry(entry) || isManualTimeEntry(entry);
};

export const isLumpsumEntry = (entry: Entry): entry is LumpsumEntry => {
  return (
    entry.type === EntryType.LumpsumValue ||
    entry.type === EntryType.LumpsumService
  );
};
