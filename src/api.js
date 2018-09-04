"use strict";

/**
 * A module for adding two values.
 * @module Clockodo
 */

const { ClockodoLib } = require("./lib.js");
const REQUIRED = require("./requiredParams");

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

/* eslint-disable max-len */
/**
 *
 *
 * @class Clockodo
 */
class Clockodo {
    /**
     * Creates an instance of Clockodo.
     *
     * @param {*} { - user, apiKey }
     * @memberof Clockodo
     */
    constructor({ user, apiKey }) {
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }

        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }

        this[clockodoApi] = new ClockodoLib(user, apiKey);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Clockodo Absence ID
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/absences/
     */
    async getAbsence({ id }) {
        REQUIRED.checkRequired(id, REQUIRED.GET_ABSENCE);

        return this[clockodoApi].get("/absences/" + id);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.year - Year for the user reports that will be returned
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/userreports/
     */
    async getAbsences({ year }) {
        REQUIRED.checkRequired(year, REQUIRED.GET_ABSENCES);

        return this[clockodoApi].get("/absences", year);
    }

    /**
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/clocks/
     */
    async getClock() {
        return this[clockodoApi].get("/clock");
    }

    /**
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/clocks/
     */
    async getClockUpdate() {
        return this[clockodoApi].get("/clock/update");
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Clockodo Customer ID
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/customers/
     */
    async getCustomer({ id }) {
        REQUIRED.checkRequired(id, REQUIRED.GET_CUSTOMER);

        return this[clockodoApi].get("/customers/" + id);
    }

    /**
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/customers/
     */
    async getCustomers() {
        return this[clockodoApi].get("/customers");
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Clockodo Entry ID
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entries/
     */
    async getEntry({ id }) {
        REQUIRED.checkRequired(id, REQUIRED.GET_ENTRY);

        return this[clockodoApi].get("/entries/" + id);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.timeSince - Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.timeUntil - End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {*} options - { filterUserId, filterCustomerId, filterProjectId, filterServiceId, filterBillable, filterText, filterTextsId, filterBudgetType  }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entries/
     */
    async getEntries({ timeSince, timeUntil }, options) {
        const requiredAgruments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredAgruments, REQUIRED.GET_ENTRIES);

        return this[clockodoApi].get("/entries", { ...requiredAgruments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.timeSince - Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.timeUntil - End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.grouping - Criteria that defines the way response data will be organized
     * @param {*} options - { filterUserId, filterCustomerId, filterProjectId, filterServiceId, filterBillable, filterText, filterTextsId, filterBudgetType, roundToMinutes, prependCustomer, calcHardBudgetRevenues  }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entrygroups/
     */
    async getEntryGroups({ timeSince, timeUntil, grouping }, options) {
        const requiredArguments = { timeSince, timeUntil, grouping };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);

        return this[clockodoApi].get("/entrygroups", { ...requiredArguments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Clockodo Project ID
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/projects/
     */
    async getProject({ id }) {
        REQUIRED.checkRequired(id, REQUIRED.GET_PROJECT);

        return this[clockodoApi].get("/projects/" + id);
    }

    /**
     * @param {*} options - { term, customerId, projectId, servicesId, billable, timeSince, timeUntil }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/tasks/
     */
    async getSearchTexts(options) {
        return this[clockodoApi].get("/searchtexts", options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Clockodo Service ID
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/users/
     */
    async getService({ id }) {
        REQUIRED.checkRequired(id, REQUIRED.GET_SERVICE);

        return this[clockodoApi].get("/services/" + id);
    }

    /**
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/services/
     */
    async getServices() {
        return this[clockodoApi].get("/services");
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.taskCustomerId - Customer name
     * @param {*} options - { number, active, billableDefault, note }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/customers/
     */
    async getTaskDuration({ taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable }, options) {
        const requiredArguments = { taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);

        return this[clockodoApi].get("/tasks", { ...requiredArguments, ...options });
    }

    /**
     * @param {*} options - { count }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/tasks/
     */
    async getTasks(options) {
        return this[clockodoApi].get("/tasks", options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Clockodo User ID
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/users/
     */
    async getUser({ id }) {
        REQUIRED.checkRequired(id, REQUIRED.GET_USER);

        return this[clockodoApi].get("/users/" + id);
    }

    /**
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/users/
     */
    async getUsers() {
        return this[clockodoApi].get("/users");
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.id - Year for the user reports that will be returned
     * @param {string} requiredArguments.year - Year for the user reports that will be returned
     * @param {*} options - { type }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/userreports/
     */
    async getUserReport({ id, year }, options) {
        REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports/" + id, { year, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.year - Year for the user reports that will be returned
     * @param {*} options - { type }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/userreports/
     */
    async getUserReports({ year }, options) {
        REQUIRED.checkRequired(year, REQUIRED.GET_USER_REPORTS);

        return this[clockodoApi].get("/userreports", { year, ...options });
    }

    /**
     * Changes the duration of an entry. Because the ID returned by clock methods is just the entry ID,
     * and this function can only be used after an entry is finished, there seems to be no difference from using editEntry().
     *
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.entryId - The ID of the entry.
     * @param {string} requiredArguments.durationBefore - The previously recorded duration (in seconds) of the entry you want to edit. The clock must be stopped because otherwise the request fails with an error.
     * @param {string} requiredArguments.duration - The new duration (in seconds) of the entry.
     * @param {*} options - { offsetBefore }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/clock/
     */
    async changeClockDuration({ entryId, durationBefore, duration }, options) {
        const requiredArguments = { durationBefore, duration };

        REQUIRED.checkRequired({ entryId, ...requiredArguments }, REQUIRED.CHANGE_CLOCK_DURATION);

        return this[clockodoApi].put("/clock/" + entryId, { ...requiredArguments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.customerId - Customer ID from Clockodo
     * @param {string} requiredArguments.serviceId - Service ID from Clockodo
     * @param {string} requiredArguments.billable - Use constants ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED
     * @param {*} options - { projectId, userId, text }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/clock/
     */
    async startClock({ customerId, serviceId, billable }, options) {
        const requiredArguments = { customerId, serviceId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);

        return this[clockodoApi].post("/clock", { ...requiredArguments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.name - Customer name
     * @param {*} options - { number, active, billableDefault, note }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/customers/
     */
    async addCustomer({ name }, options) {
        REQUIRED.checkRequired(name, REQUIRED.ADD_CUSTOMER);

        return this[clockodoApi].post("/customers", { name, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.name - Customer name
     * @param {string} requiredArguments.customerId - Customer ID
     * @param {*} options - { number, active, billableDefault, budgetMoney, budgetIsHours, budgetIsNotStrict, note }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/projects/
     */
    async addProject({ name, customerId }, options) {
        REQUIRED.checkRequired({ name, customerId }, REQUIRED.ADD_PROJECT);

        return this[clockodoApi].post("/projects", { name, customerId, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.name - Service name
     * @param {*} options - { number, active, note }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/services/
     */
    async addService({ name }, options) {
        REQUIRED.checkRequired(name, REQUIRED.ADD_SERVICE);

        return this[clockodoApi].post("/services", { name, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.name - Name of the co-worker
     * @param {string} requiredArguments.number - Personnel number
     * @param {string} requiredArguments.email - E-mail-address of the co-worker
     * @param {string} requiredArguments.role - Role of the co-worker
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/users/
     */
    async addUser({ name, number, email, role }, options) {
        const requiredAgruments = { name, number, email, role };

        REQUIRED.checkRequired(requiredAgruments, REQUIRED.ADD_USER);

        return this[clockodoApi].post("/users", { ...requiredAgruments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.customerId - Customer ID
     * @param {string} requiredArguments.serviceId - Service iD
     * @param {string} requiredArguments.billable - ClockodoApi.ENTRY_UNBILLABLE, ClockodoApi.ENTRY_BILLABLE, ClockodoApi.ENTRY_BILLED
     * @param {*} options - { userId, duration, lumpSum, hourlyRate, projectId, text, timeSince, timeUntil }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entries/
     */
    async addEntry({ customerId, serviceId, billable }, options) {
        const requiredArguments = { customerId, serviceId, billable };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ENTRY);

        return this[clockodoApi].post("/entries", { ...requiredArguments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.dateSince - Beginning date for the absence. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.dateUntil - End date for the absence. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.type - ClockodoApi.ABSENCE_TYPE_REGULAR_HOLIDAY, ClockodoApi.ABSENCE_TYPE_SPECIAL_LEAVE, ClockodoApi.ABSENCE_TYPE_REDUCTION_OF_OVERTIME, ClockodoApi.ABSENCE_TYPE_SICK_DAY
     * @param {*} options - { userId, note, countDays }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/absences/
     */
    async addAbsence({ dateSince, dateUntil, type }, options) {
        const requiredArguments = { dateSince, dateUntil, type };

        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);

        return this[clockodoApi].post("/absences", { ...requiredArguments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.entryId - Entry ID to stop
     * @param {*} options - { duration, away, userId }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/clock/
     */
    async stopClock({ entryId }, options) {
        REQUIRED.checkRequired(entryId, REQUIRED.STOP_CLOCK);

        return this[clockodoApi].delete("/clock/" + entryId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.customerId
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/customers/
     */
    async deactivateCustomer({ customerId }, options) {
        REQUIRED.checkRequired({ customerId }, REQUIRED.DEACTIVATE_CUSTOMER);

        return this[clockodoApi].delete("/customers/" + customerId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.projectId
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/projects/
     */
    async deactivateProject({ projectId }, options) {
        REQUIRED.checkRequired({ projectId }, REQUIRED.DEACTIVATE_PROJECT);

        return this[clockodoApi].delete("/projects/" + projectId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.serviceId
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/services/
     */
    async deactivateService({ serviceId }, options) {
        REQUIRED.checkRequired({ serviceId }, REQUIRED.DEACTIVATE_SERVICE);

        return this[clockodoApi].delete("/services/" + serviceId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.userId
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/users/
     */
    async deactivateUser({ userId }, options) {
        REQUIRED.checkRequired({ userId }, REQUIRED.DEACTIVATE_SERVICE);

        return this[clockodoApi].delete("/users/" + userId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.entryId
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entries/
     */
    async deleteEntry({ entryId }, options) {
        REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);

        return this[clockodoApi].delete("/entries/" + entryId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.timeSince - Beginning date for the absence. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.timeUntil - End date for the absence. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.type - ClockodoApi.ABSENCE_TYPE_REGULAR_HOLIDAY, ClockodoApi.ABSENCE_TYPE_SPECIAL_LEAVE, ClockodoApi.ABSENCE_TYPE_REDUCTION_OF_OVERTIME, ClockodoApi.ABSENCE_TYPE_SICK_DAY
     * @param {*} options - { filterUserId, filterCustomerId, filterProjectId, filterServiceId, filterBillable, filterText, filterTextsId, filterBudgetType, confirmKey }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entrygroups/
     */
    async deleteEntryGroup({ timeSince, timeUntil }, options) {
        const requiredAgruments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredAgruments, REQUIRED.DELETE_ENTRY_GROUP);

        return this[clockodoApi].delete("/entrygroups", { ...requiredAgruments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.absenceId
     * @param {*} options - { currently none }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/absences/
     */
    async deleteAbsence({ absenceId }, options) {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);

        return this[clockodoApi].delete("/absences/" + absenceId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.customerId
     * @param {*} options - { name, number, active, billableDefault, note }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/customers/
     */
    async editCustomer({ customerId }, options) {
        REQUIRED.checkRequired({ customerId }, REQUIRED.EDIT_CUSTOMER);

        return this[clockodoApi].put("/customers/" + customerId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.projectId
     * @param {*} options - { name, number, active, bilableDefault, budgetMoney, budgetIsHours, budgetisNotStrict, note, hourlyRate, customerId, completed, billedMoney, billedCompletely }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/projects/
     */
    async editProject({ projectId }, options) {
        REQUIRED.checkRequired({ projectId }, REQUIRED.EDIT_PROJECT);

        return this[clockodoApi].put("/projects/" + projectId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.serviceId
     * @param {*} options - { name, number, active, note }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/services/
     */
    async editService({ serviceId }, options) {
        REQUIRED.checkRequired({ serviceId }, REQUIRED.EDIT_SERVICE);

        return this[clockodoApi].put("/services/" + serviceId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.userId
     * @param {*} options - { name, number, active, role }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/users/
     */
    async editUser({ userId }, options) {
        REQUIRED.checkRequired({ userId }, REQUIRED.EDIT_USER);

        return this[clockodoApi].put("/users/" + userId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.timeSince - Beginning date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {string} requiredArguments.timeUntil - End date for the range of Clockodo entries to return. Must be in the format of "YYYY-MM-DD HH:mm:ss"
     * @param {*} options - { filterUserId, filterCustomerId, filterProjectId, filterServiceId, filterBillable, filterText, filterTextsId, filterBudgetType, userId, projectId, serviceId, billable, textsId, text, hourlyRate, confirmKey}
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entrygroups/
     */
    async editEntryGroup({ timeSince, timeUntil }, options) {
        const requiredAgruments = { timeSince, timeUntil };

        REQUIRED.checkRequired(requiredAgruments, REQUIRED.EDIT_ENTRY_GROUP);

        return this[clockodoApi].put("/entrygroups", { ...requiredAgruments, ...options });
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.absenceId
     * @param {*} options - { dateSince, dateUntil, note, type, status, countDays (will be recalculated if you submit null), countHours (will be recalculated if you submit null) }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/absences/
     */
    async editAbsence({ absenceId }, options) {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);

        return this[clockodoApi].put("/absences/" + absenceId, options);
    }

    /**
     * @param {Object} requiredArguments
     * @param {string} requiredArguments.entryId
     * @param {*} options - { ncustomerId, projectId, serviceId, userId, billable, text, duration, lumpSum, hourlyRate, timeSince, timeUntil  }
     * @returns {Promise}
     * @memberof Clockodo
     * @see https://www.clockodo.com/en/api/entries/
     */
    async editEntry({ entryId }, options) {
        REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);

        return this[clockodoApi].put("/entries/" + entryId, options);
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
