export enum EntryType {
    Time = 1,
    LumpsumValue = 2,
    LumpsumService = 3,
}

export enum Billability {
    NotBillable = 0,
    Billable = 1,
    Billed = 2,
}

export type TimeEntryBillability =
    | Billability.NotBillable
    | Billability.Billable
    | Billability.Billed;

export type ClockingTimeEntryBillability =
    | Billability.NotBillable
    | Billability.Billable;

export type LumpsumEntryBillability = Billability.Billable | Billability.Billed;

export enum AbsenceStatus {
    Reported = 0,
    Approved = 1,
    Declined = 2,
    ApprovalCancelled = 3,
    RequestCancelled = 4,
}

export enum AbsenceType {
    RegularHoliday = 1,
    SpecialLeave = 2,
    ReductionOfOvertime = 3,
    SickDay = 4,
    SickDayOfChild = 5,
    SchoolFurtherEducation = 6,
    MaternityProtection = 7,
    HomeOffice = 8,
    WorkOutOfOffice = 9,
    SpecialLeaveUnpaid = 10,
    SickDayUnpaid = 11,
    SickDayOfChildUnpaid = 12,
    Quarantine = 13,
    MilitaryService = 14,
}
