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
  Billability,
} from "./models/entry.js";
import { EntryGroup } from "./models/entryGroup.js";
import { LumpsumService } from "./models/lumpsumService.js";
import { Project } from "./models/project.js";
import { Service } from "./models/service.js";
import { TargethoursRow } from "./models/targethours.js";
import { User } from "./models/user.js";
import { UserReport, UserReportType } from "./models/userReport.js";
import {
  Api,
  Config,
  Params,
  ParamsWithPage,
  ResponseWithFilter,
  ResponseWithoutPaging,
  ResponseWithPaging,
} from "./lib/api.js";
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
import { WorkTimeChangeRequest, WorkTimeDay } from "./models/workTimes.js";

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

    const { id, ...remainingParams } = params;

    return this.api.get("/absences/" + id, remainingParams);
  }

  async getAbsences(
    params: Params<{ year: number }>
  ): Promise<AbsencesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCES);

    return this.api.get("/absences", params);
  }

  async getUsersAccessCustomersProjects(
    params: Params<{ usersId: User["id"] }>
  ): Promise<UsersAccessCustomersProjectsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ACCESS_CUSTOMERS_PROJECTS);

    const { usersId, ...remainingParams } = params;

    return this.api.get(
      `/v2/users/${usersId}/access/customers-projects`,
      remainingParams
    );
  }

  async getUsersAccessServices(
    params: Params<{ usersId: User["id"] }>
  ): Promise<UsersAccessServicesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ACCESS_SERVICES);

    const { usersId, ...remainingParams } = params;

    return this.api.get(
      `/v2/users/${usersId}/access/services`,
      remainingParams
    );
  }

  async getClock(params?: Params): Promise<ClockReturnType> {
    return this.api.get("/v2/clock", params);
  }

  async getCustomer(
    params: Params<{ id: Customer["id"] }>
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_CUSTOMER);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/customers/" + id, remainingParams);
  }

  async getCustomersPage(
    params?: Params<CustomersParams>
  ): Promise<CustomersReturnType> {
    return this.api.get("/v2/customers", params);
  }

  async getCustomers(
    params?: Params<CustomersParams>
  ): Promise<ResponseWithoutPaging<CustomersReturnType>> {
    const pages = await this.api.getAllPages<CustomersReturnType>(
      "/v2/customers",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const customers = pages.flatMap(({ customers }) => customers);

    return {
      ...remainingResponse,
      customers,
    };
  }

  async getProject(
    params: Params<{ id: Project["id"] }>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_PROJECT);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/projects/" + id, remainingParams);
  }

  async getProjectsPage(
    params?: Params<ProjectsParams>
  ): Promise<ProjectsReturnType> {
    return this.api.get("/v2/projects", params);
  }

  async getProjects(
    params?: Params<ProjectsParams>
  ): Promise<ResponseWithoutPaging<ProjectsReturnType>> {
    const pages = await this.api.getAllPages<ProjectsReturnType>(
      "/v2/projects",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const projects = pages.flatMap(({ projects }) => projects);

    return {
      ...remainingResponse,
      projects,
    };
  }

  async getEntry(
    params: Params<{ id: Entry["id"] }>
  ): Promise<EntryReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/entries/" + id, remainingParams);
  }

  async splitAllEntriesAtMidnight(
    params: Params<{ day: string; usersId: number }>
  ): Promise<ResponseWithoutPaging<EntriesReturnType>> {
    REQUIRED.checkRequired(params, REQUIRED.SPLIT_ALL_ENTRIES_AT_MIDNIGHT);

    const { day, usersId } = params;

    return this.api.put("/v2/entries/splitAllAtMidnight", { usersId, day });
  }

  async getEntries(
    params: Params<EntriesParams>
  ): Promise<ResponseWithoutPaging<EntriesReturnType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

    const pages = await this.api.getAllPages<EntriesReturnType>(
      "/v2/entries",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const entries = pages.flatMap(({ entries }) => entries);

    return {
      ...remainingResponse,
      entries,
    };
  }

  async getEntriesPage(
    params: Params<EntriesParams>
  ): Promise<EntriesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

    return this.api.get("/v2/entries", params);
  }

  async getEntriesTexts(
    params: Params<EntriesTextsParams>
  ): Promise<ResponseWithoutPaging<EntriesTextsReturnType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES_TEXTS);

    const pages = await this.api.getAllPages<EntriesTextsReturnType>(
      "/v2/entriesTexts",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const texts = Object.fromEntries(
      pages.flatMap(({ texts }) => Object.entries(texts))
    );

    return {
      ...remainingResponse,
      texts,
    };
  }

  async getEntriesTextsPage(
    params: Params<EntriesTextsParams>
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

  async getService(
    params: Params<{ id: Service["id"] }>
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_SERVICE);

    const { id, ...remainingParams } = params;

    return this.api.get("/services/" + id, remainingParams);
  }

  async getServices(params?: Params): Promise<ServicesReturnType> {
    return this.api.get("/services", params);
  }

  async getTeam(params: Params<{ id: Team["id"] }>): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_TEAM);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/teams/" + id, remainingParams);
  }

  async getTeams(params?: Params): Promise<TeamsReturnType> {
    return this.api.get("/v2/teams", params);
  }

  // This endpoint still uses the old lumpSum casing
  async getLumpSumService(
    params: Params<{ id: LumpsumService["id"] }>
  ): Promise<LumpsumServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_LUMPSUM_SERVICE);

    const { id, ...remainingParams } = params;

    return this.api.get("/lumpsumservices/" + id, remainingParams);
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

    const { id, ...remainingParams } = params;

    return this.api.get("/targethours/" + id, remainingParams);
  }

  async getTargethours(params?: Params): Promise<TargethoursReturnType> {
    return this.api.get("/targethours", params);
  }

  async getUser(params: Params<{ id: User["id"] }>): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER);

    const { id, ...remainingParams } = params;

    return this.api.get("/users/" + id, remainingParams);
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

    const { usersId, ...remainingParams } = params;

    return this.api.get("/userreports/" + usersId, remainingParams);
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

    return this.api.post("/v2/customers", params);
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

    return this.api.post("/v2/projects", params);
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

    const { entriesId, ...remainingParams } = params;

    return this.api.put("/v2/clock/" + entriesId, remainingParams);
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

    return this.api.put("/v2/customers/" + id, params);
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

    return this.api.put("/v2/projects/" + id, params);
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

    return this.api.delete("/v2/customers/" + id, params);
  }

  async deactivateProject(
    params: Params<Pick<Project, typeof REQUIRED.DEACTIVATE_PROJECT[number]>>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DEACTIVATE_PROJECT);

    const { id } = params;

    return this.api.delete("/v2/projects/" + id, params);
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

    const { entriesId, ...remainingParams } = params;

    return this.api.delete("/v2/clock/" + entriesId, remainingParams);
  }

  async getWorkTimesPage(
    params?: Params<WorkTimesParams>
  ): Promise<WorkTimesReturnType> {
    return this.api.get("/v2/workTimes", params);
  }

  async getWorkTimes(
    params: Params<WorkTimesParams>
  ): Promise<ResponseWithoutPaging<WorkTimesReturnType>> {
    const pages = await this.api.getAllPages<WorkTimesReturnType>(
      "/v2/workTimes",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const workTimeDays = pages.flatMap(({ workTimeDays }) => workTimeDays);

    return {
      ...remainingResponse,
      workTimeDays,
    };
  }

  async getWorkTimesChangeRequestsPage(
    params: Params<WorkTimesChangeRequestsParams>
  ): Promise<WorkTimesChangeRequestsReturnType> {
    return this.api.get("/v2/workTimes/changeRequests", params);
  }

  async getWorkTimesChangeRequests(
    params: Params<WorkTimesChangeRequestsParams>
  ): Promise<ResponseWithoutPaging<WorkTimesChangeRequestsReturnType>> {
    const pages = await this.api.getAllPages<WorkTimesChangeRequestsReturnType>(
      "/v2/workTimes/changeRequests",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const changeRequests = pages.flatMap(
      ({ changeRequests }) => changeRequests
    );

    return {
      ...remainingResponse,
      changeRequests,
    };
  }

  async addWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        typeof REQUIRED.ADD_WORK_TIMES_CHANGE_REQUEST[number]
      >
    >
  ): Promise<WorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_WORK_TIMES_CHANGE_REQUEST);

    return this.api.post("/v2/workTimes/changeRequests", params);
  }

  async approveWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        typeof REQUIRED.APPROVE_WORK_TIMES_CHANGE_REQUEST[number]
      >
    >
  ): Promise<WorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.APPROVE_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.post(
      `/v2/workTimes/changeRequests/${id}/approve`,
      remainingParams
    );
  }

  async declineWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        typeof REQUIRED.DECLINE_WORK_TIMES_CHANGE_REQUEST[number]
      >
    >
  ): Promise<WorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DECLINE_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.post(
      `/v2/workTimes/changeRequests/${id}/decline`,
      remainingParams
    );
  }
}

export type AbsenceReturnType = { absence: Absence };
export type AbsencesReturnType = { absences: Array<Absence> };
export type UsersAccessCustomersProjectsReturnType = {
  add: AccessToCustomersProjects;
  report: AccessToCustomersProjects;
  edit: AccessToCustomersProjects;
};
export type UsersAccessServicesReturnType = {
  add: AccessToServices;
};
export type DeleteReturnType = { success: true };
export type CustomerReturnType = { customer: Customer };
export type CustomersParams = {
  /** Filter customers by active flag */
  filterActive?: boolean;
};
export type CustomersReturnType = ResponseWithPaging &
  ResponseWithFilter<"active"> & { customers: Array<Customer> };
export type ProjectsParams = {
  /** Filter projects by customers id */
  filterCustomersId?: number;
  /** Filter projects by active flag */
  filterActive?: boolean;
};
export type ProjectsReturnType = ResponseWithPaging &
  ResponseWithFilter<"active" | "customersId"> & {
    projects: Array<Project>;
  };
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
export type EntriesParams = {
  /** In format ISO 8601 UTC, e.g. "2021-06-30T12:34:56Z"  */
  timeSince: string;
  /** In format ISO 8601 UTC, e.g. "2021-06-30T12:34:56Z"  */
  timeUntil: string;
  filterUsersId?: number;
  filterCustomersId?: number;
  filterProjectsId?: number;
  filterServicesId?: number;
  filterLumpsumServicesId?: number;
  /**
   * 0, 1 or 2
   * With filterBillable: 2 you only receive
   * entries which are billable AND already billed.
   **/
  filterBillable?: Billability;
  filterText?: string;
  filterTextsId?: number;
  filterBudgetType?: string;
};
export type EntriesReturnType = ResponseWithPaging &
  ResponseWithFilter<
    | "billable"
    | "budgetType"
    | "customersId"
    | "lumpsumServicesId"
    | "projectsId"
    | "servicesId"
    | "text"
    | "textsId"
    | "usersId"
  > & {
    entries: Array<Entry>;
  };
export type EntriesTextsParams = {
  /** Text to search for */
  text: string;
  mode?: EntriesTextsMode;
  sort?: EntriesTextsSort;
};
/**
 * Can be specified when requesting entries texts
 */
export enum EntriesTextsMode {
  /**
   * Descriptions that exactly match the submitted text (default).
   */
  ExactMatch = "exact_match",

  /**
   * Descriptions that start with the submitted text fragment.
   */
  StartsWith = "starts_with",

  /**
   * Descriptions that end with the submitted text fragment.
   */
  EndsWith = "ends_with",

  /**
   * Descriptions that contain the submitted text fragment.
   */
  Contains = "contains",
}
/**
 * Can be specified when requesting entries texts
 */
export enum EntriesTextsSort {
  /**
   * Alphabetically ascending (default).
   */
  TextAsc = "text_asc",

  /**
   * Alphabetically descending.
   */
  TextDesc = "text_desc",

  /**
   * Chronologically ascending.
   */
  TimeAsc = "time_asc",

  /**
   * Chronologically descending.
   */
  TimeDesc = "time_desc",
}
export type EntriesTextsReturnType = ResponseWithPaging &
  ResponseWithFilter<
    | "billable"
    | "customersId"
    | "lumpsumServicesId"
    | "projectsId"
    | "servicesId"
    | "usersId"
    | "timeSince"
    | "timeUntil"
  > & {
    texts: EntriesText;
    mode: EntriesTextsMode;
    sort: EntriesTextsSort;
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
  /** The currently running entry */
  running: null | TimeEntry;
  /** Timestamp of the server time. Can be used for clock synchronization */
  currentTime: string;
};
export type ClockStartReturnType = {
  /** The entry that has been started by this call */
  running: TimeEntry;
  /** Returns the previously running entry that has been stopped by this call */
  stopped: null | TimeEntry;
  /** Whether the previously running entry has been truncated to the max length of 23:59:59h */
  stoppedHasBeenTruncated: boolean;
  /** Timestamp of the server time. Can be used for clock synchronization */
  currentTime: string;
};
export type ClockStopReturnType = {
  /** The entry that has been stopped by this call */
  stopped: TimeEntry;
  /** Whether the stopped entry has been truncated to the max length of 23:59:59h */
  stoppedHasBeenTruncated: boolean;
  /**
   * The entry that has been started implicitly by this call.
   * Only relevant if the away parameter has been provided.
   **/
  running: null | TimeEntry;
  /** Timestamp of the server time. Can be used for clock synchronization */
  currentTime: string;
};
export type ClockEditReturnType = {
  updated: TimeEntry;
  /** The currently running entry */
  running: null | TimeEntry;
  /** Timestamp of the server time. Can be used for clock synchronization */
  currentTime: string;
};
export type RegisterReturnType = {
  success: true;
  user: User;
  apikey: string;
};
export type SearchTextsReturnType = { texts: Array<string> };

export type TargethoursRowReturnType = {
  targethoursRow: TargethoursRow;
};
export type TargethoursReturnType = {
  targethours: Array<TargethoursRow>;
};
export type AddUserReturnType = {
  user: User;
};

export type WorkTimesParams = ParamsWithPage & {
  /** The user ID by which the work times should be filtered */
  usersId?: number;
  dateSince: string;
  dateUntil: string;
};
export type WorkTimesReturnType = ResponseWithPaging & {
  workTimeDays: Array<WorkTimeDay>;
};

export type WorkTimesChangeRequestsParams = ParamsWithPage & {
  /** The user ID by which the work time change requests should be filtered */
  usersId?: number;
  dateSince?: string;
  dateUntil?: string;
};
export type WorkTimesChangeRequestsReturnType = ResponseWithPaging & {
  changeRequests: Array<WorkTimeChangeRequest>;
};
export type WorkTimesChangeRequestReturnType = {
  changeRequest: WorkTimeChangeRequest;
};
