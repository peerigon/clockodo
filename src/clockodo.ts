// The Clockodo instance is just too big. We should split it into smaller files.
/* eslint-disable max-lines */
import {
  Api,
  type Config,
  type Params,
  type ParamsWithPage,
  type ParamsWithSort,
  type ResponseWithFilter,
  type ResponseWithoutPaging,
  type ResponseWithPaging,
} from "./lib/api.js";
import { assertExists } from "./lib/assert.ts";
import { camelCaseToSnakeCase } from "./lib/mappings.js";
import * as REQUIRED from "./lib/requiredParams.js";
import { type Absence } from "./models/absence.js";
import {
  type AccessToCustomersProjects,
  type AccessToServices,
} from "./models/access.js";
import { type Company } from "./models/company.js";
import { type Customer } from "./models/customer.js";
import { type EntriesText } from "./models/entriesText.js";
import {
  Billability,
  type ClockingTimeEntryBillability,
  type Entry,
  type LumpsumServiceEntry,
  type LumpsumValueEntry,
  type TimeEntry,
} from "./models/entry.js";
import { type EntryGroup } from "./models/entryGroup.js";
import { type HolidaysCarryover } from "./models/holidaysCarryover.js";
import { type HolidaysQuota } from "./models/holidaysQuota.js";
import { type LumpsumService } from "./models/lumpsumService.js";
import { type NonbusinessDay } from "./models/nonbusinessDay.js";
import { type NonbusinessGroup } from "./models/nonbusinessGroup.js";
import { type OvertimecarryRow } from "./models/overtimecarry.js";
import { type Project } from "./models/project.js";
import { type Service } from "./models/service.js";
import { type Subproject } from "./models/subproject.js";
import { type SurchargeModel } from "./models/surchargeModel.js";
import { type TargethoursRow } from "./models/targethours.js";
import { type Team } from "./models/team.js";
import { type User } from "./models/user.js";
import { UserReportType, type UserReport } from "./models/userReport.js";
import { type WorktimeRegulation } from "./models/worktimeRegulation.js";
import {
  WorkTimeChangeRequestStatus,
  type WorkTimeChangeRequest,
  type WorkTimeDay,
} from "./models/workTimes.js";

export class Clockodo {
  api: Api;

  constructor(config: Config) {
    this.api = new Api(config);
  }

  private async getAllPagesAndMergeArray<
    ReturnTypeWithPaging extends ResponseWithPaging,
    RequestParams extends Record<string, unknown>,
  >(
    path: string,
    params: undefined | Params<RequestParams>,
    key: {
      [Key in keyof ResponseWithoutPaging<ReturnTypeWithPaging>]: ResponseWithoutPaging<ReturnTypeWithPaging>[Key] extends Array<unknown>
        ? Key
        : never;
    }[keyof ResponseWithoutPaging<ReturnTypeWithPaging>],
  ): Promise<ResponseWithoutPaging<ReturnTypeWithPaging>> {
    const pages = await this.api.getAllPages<ReturnTypeWithPaging>(
      path,
      params,
    );
    const firstPage = assertExists(pages[0]);
    const { paging, ...remainingResponse } = firstPage;
    const mergedData = pages.flatMap((page) => page[key]);

    return {
      ...remainingResponse,
      [key]: mergedData,
    } as ResponseWithoutPaging<ReturnTypeWithPaging>;
  }

  /**
   * @deprecated We will remove plugins because we're planing to move away from
   *   axios to fetch()
   */
  use(plugin: (clockodo: Clockodo) => void) {
    plugin(this);
  }

  async getAbsence(
    params: Params<{ id: Absence["id"] }>,
  ): Promise<AbsenceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCE);

    const { id, ...remainingParams } = params;

    return this.api.get("/v4/absences/" + id, remainingParams);
  }

  async getAbsences(
    params: Params<AbsencesParams>,
  ): Promise<AbsencesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ABSENCES);

    return this.api.get("/v4/absences", params);
  }

  async getUsersAccessCustomersProjects(
    params: Params<{ usersId: User["id"] }>,
  ): Promise<UsersAccessCustomersProjectsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ACCESS_CUSTOMERS_PROJECTS);

    const { usersId, ...remainingParams } = params;

    return this.api.get(
      `/v2/users/${usersId}/access/customers-projects`,
      remainingParams,
    );
  }

  async getUsersAccessServices(
    params: Params<{ usersId: User["id"] }>,
  ): Promise<UsersAccessServicesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ACCESS_SERVICES);

    const { usersId, ...remainingParams } = params;

    return this.api.get(
      `/v2/users/${usersId}/access/services`,
      remainingParams,
    );
  }

  async getClock(params?: Params): Promise<ClockReturnType> {
    return this.api.get("/v2/clock", params);
  }

  async getCustomer(
    params: Params<{ id: Customer["id"] }>,
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_CUSTOMER);

    const { id, ...remainingParams } = params;

    return this.api.get("/v3/customers/" + id, remainingParams);
  }

  async getCustomersPage(
    params?: Params<CustomersParams & ParamsWithPage>,
  ): Promise<CustomersReturnType> {
    return this.api.get("/v3/customers", params);
  }

  async getCustomers(
    params?: Params<CustomersParams>,
  ): Promise<ResponseWithoutPaging<CustomersReturnType>> {
    return this.getAllPagesAndMergeArray<CustomersReturnType, CustomersParams>(
      "/v3/customers",
      params,
      "data",
    );
  }

  async getProject(
    params: Params<{ id: Project["id"] }>,
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_PROJECT);

    const { id, ...remainingParams } = params;

    return this.api.get("/v4/projects/" + id, remainingParams);
  }

  async getProjectsPage(
    params?: Params<ProjectsParams & ParamsWithPage>,
  ): Promise<ProjectsReturnType> {
    return this.api.get("/v4/projects", params);
  }

  async getProjects(
    params?: Params<ProjectsParams>,
  ): Promise<ResponseWithoutPaging<ProjectsReturnType>> {
    return this.getAllPagesAndMergeArray<ProjectsReturnType, ProjectsParams>(
      "/v4/projects",
      params,
      "data",
    );
  }

  async getProjectsReportsPage(
    params?: Params<ProjectsReportsParams & ParamsWithPage>,
  ): Promise<ProjectsReportsReturnType> {
    return this.api.get("/v4/projects/reports", params);
  }

  async getProjectsReports(
    params?: Params<ProjectsReportsParams>,
  ): Promise<ResponseWithoutPaging<ProjectsReportsReturnType>> {
    return this.getAllPagesAndMergeArray<
      ProjectsReportsReturnType,
      ProjectsReportsParams
    >("/v4/projects/reports", params, "data");
  }

  async getSubproject(
    params: Params<{ id: Subproject["id"] }>,
  ): Promise<SubprojectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_SUBPROJECT);

    const { id, ...remainingParams } = params;

    return this.api.get("/v3/subprojects/" + id, remainingParams);
  }

  async getSubprojectsPage(
    params?: Params<SubprojectsParams & ParamsWithPage>,
  ): Promise<SubprojectsReturnType> {
    return this.api.get("/v3/subprojects", params);
  }

  async getSubprojects(
    params?: Params<SubprojectsParams>,
  ): Promise<ResponseWithoutPaging<SubprojectsReturnType>> {
    return this.getAllPagesAndMergeArray<
      SubprojectsReturnType,
      SubprojectsParams
    >("/v3/subprojects", params, "data");
  }

  async getEntry(
    params: Params<{ id: Entry["id"] }>,
  ): Promise<EntryReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/entries/" + id, remainingParams);
  }

  async splitAllEntriesAtMidnight(
    params: Params<{ day: string; usersId: number }>,
  ): Promise<ResponseWithoutPaging<EntriesReturnType>> {
    REQUIRED.checkRequired(params, REQUIRED.SPLIT_ALL_ENTRIES_AT_MIDNIGHT);

    const { day, usersId } = params;

    return this.api.put("/v2/entries/splitAllAtMidnight", { usersId, day });
  }

  async getEntries(
    params: Params<EntriesParams>,
  ): Promise<ResponseWithoutPaging<EntriesReturnType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

    return this.getAllPagesAndMergeArray<EntriesReturnType, EntriesParams>(
      "/v2/entries",
      params,
      "entries",
    );
  }

  async getEntriesPage(
    params: Params<EntriesParams & ParamsWithPage>,
  ): Promise<EntriesReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES);

    return this.api.get("/v2/entries", params);
  }

  async getEntriesTexts(
    params: Params<EntriesTextsParams>,
  ): Promise<ResponseWithoutPaging<EntriesTextsReturnType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES_TEXTS);

    return this.api.get("/v3/entriesTexts", params);
  }

  async getEntriesTextsPage(
    params: Params<EntriesTextsParams & ParamsWithPage>,
  ): Promise<EntriesTextsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRIES_TEXTS);

    return this.api.get("/v3/entriesTexts", params);
  }

  async getEntryGroups(
    params: Params<{
      timeSince: string;
      timeUntil: string;
      grouping: Array<string>;
    }>,
  ): Promise<EntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_ENTRY_GROUPS);

    return this.api.get("/v2/entrygroups", {
      ...params,
      grouping: params.grouping.map((key) => camelCaseToSnakeCase(key)),
    });
  }

  async getService(
    params: Params<{ id: Service["id"] }>,
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_SERVICE);

    const { id, ...remainingParams } = params;

    return this.api.get("/v4/services/" + id, remainingParams);
  }

  async getServices(
    params?: Params<ServiceParams>,
  ): Promise<ResponseWithoutPaging<ServicesReturnType>> {
    return this.getAllPagesAndMergeArray<ServicesReturnType, ServiceParams>(
      "/v4/services",
      params,
      "data",
    );
  }

  async getServicesPage(
    params?: Params<ServiceParams & ParamsWithPage>,
  ): Promise<ServicesReturnType> {
    return this.api.get("/v4/services", params);
  }

  async getTeam(params: Params<{ id: Team["id"] }>): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_TEAM);

    const { id, ...remainingParams } = params;

    return this.api.get("/v3/teams/" + id, remainingParams);
  }

  async getTeams(
    params?: Params<TeamsParams & ParamsWithPage>,
  ): Promise<TeamsReturnType> {
    return this.api.get("/v3/teams", params);
  }

  async getLumpSumService(
    params: Params<{ id: LumpsumService["id"] }>,
  ): Promise<LumpsumServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_LUMPSUM_SERVICE);

    const { id, ...remainingParams } = params;

    return this.api.get("/v4/lumpSumServices/" + id, remainingParams);
  }

  async getLumpSumServices(
    params?: Params<LumpsumServiceParams>,
  ): Promise<ResponseWithoutPaging<LumpsumServicesReturnType>> {
    return this.getAllPagesAndMergeArray<
      LumpsumServicesReturnType,
      LumpsumServiceParams
    >("/v4/lumpSumServices", params, "data");
  }

  async getLumpSumServicesPage(
    params?: Params<LumpsumServiceParams & ParamsWithPage>,
  ): Promise<LumpsumServicesReturnType> {
    return this.api.get("/v4/lumpSumServices", params);
  }

  async getTargethoursRow(
    params: Params<{ id: TargethoursRow["id"] }>,
  ): Promise<TargethoursRowReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_TARGETHOURS_ROW);

    const { id, ...remainingParams } = params;

    return this.api.get("/targethours/" + id, remainingParams);
  }

  async getTargethours(
    params?: Params<{ usersId?: User["id"] | Array<User["id"]> }>,
  ): Promise<TargethoursReturnType> {
    return this.api.get("/targethours", params);
  }

  async getUser(params: Params<{ id: User["id"] }>): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER);

    const { id, ...remainingParams } = params;

    return this.api.get("/v3/users/" + id, remainingParams);
  }

  async getUsers(params?: Params<UsersParam>): Promise<UsersReturnType> {
    return this.api.get("/v3/users", params);
  }

  async getSurchargeModel(
    params: Params<{ id: SurchargeModel["id"] }>,
  ): Promise<SurchargeModelReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_SURCHARGE_MODEL);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/surchargeModels/" + id, remainingParams);
  }

  async getSurchargeModels(
    params?: Params,
  ): Promise<SurchargeModelsReturnType> {
    return this.api.get("/v2/surchargeModels", params);
  }

  async getUserReport<
    GivenUserReportType extends UserReportType = UserReportType.Year,
  >(
    params: Params<{
      usersId: User["id"];
      year: number;
      type?: GivenUserReportType;
    }>,
  ): Promise<UserReportReturnType<GivenUserReportType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORT);

    const { usersId, ...remainingParams } = params;

    return this.api.get("/userreports/" + usersId, remainingParams);
  }

  async getUserReports<
    GivenUserReportType extends UserReportType = UserReportType.Year,
  >(
    params: Params<{ year: number; type?: GivenUserReportType }>,
  ): Promise<UserReportsReturnType<GivenUserReportType>> {
    REQUIRED.checkRequired(params, REQUIRED.GET_USER_REPORTS);

    return this.api.get("/userreports", params);
  }

  async getNonbusinessGroups(
    params?: Params,
  ): Promise<NonbusinessGroupsReturnType> {
    return this.api.get("/v2/nonbusinessGroups", params);
  }

  async getNonbusinessGroup(
    params: Params<{ id: NonbusinessGroup["id"] }>,
  ): Promise<NonbusinessGroupReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_NONBUSINESS_GROUP);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/nonbusinessGroups/" + id, remainingParams);
  }

  async getNonbusinessDays(
    params: Params<NonbusinessDaysParams>,
  ): Promise<NonbusinessDaysReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_NONBUSINESS_DAYS);

    return this.api.get("/v2/nonbusinessDays", params);
  }

  async getNonbusinessDay(
    params: Params<{ id: NonbusinessDay["id"]; year?: number }>,
  ): Promise<NonbusinessDayReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_NONBUSINESS_DAY);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/nonbusinessDays/" + id, remainingParams);
  }

  async getMe(params?: Params): Promise<AggregatesUsersMeReturnType> {
    return this.api.get("/v3/users/me", params);
  }

  async addAbsence(
    params: Params<AddAbsenceParams>,
  ): Promise<AbsenceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_ABSENCE);

    return this.api.post("/v4/absences", params);
  }

  async addCustomer(
    params: Params<AddCustomerParams>,
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_CUSTOMER);

    return this.api.post("/v3/customers", params);
  }

  async addLumpsumService(
    params: Params<AddLumpsumServiceParams>,
  ): Promise<LumpsumServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_LUMPSUM_SERVICE);

    return this.api.post("/v4/lumpSumServices", params);
  }

  async addEntry(
    params: Params<
      | Pick<TimeEntry, (typeof REQUIRED.ADD_TIME_ENTRY)[number]>
      | Pick<
          LumpsumValueEntry,
          (typeof REQUIRED.ADD_LUMPSUM_VALUE_ENTRY)[number]
        >
      | Pick<
          LumpsumServiceEntry,
          (typeof REQUIRED.ADD_LUMPSUM_SERVICE_ENTRY)[number]
        >
    >,
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
    params: Params<AddProjectParams>,
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_PROJECT);

    return this.api.post("/v4/projects", params);
  }

  async addSubproject(
    params: Params<AddSubprojectParams>,
  ): Promise<SubprojectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_SUBPROJECT);

    return this.api.post("/v3/subprojects", params);
  }

  async addService(
    params: Params<AddServiceParams>,
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_SERVICE);

    return this.api.post("/v4/services", params);
  }

  async addTeam(params: Params<AddTeamParams>): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_TEAM);

    return this.api.post("/v3/teams", params);
  }

  async addUser(params: Params<AddUserParams>): Promise<AddUserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_USER);

    return this.api.post("/v3/users", params);
  }

  async addSurchargeModel(
    params: Params<
      Pick<SurchargeModel, (typeof REQUIRED.ADD_SURCHARGE_MODEL)[number]>
    >,
  ): Promise<SurchargeModelReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_SURCHARGE_MODEL);

    return this.api.post("/v2/surchargeModels", params);
  }

  async addNonbusinessGroup(
    params: Params<AddNonbusinessGroupParams>,
  ): Promise<NonbusinessGroupReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_NONBUSINESS_GROUP);

    return this.api.post("/v2/nonbusinessGroups", params);
  }

  async addNonbusinessDay(
    params: Params<AddNonbusinessDayParams>,
  ): Promise<NonbusinessDayReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_NONBUSINESS_DAY);

    return this.api.post("/v2/nonbusinessDays", params);
  }

  async addOvertimecarry(
    params: Params<AddOvertimecarryParams>,
  ): Promise<OvertimecarryRowSingleReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_OVERTIMECARRY);

    return this.api.post("/v3/overtimeCarry", params);
  }

  async addHolidaysQuota(
    params: Params<AddHolidaysQuotaParams>,
  ): Promise<HolidaysQuotaReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_HOLIDAYS_QUOTA);

    return this.api.post("/v2/holidaysQuota", params);
  }

  async addHolidaysCarryover(
    params: Params<AddHolidaysCarryoverParams>,
  ): Promise<HolidaysCarryoverReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_HOLIDAYS_CARRYOVER);

    return this.api.post("/v3/holidaysCarry", params);
  }

  async startClock(
    params: Params<
      Pick<TimeEntry, (typeof REQUIRED.START_CLOCK)[number]> & {
        /**
         * Billability of the time entry that is about to be created. Omit it if
         * you want to use the project's default.
         */
        billable?: ClockingTimeEntryBillability;
      }
    >,
  ): Promise<ClockStartReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.START_CLOCK);

    return this.api.post("/v2/clock", params);
  }

  async changeClockDuration(
    params: Params<{
      entriesId: Entry["id"];
      durationBefore: number;
      duration: number;
    }>,
  ): Promise<ClockEditReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.CHANGE_CLOCK_DURATION);

    const { entriesId, ...remainingParams } = params;

    return this.api.put("/v2/clock/" + entriesId, remainingParams);
  }

  async editAbsence(
    params: Params<EditAbsenceParams>,
  ): Promise<AbsenceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_ABSENCE);

    const { id } = params;

    return this.api.put("/v4/absences/" + id, params);
  }

  async editCustomer(
    params: Params<EditCustomerParams>,
  ): Promise<CustomerReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_CUSTOMER);

    const { id } = params;

    return this.api.put("/v3/customers/" + id, params);
  }

  async editLumpsumService(
    params: Params<EditLumpsumServiceParams>,
  ): Promise<LumpsumServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_LUMPSUM_SERVICE);

    const { id } = params;

    return this.api.put("/v4/lumpSumServices/" + id, params);
  }

  async editEntry(
    params: Params<Pick<Entry, (typeof REQUIRED.EDIT_ENTRY)[number]>>,
  ): Promise<EditEntryReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY);

    const { id } = params;

    return this.api.put("/v2/entries/" + id, params);
  }

  async editEntryGroup(
    params: Params<{ timeSince: string; timeUntil: string }>,
  ): Promise<EditEntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_ENTRY_GROUP);

    return this.api.put("/v2/entrygroups", params);
  }

  async editProject(
    params: Params<EditProjectParams>,
  ): Promise<ProjectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_PROJECT);

    const { id } = params;

    return this.api.put("/v4/projects/" + id, params);
  }

  async completeProject(
    params: Params<CompleteProjectParams>,
  ): Promise<ProjectDataReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.COMPLETE_PROJECT);

    const { id, ...remainingParams } = params;

    return this.api.put("/v4/projects/" + id + "/complete", remainingParams);
  }

  async setProjectBilled(
    params: Params<SetProjectBilledParams>,
  ): Promise<ProjectDataReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.SET_PROJECT_BILLED);

    const { id, ...remainingParams } = params;

    return this.api.put("/v3/projects/" + id + "/setBilled", remainingParams);
  }

  async editSubproject(
    params: Params<EditSubprojectParams>,
  ): Promise<SubprojectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_SUBPROJECT);

    const { id } = params;

    return this.api.put("/v3/subprojects/" + id, params);
  }

  async completeSubproject(
    params: Params<CompleteSubprojectParams>,
  ): Promise<SubprojectReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.COMPLETE_SUBPROJECT);

    const { id, ...remainingParams } = params;

    return this.api.put("/v3/subprojects/" + id + "/complete", remainingParams);
  }

  async editService(
    params: Params<EditServiceParams>,
  ): Promise<ServiceReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_SERVICE);

    const { id } = params;

    return this.api.put("/v4/services/" + id, params);
  }

  async editTeam(params: Params<EditTeamParams>): Promise<TeamReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_TEAM);

    const { id } = params;

    return this.api.put("/v3/teams/" + id, params);
  }

  async editUser(params: Params<EditUserParams>): Promise<UserReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_USER);

    const { id } = params;

    return this.api.put("/v3/users/" + id, params);
  }

  async editSurchargeModel(
    params: Params<
      Pick<SurchargeModel, (typeof REQUIRED.EDIT_SURCHARGE_MODEL)[number]>
    >,
  ): Promise<SurchargeModelReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_SURCHARGE_MODEL);

    const { id } = params;

    return this.api.put("/v2/surchargeModels/" + id, params);
  }

  async editNonbusinessGroup(
    params: Params<EditNonbusinessGroupParams>,
  ): Promise<NonbusinessGroupReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_NONBUSINESS_GROUP);

    const { id } = params;

    return this.api.put("/v2/nonbusinessGroups/" + id, params);
  }

  async editNonbusinessDay(
    params: Params<EditNonbusinessDayParams>,
  ): Promise<NonbusinessDayReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_NONBUSINESS_DAY);

    const { id } = params;

    return this.api.put("/v2/nonbusinessDays/" + id, params);
  }

  async editOvertimecarry(
    params: Params<EditOvertimecarryParams>,
  ): Promise<OvertimecarryRowSingleReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_OVERTIMECARRY);

    const { id } = params;

    return this.api.put("/v3/overtimeCarry/" + id, params);
  }

  async editHolidaysQuota(
    params: Params<EditHolidaysQuotaParams>,
  ): Promise<HolidaysQuotaReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_HOLIDAYS_QUOTA);

    const { id } = params;

    return this.api.put("/v2/holidaysQuota/" + id, params);
  }

  async editHolidaysCarryover(
    params: Params<EditHolidaysCarryoverParams>,
  ): Promise<HolidaysCarryoverReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.EDIT_HOLIDAYS_CARRYOVER);

    const { id } = params;

    return this.api.put("/v3/holidaysCarry/" + id, params);
  }

  async deleteCustomer(
    params: Params<DeleteCustomerParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_CUSTOMER);

    const { id } = params;

    return this.api.delete("/v3/customers/" + id, params);
  }

  async deleteProject(
    params: Params<DeleteProjectParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_PROJECT);

    const { id } = params;

    return this.api.delete("/v4/projects/" + id, params);
  }

  async deleteSubproject(
    params: Params<DeleteSubprojectParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_SUBPROJECT);

    const { id } = params;

    return this.api.delete("/v3/subprojects/" + id, params);
  }

  async deleteService(
    params: Params<DeleteServiceParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_SERVICE);

    const { id } = params;

    return this.api.delete("/v4/services/" + id, params);
  }

  async deleteUser(
    params: Params<Pick<User, (typeof REQUIRED.DELETE_USER)[number]>>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_USER);

    const { id } = params;

    return this.api.delete("/v3/users/" + id, params);
  }

  async deleteSurchargeModel(
    params: Params<
      Pick<SurchargeModel, (typeof REQUIRED.DELETE_SURCHARGE_MODEL)[number]>
    >,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_SURCHARGE_MODEL);

    const { id } = params;

    return this.api.delete("/v2/surchargeModels/" + id);
  }

  async deleteAbsence(
    params: Params<Pick<Absence, (typeof REQUIRED.DELETE_ABSENCE)[number]>>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ABSENCE);

    const { id } = params;

    return this.api.delete("/v4/absences/" + id, params);
  }

  async deleteEntry(
    params: Params<Pick<Entry, (typeof REQUIRED.DELETE_ENTRY)[number]>>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY);

    const { id } = params;

    return this.api.delete("/v2/entries/" + id, params);
  }

  async deleteLumpsumService(
    params: Params<DeleteLumpsumServiceParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_LUMPSUM_SERVICE);

    const { id } = params;

    return this.api.delete("/v4/lumpSumServices/" + id, params);
  }

  async deleteEntryGroup(
    params: Params<{ timeSince: string; timeUntil: string }>,
  ): Promise<DeleteEntryGroupsReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_ENTRY_GROUP);

    return this.api.delete("/v2/entrygroups", params);
  }

  async deleteTeam(
    params: Params<Pick<Team, (typeof REQUIRED.DELETE_TEAM)[number]>>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_TEAM);

    const { id } = params;

    return this.api.delete("/v3/teams/" + id, params);
  }

  async deleteNonbusinessGroup(
    params: Params<DeleteNonbusinessGroupParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_NONBUSINESS_GROUP);

    const { id } = params;

    return this.api.delete("/v2/nonbusinessGroups/" + id, params);
  }

  async deleteNonbusinessDay(
    params: Params<DeleteNonbusinessDayParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_NONBUSINESS_DAY);

    const { id } = params;

    return this.api.delete("/v2/nonbusinessDays/" + id, params);
  }

  async deleteOvertimecarry(
    params: Params<DeleteOvertimecarryParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_OVERTIMECARRY);

    const { id } = params;

    return this.api.delete("/v3/overtimeCarry/" + id, params);
  }

  async deleteHolidaysQuota(
    params: Params<DeleteHolidaysQuotaParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_HOLIDAYS_QUOTA);

    const { id } = params;

    return this.api.delete("/v2/holidaysQuota/" + id, params);
  }

  async deleteHolidaysCarryover(
    params: Params<DeleteHolidaysCarryoverParams>,
  ): Promise<DeleteReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DELETE_HOLIDAYS_CARRYOVER);

    const { id } = params;

    return this.api.delete("/v3/holidaysCarry/" + id, params);
  }

  async register(
    params: Params<{ companiesName: string; name: string; email: string }>,
  ): Promise<RegisterReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.REGISTER);

    return this.api.post("/register", params);
  }

  async stopClock(
    params: Params<{ entriesId: Entry["id"]; usersId?: number }>,
  ): Promise<ClockStopReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.STOP_CLOCK);

    const { entriesId, ...remainingParams } = params;

    return this.api.delete("/v2/clock/" + entriesId, remainingParams);
  }

  async getWorkTimesPage(
    params?: Params<WorkTimesParams & ParamsWithPage>,
  ): Promise<WorkTimesReturnType> {
    return this.api.get("/v2/workTimes", params);
  }

  async getWorkTimes(
    params: Params<WorkTimesParams>,
  ): Promise<ResponseWithoutPaging<WorkTimesReturnType>> {
    return this.getAllPagesAndMergeArray<WorkTimesReturnType, WorkTimesParams>(
      "/v2/workTimes",
      params,
      "workTimeDays",
    );
  }

  async getWorkTimesChangeRequestsPage(
    params: Params<WorkTimesChangeRequestsParams & ParamsWithPage>,
  ): Promise<WorkTimesChangeRequestsReturnType> {
    return this.api.get("/v2/workTimes/changeRequests", params);
  }

  async getWorkTimesChangeRequests(
    params: Params<WorkTimesChangeRequestsParams>,
  ): Promise<ResponseWithoutPaging<WorkTimesChangeRequestsReturnType>> {
    return this.getAllPagesAndMergeArray<
      WorkTimesChangeRequestsReturnType,
      WorkTimesChangeRequestsParams
    >("/v2/workTimes/changeRequests", params, "data");
  }

  async addWorkTimesChangeRequest(
    params: Params<
      Pick<
        Omit<WorkTimeChangeRequest, "id" | "status">,
        (typeof REQUIRED.ADD_WORK_TIMES_CHANGE_REQUEST)[number]
      >
    >,
  ): Promise<AddWorkTimesChangeRequestDataReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.ADD_WORK_TIMES_CHANGE_REQUEST);

    return this.api.post("/v2/workTimes/changeRequests", params);
  }

  async withdrawWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        (typeof REQUIRED.WITHDRAW_WORK_TIMES_CHANGE_REQUEST)[number]
      >
    >,
  ): Promise<ApproveOrDeclineWorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.WITHDRAW_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.delete(
      `/v2/workTimes/changeRequests/${id}`,
      remainingParams,
    );
  }

  async approveWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        (typeof REQUIRED.APPROVE_WORK_TIMES_CHANGE_REQUEST)[number]
      >
    >,
  ): Promise<ApproveOrDeclineWorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.APPROVE_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.post(
      `/v3/workTimes/changeRequests/${id}/approve`,
      remainingParams,
    );
  }

  async declineWorkTimesChangeRequest(
    params: Params<
      Pick<
        WorkTimeChangeRequest,
        (typeof REQUIRED.DECLINE_WORK_TIMES_CHANGE_REQUEST)[number]
      >
    >,
  ): Promise<ApproveOrDeclineWorkTimesChangeRequestReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.DECLINE_WORK_TIMES_CHANGE_REQUEST);

    const { id, ...remainingParams } = params;

    return this.api.post(
      `/v2/workTimes/changeRequests/${id}/decline`,
      remainingParams,
    );
  }

  async getOvertimecarry(
    params?: Params<OvertimecarryRowParams>,
  ): Promise<OvertimecarryRowReturnType> {
    return this.api.get("/v3/overtimeCarry", params);
  }

  async getOvertimecarryRow(
    params: Params<{ id: NonNullable<OvertimecarryRow["id"]> }>,
  ): Promise<OvertimecarryRowSingleReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_OVERTIMECARRY);

    const { id, ...remainingParams } = params;

    return this.api.get("/v3/overtimeCarry/" + id, remainingParams);
  }

  async getHolidaysQuotas(
    params?: Params<HolidaysQuotasParams>,
  ): Promise<HolidaysQuotasReturnType> {
    return this.api.get("/v2/holidaysQuota", params);
  }

  async getHolidaysQuota(
    params: Params<{ id: HolidaysQuota["id"] }>,
  ): Promise<HolidaysQuotaReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_HOLIDAYS_QUOTA);

    const { id, ...remainingParams } = params;

    return this.api.get("/v2/holidaysQuota/" + id, remainingParams);
  }

  async getHolidaysCarryovers(
    params?: Params<HolidaysCarryoversParams>,
  ): Promise<HolidaysCarryoversReturnType> {
    return this.api.get("/v3/holidaysCarry", params);
  }

  async getHolidaysCarryover(
    params: Params<{ id: NonNullable<HolidaysCarryover["id"]> }>,
  ): Promise<HolidaysCarryoverReturnType> {
    REQUIRED.checkRequired(params, REQUIRED.GET_HOLIDAYS_CARRYOVER);

    const { id, ...remainingParams } = params;

    return this.api.get("/v3/holidaysCarry/" + id, remainingParams);
  }
}

export type AbsenceReturnType = { data: Absence };
export type AbsencesReturnType = { data: Array<Absence> };
export type AddAbsenceParams = {
  dateSince: Absence["dateSince"];
  dateUntil?: Absence["dateUntil"] | null;
  type: NonNullable<Absence["type"]>;
  halfDay?: boolean;
  countHours?: number | null;
  usersId?: User["id"];
  allowOverride?: Array<Absence["id"]>;
  status?: Absence["status"];
  sickNote?: boolean;
  note?: string | null;
  publicNote?: string | null;
};
export type EditAbsenceParams = {
  id: Absence["id"];
  dateSince?: Absence["dateSince"];
  dateUntil?: Absence["dateUntil"];
  type?: NonNullable<Absence["type"]>;
  halfDay?: boolean;
  countHours?: number | null;
  allowOverride?: Array<Absence["id"]>;
  status?: Absence["status"];
  sickNote?: boolean;
  note?: string | null;
  publicNote?: string | null;
};
export type AbsenceScope = "manageableAbsences" | "viewableAbsences";
export type SortIdName = "id" | "-id" | "name" | "-name";
export type SortIdNameActive =
  | "active"
  | "-active"
  | "id"
  | "-id"
  | "name"
  | "-name";
export type CustomerProjectScope = "manageAccess";
export type ServiceScope = "manageAccess";
export type UserScope = "manageAbsences" | "viewAbsences" | "manage";
export type UsersSortForIndex =
  | "active"
  | "-active"
  | "id"
  | "-id"
  | "name"
  | "-name"
  | "number"
  | "-number"
  | "role"
  | "-role"
  | "teams_name"
  | "-teams_name";
export type AbsencesParams = {
  filter?: {
    year?: Array<number>;
    usersId?: Array<User["id"]>;
    teamsId?: Array<null | Team["id"]>;
    status?: Array<Absence["status"]>;
    type?: Array<NonNullable<Absence["type"]>>;
    usersActive?: boolean;
  };
  scope?: AbsenceScope;
};
export type UsersAccessCustomersProjectsReturnType = {
  add: AccessToCustomersProjects;
  report: AccessToCustomersProjects;
  edit: AccessToCustomersProjects;
};
export type UsersAccessServicesReturnType = {
  add: AccessToServices;
};
export type DeleteReturnType = { success: boolean };
export type CustomerReturnType = { data: Customer };
export type AddCustomerParams = {
  name: Customer["name"];
  number?: Customer["number"];
  active?: Customer["active"];
  billableDefault?: Customer["billableDefault"] | Billability;
  note?: Customer["note"];
  color?: Customer["color"];
  billServiceId?: Customer["billServiceId"];
};
export type EditCustomerParams = {
  id: Customer["id"];
  name?: Customer["name"];
  number?: Customer["number"];
  active?: Customer["active"];
  billableDefault?: Customer["billableDefault"] | Billability;
  note?: Customer["note"];
  color?: Customer["color"];
  billServiceId?: Customer["billServiceId"];
};
export type DeleteCustomerParams = {
  id: Customer["id"];
  dryRun?: boolean;
  force?: boolean;
};
export type CustomersParams = ParamsWithSort<SortIdNameActive> & {
  filter?: {
    /** Filter customers by active flag */
    active?: boolean;
    /** Filter customers by search term */
    fulltext?: string;
  };
  scope?: CustomerProjectScope;
};
export type CustomersReturnType = ResponseWithPaging & {
  data: Array<Customer>;
};
export type ProjectsParams = ParamsWithSort<SortIdNameActive> & {
  filter?: {
    /** Filter projects by customers id */
    customersId?: number;
    /** Filter projects by active flag */
    active?: boolean;
    /** Filter projects by completed flag */
    completed?: boolean;
    /** Filter projects by search term */
    fulltext?: string;
  };
  scope?: CustomerProjectScope;
};
export type ProjectsReturnType = ResponseWithPaging & {
  data: Array<Project>;
};
export type ProjectReturnType = { data: Project };
export type ProjectDataReturnType = { data: Project };
export type ProjectsReportsSortForIndex =
  | "customers_name"
  | "-customers_name"
  | "projects_name"
  | "-projects_name"
  | "subprojects_name"
  | "-subprojects_name";
export type ProjectsReportProjectReportItem = {
  customersId: number;
  customersName: string;
  customersNumber: string | null;
  projectsId: number;
  projectsName: string;
  projectsNumber: string | null;
};
export type ProjectsReportRetainerSubprojectReportItem =
  ProjectsReportProjectReportItem & {
    subprojectsId: number;
    subprojectsName: string;
    subprojectsNumber: string | null;
  };
export type ProjectsReportReportItem =
  | ProjectsReportProjectReportItem
  | ProjectsReportRetainerSubprojectReportItem;
export type ProjectsReportsParams =
  ParamsWithSort<ProjectsReportsSortForIndex> & {
    filter?: {
      active?: boolean;
      fulltext?: string;
      budgetSource?: Array<0 | 1 | 2 | 3>;
    };
  };
export type ProjectsReportsReturnType = ResponseWithPaging & {
  data: Array<ProjectsReportReportItem>;
};
export type SubprojectsParams = ParamsWithSort<SortIdNameActive> & {
  filter?: {
    active?: boolean;
    completed?: boolean;
    fulltext?: string;
    projectsId?: number;
  };
};
export type SubprojectsReturnType = ResponseWithPaging & {
  data: Array<Subproject>;
};
export type SubprojectReturnType = {
  data: Subproject;
};
export type AddProjectParams = {
  name: Project["name"];
  customersId: Project["customersId"];
  active?: Project["active"];
  number?: Project["number"];
  billableDefault?: Project["billableDefault"];
  note?: Project["note"];
  deadline?: Project["deadline"];
  startDate?: Project["startDate"];
  budget?: Project["budget"];
  billServiceId?: Project["billServiceId"];
};
export type AddSubprojectParams = {
  projectsId: Subproject["projectsId"];
  name: Subproject["name"];
  billableDefault?: Subproject["billableDefault"];
  budget?: Subproject["budget"];
  number?: Subproject["number"];
  note?: Subproject["note"];
  startDate?: Subproject["startDate"];
  deadline?: Subproject["deadline"];
  billServiceId?: Subproject["billServiceId"];
};
export type EditProjectParams = {
  id: Project["id"];
  name?: Project["name"];
  customersId?: Project["customersId"];
  active?: Project["active"];
  number?: Project["number"];
  billableDefault?: Project["billableDefault"];
  note?: Project["note"];
  deadline?: Project["deadline"];
  startDate?: Project["startDate"];
  budget?: Project["budget"];
  billServiceId?: Project["billServiceId"];
};
export type EditSubprojectParams = {
  id: Subproject["id"];
  name?: Subproject["name"];
  billableDefault?: Subproject["billableDefault"];
  budget?: Subproject["budget"];
  number?: Subproject["number"];
  note?: Subproject["note"];
  startDate?: Subproject["startDate"];
  deadline?: Subproject["deadline"];
  billServiceId?: Subproject["billServiceId"];
};
export type DeleteProjectParams = {
  id: Project["id"];
  dryRun?: boolean;
  force?: boolean;
};
export type CompleteProjectParams = {
  id: Project["id"];
  completed: Project["completed"];
};
export type SetProjectBilledParams = {
  id: Project["id"];
  billed?: boolean;
  billedMoney?: number | null;
};
export type DeleteSubprojectParams = {
  id: Subproject["id"];
  dryRun?: boolean;
  force?: boolean;
};
export type CompleteSubprojectParams = {
  id: Subproject["id"];
  completed: Subproject["completed"];
};

export type ServiceParams = ParamsWithSort<SortIdNameActive> & {
  filter?: {
    /** Filter service by search term */
    fulltext?: string;
    /** Filter service by active flag */
    active?: boolean;
  };
  scope?: ServiceScope;
};
export type ServiceReturnType = { data: Service };
export type AddServiceParams = {
  name: Service["name"];
  active?: Service["active"];
  number?: Service["number"];
  note?: Service["note"];
  billServiceId?: Service["billServiceId"];
};
export type EditServiceParams = {
  id: Service["id"];
  name?: Service["name"];
  active?: Service["active"];
  number?: Service["number"];
  note?: Service["note"];
  billServiceId?: Service["billServiceId"];
};
export type DeleteServiceParams = {
  id: Service["id"];
  dryRun?: boolean;
  force?: boolean;
};
export type ServicesReturnType = ResponseWithPaging & { data: Array<Service> };

export type TeamReturnType = { data: Team };
export type TeamsReturnType = ResponseWithPaging & { data: Array<Team> };
export type AddTeamParams = {
  name: Team["name"];
  leader?: Team["leader"];
};
export type EditTeamParams = {
  id: Team["id"];
  name?: Team["name"];
  leader?: Team["leader"];
};
export type TeamsParams = ParamsWithSort<SortIdName> & {
  filter?: {
    /** Filter teams by search term */
    fulltext?: string;
  };
  scope?: UserScope;
};

export type LumpsumServiceParams = ParamsWithSort<SortIdNameActive> & {
  filter?: {
    /** Filter lumpsum service by search term */
    fulltext?: string;
    /** Filter lumpsum service by active flag */
    active?: boolean;
  };
};
export type LumpsumServiceReturnType = {
  data: LumpsumService;
};
export type AddLumpsumServiceParams = {
  name: LumpsumService["name"];
  price: LumpsumService["price"];
  unit?: LumpsumService["unit"];
  active?: LumpsumService["active"];
  number?: LumpsumService["number"];
  note?: LumpsumService["note"];
};
export type EditLumpsumServiceParams = {
  id: LumpsumService["id"];
  name?: LumpsumService["name"];
  price?: LumpsumService["price"];
  unit?: LumpsumService["unit"];
  active?: LumpsumService["active"];
  number?: LumpsumService["number"];
  note?: LumpsumService["note"];
};
export type DeleteLumpsumServiceParams = {
  id: LumpsumService["id"];
  dryRun?: boolean;
  force?: boolean;
};
export type LumpsumServicesReturnType = ResponseWithPaging & {
  data: Array<LumpsumService>;
};

export type UserReturnType = { data: User };
export type UsersParam = {
  filter?: {
    active?: boolean;
    fulltext?: string;
    teamsId?: Array<null | Team["id"]>;
    scope?: "manageAbsences" | "viewAbsences" | "manage";
  };
  scope?: UserScope;
} & ParamsWithSort<UsersSortForIndex>;
export type AddUserParams = Pick<User, (typeof REQUIRED.ADD_USER)[number]> &
  Record<string, unknown>;
export type EditUserParams = Pick<User, (typeof REQUIRED.EDIT_USER)[number]> &
  Record<string, unknown>;
export type UsersReturnType = ResponseWithPaging & { data: Array<User> };
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
  /** In format ISO 8601 UTC, e.g. "2021-06-30T12:34:56Z" */
  timeSince: string;
  /** In format ISO 8601 UTC, e.g. "2021-06-30T12:34:56Z" */
  timeUntil: string;
  filter?: {
    usersId?: number;
    customersId?: number;
    projectsId?: number;
    servicesId?: number;
    lumpsumServicesId?: number;
    /**
     * 0, 1 or 2 With filter.billable: 2 you only receive entries which are
     * billable AND already billed.
     */
    billable?: Billability;
    text?: string;
    textsId?: number;
    budgetType?: string;
  };
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
  term: string;
  /** Number of items to return */
  items?: number;
  mode?: EntriesTextsMode;
  filter?: {
    customersId?: number;
    projectsId?: Array<number>;
    servicesId?: Array<number>;
    usersId?: Array<number>;
    billable?: Billability;
    /** In format YYYY-MM-DD */
    timeSince?: string;
    /** In format YYYY-MM-DD */
    timeUntil?: string;
    /** In format YYYY-MM-DD */
    day?: string;
  };
};
/** Can be specified when requesting entries texts */
export enum EntriesTextsMode {
  /** Descriptions that exactly match the submitted text (default). */
  ExactMatch = "exact_match",

  /** Descriptions that start with the submitted text fragment. */
  StartsWith = "starts_with",

  /** Descriptions that end with the submitted text fragment. */
  EndsWith = "ends_with",

  /** Descriptions that contain the submitted text fragment. */
  Contains = "contains",
}
/** Can be specified when requesting entries texts */
export enum EntriesTextsSort {
  /** Alphabetically ascending (default). */
  TextAsc = "text_asc",

  /** Alphabetically descending. */
  TextDesc = "text_desc",

  /** Chronologically ascending. */
  TimeAsc = "time_asc",

  /** Chronologically descending. */
  TimeDesc = "time_desc",
}
export type EntriesTextsReturnType = {
  data: Array<EntriesText>;
};
export type EntryGroupsReturnType = { groups: Array<EntryGroup> };
export type EditEntryGroupsReturnType =
  | { confirmKey: string; affectedEntries: number }
  | { success: true; editedEntries: number };
export type DeleteEntryGroupsReturnType =
  | { confirmKey: string; affectedEntries: number }
  | { success: true; deletedEntries: number };
export type UserReportReturnType<
  GivenUserReportType extends UserReportType = UserReportType.Year,
> = {
  userreport: UserReport<GivenUserReportType>;
};
export type UserReportsReturnType<
  GivenUserReportType extends UserReportType = UserReportType.Year,
> = {
  userreports: Array<UserReport<GivenUserReportType>>;
};
export type NonbusinessGroupsReturnType = {
  data: Array<NonbusinessGroup>;
};
export type NonbusinessGroupReturnType = {
  data: NonbusinessGroup;
};
export type AddNonbusinessGroupParams = {
  name: NonbusinessGroup["name"];
  preset?: "";
};
export type EditNonbusinessGroupParams = {
  id: NonbusinessGroup["id"];
  name?: NonbusinessGroup["name"];
};
export type DeleteNonbusinessGroupParams = {
  id: NonbusinessGroup["id"];
};
export type NonbusinessDaysReturnType = {
  data: Array<NonbusinessDay>;
};
export type NonbusinessDayReturnType = {
  data: NonbusinessDay;
};
export type AddNonbusinessDayParams = {
  nonbusinessGroupId: NonbusinessGroup["id"];
  type: NonNullable<NonbusinessDay["type"]>;
  name: NonbusinessDay["name"];
  halfDay?: NonbusinessDay["halfDay"];
  surchargeSpecial?: NonbusinessDay["surchargeSpecial"];
  specialId?: NonbusinessDay["specialId"];
  day?: NonbusinessDay["day"];
  month?: NonbusinessDay["month"];
  year?: NonbusinessDay["year"];
};
export type EditNonbusinessDayParams = {
  id: NonbusinessDay["id"];
  type?: NonNullable<NonbusinessDay["type"]>;
  name?: NonbusinessDay["name"];
  halfDay?: NonbusinessDay["halfDay"];
  surchargeSpecial?: NonbusinessDay["surchargeSpecial"];
  specialId?: NonbusinessDay["specialId"] | null;
  day?: NonbusinessDay["day"] | null;
  month?: NonbusinessDay["month"] | null;
  year?: NonbusinessDay["year"] | null;
};
export type DeleteNonbusinessDayParams = {
  id: NonbusinessDay["id"];
};
export type NonbusinessDaysParams = {
  nonbusinessGroupId?: NonbusinessGroup["id"] | Array<NonbusinessGroup["id"]>;
  year: number;
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
  /**
   * Whether the previously running entry has been truncated to the max length
   * of 23:59:59h
   */
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
   * The entry that has been started implicitly by this call. Only relevant if
   * the away parameter has been provided.
   */
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
  data: User;
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
  data: Array<WorkTimeChangeRequest>;
};

export type ApproveOrDeclineWorkTimesChangeRequestReturnType = {
  success: boolean;
};

export type AddWorkTimesChangeRequestReturnType =
  | {
      changeRequest: WorkTimeChangeRequest;
      /** Is false if the change request is being returned */
      approvedImmediately: false;
      /**
       * Will be set in case the given work time change request replaced a
       * previous one. This is because on a certain day there can only be one
       * change request per user.
       */
      replacedChangeRequest: null | WorkTimeChangeRequest;
    }
  | {
      /**
       * Is null if the change request was immediately approved (because the
       * rights imply no need for approval)
       */
      changeRequest: null;
      /**
       * Is true if the change request was immediately approved (because the
       * rights imply no need for approval)
       */
      approvedImmediately: true;
      /**
       * Is null if the change request was immediately approved (because the
       * rights imply no need for approval)
       */
      replacedChangeRequest: null;
    };
export type AddWorkTimesChangeRequestDataReturnType = {
  data: AddWorkTimesChangeRequestReturnType;
};

export type OvertimecarryRowReturnType = {
  data: Array<OvertimecarryRow>;
};
export type OvertimecarryRowSingleReturnType = {
  data: OvertimecarryRow;
};
export type AddOvertimecarryParams = {
  year: OvertimecarryRow["year"];
  usersId: OvertimecarryRow["usersId"];
  hours: OvertimecarryRow["hours"];
  note?: OvertimecarryRow["note"];
};
export type EditOvertimecarryParams = {
  id: NonNullable<OvertimecarryRow["id"]>;
  year?: OvertimecarryRow["year"];
  hours?: OvertimecarryRow["hours"];
  note?: OvertimecarryRow["note"];
};
export type DeleteOvertimecarryParams = {
  id: NonNullable<OvertimecarryRow["id"]>;
};
export type OvertimecarryRowParams = {
  /** The user ID by which the overtime carry rows should be filtered */
  usersId?: number;
  /** The year to which the data should be restricted to */
  year?: number;
};

export type HolidaysQuotasReturnType = {
  data: Array<HolidaysQuota>;
};
export type HolidaysQuotaReturnType = {
  data: HolidaysQuota;
};
export type AddHolidaysQuotaParams = {
  usersId: HolidaysQuota["usersId"];
  yearSince: HolidaysQuota["yearSince"];
  yearUntil?: HolidaysQuota["yearUntil"];
  count: HolidaysQuota["count"];
  note?: HolidaysQuota["note"];
};
export type EditHolidaysQuotaParams = {
  id: HolidaysQuota["id"];
  yearSince?: HolidaysQuota["yearSince"];
  yearUntil?: HolidaysQuota["yearUntil"];
  count?: HolidaysQuota["count"];
  note?: HolidaysQuota["note"];
};
export type DeleteHolidaysQuotaParams = {
  id: HolidaysQuota["id"];
};
export type HolidaysQuotasParams = {
  filter?: {
    usersId?: number;
    year?: number;
  };
  /** The user ID by which the holidays quota rows should be filtered */
  usersId?: number;
  year?: number;
};

export type HolidaysCarryoversReturnType = {
  data: Array<HolidaysCarryover>;
};
export type HolidaysCarryoverReturnType = {
  data: HolidaysCarryover;
};
export type AddHolidaysCarryoverParams = {
  year: HolidaysCarryover["year"];
  usersId: HolidaysCarryover["usersId"];
  count: HolidaysCarryover["count"];
  note?: HolidaysCarryover["note"];
};
export type EditHolidaysCarryoverParams = {
  id: NonNullable<HolidaysCarryover["id"]>;
  year?: HolidaysCarryover["year"];
  count?: HolidaysCarryover["count"];
  note?: HolidaysCarryover["note"];
};
export type DeleteHolidaysCarryoverParams = {
  id: NonNullable<HolidaysCarryover["id"]>;
};
export type HolidaysCarryoversParams = {
  /** The user ID by which the holidays carry rows should be filtered */
  usersId?: number;
  /** The year to which the data should be restricted to */
  year?: number;
};
