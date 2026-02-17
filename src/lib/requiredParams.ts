export const ADD_ABSENCE = ["dateSince", "dateUntil", "type"] as const;
export const ADD_CUSTOMER = ["name"] as const;
export const ADD_LUMPSUM_SERVICE = ["name", "price"] as const;
export const ADD_TIME_ENTRY = [
  "customersId",
  "servicesId",
  "billable",
  "timeSince",
  "timeUntil",
] as const;
export const ADD_LUMPSUM_VALUE_ENTRY = [
  "customersId",
  "servicesId",
  "billable",
  "timeSince",
  "lumpsum",
] as const;
export const ADD_LUMPSUM_SERVICE_ENTRY = [
  "customersId",
  "lumpsumServicesAmount",
  "lumpsumServicesId",
  "billable",
  "timeSince",
] as const;
export const ADD_PROJECT = ["name", "customersId"] as const;
export const ADD_SUBPROJECT = ["projectsId", "name"] as const;
export const ADD_SERVICE = ["name"] as const;
export const ADD_TEAM = ["name"] as const;
export const ADD_NONBUSINESS_GROUP = ["name"] as const;
export const ADD_NONBUSINESS_DAY = [
  "nonbusinessGroupId",
  "type",
  "name",
] as const;
export const ADD_OVERTIMECARRY = ["year", "usersId", "hours"] as const;
export const ADD_HOLIDAYS_QUOTA = ["usersId", "yearSince", "count"] as const;
export const ADD_HOLIDAYS_CARRYOVER = ["year", "usersId", "count"] as const;
export const ADD_USER = ["name", "number", "email", "role"] as const;
export const ADD_SURCHARGE_MODEL = ["name", "accumulation"] as const;
export const CHANGE_CLOCK_DURATION = [
  "entriesId",
  "durationBefore",
  "duration",
] as const;
export const DELETE_SURCHARGE_MODEL = ["id"] as const;
export const DELETE_CUSTOMER = ["id"] as const;
export const DELETE_PROJECT = ["id"] as const;
export const DELETE_SUBPROJECT = ["id"] as const;
export const DELETE_USER = ["id"] as const;
export const DELETE_ENTRY = ["id"] as const;
export const DELETE_SERVICE = ["id"] as const;
export const DELETE_LUMPSUM_SERVICE = ["id"] as const;
export const DELETE_ENTRY_GROUP = ["timeSince", "timeUntil"] as const;
export const DELETE_ABSENCE = ["id"] as const;
export const DELETE_TEAM = ["id"] as const;
export const DELETE_NONBUSINESS_GROUP = ["id"] as const;
export const DELETE_NONBUSINESS_DAY = ["id"] as const;
export const DELETE_OVERTIMECARRY = ["id"] as const;
export const DELETE_HOLIDAYS_QUOTA = ["id"] as const;
export const DELETE_HOLIDAYS_CARRYOVER = ["id"] as const;
export const EDIT_CUSTOMER = ["id"] as const;
export const EDIT_LUMPSUM_SERVICE = ["id"] as const;
export const EDIT_PROJECT = ["id"] as const;
export const EDIT_SUBPROJECT = ["id"] as const;
export const EDIT_SERVICE = ["id"] as const;
export const EDIT_TEAM = ["id"] as const;
export const EDIT_USER = ["id"] as const;
export const EDIT_SURCHARGE_MODEL = ["id"] as const;
export const EDIT_ENTRY_GROUP = ["timeSince", "timeUntil"] as const;
export const EDIT_ABSENCE = ["id"] as const;
export const EDIT_ENTRY = ["id"] as const;
export const EDIT_NONBUSINESS_GROUP = ["id"] as const;
export const EDIT_NONBUSINESS_DAY = ["id"] as const;
export const EDIT_OVERTIMECARRY = ["id"] as const;
export const EDIT_HOLIDAYS_QUOTA = ["id"] as const;
export const EDIT_HOLIDAYS_CARRYOVER = ["id"] as const;
export const GET_ABSENCE = ["id"] as const;
export const GET_ABSENCES = ["year"] as const;
export const GET_ACCESS_CUSTOMERS_PROJECTS = ["usersId"] as const;
export const GET_ACCESS_SERVICES = ["usersId"] as const;
export const GET_CUSTOMER = ["id"] as const;
export const GET_ENTRIES = ["timeSince", "timeUntil"] as const;
export const GET_ENTRIES_TEXTS = ["term"] as const;
export const GET_ENTRY = ["id"] as const;
export const SPLIT_ALL_ENTRIES_AT_MIDNIGHT = ["day", "usersId"] as const;
export const GET_ENTRY_GROUPS = ["timeSince", "timeUntil", "grouping"] as const;
export const GET_PROJECT = ["id"] as const;
export const GET_SUBPROJECT = ["id"] as const;
export const GET_SERVICE = ["id"] as const;
export const GET_LUMPSUM_SERVICE = ["id"] as const;
export const GET_TARGETHOURS_ROW = ["id"] as const;
export const GET_TEAM = ["id"] as const;
export const GET_USER = ["id"] as const;
export const GET_SURCHARGE_MODEL = ["id"] as const;
export const GET_USER_REPORT = ["usersId", "year"] as const;
export const GET_USER_REPORTS = ["year"] as const;
export const GET_NONBUSINESS_DAYS = ["year"] as const;
export const GET_NONBUSINESS_GROUP = ["id"] as const;
export const GET_NONBUSINESS_DAY = ["id"] as const;
export const GET_OVERTIMECARRY = ["id"] as const;
export const GET_HOLIDAYS_QUOTA = ["id"] as const;
export const GET_HOLIDAYS_CARRYOVER = ["id"] as const;
export const REGISTER = ["companiesName", "name", "email"] as const;
export const START_CLOCK = ["customersId", "servicesId"] as const;
export const STOP_CLOCK = ["entriesId"] as const;

export const ADD_WORK_TIMES_CHANGE_REQUEST = [
  "date",
  "usersId",
  "changes",
] as const;
export const WITHDRAW_WORK_TIMES_CHANGE_REQUEST = ["id"] as const;
export const APPROVE_WORK_TIMES_CHANGE_REQUEST = ["id"] as const;
export const DECLINE_WORK_TIMES_CHANGE_REQUEST = ["id"] as const;
export const COMPLETE_SUBPROJECT = ["id", "completed"] as const;

export const checkRequired = (
  params: Record<string, unknown> = {},
  requiredList: ReadonlyArray<string>,
) => {
  const missingParamName = requiredList.find(
    (paramName) => paramName in params === false,
  );
  const undefinedParam = requiredList.find(
    (paramName) => params[paramName] === undefined,
  );

  if (missingParamName !== undefined) {
    throw new TypeError(`Missing required parameter "${missingParamName}"`);
  } else if (undefinedParam !== undefined) {
    throw new TypeError(`Missing required parameter "${undefinedParam}"`);
  }
};
