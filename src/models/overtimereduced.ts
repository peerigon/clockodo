import { IsoDate } from "./dateTime.js";

export type OvertimereducedRow = {
  /** The ID of the overtime reduced row */
  id: number;
  /** The related employee's ID */
  usersId: number;
  /** The user who added the over time reduced */
  usersIdAdded: number;
  /** The date when the overtime reduced was added */
  dateAdded: IsoDate;
  /** Number of hours */
  hours: number;
  note: string | null;
  // TODO: will probably be renamed
  createdAfterEndOfMonth: boolean;
};
