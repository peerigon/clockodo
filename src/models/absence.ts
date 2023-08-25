type CommonAbsence = {
  /** ID of the absence */
  id: number;
  /** ID of the corresponding co-worker  */
  usersId: number;
  /** Start date in YYYY-MM-DD format */
  dateSince: string;
  /**
   * End date in YYYY-MM-DD format
   * Is the same date as dateSince in case the absence is only one day long
   **/
  dateUntil: string; // | null (as stated in the docs) doesn't seem to be correct
  /**
   * Status of the absence.
   */
  status: AbsenceStatus;
  /**
   * Type of the absence.
   * Only with access rights for absence administration or in case of own absences
   */
  type?: AbsenceType;
  /**
   * Only with access rights for absence administration or in case of own absences
   */
  note?: string | null;
  /**
   * Date at which the absence request has been enquired in YYYY-MM-DD format.
   * Only with access rights for absence administration or in case of own absences
   */
  dateEnquired?: string | null;
  /**
   * Date at which the absence request has been approved, declined or cancelled in format YYYY-MM-DD.
   * Only with access rights for absence administration or in case of own absences
   */
  dateApproved?: string | null;
  /**
   * The ID of the co-worker who has approved, declined or cancelled the request.
   * Only with access rights for absence administration or in case of own absences
   */
  approvedBy?: number | null;
  /**
   * Wether or not the absence is with or without a sick note
   * Only with access rights for absence administration or in case of own absences
   */
  sickNote?: null;
};

export type DaysAbsence = CommonAbsence & {
  /**
   * Type of the absence.
   * Only with access rights for absence administration or in case of own absences
   */
  type?: Exclude<AbsenceType, AbsenceType.ReductionOfOvertime | AbsenceType.SickDay | AbsenceType.SickDayOfChild>;
  /**
   * Amount of absence days (null for overtime reduction).
   * Only with access rights for absence administration or in case of own absences
   */
  countDays?: number;
  /**
   * Amount of hours of overtime reduction (null in other cases).
   * Only with access rights for absence administration or in case of own absences
   */
  countHours?: null;
};

export type HoursAbsence = CommonAbsence & {
  /**
   * Type of the absence.
   * Only with access rights for absence administration or in case of own absences
   */
  type?: AbsenceType.ReductionOfOvertime;
  /**
   * Amount of absence days (null for overtime reduction).
   * Only with access rights for absence administration or in case of own absences
   */
  countDays?: null;
  /**
   * Amount of hours of overtime reduction (null in other cases).
   * Only with access rights for absence administration or in case of own absences
   */
  countHours?: number;
};

export type SickAbsence = DaysAbsence & {
  /**
   * Type of the absence.
   * Only with access rights for absence administration or in case of own absences
   */
  type?: AbsenceType.SickDay | AbsenceType.SickDayOfChild;
  /**
   * Wether or not the absence is with or without a sick note
   * Only with access rights for absence administration or in case of own absences
   */
  sickNote: boolean | null;
} 

export type Absence = DaysAbsence | HoursAbsence | SickAbsence;

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
  SickSelfWithSicknessBenefit = 15,
}
