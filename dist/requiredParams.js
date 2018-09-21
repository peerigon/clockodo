"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_ABSENCE = ["dateSince", "dateUntil", "type"];
exports.ADD_CUSTOMER = ["name"];
exports.ADD_ENTRY = ["customerId", "serviceId", "billable"];
exports.ADD_PROJECT = ["name", "customerId"];
exports.ADD_SERVICE = ["name"];
exports.ADD_USER = ["name", "number", "email", "role"];
exports.CHANGE_CLOCK_DURATION = ["entryId", "durationBefore", "duration"];
exports.DEACTIVATE_CUSTOMER = ["customerId"];
exports.DEACTIVATE_PROJECT = ["projectId"];
exports.DEACTIVATE_SERVICE = ["serviceId"];
exports.DELETE_ENTRY = ["entryId"];
exports.DELETE_ENTRY_GROUP = ["timeSince", "timeUntil"];
exports.DELETE_ABSENCE = ["absenceId"];
exports.EDIT_CUSTOMER = ["customerId"];
exports.EDIT_PROJECT = ["projectId"];
exports.EDIT_SERVICE = ["serviceId"];
exports.EDIT_USER = ["userId"];
exports.EDIT_ENTRY_GROUP = ["timeSince, timeUntil"];
exports.EDIT_ABSENCE = ["absenceId"];
exports.EDIT_ENTRY = ["entryId"];
exports.GET_ABSENCE = ["id"];
exports.GET_ABSENCES = ["year"];
exports.GET_CUSTOMER = ["id"];
exports.GET_ENTRIES = ["timeSince", "timeUntil"];
exports.GET_ENTRY = ["id"];
exports.GET_ENTRY_GROUPS = ["timeSince", "timeUntil", "grouping"];
exports.GET_PROJECT = ["id"];
exports.GET_SERVICE = ["id"];
exports.GET_TASK_DURATION = ["taskCustomerId", "taskProjectId", "taskServiceId", "taskText", "taskBillable"];
exports.GET_USER = ["id"];
exports.GET_USER_REPORTS = ["year"];
exports.START_CLOCK = ["customerId", "serviceId", "billable"];
exports.STOP_CLOCK = ["entryId"];
function checkRequired(params = {}, requiredList) {
    const missingParamName = requiredList.find(paramName => paramName in params === false);
    const undefinedParam = requiredList.find(paramName => typeof params[paramName] === "undefined");
    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${missingParamName}"`);
    }
    else if (typeof undefinedParam !== "undefined") {
        throw new Error(`Missing required parameter "${undefinedParam}"`);
    }
}
exports.checkRequired = checkRequired;
