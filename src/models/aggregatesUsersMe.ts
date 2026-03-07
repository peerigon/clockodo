import { type Company } from "./company.js";
import { type User } from "./user.js";
import { type WorktimeRegulation } from "./worktimeRegulation.js";

export type AggregatesUsersMe = {
  user: User;
  company: Company;
  worktimeRegulation: WorktimeRegulation | null;
};
