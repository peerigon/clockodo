import { type IsoDate } from "./dateTime.js";
import { type User } from "./user.js";

export type OvertimeReduction = {
  id: number;
  usersId: User["id"];
  date: IsoDate;
  hours: number;
  note: string | null;
  addedAt: IsoDate;
  addedByUsersId: User["id"];
};
