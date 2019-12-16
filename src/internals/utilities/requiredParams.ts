export const ADD_ABSENCE = ["dateSince", "dateUntil", "type"];
export const ADD_CUSTOMER = ["name"];
export const ADD_ENTRY = ["customerId", "serviceId", "billable"];
export const ADD_PROJECT = ["name", "customerId"];
export const ADD_SERVICE = ["name"];
export const ADD_USER = ["name", "number", "email", "role"];
export const CHANGE_CLOCK_DURATION = ["entryId", "durationBefore", "duration"];
export const DEACTIVATE_CUSTOMER = ["customerId"];
export const DEACTIVATE_PROJECT = ["projectId"];
export const DEACTIVATE_SERVICE = ["serviceId"];
export const DEACTIVATE_USER = ["userId"];
export const DELETE_ENTRY = ["entryId"];
export const DELETE_ENTRY_GROUP = ["timeSince", "timeUntil"];
export const DELETE_ABSENCE = ["absenceId"];
export const EDIT_CUSTOMER = ["customerId"];
export const EDIT_PROJECT = ["projectId"];
export const EDIT_SERVICE = ["serviceId"];
export const EDIT_USER = ["userId"];
export const EDIT_ENTRY_GROUP = ["timeSince", "timeUntil"];
export const EDIT_ABSENCE = ["absenceId"];
export const EDIT_ENTRY = ["entryId"];
export const GET_LUMP_SUM = ["lumpSumEntryId", "timeUntil", "timeSince", "userId"];
export const ADD_LUMP_SUM = ["customerId", "lumpSumAmount", "lumpSumId", "text", "timeSince"];
export const GET_ABSENCE = ["id"];
export const GET_ABSENCES = ["year"];
export const GET_CUSTOMER = ["id"];
export const GET_ENTRIES = ["timeSince", "timeUntil"];
export const GET_ENTRY = ["id"];
export const GET_ENTRY_GROUPS = ["timeSince", "timeUntil", "grouping"];
export const GET_PROJECT = ["id"];
export const GET_SERVICE = ["id"];
export const GET_SINGLE_TARGET_HOUR_SET = ["id"];
export const GET_TASK_DURATION = ["taskCustomerId", "taskProjectId", "taskServiceId", "taskText", "taskBillable"];
export const GET_USER = ["id"];
export const GET_USER_REPORTS = ["year"];
export const START_CLOCK = ["customerId", "serviceId", "billable"];
export const STOP_CLOCK = ["entryId"];

export const checkRequired = (params = {}, requiredList) => {
    const missingParamName = requiredList.find(paramName => paramName in params === false);
    const undefinedParam = requiredList.find(paramName => typeof params[paramName] === "undefined");

    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${missingParamName}"`);
    } else if (typeof undefinedParam !== "undefined") {
        throw new Error(`Missing required parameter "${undefinedParam}"`);
    }
};
