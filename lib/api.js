"use strict";

const moment = require("moment");
const { ClockodoApi } = require("./lib.js");

const clockodoApi = Symbol("api");
const UNBILLABLE = 0;
const BILLABLE = 2;
const REQUIRED_PARAMS_GET_TASK_DURATION = [
    "taskCustomerId",
    "taskProjectId",
    "taskServiceId",
    "taskText",
    "taskBillable",
];
const REQUIRED_PARAMS_GET_ENTRIES = ["begin", "end"];
const REQUIRED_PARAMS_GET_ENTRYGROUPS = ["begin", "end", "grouping"];
const REQUIRED_PARAMS_GET_USERREPORTS = ["year"];
const REQUIRED_PARAMS_GET_ABSENCES = ["year"];

class Clockodo {
    constructor(user, apiKey) {
        if (typeof user === undefined) {
            throw new Error("No Clockodo 'user' set");
        }

        if (typeof apiKey === undefined) {
            throw new Error("No Clockodo 'apiKey' set");
        }

        this[clockodoApi] = new ClockodoApi(user, apiKey);
    }

    getUser(id) {
        return this[clockodoApi].get("/users/" + id);
    }

    getUsers() {
        return this[clockodoApi].get("/users");
    }

    getCustomer(id) {
        return this[clockodoApi].get("/customers/" + id);
    }

    getCustomers() {
        return this[clockodoApi].get("/customers");
    }

    getProject(id) {
        return this[clockodoApi].get("/projects/" + id);
    }

    getService(id) {
        return this[clockodoApi].get("/services/" + id);
    }

    getServices() {
        return this[clockodoApi].get("/services");
    }

    getEntries(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRIES);

        let { begin, end } = params;

        begin = moment(begin).format("YYYY-MM-DD hh:mm:ss");
        end = moment(end).format("YYYY-MM-DD hh:mm:ss");

        return this[clockodoApi].get("/entries", {
            ...params,
            begin,
            end,
        });
    }

    getTaskDuration(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_TASK_DURATION);

        return this[clockodoApi].get("/tasks/duration", params);
    }

    getTasks(params) {
        return this[clockodoApi].get("/tasks", params);
    }

    getEntryGroups(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRYGROUPS);

        let { begin, end } = params;

        begin = moment(begin).format("YYYY-MM-DD hh:mm:ss");
        end = moment(end).format("YYYY-MM-DD hh:mm:ss");

        return this[clockodoApi].get("/entrygroups", {
            ...params,
            begin,
            end,
        });
    }

    getUserReport(id, params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USERREPORTS);

        return this[clockodoApi].get("/userreports/" + id, params);
    }

    getUserReports(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USERREPORTS);

        return this[clockodoApi].get("/userreports", params);
    }

    getAbsence(id) {
        return this[clockodoApi].get("/absences/" + id);
    }

    getAbsences(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ABSENCES);

        return this[clockodoApi].get("/absences", params);
    }

    getClockRunning() {
        return this[clockodoApi].get("/clock");
    }

    getClockStatus() {
        return this[clockodoApi].get("/clock/update");
    }

    // Convienece Methods
    getBillableEntriesBetween(begin, end) {
        return this.getEntries(begin, end, { filterBillable: BILLABLE });
    }
    getNonBillableEntriesBetween(begin, end) {
        return this.getEntries(begin, end, { filterBillable: UNBILLABLE });
    }
    getUserEntriesBetween(userId, begin, end) {
        return this.getEntries(begin, end, { filterUserId: userId });
    }
    getCustomerEntriesBetween(customerId, begin, end) {
        return this.getEntries(begin, end, { filterCustomerId: customerId });
    }
    getServiceEntriesBetween(serviceId, begin, end) {
        return this.getEntries(begin, end, { filterServiceId: serviceId });
    }
    getProjectEntriesBetween(projectId, begin, end) {
        return this.getEntries(begin, end, { filterProjectId: projectId });
    }
}

function _checkRequired(params, requiredList) {
    const missingParamName = requiredList.find(paramName => paramName in params === false);

    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing Required Parameter "${ missingParamName }"`);
    }
}

module.exports = Clockodo;
