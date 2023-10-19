export type HolidaysquotaRow = {
  /** The ID of the holiday quota settings */
  id: number;
  /** The related employee's ID */
  usersId: number;
  /**
   * Year from which on the holiday quota setting apply
   */
  yearSince: number;
  /**
   * Year until which the holiday quota setting apply
   */
  yearUntil: number | null;
  /** Count of holidays */
  count: number;
  note: string | null;
};

/**
 * @deprecated Please use HolidaysquotaRow type
 */
export type HolidayquotaRow = HolidaysquotaRow;
