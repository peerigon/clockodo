import { type IsoDate } from "./dateTime.js";
import { type NonbusinessDay } from "./nonbusinessDay.js";
import { type NonbusinessGroup } from "./nonbusinessGroup.js";
import { type User } from "./user.js";

export type UsersNonbusinessDay = {
  usersId: User["id"];
  days: Array<NonbusinessDay>;
};

export type UsersNonbusinessGroup = {
  id: number;
  usersId: User["id"];
  nonbusinessGroupsId: NonbusinessGroup["id"] | null;
  dateSince: IsoDate;
  dateUntil: IsoDate | null;
};
