import { IsoDate } from "./dateTime.js";

export type OvertimeReduction = {
  /** The ID of the overtime reduction */
  id: number;
  /** The related employee's ID */
  usersId: number;
  /** The user who added the overtime reduction */
  usersIdAdded: number;
  /** The date when the overtime reduction was added */
  dateAdded: IsoDate;
  /** Number of hours */
  hours: number;
  note: string | null;
  // TODO: will probably be renamed
  createdAfterEndOfMonth: boolean;
};
