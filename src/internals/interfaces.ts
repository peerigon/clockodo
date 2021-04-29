export type Customer = {
    id: number;
    name: string;
    number: string | null;
    active: boolean;
    billableDefault: boolean;
    note: string | null;
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

const timeEntryType = 1;
const unitLumpsumEntryType = 2;
const lumpSumEntryType = 3;

type BaseEntry = {
    id: number;
    customersId: number | 0;
    projectsId: number | null;
    usersId: number;
    billable: 0 | 1 | 2;
    textsId: number | null;
    text: string | null;
    timeSince: string;
    timeUntil: string | null;
    timeInsert: string;
    timeLastChange: string;
    customersName?: string; // deprecated
    projectsName?: string | null; // deprecated
    usersName?: string; // deprecated
    revenue?: number; // deprecated
};

export type TimeEntry = BaseEntry & {
    type: typeof timeEntryType;
    servicesId: number;
    servicesName?: string; // deprecated
    duration: number;
    offset: number;
    timeLastChangeWorkTime: string;
    timeClockedSince?: string;
    clocked: boolean;
    clockedOffline: boolean;
    hourlyRate?: number;
};

export type LumpsumEntry = BaseEntry & {
    type: typeof lumpSumEntryType;
    servicesId: number;
    servicesName?: string; // deprecated
    lumpsum: number;
};

export type UnitLumpsumEntry = BaseEntry & {
    type: typeof unitLumpsumEntryType;
    lumpsumsId: number;
    lumpsumsAmount: number;
    lumpsumsPrice?: number;
    lumpsumsUnit?: string;
    lumpsumsName?: string;
};

export type Entry = TimeEntry | LumpsumEntry | UnitLumpsumEntry;

export type Task = {
    day: string;
    customersId: number;
    customersName: string;
    projectsId: number | 0;
    projectsName: string | null;
    servicesId: number | null;
    servicesName: string | null;
    lumpsumsId: number | null;
    lumpsumsAmount: number | null;
    lumpsumsName: string | null;
    lumpsumsPrice: number | null;
    lumpsumsUnit: string | null;
    billable: 0 | 1;
    textsId: number | 0;
    text: string | null;
    timeSince: string;
    timeUntil: string;
    duration: number;
    durationTime: string;
    durationText: string;
    isClocking: boolean;
    hasJustLumpsums: boolean;
    revenue?: number;
};

export type EntryGroup = {
    groupeyby: string;
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
    hourlyRate?: number;
    hourlyRateIsEqualAndHasNoLumpsums?: boolean;
    durationWithoutRounding?: number;
    revenueWithoutRounding?: number;
    roundingSuccess?: boolean;
    subGroups: Array<EntryGroup>;
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

export type TargetHoursRow = {
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
