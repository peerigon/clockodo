export type HolidayscarryRow = {
  /** The related employee's ID */
  usersId: number;
  /**
   * Year for which the holiday carryover applies
   */
  year: number;
  /** Day count */
  count: number;
  note: string | null;
};
