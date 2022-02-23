export enum UserReportType {
  /** Request only key data for the year (default) */
  Year = 0,
  /** Request key data for the year and the months */
  YearAndMonths = 1,
  /** Request key data for the year, months and weeks */
  YearMonthsAndWeeks = 2,
  /**  Request key data for the year, months, weeks and days */
  YearMonthsWeeksAndDays = 3,
  /**
   * Request key data for the year, months, weeks and days;
   * The day data does also include start and end times, as well as breaks
   */
  YearMonthsWeeksDaysAndWorkTimes = 4,
}

export type UserReport<
  GivenUserReportType extends UserReportType = UserReportType.Year
> = {
  /** ID of the corresponding co-worker */
  usersId: number;
  /** Name of the corresponding co-worker */
  usersName: string;
  /** Personnel number of the corresponding co-worker */
  usersNumber: string | null;
  /** Email address of the corresponding co-worker */
  usersEmail: string;
  /** Planned work time for the year (in seconds) */
  sumTarget: number | null;
  /** Worked time in the year (in seconds) */
  sumHours: number;
  /** Sum of overtime reductions in the year (in seconds) */
  sumReductionUsed: number;
  /** Sum of planned overtime reductions in the rest of the year (in seconds) */
  sumReductionPlanned: number;
  /** Overtime carryover for the year (in seconds) */
  overtimeCarryover: number;
  /** Withdrawed overtime for the year (in seconds) */
  overtimeReduced: number;
  /** Calculated difference of the time account of the year (in seconds) */
  diff: number;
  /** Holiday quota for the year */
  holidaysQuota: number;
  /** Holiday carryover for the year */
  holidaysCarry: number;
  sumAbsence: {
    /** Number of used holidays */
    regularHolidays: number;
    /** Number of sick days */
    sickSelf: number;
    /** Number of sick days of a child */
    sickChild: number;
    /** Number of days of special leaves */
    specialLeaves: number;
    /** Number of days of school */
    school: number;
    /** Number of days of maternity protection */
    maternityProtection: number;
    /** Number of days of home office */
    homeOffice: number;
    /** Number of days out of office */
    outOfOffice: number;
    /** Number of days of quarantine */
    quarantine: number;
    /** Number of days of military / alternative service */
    militaryService: number;
  };
} & (GivenUserReportType extends UserReportType.Year
  ? unknown
  : {
      /** Only if month details are requested */
      monthDetails: Array<
        UserReportMonthDetails &
          (GivenUserReportType extends UserReportType.YearAndMonths
            ? unknown
            : {
                /** Only if week details are requested */
                weekDetails: Array<
                  UserReportWeekDetails &
                    (GivenUserReportType extends UserReportType.YearMonthsAndWeeks
                      ? unknown
                      : {
                          /** Only if day details are requested */
                          dayDetails: Array<
                            UserReportDayDetails &
                              (GivenUserReportType extends UserReportType.YearMonthsWeeksAndDays
                                ? unknown
                                : UserReportDayWorkTimes)
                          >;
                        })
                >;
              })
      >;
    });

export type UserReportMonthDetails = {
  /** Month number (1 to 12) */
  nr: number;
  /** Planned work time (in seconds) */
  sumTarget: number | null;
  /** Worked time (in seconds) */
  sumHours: number;
  /** Worked time when ignoring the monthly compensation (in seconds) */
  sumHoursWithoutCompensation: number;
  /** Sum of overtime reductions (in seconds) */
  sumReductionUsed: number;
  /** Sum of withdrawed / payed out overtime */
  sumOvertimeReduced: number;
  /** Calculated difference of the time account (in seconds) */
  diff: number;
};

export type UserReportWeekDetails = {
  /** Week number (following ISO 8601) */
  nr: number;
  /** Planned work time (in seconds) */
  sumTarget: number | null;
  /** Worked time (in seconds) */
  sumHours: number;
  /** Sum of overtime reductions (in seconds) */
  sumReductionUsed: number;
  /** Calculated difference of the time account (in seconds) */
  diff: number;
};

export type UserReportDayDetails = {
  /** Date (YYYY-MM-DD) */
  date: string;
  /** Number, which identificates the week day */
  weekday: number;
  /** Is the day a nonbusiness day? */
  nonbusiness: boolean;
  /** Planned work time (in seconds) */
  target: number | null;
  /**
   * Planned work time which would have been calculated
   * if no nunbusiness day or absence had reduced the planned work time (in seconds)
   */
  targetRaw: number | null;
  /**
   * Worked time (in seconds).
   * Won't be added for future days
   */
  hours: number | null;
  /**
   * Worked time when ignoring the daily compensation (in seconds).
   * Won't be added for future days.
   **/
  hoursWithoutCompensation: number | null;
  /**
   * Calculated difference of the time account (in seconds).
   * Won't be added for future days
   */
  diff: number;
  countAbsence: {
    /**
     * Absence because of a regular holiday or special leaves (0, 0.5 or 1)
     */
    regularHolidays: number;
    /**
     * Absence because of sickness (0, 0.5 or 1)
     */
    sickSelf: number;
    /**
     * Absence because of sickness of a child (0, 0.5 or 1)
     */
    sickChild: number;
    /**
     * Absence because of special leaves (0, 0.5 or 1)
     */
    specialLeaves: number;
    /**
     * Absence because of school / further education (0, 0.5 or 1)
     */
    school: number;
    /**
     * Absence because of maternity protection (0, 0.5 or 1)
     **/
    maternityProtection: number;
    /**
     * Home office (0, 0.5 or 1)
     */
    homeOffice: number;
    /** Work out of office (0, 0.5 or 1) */
    outOfOffice: number;
    /** Absence because of quarantine (0 or 1) */
    quarantine: number;
    /**
     * Absence because of military / alternative service (0 or 1)
     */
    militaryService: number;
  };
  /** Overtime reduction on this day (in seconds) */
  countReductionUsed: number | null;
};

export type UserReportDayWorkTimes = {
  /**
   * Begin of the work time (e.g. in format “YYYY-MM-DD HH:MM:SS”; see section “Localisation”)
   * Only if requested (report type “4”); won't be added for future days
   */
  workStart: string | null;
  /**
   * End of the work time (e.g. in format “YYYY-MM-DD HH:MM:SS”; see section “Localisation”)
   * Only if requested (report type “4”), won't be added for future days */
  workEnd: string | null;
  /**
   * Breaks which have been made (Subarray keys: [string] since, [string] until, [integer] length).
   * Only if requested (report type “4”), won't be added for future days
   */
  breaks: Array<Break>;
};

export type Break = {
  /** ISO timestamp */
  since: string;
  /** ISO timestamp */
  until: string;
  /** In seconds */
  length: number;
};
