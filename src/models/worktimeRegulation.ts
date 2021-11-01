export const NO_WORKTIME_REGULATIONS_ID = 0 as const;

export type WorktimeRegulation = {
  /** ID of the worktime regulation  */
  id: number;
  /** Do mandatory breaks count as worktime?  */
  addToWorktime: boolean;
  /** Maximum allowed worktime per week (in hours)  */
  weeklyMax: number;
  /** Maximum allowed worktime per day (in hours)  */
  dailyMax: number;
  /** Maximum allowed worktime without a break (in hours) */
  intervalMax: number;
  /** Contains objects of the type "breakrule" */
  rules: Array<BreakRule>;
};

export type BreakRule = {
  /** Daily worktime (in hours), above which the rule applies */
  worktime: number;
  /** Required total break time  */
  breakSum: number;
  /**
   * Contains the break splitting options as key-value pair.
   * The key represents the number of breaks into which the required time may be split, the value contains the minimum length of a single break (in minutes)
   **/
  splitting: Record<number, number>;
};
