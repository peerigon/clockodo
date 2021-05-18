export enum Billability {
    NotBillable = 0,
    Billable = 1,
    Billed = 2,
}

export type BillabilityOfLumpSumEntry = Exclude<
    Billability,
    Billability.NotBillable
>;

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
