export type OvertimeCarryover = {
  /** The corresponding id for the overtime carryover */
  id: number;
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
