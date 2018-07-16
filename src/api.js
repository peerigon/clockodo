"use strict";

const { ClockodoLib } = require("./lib.js");

const clockodoApi = Symbol("api");
const ENTRY_UNBILLABLE = 0;
const ENTRY_BILLABLE = 1;
const ENTRY_BILLED = 2;
const ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
const ABSENCE_TYPE_SPECIAL_LEAVE = 2;
const ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
const ABSENCE_TYPE_SICK_DAY = 4;
const ABSENCE_STATUS_APPROVED = 0;
const ABSENCE_STATUS_DECLINED = 1;
const ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
const ABSENCE_STATUS_REQUEST_CANCELLED = 4;
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
const REQUIRED_PARAMS_ADD_CUSTOMER = ["name"];
const REQUIRED_PARAMS_ADD_PROJECT = ["name", "customerId"];
const REQUIRED_PARAMS_ADD_SERVICE = ["name"];
const REQUIRED_PARAMS_ADD_USER = ["name", "number", "email", "role"];
const REQUIRED_PARAMS_ADD_ENTRY = ["customerId", "serviceId", "billable"];
const REQUIRED_PARAMS_ADD_ABSENCE = ["dateSince", "dateUntil", "type"];

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

    async addCustomer(name, params) {
        _checkRequired({ name, ...params }, REQUIRED_PARAMS_ADD_CUSTOMER);

        return this[clockodoApi].post("/customers", { name, ...params });
    }

    async addProject(name, customerId, params) {
        _checkRequired({ name, customerId, ...params }, REQUIRED_PARAMS_ADD_PROJECT);

        return this[clockodoApi].post("/projects", { name, customerId, ...params });
    }

    async addService(name, params) {
        _checkRequired({ name, ...params }, REQUIRED_PARAMS_ADD_SERVICE);

        return this[clockodoApi].post("/services", { name, ...params });
    }

    async addUser(name, number, email, role) {
        _checkRequired({ name, number, email, role }, REQUIRED_PARAMS_ADD_USER);

        return this[clockodoApi].post("/users", { name, number, email, role });
    }

    async addEntry(customerId, serviceId, billable, params) {
        _checkRequired({ customerId, serviceId, billable, ...params }, REQUIRED_PARAMS_ADD_ENTRY);

        return this[clockodoApi].post("/entries", { customerId, serviceId, billable, ...params });
    }

    async addAbsence(dateSince, dateUntil, type, params) {
        _checkRequired({ dateSince, dateUntil, type, ...params }, REQUIRED_PARAMS_ADD_ABSENCE);

        return this[clockodoApi].post("/absences", { dateSince, dateUntil, type, ...params });
    }

    async stopClock(entryId, params) {
        return this[clockodoApi].delete("/clock/" + entryId, params);
    }

    // ? Should I have errors thrown for missing IDs?
    async editCustomer(customerId, params) {
        return this[clockodoApi].put("/customers/" + customerId, params);
    }

    async editProject(projectId, params) {
        return this[clockodoApi].put("/projects/" + projectId, params);
    }

    async editService(serviceId, params) {
        return this[clockodoApi].put("/services/" + serviceId, params);
    }

    async editUser(userId, params) {
        return this[clockodoApi].put("/users/" + userId, params);
    }

    async editEntryGroup(timeSince, timeUntil, params) {
        return this[clockodoApi].put("/entrygroups", { timeSince, timeUntil, ...params });
    }

    async editAbsence(absenceId, params) {
        return this[clockodoApi].put("/absences/" + absenceId, params);
    }

    async editEntry(entryId, params) {
        return this[clockodoApi].put("/entries/" + entryId, params);
    }
}

function _checkRequired(params = {}, requiredList) {
    const missingParamName = requiredList.find(paramName => paramName in params === false);
    const undefinedParam = requiredList.find(paramName => typeof params[paramName] === "undefined");

    if (typeof missingParamName !== "undefined") {
        throw new Error(`Missing required parameter "${ missingParamName }"`);
    } else if (typeof undefinedParam !== "undefined") {
        throw new Error(`Missing required parameter "${ undefinedParam }"`);
    }
}

Clockodo.ENTRY_BILLED = ENTRY_BILLED;
Clockodo.ENTRY_BILLABLE = ENTRY_BILLABLE;
Clockodo.ENTRY_UNBILLABLE = ENTRY_UNBILLABLE;
Clockodo.ABSENCE_TYPE_REGULAR_HOLIDAY = ABSENCE_TYPE_REGULAR_HOLIDAY;
Clockodo.ABSENCE_TYPE_SPECIAL_LEAVE = ABSENCE_TYPE_SPECIAL_LEAVE;
Clockodo.ABSENCE_TYPE_REDUCTION_OF_OVERTIME = ABSENCE_TYPE_REDUCTION_OF_OVERTIME;
Clockodo.ABSENCE_TYPE_SICK_DAY = ABSENCE_TYPE_SICK_DAY;
Clockodo.ABSENCE_STATUS_APPROVED = ABSENCE_STATUS_APPROVED;
Clockodo.ABSENCE_STATUS_DECLINED = ABSENCE_STATUS_DECLINED;
Clockodo.ABSENCE_STATUS_APPROVAL_CANCELLED = ABSENCE_STATUS_APPROVAL_CANCELLED;
Clockodo.ABSENCE_STATUS_REQUEST_CANCELLED = ABSENCE_STATUS_REQUEST_CANCELLED;

module.exports = Clockodo;
