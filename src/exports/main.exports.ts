/**
 * Public package entrypoint for the main Clockodo SDK API.
 *
 * @module
 */
export * from "../models/absence.js";
export * from "../models/access.js";
export * from "../models/company.js";
export * from "../models/customer.js";
export * from "../models/dateTime.js";
export * from "../models/entry.js";
export * from "../models/entryGroup.js";
export * from "../models/holidaysCarryover.js";
export * from "../models/holidaysQuota.js";
export * from "../models/lumpsumService.js";
export * from "../models/nonbusinessDay.js";
export * from "../models/nonbusinessGroup.js";
export * from "../models/project.js";
export * from "../models/service.js";
export * from "../models/subproject.js";
export * from "../models/surchargeModel.js";
export * from "../models/targethours.js";
export * from "../models/team.js";
export * from "../models/user.js";
export * from "../models/userReport.js";
export * from "../models/workTimeBreakRule.js";
export * from "../models/workTimeRegulationWithRules.js";
export * from "../models/workTimes.js";

export {
  camelCaseToSnakeCase,
  mapQueryParams,
  mapRequestBody,
  mapResponseBody,
  snakeCaseToCamelCase,
} from "../lib/mappings.js";

export * from "../clockodo.js";
export type {
  Config,
  Filter,
  Paging,
  Params,
  ParamsWithPage,
  ResponseWithPaging,
} from "../lib/api.js";
