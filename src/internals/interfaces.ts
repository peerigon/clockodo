export type Customer = {
    id: number;
    name: string;
    number: string;
    active: boolean;
    billableDefault: boolean;
    note: string;
    projects: Array<Project>;
};

export type Project = {
    id: number;
    customersId: number;
    name: string;
    active: boolean;
    billableDefault: boolean;
    note: string;
    budgetMoney: number;
    budgetIsHours: boolean;
    budgetIsNotStrict: boolean;
    completed: boolean;
    billedMoney: number;
    billedCompletely: boolean;
    revenueFactor: number;
};

export type Service = {
    id: number;
    name: string;
    number: string;
    active: boolean;
    note: string;
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

export type Entry = {
    id: number;
    projectsId: number | 0;
    customersId: number | 0;
    usersId: number;
    servicesId: number | null;
    lumpSumsId: number | null;
    lumpSum: number | null;
    lumpSumsAmount: number | null;
    billable: 0 | 1;
    billed: boolean;
    textsId: number | null;
    text: string | null;
    duration: number;
    durationTime: string;
    offset: number;
    offsetTime: string;
    timeSince: string;
    timeClockedSince?: string;
    timeUntil: string | null;
    timeInsert: string;
    timeLastChange: string;
    timeLastChangeWorkTime: string;
    clocked: boolean;
    isClocking: boolean;
    offline: boolean;
    hourlyRate?: number;
    revenue?: number;
    budget?: number;
    budgetIsHours?: boolean;
    budgetIsNotStrict?: boolean;
    customersName?: string;
    projectsName?: string | null;
    servicesName?: string | null;
    usersName?: string;
    lumpSumsPrice?: number | null;
    lumpSumsUnit?: string | null;
    lumpSumsName?: string | null;
};

export type Task = {
    day: string;
    customersId: number;
    customersName: string;
    projectsId: number;
    projectsName: string;
    servicesId: number;
    servicesName: string;
    billable: number;
    textsId: number;
    text: string;
    duration: number;
    durationTime: string;
    durationText: string;
    isClocking: boolean;
    hasJustLumpSums: boolean;
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
    hourlyRateIsEqualAndHasNoLumpSums?: boolean;
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
    countHolidas: number;
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

export type HolidayQuotasRow = {
    id: number;
    usersId: number;
    yearSince: number;
    yearUntil: number;
    count: number;
};

export type HolidaysCarryRow = {
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
