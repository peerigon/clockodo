import { IsoDate } from "./dateTime.js";

export type OvertimeReduction = {
  /** The ID of the overtime reduction */
  id: number;
  /** The related employee's ID */
  usersId: number;
  /** The user who added the overtime reduction */
  addedByUsersId: number;
  /** The date when the overtime reduction was added */
  addedAt: IsoDate;
  /** The date when the overtime reduction was taken */
  date: IsoDate;
  /** Number of hours */
  hours: number;
  note: string | null;
};
