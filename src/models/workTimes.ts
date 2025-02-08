import { type IsoDate, type IsoUtcDateTime } from "./dateTime.js";

export type WorkTimeDay = {
  date: IsoDate;
  usersId: number;
  intervals: Array<WorkTimeDayInterval>;
  offset: number;
};

export type WorkTimeDayInterval = {
  timeSince: IsoUtcDateTime;
  timeUntil: null | IsoUtcDateTime;
};

export enum WorkTimeChangeRequestStatus {
  Requested = 1,
  Declined = 2,
}

export type WorkTimeChangeRequest = {
  id: number;
  date: IsoDate;
  usersId: number;
  createdAt: IsoUtcDateTime;
  changes: Array<WorkTimeChangeRequestInterval>;
} & (
  | {
      status: WorkTimeChangeRequestStatus.Declined;
      declinedAt: IsoDate;
      declinedBy: number;
    }
  | {
      status: WorkTimeChangeRequestStatus.Requested;
    }
);

export type WorkTimeChangeRequestInterval = {
  type: WorkTimeChangeRequestIntervalType;
  timeSince: IsoUtcDateTime;
  timeUntil: IsoUtcDateTime;
};

export enum WorkTimeChangeRequestIntervalType {
  Add = 1,
  Remove = 2,
}
