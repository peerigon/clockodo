"use strict";

const { ClockodoLib } = require("./lib.js");

const clockodoApi = Symbol("api");
const ENTRY_UNBILLABLE = 0;
const ENTRY_BILLABLE = 1;
const ENTRY_BILLED = 2;
const REQUIRED_PARAMS_GET_TASK_DURATION = [
    "taskCustomerId",
    "taskProjectId",
    "taskServiceId",
    "taskText",
    "taskBillable",
];
const REQUIRED_PARAMS_GET_ENTRIES = ["begin", "end"];
const REQUIRED_PARAMS_GET_ENTRY_GROUPS = ["begin", "end", "grouping"];
const REQUIRED_PARAMS_GET_USER_REPORTS = ["year"];
const REQUIRED_PARAMS_GET_ABSENCES = ["year"];
const REQUIRED_PARAMS_START_CLOCK = ["customerId", "serviceId", "billable"];
const REQUIRED_PARAMS_CHANGE_CLOCK_DURATION = ["durationBefore", "duration"];

class Clockodo {
    constructor({ user, apiKey }) {
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }

        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }

        this[clockodoApi] = new ClockodoLib(user, apiKey);
    }

    async getAbsence(id) {
        return this[clockodoApi].get("/absences/" + id);
    }

    async getAbsences(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ABSENCES);

        return this[clockodoApi].get("/absences", params);
    }

    async getClock() {
        return this[clockodoApi].get("/clock");
    }

    async getClockUpdate() {
        return this[clockodoApi].get("/clock/update");
    }

    async getCustomer(id) {
        return this[clockodoApi].get("/customers/" + id);
    }

    async getCustomers() {
        return this[clockodoApi].get("/customers");
    }

    async getEntry(id) {
        return this[clockodoApi].get("/entries/" + id);
    }

    async getEntries(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRIES);

        return this[clockodoApi].get("/entries", params);
    }

    async getEntryGroups(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRY_GROUPS);

        return this[clockodoApi].get("/entrygroups", params);
    }

    async getProject(id) {
        return this[clockodoApi].get("/projects/" + id);
    }

    async getSearchTexts(params) {
        return this[clockodoApi].get("/searchtexts", params);
    }

    async getService(id) {
        return this[clockodoApi].get("/services/" + id);
    }

    async getServices() {
        return this[clockodoApi].get("/services");
    }

    async getTasks(params) {
        return this[clockodoApi].get("/tasks", params);
    }

    async getTaskDuration(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_TASK_DURATION);

        return this[clockodoApi].get("/tasks/duration", params);
    }

    async getUser(id) {
        return this[clockodoApi].get("/users/" + id);
    }

    async getUsers() {
        return this[clockodoApi].get("/users");
    }

    async getUserReport(id, params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports/" + id, params);
    }

    async getUserReports(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports", params);
    }

    async changeClockDuration(entryId, params) {
        _checkRequired(params, REQUIRED_PARAMS_CHANGE_CLOCK_DURATION);

        return this[clockodoApi].put("/clock/" + entryId, params);
    }

    async startClock(params) {
        _checkRequired(params, REQUIRED_PARAMS_START_CLOCK);

        return this[clockodoApi].post("/clock", params);
    }

    async stopClock(entryId, params) {
        return this[clockodoApi].delete("/clock/" + entryId, params);
    }
}

function _checkRequired(params = {}, requiredList) {
    const missingParamName = requiredList.find(paramName => paramName in params === false);

    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${ missingParamName }"`);
    }
}

Clockodo.ENTRY_BILLED = ENTRY_BILLED;
Clockodo.ENTRY_BILLABLE = ENTRY_BILLABLE;
Clockodo.ENTRY_UNBILLABLE = ENTRY_UNBILLABLE;

module.exports = Clockodo;
