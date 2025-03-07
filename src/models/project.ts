export type Project = {
  /** ID of the project */
  id: number;
  /** ID of the corresponding customer */
  customersId: number;
  /** Name of the project */
  name: string;
  /** Project number */
  number: string | null;
  /** Is the project active? */
  active: boolean;
  /** Is the project billable by default? */
  billableDefault: boolean;
  /** Note about the project, Only with necessary access rights */
  note?: string | null;
  /** Budget for the project. Only with necessary access rights */
  budgetMoney?: number | null;
  /** Is the budget based on hours? Only with necessary access rights */
  budgetIsHours?: boolean;
  /** Is the budget not strict? Only with necessary access rights */
  budgetIsNotStrict?: boolean;
  /** Is the project completed? */
  completed?: boolean;
  /** Billed amount of money. Only with necessary access rights */
  billedMoney?: number | null;
  /** Is the project billed completely? Only with necessary access rights */
  billedCompletely?: boolean | null;
  /**
   * Factor with which revenues and hourly rates have to multiplicated in order
   * to get the effective values Only with necessary access rights. In case of a
   * project which has a hard budget and has been completed with a budget usage
   * of 400%, the factor is "0.25". "null" if a project with hard budget hasn't
   * been completed yet. "1" for projects without or with soft budget.
   */
  revenueFactor?: number | null;
};
