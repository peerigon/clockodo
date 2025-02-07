export type SplittingOption = {
  /** breaks: either `1+` for flexible splitting or a number [2...99] for regular splitting */
  breaks: number | "1+";
  minLength: number;
};

export type WorkTimeBreakRule = {
  /** ID of the worktime breakrule  */
  id: number;
  /** ID of the corresponding worktime regulation */
  workTimeRegulationsId: number;
  /** Daily worktime (in hours), above which the rule applies */
  workTime: number;
  /** Required total break time  */
  breakSum: number;
  /**
   * Allowed options for splitting the required break time into more than one break
   **/
  splittingOptions: Array<SplittingOption>;
};
