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

    getAbsence(id) {
        return this[clockodoApi].get("/absences/" + id);
    }

    getAbsences(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_ABSENCES);

        return this[clockodoApi].get("/absences", params);
    }

    getClock() {
        return this[clockodoApi].get("/clock");
    }

    getClockUpdate() {
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
        _checkRequired(params, REQUIRED_PARAMS_GET_ENTRY_GROUPS);

        return this[clockodoApi].get("/entrygroups", params);
    }

    getProject(id) {
        return this[clockodoApi].get("/projects/" + id);
    }

    getSearchTexts(params) {
        return this[clockodoApi].get("/searchtexts", params);
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
        _checkRequired(params, REQUIRED_PARAMS_GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports/" + id, params);
    }

    getUserReports(params) {
        _checkRequired(params, REQUIRED_PARAMS_GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports", params);
    }

    changeClockDuration(entryId, params) {
        _checkRequired(params, REQUIRED_PARAMS_CHANGE_CLOCK_DURATION);

        return this[clockodoApi].put("/clock/" + entryId, params);
    }

    startClock(params) {
        _checkRequired(params, REQUIRED_PARAMS_START_CLOCK);

        return this[clockodoApi].post("/clock", params);
    }

    stopClock(entryId, params) {
        return this[clockodoApi].delete("/clock/" + entryId, params);
    }

    // not sure if this is done automatically. I should test this with someone who has permissions
    // one parameter would be a function that should be called after a stop
    stopThen(stopFunction, callback) {
        this.stopFunction()
            .then(() => {
                callback();
            })
            .catch(error => {
                console.log(error);
            });
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
