export type Company = {
  /** ID of the company */
  id: number;
  /** Name of the company  */
  name: string;
  /** Default timezone of the company */
  timezoneDefault: string;
  /** Currency of the company  */
  currency: string;
  /** Are time and lump sum entries with multiline descriptions allowed?  */
  allowEntriesTextMultiline: boolean;
  /** Can time and lump sum entries be directly assigned to customers (or only to projects)? */
  allowEntriesForCustomers: boolean;
  /** Does the duration of a time entry have to be equal to the difference between start and end?  */
  forceLinkedEntryTimes: boolean;
  /** ID of the default customer  */
  defaultCustomersId: number | null;
  /** ID of the default service  */
  defaultServicesId: number | null;
  /** Is the absence module active for the company? */
  moduleAbsence: boolean;
  /** Is the work-time module active for the company? */
  moduleWorkTime: boolean;
  /** ID of the default nonbusiness group  */
  nonbusinessGroupDefault: number | null;
  /** ID of the default worktime regulation  */
  worktimeRegulationDefault: number | null;
  /**
   * Date from which worktime regulations are evaluated for the company in YYYY-MM-DD format
   */
  worktimeEvaluateRegulationsSince: string | null;
  /** Is missing break time subtracted from the tracked work time?  */
  worktimeForceBreaks: boolean;
  /** Number of days in the default holiday quota of the company  */
  holidaysCountDefault: number;
  /**
   * Are absences handled by reducing the target hours for the day?
   * If not, time is added to the worktime account for absences
   */
  absenceReducesTargetHours: boolean;
  /** Default value for automatically compensated overtime per day (in minutes) */
  compensateDayDefault: number;
  /** Default value for automatically compensated overtime per month (in hours) */
  compensateMonthDefault: number;
  targetHoursDefault: {
    /** Default value for targethours on mondays */
    monday: number;
    /** Default value for targethours on tuesdays */
    tuesday: number;
    /** Default value for targethours on wednesdays */
    wednesday: number;
    /** Default value for targethours on thursdays */
    thursday: number;
    /** Default value for targethours on fridays */
    friday: number;
    /** Default value for targethours on saturdays */
    saturday: number;
    /** Default value for targethours on sundays */
    sunday: number;
  };
  /** Has the registration process been completed?  */
  onboardingComplete: boolean;
};
