import { Project } from "./project.js";

export type Customer = {
  /** ID of the customer */
  id: number;
  /** Name of the customer */
  name: string;
  /** Customer number */
  number: string | null;
  /** Is the customer active? */
  active: boolean;
  /** Is the customer billable by default? */
  billableDefault: boolean;
  /**
   * Note about the customer.
   * Only for owners and managers
   **/
  note?: string | null;
  /**
   * List of all projects belonging to the customer
   * Only in list mode; will not be delivered when a single customer is queried
   */
  projects?: Array<Project> | null;
  /**
   * Customer color
   */
  color: number;
};
