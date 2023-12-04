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
import {
  WorkTimeChangeRequest,
  WorkTimeChangeRequestStatus,
  WorkTimeDay,
} from "./models/workTimes.js";
import { OvertimecarryRow } from "./models/overtimecarry.js";
import { SurchargeModel } from "./models/surchargeModel.js";
import { HolidaysQuota } from "./models/holidaysQuota.js";
import { HolidaysCarryover } from "./models/holidaysCarryover.js";

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

    return this.api.get("/v2/absences/" + id, remainingParams);
  }

  async getAbsences(
    params: Params<{ year: number; usersId?: User["id"] | Array<User["id"]> }>
  ): Promise<AbsencesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCES);

    return this.api.get("/v2/absences", params);
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
    params?: Params<CustomersParams & ParamsWithPage>
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
    params?: Params<ProjectsParams & ParamsWithPage>
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
    params: Params<EntriesParams & ParamsWithPage>
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
    params: Params<EntriesTextsParams & ParamsWithPage>
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

    return this.api.get("/v3/services/" + id, remainingParams);
  }

  async getServices(
    params?: Params<ServiceParams>
  ): Promise<ResponseWithoutPaging<ServicesReturnType>> {
    const pages = await this.api.getAllPages<ServicesReturnType>(
      "/v3/services",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const services = pages.flatMap(({ services }) => services);

    return {
      ...remainingResponse,
      services,
    };
  }

  async getServicesPage(
    params?: Params<ServiceParams & ParamsWithPage>
  ): Promise<ServicesReturnType> {
    return this.api.get("/v3/services", params);
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

    return this.api.get("/v3/lumpsumservices/" + id, remainingParams);
  }

  // This endpoint still uses the old lumpSum casing
  async getLumpSumServices(
    params?: Params<LumpsumServiceParams>
  ): Promise<ResponseWithoutPaging<LumpsumServicesReturnType>> {
    const pages = await this.api.getAllPages<LumpsumServicesReturnType>(
      "/v3/lumpsumservices",
      params
    );
    const [{ paging, ...remainingResponse }] = pages;
    const lumpSumServices = pages.flatMap(
      ({ lumpSumServices }) => lumpSumServices
    );

    return {
      ...remainingResponse,
      lumpSumServices,
    };
  }

  // This endpoint still uses the old lumpSum casing
  async getLumpSumServicesPage(
    params?: Params<LumpsumServiceParams & ParamsWithPage>
  ): Promise<LumpsumServicesReturnType> {
    return this.api.get("/v3/lumpsumservices", params);
  }

  async getTargethoursRow(
    params: Params<{ id: TargethoursRow["id"] }>
  ): Promise<TargethoursRowReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_TARGETHOURS_ROW);

    const { id, ...remainingParams } = params;

    return this.api.get("/targethours/" + id, remainingParams);
  }

  async getTargethours(
    params?: Params<{ usersId?: User["id"] | Array<User["id"]> }>
  ): Promise<TargethoursReturnType> {
    return this.api.get("/targethours", params);
  }

  async getUser(params: Params<{ id: User["id"] }>): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/users/" + id, remainingParams);
  }

  async getUsers(params?: Params): Promise<UsersReturnType> {
    return this.api.get("/v2/users", params);
  }

  async getSurchargeModel(
    params: Params<{ id: SurchargeModel["id"] }>
  ): Promise<SurchargeModelReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_SURCHARGE_MODEL);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/surchargeModels/" + id, remainingParams);
  }

  async getSurchargeModels(
    params?: Params
  ): Promise<SurchargeModelsReturnType> {
    return this.api.get("/v2/surchargeModels", params);
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
    params: Params<{
      nonbusinessgroupsId?:
        | NonbusinessGroup["id"]
        | Array<NonbusinessGroup["id"]>;
      year: number;
    }>
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

    return this.api.post("/v2/absences", params);
  }

  async addCustomer(
    params: Params<Pick<Customer, typeof REQUIRED.ADD_CUSTOMER[number]>>
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_CUSTOMER);

    return this.api.post("/v2/customers", params);
  }

  async addLumpsumService(
    params: Params<
      Pick<LumpsumService, typeof REQUIRED.ADD_LUMPSUM_SERVICE[number]>
    >
  ): Promise<LumpsumServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_SERVICE);

    return this.api.post("/v3/lumpsumservices", params);
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

    return this.api.post("/v3/services", params);
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

    return this.api.post("/v2/users", params);
  }

  async addSurchargeModel(
    params: Params<
      Pick<SurchargeModel, typeof REQUIRED.ADD_SURCHARGE_MODEL[number]>
    >
  ): Promise<SurchargeModelReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_SURCHARGE_MODEL);

    return this.api.post("/v2/surchargeModels", params);
  }

  async startClock(
    params: Params<
      Pick<TimeEntry, typeof REQUIRED.START_CLOCK[number]> & {
        /**
         * Billability of the time entry that is about to be created.
         * Omit it if you want to use the project's default.
         */
        billable?: ClockingTimeEntryBillability;
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

    return this.api.put("/v2/absences/" + id, params);
  }

  async editCustomer(
    params: Params<Pick<Customer, typeof REQUIRED.EDIT_CUSTOMER[number]>>
  ) {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_CUSTOMER);

    const { id } = params;

    return this.api.put("/v2/customers/" + id, params);
  }

  async editLumpsumService(
    params: Params<
      Pick<LumpsumService, typeof REQUIRED.EDIT_LUMPSUM_SERVICE[number]>
    >
  ) {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_LUMPSUM_SERVICE);

    const { id } = params;

    return this.api.put("/v3/lumpsumservices/" + id, params);
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

    return this.api.put("/v2/entrygroups", params);
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

    return this.api.put("/v3/services/" + id, params);
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

    return this.api.put("/v2/users/" + id, params);
  }

  async editSurchargeModel(
    params: Params<
      Pick<SurchargeModel, typeof REQUIRED.EDIT_SURCHARGE_MODEL[number]>
    >
  ): Promise<SurchargeModelReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_SURCHARGE_MODEL);

    const { id } = params;

    return this.api.put("/v2/surchargeModels/" + id, params);
  }

  async deleteCustomer(
    params: Params<Pick<Customer, typeof REQUIRED.DELETE_CUSTOMER[number]>>
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_CUSTOMER);

    const { id } = params;

    return this.api.delete("/v2/customers/" + id, params);
  }

  async deleteProject(
    params: Params<Pick<Project, typeof REQUIRED.DELETE_PROJECT[number]>>
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_PROJECT);

    const { id } = params;

    return this.api.delete("/v2/projects/" + id, params);
  }

  async deleteService(
    params: Params<Pick<Service, typeof REQUIRED.DELETE_SERVICE[number]>>
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_SERVICE);

    const { id } = params;

    return this.api.delete("/v3/services/" + id, params);
  }

  async deleteUser(
    params: Params<Pick<User, typeof REQUIRED.DELETE_USER[number]>>
  ): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_USER);

    const { id } = params;

    return this.api.delete("/v2/users/" + id, params);
  }

  async deleteSurchargeModel(
    params: Params<
      Pick<SurchargeModel, typeof REQUIRED.DELETE_SURCHARGE_MODEL[number]>
    >
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_SURCHARGE_MODEL);

    const { id } = params;

    return this.api.delete("/v2/surchargeModels/" + id);
  }

  async deleteAbsence(
    params: Params<Pick<Absence, typeof REQUIRED.DELETE_ABSENCE[number]>>
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ABSENCE);

    const { id } = params;

    return this.api.delete("/v2/absences/" + id, params);
  }

  async deleteEntry(
    params: Params<Pick<Entry, typeof REQUIRED.DELETE_ENTRY[number]>>
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY);

    const { id } = params;

    return this.api.delete("/v2/entries/" + id, params);
  }

  async deleteLumpsumService(
    params: Params<
      Pick<LumpsumService, typeof REQUIRED.DELETE_LUMPSUM_SERVICE[number]>
    >
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_LUMPSUM_SERVICE);

    const { id } = params;

    return this.api.delete("/v3/lumpsumservices/" + id, params);
  }

  async deleteEntryGroup(
    params: Params<{ timeSince: string; timeUntil: string }>
  ): Promise<DeleteEntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY_GROUP);

    return this.api.delete("/v2/entrygroups", params);
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
    params: Params<{ entriesId: Entry["id"]; usersId?: number }>
  ): Promise<ClockStopReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.STOP_CLOCK);

    const { entriesId, ...remainingParams } = params;

    return this.api.delete("/v2/clock/" + entriesId, remainingParams);
  }

  async getWorkTimesPage(
    params?: Params<WorkTimesParams & ParamsWithPage>
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
    params: Params<WorkTimesChangeRequestsParams & ParamsWithPage>
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
        Omit<WorkTimeChangeRequest, "id" | "status">,
        typeof REQUIRED.ADD_WORK_TIMES_CHANGE_REQUEST[number]
      >
    >
  ): Promise<AddWorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_WORK_TIMES_CHANGE_REQUEST);

    return this.api.post("/v2/workTimes/changeRequests", params);
  }

  async withdrawWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        typeof REQUIRED.WITHDRAW_WORK_TIMES_CHANGE_REQUEST[number]
      >
    >
  ): Promise<ApproveOrDeclineWorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.WITHDRAW_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.delete(
      `/v2/workTimes/changeRequests/${id}`,
      remainingParams
    );
  }

  async approveWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        typeof REQUIRED.APPROVE_WORK_TIMES_CHANGE_REQUEST[number]
      >
    >
  ): Promise<ApproveOrDeclineWorkTimesChangeRequestReturnType> {
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
  ): Promise<ApproveOrDeclineWorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DECLINE_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.post(
      `/v2/workTimes/changeRequests/${id}/decline`,
      remainingParams
    );
  }

  async getOvertimecarry(
    params?: Params<OvertimecarryRowParams>
  ): Promise<OvertimecarryRowReturnType> {
    return this.api.get("/overtimecarry", params);
  }

  async getHolidaysQuotas(
    params?: Params<HolidaysQuotasParams>
  ): Promise<HolidaysQuotasReturnType> {
    return this.api.get("/holidaysquota", params);
  }

  async getHolidaysCarryovers(
    params?: Params<HolidaysCarryoversParams>
  ): Promise<HolidaysCarryoversReturnType> {
    return this.api.get("/holidayscarry", params);
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

export type ServiceParams = {
  /** Filter service by search term */
  filterFulltext?: string;
  /** Filter service by active flag */
  filterActive?: boolean;
};
export type ServiceReturnType = { service: Service };
export type ServicesReturnType = ResponseWithPaging &
  ResponseWithFilter<"active" | "fulltext"> & { services: Array<Service> };

export type TeamReturnType = { team: Team };
export type TeamsReturnType = { teams: Array<Team> };

export type LumpsumServiceParams = {
  /** Filter lumpsum service by search term */
  filterFulltext?: string;
  /** Filter lumpsum service by active flag */
  filterActive?: boolean;
};
export type LumpsumServiceReturnType = {
  // This endpoint still uses the old lumpSum casing
  lumpSumService: LumpsumService;
};
export type LumpsumServicesReturnType = ResponseWithPaging &
  ResponseWithFilter<"active" | "fulltext"> & {
    // This endpoint still uses the old lumpSum casing
    lumpSumServices: Array<LumpsumService>;
  };
export type UserReturnType = { user: User };
export type UsersReturnType = { users: Array<User> };
export type SurchargeModelReturnType = { data: SurchargeModel };
export type SurchargeModelsReturnType = {
  data: Array<SurchargeModel>;
};
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

export type WorkTimesParams = {
  /** The user ID by which the work times should be filtered */
  usersId?: number;
  dateSince: string;
  dateUntil: string;
};
export type WorkTimesReturnType = ResponseWithPaging & {
  workTimeDays: Array<WorkTimeDay>;
};

export type WorkTimesChangeRequestsParams = {
  /** The user ID by which the work time change requests should be filtered */
  usersId?: number;
  dateSince?: string;
  dateUntil?: string;
  status?: WorkTimeChangeRequestStatus;
};
export type WorkTimesChangeRequestsReturnType = ResponseWithPaging & {
  changeRequests: Array<WorkTimeChangeRequest>;
};

export type ApproveOrDeclineWorkTimesChangeRequestReturnType = Record<
  string,
  never
>;

export type AddWorkTimesChangeRequestReturnType =
  | {
      changeRequest: WorkTimeChangeRequest;
      /**
       * Is false if the change request is being returned
       **/
      approvedImmediately: false;
      /**
       * Will be set in case the given work time change request replaced a previous one.
       * This is because on a certain day there can only be one change request per user.
       **/
      replacedChangeRequest: null | WorkTimeChangeRequest;
    }
  | {
      /**
       * Is null if the change request was immediately approved (because the rights imply no need for approval)
       **/
      changeRequest: null;
      /**
       * Is true if the change request was immediately approved (because the rights imply no need for approval)
       **/
      approvedImmediately: true;
      /**
       * Is null if the change request was immediately approved (because the rights imply no need for approval)
       **/
      replacedChangeRequest: null;
    };

export type OvertimecarryRowReturnType = {
  overtimecarry: Array<OvertimecarryRow>;
};
export type OvertimecarryRowParams = {
  /** The user ID by which the overtime carry rows should be filtered */
  usersId?: number;
  /** The year to which the data should be restricted to */
  year?: number;
};

export type HolidaysQuotasReturnType = {
  holidaysquota: Array<HolidaysQuota>;
};
export type HolidaysQuotasParams = {
  /** The user ID by which the holidays quota rows should be filtered */
  usersId?: number;
};

export type HolidaysCarryoversReturnType = {
  holidayscarry: Array<HolidaysCarryover>;
};
export type HolidaysCarryoversParams = {
  /** The user ID by which the holidays carry rows should be filtered */
  usersId?: number;
  /** The year to which the data should be restricted to */
  year?: number;
};
