"use strict";

const { ClockodoLib } = require("./lib.js");

const clockodoApi = Symbol("api");
const ENTRY_UNBILLABLE = 0;
const ENTRY_NOT_BILLED = 1;
const ENTRY_BILLED = 2;
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

        this[clockodoApi] = new ClockodoLib({ user, apiKey });
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

    getCustomer(id) {
        return this[clockodoApi].get("/customers/" + id);
    }

    getCustomers() {
        return this[clockodoApi].get("/customers");
    }

    getEntries(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRIES);

        return this[clockodoApi].get("/entries", params);
    }

    getEntryGroups(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRYGROUPS);

        return this[clockodoApi].get("/entrygroups", params);
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

    getTasks(params) {
        return this[clockodoApi].get("/tasks", params);
    }

    getTaskDuration(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_TASK_DURATION);

        return this[clockodoApi].get("/tasks/duration", params);
    }

    getUser(id) {
        return this[clockodoApi].get("/users/" + id);
    }

    getUsers() {
        return this[clockodoApi].get("/users");
    }

    getUserReport(id, params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USERREPORTS);

        return this[clockodoApi].get("/userreports/" + id, params);
    }

    getUserReports(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USERREPORTS);

        return this[clockodoApi].get("/userreports", params);
    }
}

function _checkRequired(params, requiredList) {
    const missingParamName = requiredList.find(paramName => paramName in params === false);

    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${ missingParamName }"`);
    }
}

Clockodo.ENTRY_BILLED = ENTRY_BILLED;
Clockodo.ENTRY_NOT_BILLED = ENTRY_NOT_BILLED;
Clockodo.ENTRY_UNBILLABLE = ENTRY_UNBILLABLE;

module.exports = Clockodo;
