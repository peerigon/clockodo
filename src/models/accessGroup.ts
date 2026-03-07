import { type User } from "./user.js";

export enum AccessType {
  Add = "add",
  Report = "report",
  Edit = "edit",
}

export enum AccessValue {
  NoAccess = 0,
  FullAccess = 1,
  CustomAccess = 2,
}

export enum AccessProjectOrServiceValue {
  NoAccess = 0,
  FullAccess = 1,
}

export type AccessGroup = {
  id: number;
  name: string;
  usersIds: Array<User["id"]>;
  hasElevatedAccess: boolean | null;
  hasMasterDataAccess: boolean | null;
  companyDefault: boolean;
};
