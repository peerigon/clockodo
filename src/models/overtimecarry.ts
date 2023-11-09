export type OvertimecarryRow = {
  /** The related employee's ID */
  usersId: number;
  /**
   * Year for which the overtime carryover applies
   * Format YYYY
   */
  year: number;
  /** Number of hours */
  hours: number;
  note: string | null;
};
