/**
 * Entry model types and entry-specific runtime utility helpers.
 *
 * @module
 */
import { isoUtcDateTimeFromDateTime } from "../lib/dateTime.js";
import { type LumpsumService } from "./lumpsumService.js";
import { type Project } from "./project.js";

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
  /** Only present if the duration is not linked to timeSince and timeUntil */
  offset?: number;
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

export type FinishedTimeEntry = ClockedTimeEntry | ManualTimeEntry;

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
  entry: Entry,
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

export const isManualTimeEntry = (entry: Entry): entry is ManualTimeEntry => {
  return entry.type === EntryType.Time && entry.clocked === false;
};

export const isFinishedTimeEntry = (
  entry: Entry,
): entry is FinishedTimeEntry => {
  return isClockedTimeEntry(entry) || isManualTimeEntry(entry);
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

/**
 * Returns the entry's timeUntil property as ISO string. If the entry is
 * currently clocking, timeUntil is new Date().toISOString() without
 * milliseconds precision.
 */
export const getEntryTimeUntilNow = (entry: Entry): string => {
  return entry.timeUntil ?? isoUtcDateTimeFromDateTime(new Date());
};

/**
 * Returns the entry's duration in seconds. In case the entry is currently
 * clocking, the duration will be from timeSince until now.
 */
export const getEntryDurationUntilNow = (entry: Entry): number => {
  // We allow passing non-time entries so that you don't need to filter
  // the entries before summing up their durations.
  // This seems to be reasonable since non-time entries have a timeUntil
  // property anyway.
  if (entry.type !== EntryType.Time) return 0;
  if (entry.duration !== null) return entry.duration + (entry.offset ?? 0);

  const timeUntil = getEntryTimeUntilNow(entry);
  const durationInMillis =
    new Date(timeUntil).getTime() - new Date(entry.timeSince).getTime();

  return Math.floor(durationInMillis / 1000);
};

/**
 * Calculates the entry's revenue based on the hourly rate and the project's
 * revenue factor or the amount and lumpsum service price.
 *
 * Returns undefined if the entry or project did not contain enough information
 * to calculate the revenue (because of insufficient access rights).
 *
 * Throws an error if the provided project or lumpsum service does not match the
 * entry.
 */
export const getEntryRevenue = ({
  entry,
  project,
  lumpsumService,
}: {
  entry: Entry;
  project?: Project;
  lumpsumService?: LumpsumService;
}): number | undefined => {
  if (entry.billable === Billability.NotBillable) return 0;

  switch (entry.type) {
    case EntryType.Time: {
      let revenueFactor: Project["revenueFactor"];

      if (entry.projectsId === null) {
        revenueFactor = 1;
      } else {
        if (entry.projectsId !== project?.id) {
          throw new Error(
            `The entries projects id (${entry.projectsId}) does not match the project's id (${project?.id})`,
          );
        }
        revenueFactor = project.revenueFactor;
      }
      const { hourlyRate } = entry;

      if (hourlyRate === undefined || revenueFactor === undefined)
        return undefined;
      if (revenueFactor === null) return 0;

      const durationInHours = getEntryDurationUntilNow(entry) / (60 * 60);

      return hourlyRate * durationInHours * revenueFactor;
    }
    case EntryType.LumpsumValue: {
      // LumpsumValue entries are not affected by the revenueFactor
      return entry.lumpsum;
    }
    case EntryType.LumpsumService: {
      if (entry.lumpsumServicesId !== lumpsumService?.id) {
        throw new Error(
          `The entries lumpsum services id (${entry.lumpsumServicesId}) does not match the lumpsum service's id (${lumpsumService?.id})`,
        );
      }

      // LumpsumService entries are not affected by the revenueFactor
      return entry.lumpsumServicesAmount * lumpsumService.price;
    }
  }
  // @ts-expect-error JS-only safety check
  throw new Error(`Unsupported entry type ${entry.type}`);
};
