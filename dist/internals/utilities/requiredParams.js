"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_ABSENCE = ["dateSince", "dateUntil", "type"];
exports.ADD_CUSTOMER = ["name"];
exports.ADD_ENTRY = ["customersId", "servicesId", "billable"];
exports.ADD_PROJECT = ["name", "customersId"];
exports.ADD_SERVICE = ["name"];
exports.ADD_USER = ["name", "number", "email", "role"];
exports.CHANGE_CLOCK_DURATION = ["entryId", "durationBefore", "duration"];
exports.DEACTIVATE_CUSTOMER = ["customersId"];
exports.DEACTIVATE_PROJECT = ["projectsId"];
exports.DEACTIVATE_SERVICE = ["servicesId"];
exports.DEACTIVATE_USER = ["usersId"];
exports.DELETE_ENTRY = ["entryId"];
exports.DELETE_ENTRY_GROUP = ["timeSince", "timeUntil"];
exports.DELETE_ABSENCE = ["absenceId"];
exports.EDIT_CUSTOMER = ["customersId"];
exports.EDIT_PROJECT = ["projectsId"];
exports.EDIT_SERVICE = ["servicesId"];
exports.EDIT_USER = ["usersId"];
exports.EDIT_ENTRY_GROUP = ["timeSince", "timeUntil"];
exports.EDIT_ABSENCE = ["absenceId"];
exports.EDIT_ENTRY = ["entryId"];
exports.GET_LUMP_SUM = ["lumpSumEntryId", "timeUntil", "timeSince", "usersId"];
exports.ADD_LUMP_SUM = ["customersId", "lumpSumsAmount", "lumpSumsId", "text", "timeSince"];
exports.GET_ABSENCE = ["id"];
exports.GET_ABSENCES = ["year"];
exports.GET_CUSTOMER = ["id"];
exports.GET_ENTRIES = ["timeSince", "timeUntil"];
exports.GET_ENTRY = ["id"];
exports.GET_ENTRY_GROUPS = ["timeSince", "timeUntil", "grouping"];
exports.GET_PROJECT = ["id"];
exports.GET_SERVICE = ["id"];
exports.GET_SINGLE_TARGET_HOUR_SET = ["id"];
exports.GET_TASK_DURATION = ["taskCustomersId", "taskProjectsId", "taskServicesId", "taskText", "taskBillable"];
exports.GET_USER = ["id"];
exports.GET_USER_REPORTS = ["year"];
exports.START_CLOCK = ["customersId", "servicesId", "billable"];
exports.STOP_CLOCK = ["entryId"];
exports.checkRequired = (params = {}, requiredList) => {
    const missingParamName = requiredList.find(paramName => paramName in params === false);
    const undefinedParam = requiredList.find(paramName => typeof params[paramName] === "undefined");
    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${missingParamName}"`);
    }
    else if (typeof undefinedParam !== "undefined") {
        throw new Error(`Missing required parameter "${undefinedParam}"`);
    }
};
