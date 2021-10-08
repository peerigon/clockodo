import { NO_WORKTIME_REGULATIONS_ID } from "./worktimeRegulation.js";

export type User = {
  /** ID of the co-worker  */
  id: number;
  /** Name of the co-worker  */
  name: string;
  /** Personnel number */
  number: string | null;
  /** E-mail-address of the co-worker  */
  email: string;
  /** Role of the co-worker */
  role: UserRole;
  /** Is the co-worker active? */
  active: boolean;
  /** Is the co-worker using the 12h time format? */
  timeformat12h: boolean;
  /** Does the week start on Monday for the co-worker? If not, the week starts on Sunday */
  weekstartMonday: boolean;
  /** Is the weekend Friday and Saturday for the co-worker? If not, it is Saturday and Sunday */
  weekendFriday: boolean;
  /** The co-worker's language */
  language: UserLanguage;
  /** The co-worker's timezone e.g. 'Europe/Berlin' */
  timezone: string;
  /** Only relevant for the DATEV export */
  wageType: UserWageType | null;
  /** Is the co-worker allowed to see other co-workers' absences? Only editable for co-workers with the role 'worker' */
  canGenerallySeeAbsences: boolean;
  /** Is the co-worker allowed to edit other co-workers' absences? Only editable for co-workers with the role 'manager' */
  canGenerallyManageAbsences: boolean;
  /** Is the co-worker allowed to add customers? Only editable for co-workers with the role 'worker' */
  canAddCustomers: boolean;
  /**
   * Fixed edit lock for this co-worker:
   * - null (No edit lock)
   * - YYYY-MM-DD (Not editable until)
   **/
  editLock: string | null;
  /** Dynamic edit lock for this co-worker  */
  editLockDyn: UserEditLockTimeframe | null;
  /** Can future changes to the company-wide edit lock overwrite the edit lock for this co-worker? */
  editLockSync: boolean | null;
  /**
   * The worktime regulation applicable to the co-worker:
   * - "0" if the co-worker has no worktime regulation
   * - "null" if the company default is applicable
   **/
  worktimeRegulationId: number | typeof NO_WORKTIME_REGULATIONS_ID | null;
  /** The co-worker's team id */
  teamsId: null;
};

export enum UserRole {
  Owner = "owner",
  Manager = "manager",
  Worker = "worker",
}

export enum UserLanguage {
  De = "de",
  En = "en",
  Fr = "fr",
}

export enum UserWageType {
  Salary = 1,
  HourlyWage = 2,
}

export enum UserEditLockTimeframe {
  Today = 1,
  TodayAndYesterday = 2,
  TodayAnd2DaysBefore = 3,
  TodayAnd4DaysBefore = 5,
  TodayAnd1WeekBefore = 8,
  TodayAnd2WeeksBefore = 15,
  TodayAnd30DaysBefore = 31,
  TodayAnd90DaysBefore = 91,
}
