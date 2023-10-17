export enum TargethoursRowType {
  Weekly = "weekly",
  Monthly = "monthly",
}

type CommonTargethoursRow = {
  /** The ID of the target hour settings  */
  id: number;
  /**
   * Date from which on the target hours apply
   * Format YYYY-MM-DD
   */
  dateSince: string;
  /**
   * Date until which the target hours apply
   * Format YYYY-MM-DD
   */
  dateUntil: string | null;
  /**
   * Automatic time compensation per month in hours
   */
  compensationMonthly: number;
  /** The related employee's ID */
  usersId: number;
  /** The corresponding surcharge model */
  surchargeModelsId: number | null;
};

export type TargethoursRowWeekly = CommonTargethoursRow & {
  /** Type of the target hours row */
  type: TargethoursRowType.Weekly;
  /** Target hours for Monday */
  monday: number;
  /** Target hours for Tuesday */
  tuesday: number;
  /** Target hours for Wednesday */
  wednesday: number;
  /** Target hours for Thursday */
  thursday: number;
  /** Target hours for Friday */
  friday: number;
  /** Target hours for Saturday */
  saturday: number;
  /** Target hours for Sunday */
  sunday: number;
  /**
   * true if credited absence hours are applied against the average target hours,
   * false if credited absence hours match the target hours of the specific day .
   */
  absenceFixedCredit: boolean;
  /** Automatic time compensation per day in minutes  */
  compensationDaily: number;
};

export type TargethoursRowMonthly = CommonTargethoursRow & {
  /** Type of the target hours row */
  type: TargethoursRowType.Monthly;
  /** Monthly target hours to attain  */
  monthlyTarget: number;
  /** Is Monday a work day? */
  workdayMonday: boolean;
  /** Is Tuesday a work day? */
  workdayTuesday: boolean;
  /** Is Wednesday a work day? */
  workdayWednesday: boolean;
  /** Is Thursday a work day? */
  workdayThursday: boolean;
  /** Is Friday a work day? */
  workdayFriday: boolean;
  /** Is Saturday a work day? */
  workdaySaturday: boolean;
  /** Is Sunday a work day? */
  workdaySunday: boolean;
};

export type TargethoursRow = TargethoursRowWeekly | TargethoursRowMonthly;
