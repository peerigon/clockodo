export type WorkTimeDay = {
  date: string;
  usersId: number;
  intervals: Array<WorkTimeDayTimeInterval>;
  offset: number;
};

export type WorkTimeDayTimeInterval = {
  timeSince: string;
  timeUntil: null | string;
};

export type ChangeRequest = {
  id: number;
  date: string;
  usersId: number;
  changes: Array<ChangeRequestTimeInterval>;
};

export type ChangeRequestTimeInterval = {
  type: ChangeRequestTimeIntervalType;
  timeSince: string;
  timeUntil: string;
};

export enum ChangeRequestTimeIntervalType {
  Add,
  Remove,
}
