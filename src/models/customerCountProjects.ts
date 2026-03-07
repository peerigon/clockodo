import { type Customer } from "./customer.js";

export type CustomerCountProjects = {
  customersId: Customer["id"];
  active: number;
  inactive: number;
};
