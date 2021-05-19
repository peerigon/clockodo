export const ADD_ABSENCE = ["dateSince", "dateUntil", "type"] as const;
export const ADD_CUSTOMER = ["name"] as const;
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
    "lumpsumsAmount",
    "lumpsumsId",
    "billable",
    "timeSince",
] as const;
export const ADD_PROJECT = ["name", "customersId"] as const;
export const ADD_SERVICE = ["name"] as const;
export const ADD_USER = ["name", "number", "email", "role"] as const;
export const CHANGE_CLOCK_DURATION = [
    "entryId",
    "durationBefore",
    "duration",
] as const;
export const DEACTIVATE_CUSTOMER = ["customersId"] as const;
export const DEACTIVATE_PROJECT = ["projectsId"] as const;
export const DEACTIVATE_SERVICE = ["servicesId"] as const;
export const DEACTIVATE_USER = ["usersId"] as const;
export const DELETE_ENTRY = ["entryId"] as const;
export const DELETE_ENTRY_GROUP = ["timeSince", "timeUntil"] as const;
export const DELETE_ABSENCE = ["absenceId"] as const;
export const EDIT_CUSTOMER = ["customersId"] as const;
export const EDIT_PROJECT = ["projectsId"] as const;
export const EDIT_SERVICE = ["servicesId"] as const;
export const EDIT_USER = ["usersId"] as const;
export const EDIT_ENTRY_GROUP = ["timeSince", "timeUntil"] as const;
export const EDIT_ABSENCE = ["absenceId"] as const;
export const EDIT_ENTRY = ["entryId"] as const;
export const GET_ABSENCE = ["id"] as const;
export const GET_ABSENCES = ["year"] as const;
export const GET_CUSTOMER = ["id"] as const;
export const GET_ENTRIES = ["timeSince", "timeUntil"] as const;
export const GET_ENTRY = ["id"] as const;
export const GET_ENTRY_GROUPS = ["timeSince", "timeUntil", "grouping"] as const;
export const GET_PROJECT = ["id"] as const;
export const GET_SERVICE = ["id"] as const;
export const GET_LUMPSUM_SERVICE = ["id"] as const;
export const GET_SINGLE_TARGET_HOUR_SET = ["id"] as const;
export const GET_TASK_DURATION = [
    "taskCustomersId",
    "taskProjectsId",
    "taskServicesId",
    "taskText",
    "taskBillable",
] as const;
export const GET_USER = ["id"] as const;
export const GET_USER_REPORTS = ["year"] as const;
export const START_CLOCK = ["customersId", "servicesId", "billable"] as const;
export const STOP_CLOCK = ["entryId"] as const;

export const checkRequired = (
    params: Record<string, unknown> = {},
    requiredList: ReadonlyArray<string>
) => {
    const missingParamName = requiredList.find(
        (paramName) => paramName in params === false
    );
    const undefinedParam = requiredList.find(
        (paramName) => typeof params[paramName] === "undefined"
    );

    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${missingParamName}"`);
    } else if (typeof undefinedParam !== "undefined") {
        throw new Error(`Missing required parameter "${undefinedParam}"`);
    }
};
