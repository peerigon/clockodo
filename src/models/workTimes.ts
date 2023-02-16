export enum WorkTimeDayVariantStatus {
  Requested = 1,
  Approved = 2,
}

export type WorkTimeInterval = {
  timeSince: string;
  timeUntil: null | string;
};

export type WorkTimeDayVariant = {
  /** The ID of the work time day variant */
  id: number;
  /** The day for which the work time day variant is valid */
  date: string;
  /** The user ID for whom the work time day variant is valid */
  usersId: number;
  /** The status of the work time day variant */
  status: WorkTimeDayVariantStatus;
  /** The time intervals that the work time day variant consists of */
  intervals: Array<WorkTimeInterval>;
  /** The total duration of the work time day variant's intervals; gets calculated dynamically from offset + interval durations
   *   Current duration of the clocking interval will be included
   */
  duration: number;
  /** Is there a clocking time entry contained in the work time day variant */
  clocking: boolean;
};
