export type HolidaysquotaRow = {
  id: number;
  usersId: number;
  yearSince: number;
  yearUntil: number | null;
  count: number;
  note: string | null;
};

/**
 * @deprecated Please use HolidaysquotaRow type
 */
export type HolidayquotaRow = HolidaysquotaRow;
