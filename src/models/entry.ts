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

// Initially we've split up TimeEntry here into ClockingTimeEntry | ClockedTimeEntry | ManualTimeEntry
// We had to revert this because the shared 'type' tag property does not differentiate between
// these types. Without a shared tag property, it's impossible for TypeScript to infer the correct type.
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

export type Entry = TimeEntry | LumpsumValueEntry | LumpsumServiceEntry;
