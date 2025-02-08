import { WorkTimeBreakRule } from "./workTimeBreakRule";

export type WorkTimeRegulationWithRules = {
  /** ID of the worktime regulation */
  id: number;
  /** Do mandatory breaks count as worktime? */
  addToWorktime: boolean;
  /** Maximum allowed worktime per week (in hours) */
  weeklyMax: number | null;
  /** Maximum allowed worktime per day (in hours) */
  dailyMax: number | null;
  /** Maximum allowed worktime without a break (in hours) */
  intervalMax: number | null;
  /** Contains objects of the type "breakrule" */
  rules: Array<Omit<WorkTimeBreakRule, "workTimeRegulationsId" | "id">>;
};
