"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./utilities/lib");
const REQUIRED = __importStar(require("./utilities/requiredParams"));
const clockodoApi = Symbol("api");
exports.ENTRY_UNBILLABLE = 0;
exports.ENTRY_BILLABLE = 1;
exports.ENTRY_BILLED = 2;
exports.ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
exports.ABSENCE_TYPE_SPECIAL_LEAVE = 2;
exports.ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
exports.ABSENCE_TYPE_SICK_DAY = 4;
exports.ABSENCE_TYPE_SICK_DAY_OF_CHILD = 5;
exports.ABSENCE_TYPE_SCHOOL_FURTHER_EDUCATION = 6;
exports.ABSENCE_TYPE_MATERNITY_PROTECTION = 7;
exports.ABSENCE_TYPE_HOME_OFFICE = 8;
exports.ABSENCE_TYPE_WORK_OUT_OF_OFFICE = 9;
exports.ABSENCE_STATUS_REPORTED = 0;
exports.ABSENCE_STATUS_APPROVED = 1;
exports.ABSENCE_STATUS_DECLINED = 2;
exports.ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
exports.ABSENCE_STATUS_REQUEST_CANCELLED = 4;
/* eslint-disable max-len */
class Clockodo {
    constructor({ user, apiKey }) {
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }
        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }
        this[clockodoApi] = new lib_1.ClockodoLib(user, apiKey);
    }
    async getAbsence({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ABSENCE);
        return this[clockodoApi].get("/absences/" + id);
    }
    async getAbsences({ year }) {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_ABSENCES);
        return this[clockodoApi].get("/absences", { year });
    }
    async getClock() {
        return this[clockodoApi].get("/clock");
    }
    async getClockUpdate() {
        return this[clockodoApi].get("/clock/update");
    }
    async getCustomer({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_CUSTOMER);
        return this[clockodoApi].get("/customers/" + id);
    }
    async getCustomers() {
        return this[clockodoApi].get("/customers");
    }
    async getEntry({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_ENTRY);
        return this[clockodoApi].get("/entries/" + id);
    }
    async getEntries({ timeSince, timeUntil }, options) {
        const requiredArguments = { timeSince, timeUntil };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);
        return this[clockodoApi].get("/entries", Object.assign({}, requiredArguments, options));
    }
    async getEntryGroups({ timeSince, timeUntil, grouping }, options) {
        const requiredArguments = { timeSince, timeUntil, grouping };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);
        return this[clockodoApi].get("/entrygroups", Object.assign({}, requiredArguments, options));
    }
    async getProject({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_PROJECT);
        return this[clockodoApi].get("/projects/" + id);
    }
    async getSearchTexts(options) {
        return this[clockodoApi].get("/searchtexts", options);
    }
    async getService({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SERVICE);
        return this[clockodoApi].get("/services/" + id);
    }
    async getServices() {
        return this[clockodoApi].get("/services");
    }
    async getSingleTargetHourSet({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);
        return this[clockodoApi].get("/targethours/" + id);
    }
    async getTargetHours(options) {
        return this[clockodoApi].get("/targethours", options);
    }
    async getTaskDuration({ taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable, }, options) {
        const requiredArguments = { taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);
        return this[clockodoApi].get("/tasks/duration", Object.assign({}, requiredArguments, options));
    }
    async getTasks(options) {
        return this[clockodoApi].get("/tasks", options);
    }
    async getUser({ id }) {
        REQUIRED.checkRequired({ id }, REQUIRED.GET_USER);
        return this[clockodoApi].get("/users/" + id);
    }
    async getUsers() {
        return this[clockodoApi].get("/users");
    }
    async getUserReport({ id, year }, options) {
        REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);
        return this[clockodoApi].get("/userreports/" + id, Object.assign({ year }, options));
    }
    async getUserReports({ year }, options) {
        REQUIRED.checkRequired({ year }, REQUIRED.GET_USER_REPORTS);
        return this[clockodoApi].get("/userreports", Object.assign({ year }, options));
    }
    async changeClockDuration({ entryId, durationBefore, duration }, options) {
        const requiredArguments = { durationBefore, duration };
        REQUIRED.checkRequired(Object.assign({ entryId }, requiredArguments), REQUIRED.CHANGE_CLOCK_DURATION);
        return this[clockodoApi].put("/clock/" + entryId, Object.assign({}, requiredArguments, options));
    }
    async startClock({ customerId, serviceId, billable }, options) {
        const requiredArguments = { customerId, serviceId, billable };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);
        return this[clockodoApi].post("/clock", Object.assign({}, requiredArguments, options));
    }
    async addCustomer({ name }, options) {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_CUSTOMER);
        return this[clockodoApi].post("/customers", Object.assign({ name }, options));
    }
    async addProject({ name, customerId }, options) {
        REQUIRED.checkRequired({ name, customerId }, REQUIRED.ADD_PROJECT);
        return this[clockodoApi].post("/projects", Object.assign({ name, customerId }, options));
    }
    async addService({ name }, options) {
        REQUIRED.checkRequired({ name }, REQUIRED.ADD_SERVICE);
        return this[clockodoApi].post("/services", Object.assign({ name }, options));
    }
    async addUser({ name, number, email, role }, options) {
        const requiredArguments = { name, number, email, role };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);
        return this[clockodoApi].post("/users", Object.assign({}, requiredArguments, options));
    }
    async addEntry({ customerId, serviceId, billable }, options) {
        const requiredArguments = { customerId, serviceId, billable };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ENTRY);
        return this[clockodoApi].post("/entries", Object.assign({}, requiredArguments, options));
    }
    async addAbsence({ dateSince, dateUntil, type }, options) {
        const requiredArguments = { dateSince, dateUntil, type };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);
        return this[clockodoApi].post("/absences", Object.assign({}, requiredArguments, options));
    }
    async stopClock({ entryId }, options) {
        REQUIRED.checkRequired({ entryId }, REQUIRED.STOP_CLOCK);
        return this[clockodoApi].delete("/clock/" + entryId, options);
    }
    async deactivateCustomer({ customerId }, options) {
        REQUIRED.checkRequired({ customerId }, REQUIRED.DEACTIVATE_CUSTOMER);
        return this[clockodoApi].delete("/customers/" + customerId, options);
    }
    async deactivateProject({ projectId }, options) {
        REQUIRED.checkRequired({ projectId }, REQUIRED.DEACTIVATE_PROJECT);
        return this[clockodoApi].delete("/projects/" + projectId, options);
    }
    async deactivateService({ serviceId }, options) {
        REQUIRED.checkRequired({ serviceId }, REQUIRED.DEACTIVATE_SERVICE);
        return this[clockodoApi].delete("/services/" + serviceId, options);
    }
    async deactivateUser({ userId }, options) {
        REQUIRED.checkRequired({ userId }, REQUIRED.DEACTIVATE_USER);
        return this[clockodoApi].delete("/users/" + userId, options);
    }
    async deleteEntry({ entryId }, options) {
        REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);
        return this[clockodoApi].delete("/entries/" + entryId, options);
    }
    async deleteEntryGroup({ timeSince, timeUntil }, options) {
        const requiredArguments = { timeSince, timeUntil };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);
        return this[clockodoApi].delete("/entrygroups", Object.assign({}, requiredArguments, options));
    }
    async deleteAbsence({ absenceId }, options) {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);
        return this[clockodoApi].delete("/absences/" + absenceId, options);
    }
    async editCustomer({ customerId }, options) {
        REQUIRED.checkRequired({ customerId }, REQUIRED.EDIT_CUSTOMER);
        return this[clockodoApi].put("/customers/" + customerId, options);
    }
    async editProject({ projectId }, options) {
        REQUIRED.checkRequired({ projectId }, REQUIRED.EDIT_PROJECT);
        return this[clockodoApi].put("/projects/" + projectId, options);
    }
    async editService({ serviceId }, options) {
        REQUIRED.checkRequired({ serviceId }, REQUIRED.EDIT_SERVICE);
        return this[clockodoApi].put("/services/" + serviceId, options);
    }
    async editUser({ userId }, options) {
        REQUIRED.checkRequired({ userId }, REQUIRED.EDIT_USER);
        return this[clockodoApi].put("/users/" + userId, options);
    }
    async editEntryGroup({ timeSince, timeUntil }, options) {
        const requiredArguments = { timeSince, timeUntil };
        REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);
        return this[clockodoApi].put("/entrygroups", Object.assign({}, requiredArguments, options));
    }
    async editAbsence({ absenceId }, options) {
        REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);
        return this[clockodoApi].put("/absences/" + absenceId, options);
    }
    async editEntry({ entryId }, options) {
        REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);
        return this[clockodoApi].put("/entries/" + entryId, options);
    }
    async getLumpSumEntriesByUserId({ lumpSumEntryId, timeUntil, timeSince, userId, }, options) {
        REQUIRED.checkRequired({ lumpSumEntryId, timeUntil, timeSince, userId }, REQUIRED.GET_LUMP_SUM);
        return this[clockodoApi].get("/entries/", Object.assign({ filterLumpSumId: lumpSumEntryId, timeSince,
            timeUntil,
            userId }, options));
    }
    async addLumpSumEntry({ customerId, projectId, lumpSumAmount, lumpSumId, text, timeSince, }, options) {
        REQUIRED.checkRequired({
            customerId,
            lumpSumId,
            lumpSumAmount,
            text,
            timeSince,
        }, REQUIRED.ADD_LUMP_SUM);
        return this[clockodoApi].post("/entries/", Object.assign({ billable: 1, customerId,
            lumpSumAmount,
            lumpSumId,
            text,
            timeSince,
            projectId }, options));
    }
}
exports.Clockodo = Clockodo;
