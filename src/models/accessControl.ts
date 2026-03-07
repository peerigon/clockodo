import {
  type AccessToCustomersProjects,
  type AccessToServices,
} from "./access.js";
import {
  type AccessGroup,
  type AccessProjectOrServiceValue,
  type AccessType,
  type AccessValue,
} from "./accessGroup.js";

export type UsersAccessCustomersProjects = {
  add: AccessToCustomersProjects;
  report: AccessToCustomersProjects;
  edit: AccessToCustomersProjects;
};

export type UsersAccessServices = {
  add: AccessToServices;
};

export type AddAccessGroupParams = Pick<AccessGroup, "name"> & {
  usersIds?: AccessGroup["usersIds"];
};

export type EditAccessGroupParams = {
  id: AccessGroup["id"];
} & Partial<Pick<AccessGroup, "name" | "usersIds">>;

export type DeleteAccessGroupParams = {
  id: AccessGroup["id"];
};

export type EditAccessEntityGeneralParams = {
  type: AccessType;
  value: AccessValue;
};

export type EditAccessEntityParams = {
  id: number;
} & EditAccessEntityGeneralParams;

export type EditAccessEntityGeneralProjectOrServiceParams = {
  type: "add";
  value: AccessValue;
};

export type EditAccessEntityProjectOrServiceParams = {
  id: number;
  value: AccessProjectOrServiceValue;
} & Omit<EditAccessEntityGeneralProjectOrServiceParams, "value">;
