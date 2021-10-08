export type UserReport = {
  usersId: number;
  usersName: string;
  sumTarget: number;
  sumHours: number;
  sumReductionUsed: number;
  sumReductionPlanned: number;
  overtimeCarryover: number;
  overtimeReduced: number;
  diff: number;
  holidaysQuota: number;
  holidaysCarry: number;
  holidaysUsed: number;
  specialHolidays: number;
  sickdays: number;
  monthDetails: Array<UserReportMonth>;
};

export type UserReportMonth = {
  nr: number;
  sumTarget: number;
  sumHours: number;
  sumHoursWithoutCompensation: number;
  sumReductionUsed: number;
  sumOvertimeReduced: number;
  diff: number;
  weekDetails: Array<UserReportWeek>;
};

export type UserReportWeek = {
  nr: number;
  sumTarget: number;
  sumHours: number;
  sumReductionUsed: number;
  diff: number;
  dayDetails: Array<UserReportDay>;
};

export type UserReportDay = {
  date: string;
  weekday: number;
  nonbusiness: boolean;
  countSick: number;
  countRegularHolidays: number;
  countSpecialLeaves: number;
  countHolidays: number;
  countOtReductionUsed: number;
  target: number;
  targetRaw: number;
  hours: number;
  hoursWithoutCompensation: number;
  diff: number;
  workStart: string;
  workEnd: string;
  breaks: Array<Break>;
};

export type Break = {
  since: string;
  until: string;
  length: number;
};
