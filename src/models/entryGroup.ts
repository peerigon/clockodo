export type EntryGroupRestriction = {
  usersId?: number | null;
  teamsId?: number | null;
  customersId?: number | null;
  projectsId?: number | null;
  subprojectsId?: number | null;
  servicesId?: number | null;
  lumpsumServicesId?: number | null;
  billable?: number | null;
  entriesTextsId?: number | null;
  budgetType?: string | null;
};

export type EntryGroup = {
  groupedBy: string;
  group: string;
  name: string;
  number: string | null;
  note: string | null;
  /**
   * Restrictions that apply to the current group, except for the current grouped_by and time
   * restrictions. `null` if there are no restrictions.
   */
  restrictions: EntryGroupRestriction | null;
  duration: number;
  revenue?: number;
  budgetUsed?: boolean;
  hasBudgetRevenuesBilled?: boolean;
  hasBudgetRevenuesNotBilled?: boolean;
  hasNonBudgetRevenuesBilled?: boolean;
  hasNonBudgetRevenuesNotBilled?: boolean;
  hourlyRate?: number | null;
  hourlyRateIsEqualAndHasNoLumpsums?: boolean;
  durationWithoutRounding?: number;
  revenueWithoutRounding?: number;
  roundingSuccess?: boolean;
  subGroups?: Array<EntryGroup> | null;
};
