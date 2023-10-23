import { BreakRule } from "./breakRule.js";

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
  /** Indicated if a worktimeregulation is a preset */
  preset: boolean;
};

export type WorktimeRegulationWithRules = Omit<
  WorktimeRegulation,
  "name" | "preset"
> & {
  /** Contains objects of the type "breakrule" */
  rules: Array<Omit<BreakRule, "worktimeRegulationsId">>;
};
