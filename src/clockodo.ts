import { NonbusinessGroup } from "./models/nonbusinessGroup.js";
import { WorktimeRegulation } from "./models/worktimeRegulation.js";
import { Absence } from "./models/absence.js";
import { Customer } from "./models/customer.js";
import {
  Entry,
  TimeEntry,
  LumpsumValueEntry,
  LumpsumServiceEntry,
  ClockingTimeEntryBillability,
} from "./models/entry.js";
import { EntryGroup } from "./models/entryGroup.js";
import { LumpsumService } from "./models/lumpsumService.js";
import { Project } from "./models/project.js";
import { Service } from "./models/service.js";
import { TargethoursRow } from "./models/targethours.js";
import { User } from "./models/user.js";
import { UserReport, UserReportType } from "./models/userReport.js";
import { Api, Config, Filter, Paging } from "./lib/api.js";
import * as REQUIRED from "./lib/requiredParams.js";
import { Company } from "./models/company.js";
import { NonbusinessDay } from "./models/nonbusinessDay.js";
import { camelCaseToSnakeCase } from "./lib/mappings.js";
import { EntriesText } from "./models/entriesText";
import { Team } from "./models/team.js";
import {
  AccessToCustomersProjects,
  AccessToServices,
} from "./models/access.js";

type Params<
  KnownParams extends Record<string, unknown> = Record<string, unknown>
> = KnownParams & Record<string, unknown>;

export class Clockodo {
  api: Api;

  constructor(config: Config) {
    this.api = new Api(config);
  }

  /**
   * @deprecated We will remove plugins because we're planing to move away from axios to fetch()
   */
  use(plugin: (clockodo: Clockodo) => void) {
    plugin(this);
  }

  async getAbsence(
    params: Params<{ id: Absence["id"] }>
  ): Promise<AbsenceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCE);

    const { id, ...rest } = params;

    return this.api.get("/absences/" + id, rest);
  }

  async getAbsences(
    params: Params<{ year: number }>
  ): Promise<AbsencesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCES);

    return this.api.get("/absences", params);
  }

  async getAccessCustomersProjects(
    params: Params<{ usersId: User["id"] }>
  ): Promise<AccessCustomersProjectsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ACCESS_CUSTOMERS_PROJECTS);

    const { usersId, ...rest } = params;

    return this.api.get(`/v2/users/${usersId}/access/customers-projects`, rest);
  }

  async getAccessServices(
    params: Params<{ usersId: User["id"] }>
  ): Promise<AccessServicesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ACCESS_SERVICES);

    const { usersId, ...rest } = params;

    return this.api.get(`/v2/users/${usersId}/access/services`, rest);
  }

  async getClock(params?: Params): Promise<ClockReturnType> {
    return this.api.get("/v2/clock", params);
  }

  async getCustomer(
    params: Params<{ id: Customer["id"] }>
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_CUSTOMER);

    const { id, ...rest } = params;

    return this.api.get("/customers/" + id, rest);
  }

  async getCustomers(params?: Params): Promise<CustomersReturnType> {
    return this.api.get("/customers", params);
  }

  async getProject(
    params: Params<{ id: Project["id"] }>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_PROJECT);

    const { id, ...rest } = params;

    return this.api.get("/projects/" + id, rest);
  }

  async getProjects(params?: Params): Promise<ProjectsReturnType> {
    return this.api.get("/projects", params);
  }

  async getEntry(
    params: Params<{ id: Entry["id"] }>
  ): Promise<EntryReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY);

    const { id, ...rest } = params;

    return this.api.get("/v2/entries/" + id, rest);
  }

  async getEntries(
    params: Params<{
      timeSince: string;
      timeUntil: string;
    }>
  ): Promise<EntriesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

    return this.api.get("/v2/entries", params);
  }

  async getEntriesTexts(
    params: Params<{
      text: string;
    }>
  ): Promise<EntriesTextsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES_TEXTS);

    return this.api.get("/v2/entriesTexts", params);
  }

  async getEntryGroups(
    params: Params<{
      timeSince: string;
      timeUntil: string;
      grouping: Array<string>;
    }>
  ): Promise<EntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY_GROUPS);

    return this.api.get("/v2/entrygroups", {
      ...params,
      grouping: params.grouping.map((key) => camelCaseToSnakeCase(key)),
    });
  }

  async getSearchTexts(params?: Params): Promise<SearchTextsReturnType> {
    return this.api.get("/clock/searchtexts", params);
  }

  async getService(
    params: Params<{ id: Service["id"] }>
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_SERVICE);

    const { id, ...rest } = params;

    return this.api.get("/services/" + id, rest);
  }

  async getServices(params?: Params): Promise<ServicesReturnType> {
    return this.api.get("/services", params);
  }

  async getTeam(params: Params<{ id: Team["id"] }>): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_TEAM);

    const { id, ...rest } = params;

    return this.api.get("/v2/teams/" + id, rest);
  }

  async getTeams(params?: Params): Promise<TeamsReturnType> {
    return this.api.get("/v2/teams", params);
  }

  // This endpoint still uses the old lumpSum casing
  async getLumpSumService(
    params: Params<{ id: LumpsumService["id"] }>
  ): Promise<LumpsumServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_LUMPSUM_SERVICE);

    const { id, ...rest } = params;

    return this.api.get("/lumpsumservices/" + id, rest);
  }

  // This endpoint still uses the old lumpSum casing
  async getLumpSumServices(
    params?: Params
  ): Promise<LumpsumServicesReturnType> {
    return this.api.get("/lumpsumservices", params);
  }

  async getTargethoursRow(
    params: Params<{ id: TargethoursRow["id"] }>
  ): Promise<TargethoursRowReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_TARGETHOURS_ROW);

    const { id, ...rest } = params;

    return this.api.get("/targethours/" + id, rest);
  }

  async getTargethours(params?: Params): Promise<TargethoursReturnType> {
    return this.api.get("/targethours", params);
  }

  async getUser(params: Params<{ id: User["id"] }>): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER);

    const { id, ...rest } = params;

    return this.api.get("/users/" + id, rest);
  }

  async getUsers(params?: Params): Promise<UsersReturnType> {
    return this.api.get("/users", params);
  }

  async getUserReport<
    GivenUserReportType extends UserReportType = UserReportType.Year
  >(
    params: Params<{
      usersId: User["id"];
      year: number;
      type?: GivenUserReportType;
    }>
  ): Promise<UserReportReturnType<GivenUserReportType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORT);

    const { usersId, ...rest } = params;

    return this.api.get("/userreports/" + usersId, rest);
  }

  async getUserReports<
    GivenUserReportType extends UserReportType = UserReportType.Year
  >(
    params: Params<{ year: number; type?: GivenUserReportType }>
  ): Promise<UserReportsReturnType<GivenUserReportType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORTS);

    return this.api.get("/userreports", params);
  }

  async getNonbusinessGroups(
    params?: Params
  ): Promise<NonbusinessGroupsReturnType> {
    return this.api.get("/nonbusinessgroups", params);
  }

  async getNonbusinessDays(
    params: Params<{ nonbusinessgroupsId: number; year: number }>
  ): Promise<NonbusinessDaysReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_NONBUSINESS_DAYS);

    return this.api.get("/nonbusinessdays", params);
  }

  async getAggregatesUsersMe(
    params?: Params
  ): Promise<AggregatesUsersMeReturnType> {
    return this.api.get("/v2/aggregates/users/me", params);
  }

  async addAbsence(
    params: Params<Pick<Required<Absence>, typeof REQUIRED.ADD_ABSENCE[number]>>
  ): Promise<AbsenceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_ABSENCE);

    return this.api.post("/absences", params);
  }

  async addCustomer(
    params: Params<Pick<Customer, typeof REQUIRED.ADD_CUSTOMER[number]>>
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_CUSTOMER);

    return this.api.post("/customers", params);
  }

  async addEntry(
    params: Params<
      | Pick<TimeEntry, typeof REQUIRED.ADD_TIME_ENTRY[number]>
      | Pick<LumpsumValueEntry, typeof REQUIRED.ADD_LUMPSUM_VALUE_ENTRY[number]>
      | Pick<
          LumpsumServiceEntry,
          typeof REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY[number]
        >
    >
  ): Promise<AddEntryReturnType> {
    if ("lumpsumServicesId" in params) {
      REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY);
    } else if ("lumpsum" in params) {
      REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_VALUE_ENTRY);
    } else {
      REQUIRED.checkRequired(params, REQUIRED.ADD_TIME_ENTRY);
    }

    return this.api.post("/v2/entries", params);
  }

  async addProject(
    params: Params<Pick<Project, typeof REQUIRED.ADD_PROJECT[number]>>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_PROJECT);

    return this.api.post("/projects", params);
  }

  async addService(
    params: Params<Pick<Service, typeof REQUIRED.ADD_SERVICE[number]>>
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_SERVICE);

    return this.api.post("/services", params);
  }

  async addTeam(
    params: Params<Pick<Team, typeof REQUIRED.ADD_TEAM[number]>>
  ): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_TEAM);

    return this.api.post("/v2/teams", params);
  }

  async addUser(
    params: Params<Pick<User, typeof REQUIRED.ADD_USER[number]>>
  ): Promise<AddUserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_USER);

    return this.api.post("/users", params);
  }

  async startClock(
    params: Params<
      Pick<TimeEntry, typeof REQUIRED.START_CLOCK[number]> & {
        billable: ClockingTimeEntryBillability;
      }
    >
  ): Promise<ClockStartReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.START_CLOCK);

    return this.api.post("/v2/clock", params);
  }

  async changeClockDuration(
    params: Params<{
      entriesId: Entry["id"];
      durationBefore: number;
      duration: number;
    }>
  ): Promise<ClockEditReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.CHANGE_CLOCK_DURATION);

    const { entriesId, ...rest } = params;

    return this.api.put("/v2/clock/" + entriesId, rest);
  }

  async editAbsence(
    params: Params<Pick<Absence, typeof REQUIRED.EDIT_ABSENCE[number]>>
  ): Promise<AbsenceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_ABSENCE);

    const { id } = params;

    return this.api.put("/absences/" + id, params);
  }

  async editCustomer(
    params: Params<Pick<Customer, typeof REQUIRED.EDIT_CUSTOMER[number]>>
  ) {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_CUSTOMER);

    const { id } = params;

    return this.api.put("/customers/" + id, params);
  }

  async editEntry(
    params: Params<Pick<Entry, typeof REQUIRED.EDIT_ENTRY[number]>>
  ): Promise<EditEntryReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY);

    const { id } = params;

    return this.api.put("/v2/entries/" + id, params);
  }

  async editEntryGroup(
    params: Params<{ timeSince: string; timeUntil: string }>
  ): Promise<EditEntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY_GROUP);

    return this.api.put("/entrygroups", params);
  }

  async editProject(
    params: Params<Pick<Project, typeof REQUIRED.EDIT_PROJECT[number]>>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_PROJECT);

    const { id } = params;

    return this.api.put("/projects/" + id, params);
  }

  async editService(
    params: Params<Pick<Service, typeof REQUIRED.EDIT_SERVICE[number]>>
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_SERVICE);

    const { id } = params;

    return this.api.put("/services/" + id, params);
  }

  async editTeam(
    params: Params<Pick<Team, typeof REQUIRED.EDIT_TEAM[number]>>
  ): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_TEAM);

    const { id } = params;

    return this.api.put("/v2/teams/" + id, params);
  }

  async editUser(
    params: Params<Pick<User, typeof REQUIRED.EDIT_USER[number]>>
  ): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_USER);

    const { id } = params;

    return this.api.put("/users/" + id, params);
  }

  async deactivateCustomer(
    params: Params<Pick<Customer, typeof REQUIRED.DEACTIVATE_CUSTOMER[number]>>
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_CUSTOMER);

    const { id } = params;

    return this.api.delete("/customers/" + id, params);
  }

  async deactivateProject(
    params: Params<Pick<Project, typeof REQUIRED.DEACTIVATE_PROJECT[number]>>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_PROJECT);

    const { id } = params;

    return this.api.delete("/projects/" + id, params);
  }

  async deactivateService(
    params: Params<Pick<Service, typeof REQUIRED.DEACTIVATE_SERVICE[number]>>
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_SERVICE);

    const { id } = params;

    return this.api.delete("/services/" + id, params);
  }

  async deactivateUser(
    params: Params<Pick<User, typeof REQUIRED.DEACTIVATE_USER[number]>>
  ): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_USER);

    const { id } = params;

    return this.api.delete("/users/" + id, params);
  }

  async deleteAbsence(
    params: Params<Pick<Absence, typeof REQUIRED.DELETE_ABSENCE[number]>>
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ABSENCE);

    const { id } = params;

    return this.api.delete("/absences/" + id, params);
  }

  async deleteEntry(
    params: Params<Pick<Entry, typeof REQUIRED.DELETE_ENTRY[number]>>
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY);

    const { id } = params;

    return this.api.delete("/v2/entries/" + id, params);
  }

  async deleteEntryGroup(
    params: Params<{ timeSince: string; timeUntil: string }>
  ): Promise<DeleteEntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY_GROUP);

    return this.api.delete("/entrygroups", params);
  }

  async deleteTeam(
    params: Params<Pick<Team, typeof REQUIRED.DELETE_TEAM[number]>>
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_TEAM);

    const { id } = params;

    return this.api.delete("/v2/teams/" + id, params);
  }

  async register(
    params: Params<{ companiesName: string; name: string; email: string }>
  ): Promise<RegisterReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.REGISTER);

    return this.api.post("/register", params);
  }

  async stopClock(
    params: Params<{ entriesId: Entry["id"] }>
  ): Promise<ClockStopReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.STOP_CLOCK);

    const { entriesId, ...rest } = params;

    return this.api.delete("/v2/clock/" + entriesId, rest);
  }
}

export type AbsenceReturnType = { absence: Absence };
export type AbsencesReturnType = { absences: Array<Absence> };
export type AccessCustomersProjectsReturnType = {
  add: AccessToCustomersProjects;
  rep: AccessToCustomersProjects;
  edit: AccessToCustomersProjects;
};
export type AccessServicesReturnType = {
  add: AccessToServices;
};
export type DeleteReturnType = { success: true };
export type CustomerReturnType = { customer: Customer };
export type CustomersReturnType = { customers: Array<Customer> };
export type ProjectsReturnType = { projects: Array<Project> };
export type ProjectReturnType = { project: Project };
export type ServiceReturnType = { service: Service };
export type ServicesReturnType = { services: Array<Service> };
export type TeamReturnType = { team: Team };
export type TeamsReturnType = { teams: Array<Team> };
export type LumpsumServiceReturnType = {
  // This endpoint still uses the old lumpSum casing
  lumpSumService: LumpsumService;
};
export type LumpsumServicesReturnType = {
  // This endpoint still uses the old lumpSum casing
  lumpSumServices: Array<LumpsumService>;
};
export type UserReturnType = { user: User };
export type UsersReturnType = { users: Array<User> };
export type EntryReturnType = { entry: Entry };
export type AddEntryReturnType = { entry: Entry; stopped?: Entry };
export type EditEntryReturnType = {
  entry: Entry;
  running: null | TimeEntry;
};
export type EntriesReturnType = {
  paging: Paging;
  filter: null | Pick<
    Filter,
    | "billable"
    | "budgetType"
    | "customersId"
    | "lumpsumServicesId"
    | "projectsId"
    | "servicesId"
    | "text"
    | "textsId"
    | "usersId"
  >;
  entries: Array<Entry>;
};
export type EntriesTextsReturnType = {
  paging: Paging;
  filter: null | Pick<
    Filter,
    | "billable"
    | "customersId"
    | "lumpsumServicesId"
    | "projectsId"
    | "servicesId"
    | "usersId"
    | "timeSince"
    | "timeUntil"
  >;
  texts: EntriesText;
  mode: string;
  sort: string;
};
export type EntryGroupsReturnType = { groups: Array<EntryGroup> };
export type EditEntryGroupsReturnType =
  | { confirmKey: string; affectedEntries: number }
  | { success: true; editedEntries: number };
export type DeleteEntryGroupsReturnType =
  | { confirmKey: string; affectedEntries: number }
  | { success: true; deletedEntries: number };
export type UserReportReturnType<
  GivenUserReportType extends UserReportType = UserReportType.Year
> = {
  userreport: UserReport<GivenUserReportType>;
};
export type UserReportsReturnType<
  GivenUserReportType extends UserReportType = UserReportType.Year
> = {
  userreports: Array<UserReport<GivenUserReportType>>;
};
export type NonbusinessGroupsReturnType = {
  nonbusinessgroups: Array<NonbusinessGroup>;
};
export type NonbusinessDaysReturnType = {
  nonbusinessdays: Array<NonbusinessDay>;
};
export type AggregatesUsersMeReturnType = {
  user: User;
  company: Company;
  worktimeRegulation: WorktimeRegulation;
};
export type ClockReturnType = {
  running: null | TimeEntry;
  currentTime: string;
};
export type ClockStartReturnType = {
  running: TimeEntry;
  stopped?: TimeEntry;
  currentTime: string;
};
export type ClockStopReturnType = {
  stopped: TimeEntry;
  running: null | TimeEntry;
  currentTime: string;
};
export type ClockEditReturnType = {
  updated: TimeEntry;
  running: null | TimeEntry;
  currentTime: string;
};
export type RegisterReturnType = {
  success: "true";
  user: User;
  apiKey: string;
};
export type SearchTextsReturnType = { texts: Array<string> };

export type TargethoursRowReturnType = {
  targethoursRow: TargethoursRow;
};
export type TargethoursReturnType = {
  targethours: Array<TargethoursRow>;
};
export type AddUserReturnType = {
  success: "true";
  user: User;
  apikey: string;
};
