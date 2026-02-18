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
  /** Is the project completed? */
  completed: boolean;
  /** Date and time when the project was completed */
  completedAt: string | null;
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
  /** Whether this project is test data */
  testData: boolean;
  /** Number of subprojects */
  countSubprojects: number;
  /** Project deadline date */
  deadline?: string | null;
  /** Project start date */
  startDate?: string | null;
  /** Automatic completion at deadline */
  automaticCompletion?: boolean;
  /** New budget object from v4 API */
  budget?: {
    monetary: boolean;
    hard: boolean;
    fromSubprojects: boolean;
    interval: 0 | 1 | 2 | 3 | null;
    amount: number | null;
    notificationThresholds?: Array<
      | 50
      | 60
      | 70
      | 80
      | 90
      | 100
      | 110
      | 120
      | 130
      | 140
      | 150
      | 200
      | 250
      | 300
    >;
  } | null;
  /** Linked billing service id */
  billServiceId?: string | null;
};
