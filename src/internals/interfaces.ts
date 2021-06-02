import {
    EntryType,
    LumpsumEntryBillability,
    TimeEntryBillability,
} from "./enums";

export type Customer = {
    id: number;
    name: string;
    number: string | null;
    active: boolean;
    billableDefault: boolean;
    note?: string | null;
    projects?: Array<Project> | null;
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
    id: number;
    name: string;
    number: string;
    email: string;
    role: string;
    active: boolean;
    editLock: string;
    timeformat12h: boolean;
    weekstartMonday: boolean;
    language: string;
    currency: string;
    currencySymbol: string;
    timezone: string;
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
