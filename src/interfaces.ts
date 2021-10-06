import {
  EntryType,
  LumpsumEntryBillability,
  TimeEntryBillability,
  UserEditLockTimeframe,
  UserLanguage,
  UserRole,
  UserWageType,
} from "./enums.js";
import { NO_WORKTIME_REGULATIONS_ID } from "./ids.js";

export type Customer = {
  id: number;
  name: string;
  number: string | null;
  active: boolean;
  billableDefault: boolean;
  note?: string | null;
  projects?: Array<Project> | null;
  color: number;
};

export type Project = {
  id: number;
  customersId: number;
  name: string;
  number: string | null;
  active: boolean;
  billableDefault: boolean;
  note?: string | null;
  budgetMoney?: number | null;
  budgetIsHours?: boolean;
  budgetIsNotStrict?: boolean;
  completed?: boolean;
  billedMoney?: number | null;
  billedCompletely?: boolean | null;
  revenueFactor?: number | null;
};

export type Service = {
  id: number;
  name: string;
  number: string | null;
  active: boolean;
  note: string | null;
};

export type LumpsumService = {
  id: number;
  name: string;
  price: number;
  unit: string | null;
  active: boolean;
  number: string | null;
  note: string | null;
};

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

/** @deprecated */
export type Task = {
  /** @deprecated */
  day: string;
  /** @deprecated */
  customersId: number;
  /** @deprecated */
  customersName: string;
  /** @deprecated */
  projectsId: number | 0;
  /** @deprecated */
  projectsName: string | null;
  /** @deprecated */
  servicesId: number | null;
  /** @deprecated */
  servicesName: string | null;
  /** @deprecated */
  lumpsumsId: number | null;
  /** @deprecated */
  lumpsumsAmount: number | null;
  /** @deprecated */
  lumpsumsName: string | null;
  /** @deprecated */
  lumpsumsPrice: number | null;
  /** @deprecated */
  lumpsumsUnit: string | null;
  /** @deprecated */
  billable: 0 | 1;
  /** @deprecated */
  textsId: number | 0;
  /** @deprecated */
  text: string | null;
  /** @deprecated */
  timeSince: string;
  /** @deprecated */
  timeUntil: string;
  /** @deprecated */
  duration: number;
  /** @deprecated */
  durationTime: string;
  /** @deprecated */
  durationText: string;
  /** @deprecated */
  isClocking: boolean;
  /** @deprecated */
  hasJustLumpsums: boolean;
  /** @deprecated */
  revenue?: number;
};

export type EntryGroup = {
  groupedBy: string;
  group: string | number;
  name: string;
  number: string;
  note: string;
  restrictions: Array<string>;
  duration: number;
  revenue?: number;
  budgetUsed?: boolean;
  hasBudgetRevenuesBilled?: boolean;
  hasBudgetRevenuesNotBilled?: boolean;
  hasNonBudgetRevenuesBilled?: boolean;
  hasNonBudgetRevenuesNotBilled?: boolean;
  hourlyRate?: number | null;
  hourlyRateIsEqualAndHasNoLumpsums?: boolean;
  durationWithoutRounding?: number;
  revenueWithoutRounding?: number;
  roundingSuccess?: boolean;
  subGroups?: Array<EntryGroup>;
};

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

export type Break = {
  since: string;
  until: string;
  length: number;
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

export type Absence = {
  id: number;
  usersId: number;
  dateSince: string;
  dateUntil: string;
  status: number;
  type: number;
  note: string;
  countDays: number;
  countHours: number;
  dateEnquired: string;
  dateApproved: string;
  approvedBy: number;
};

export type TargethoursRow = {
  id: number;
  usersId: number;
  type: string;
  dateSince: string;
  dateUntil: string | null;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  absenceFixedCredit: boolean;
  compensationDaily: number;
  compensationMonthly: number;
  monthlyTarget: number;
  workdayMonday: boolean;
  workdayTuesday: boolean;
  workdayWednesday: boolean;
  workdayThursday: boolean;
  workdayFriday: boolean;
  workdaySaturday: boolean;
  workdaySunday: boolean;
};

export type HolidayquotaRow = {
  id: number;
  usersId: number;
  yearSince: number;
  yearUntil: number | null;
  count: number;
};

export type HolidayscarryRow = {
  usersId: number;
  year: number;
  count: number;
  note: string;
};

export type Paging = {
  itemsPerPage: number;
  currentPage: number;
  countPages: number;
  countItems: number;
};

export type Filter = {
  usersId?: number;
  customersId?: number;
  projectsId?: number;
  servicesId?: number;
  billable?: number;
  text?: string;
  textsId?: number;
  budgetType?: string;
};
