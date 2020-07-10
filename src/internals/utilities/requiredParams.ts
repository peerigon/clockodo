export const ADD_ABSENCE = ["dateSince", "dateUntil", "type"];
export const ADD_CUSTOMER = ["name"];
export const ADD_ENTRY = ["customersId", "servicesId", "billable"];
export const ADD_PROJECT = ["name", "customersId"];
export const ADD_SERVICE = ["name"];
export const ADD_USER = ["name", "number", "email", "role"];
export const CHANGE_CLOCK_DURATION = ["entryId", "durationBefore", "duration"];
export const DEACTIVATE_CUSTOMER = ["customersId"];
export const DEACTIVATE_PROJECT = ["projectsId"];
export const DEACTIVATE_SERVICE = ["servicesId"];
export const DEACTIVATE_USER = ["usersId"];
export const DELETE_ENTRY = ["entryId"];
export const DELETE_ENTRY_GROUP = ["timeSince", "timeUntil"];
export const DELETE_ABSENCE = ["absenceId"];
export const EDIT_CUSTOMER = ["customersId"];
export const EDIT_PROJECT = ["projectsId"];
export const EDIT_SERVICE = ["servicesId"];
export const EDIT_USER = ["usersId"];
export const EDIT_ENTRY_GROUP = ["timeSince", "timeUntil"];
export const EDIT_ABSENCE = ["absenceId"];
export const EDIT_ENTRY = ["entryId"];
export const GET_LUMP_SUM = ["lumpSumEntryId", "timeUntil", "timeSince", "usersId"];
export const ADD_LUMP_SUM = ["customersId", "lumpSumsAmount", "lumpSumsId", "text", "timeSince"];
export const GET_ABSENCE = ["id"];
export const GET_ABSENCES = ["year"];
export const GET_CUSTOMER = ["id"];
export const GET_ENTRIES = ["timeSince", "timeUntil"];
export const GET_ENTRY = ["id"];
export const GET_ENTRY_GROUPS = ["timeSince", "timeUntil", "grouping"];
export const GET_PROJECT = ["id"];
export const GET_SERVICE = ["id"];
export const GET_SINGLE_TARGET_HOUR_SET = ["id"];
export const GET_TASK_DURATION = ["taskCustomersId", "taskProjectsId", "taskServicesId", "taskText", "taskBillable"];
export const GET_USER = ["id"];
export const GET_USER_REPORTS = ["year"];
export const START_CLOCK = ["customersId", "servicesId", "billable"];
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
