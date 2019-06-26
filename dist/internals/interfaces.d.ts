export interface Customer {
    id: number;
    name: string;
    number: string;
    active: boolean;
    billableDefault: boolean;
    note: string;
    projects: Project[];
}
export interface Project {
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
}
export interface Service {
    id: number;
    name: string;
    number: string;
    active: boolean;
    note: string;
}
export interface User {
    id: number;
    name: string;
    number: string;
    email: string;
    role: string;
    active: boolean;
    editLock: string;
}
export interface Entry {
    id: number;
    customersId: number;
    projectsId: number;
    usersId: number;
    servicesId: number;
    billable: 0 | 1;
    billed: boolean;
    textsId: number;
    text: string;
    duration: number;
    durationTime: string;
    offset: number;
    offsetTime: string;
    timeSince: string;
    timeUntil: string;
    timeInsert: string;
    timeLastChange: string;
    timeLastChangeWorktime: string;
    clocked: boolean;
    isClocking: boolean;
    lumpSum: number;
    hourlyRate?: number;
    revenue?: number;
    budget?: number;
    budgetIsHours?: boolean;
    budgetIsNotStrict?: boolean;
    customerName?: string;
    projectName?: string;
    serviceName?: string;
    userName?: string;
}
export interface Task {
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
}
export interface EntryGroup {
    groupeyby: string;
    group: string;
    name: string;
    number: string;
    note: string;
    restrictions: string[];
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
    subGroups: EntryGroup[];
}
export interface UserReport {
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
    monthDetails: UserReportMonth[];
}
export interface UserReportMonth {
    nr: number;
    sumTarget: number;
    sumHours: number;
    sumHoursWithoutCompensation: number;
    sumReductionUsed: number;
    sumOvertimeReduced: number;
    diff: number;
    weekDetails: UserReportWeek[];
}
export interface UserReportWeek {
    nr: number;
    sumTarget: number;
    sumHours: number;
    sumReductionUsed: number;
    diff: number;
    dayDetails: UserReportDay[];
}
export interface Break {
    since: string;
    until: string;
    length: number;
}
export interface UserReportDay {
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
    breaks: Break[];
}
export interface Absence {
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
}
export interface TargetHoursRow {
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
}
export interface HolidayQuotasRow {
    id: number;
    usersId: number;
    yearSince: number;
    yearUntil: number;
    count: number;
}
export interface HolidaysCarryRow {
    usersId: number;
    year: number;
    count: number;
    note: string;
}
export interface User {
    name: string;
    email: string;
    role: string;
    timeformat12h: boolean;
    weekstartMonday: boolean;
    language: string;
    currency: string;
    currencySymbol: string;
    timezone: string;
}
export interface Paging {
    itemsPerPage: number;
    currentPage: number;
    countPages: number;
    countItems: number;
}
export interface Filter {
    usersId?: number;
    customersId?: number;
    projectsId?: number;
    servicesId?: number;
    billable?: number;
    text?: string;
    textsId?: number;
    budgetType?: string;
}
