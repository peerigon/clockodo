export type WorktimeBreakRule = {
  /** ID of the break rule */
  id: number;
  /** ID of the corresponding worktime regulation */
  worktimeRegulationsId: number;
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
