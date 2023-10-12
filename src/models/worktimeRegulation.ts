export type WorktimeRegulation = {
  /** ID of the worktime regulation  */
  id: number;
  /** The name of the worktime regulation */
  name: string;
  /** Do mandatory breaks count as worktime?  */
  addToWorktime: boolean;
  /** Maximum allowed worktime per week (in hours)  */
  weeklyMax: number | null;
  /** Maximum allowed worktime per day (in hours)  */
  dailyMax: number | null;
  /** Maximum allowed worktime without a break (in hours) */
  intervalMax: number | null;
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
  splitting: {
    /** Only one break */
    "1"?: number;
    /** At least one break */
    "1+"?: number;
    /** Two breaks */
    "2"?: number;
    /** Three breaks */
    "3"?: number;
  };
};
