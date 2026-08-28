import { type BudgetNotificationThreshold } from "./project.js";

export type Subproject = {
  id: number;
  projectsId: number;
  name: string;
  note?: string | null;
  number: string | null;
  budget?: {
    monetary: boolean;
    hard: boolean;
    amount: number | null;
    notificationThresholds?: Array<BudgetNotificationThreshold>;
  } | null;
  billed: number | null;
  billedMoney: number | null;
  billedCompletely: boolean | null;
  billableDefault: boolean;
  completed: boolean;
  completedAt: string | null;
  revenueFactor?: number | null;
  startDate: string | null;
  deadline: string | null;
  active: boolean;
  automaticCompletion?: boolean;
  billServiceId?: string | null;
  /** IDs of the services assigned to this subproject */
  serviceAssignments: Array<number>;
};
