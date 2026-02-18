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
};
