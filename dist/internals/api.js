"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor({ user, apiKey, cacheTime }) {
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }
        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }
        if (Boolean(cacheTime) && typeof cacheTime !== "number") {
            throw new Error("Clockodo cacheTime expected to be a number, is typeof: " + typeof cacheTime);
        }
        this[clockodoApi] = new lib_1.ClockodoLib(user, apiKey, cacheTime);
    }
    getAbsence({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_ABSENCE);
            return this[clockodoApi].get("/absences/" + id);
        });
    }
    getAbsences({ year }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ year }, REQUIRED.GET_ABSENCES);
            return this[clockodoApi].get("/absences", { year });
        });
    }
    getClock() {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/clock");
        });
    }
    getClockUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/clock/update");
        });
    }
    getCustomer({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_CUSTOMER);
            return this[clockodoApi].get("/customers/" + id);
        });
    }
    getCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/customers");
        });
    }
    getEntry({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_ENTRY);
            return this[clockodoApi].get("/entries/" + id);
        });
    }
    getEntries({ timeSince, timeUntil }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { timeSince, timeUntil };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);
            return this[clockodoApi].get("/entries", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    getEntryGroups({ timeSince, timeUntil, grouping }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { timeSince, timeUntil, grouping };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);
            return this[clockodoApi].get("/entrygroups", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    getProject({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_PROJECT);
            return this[clockodoApi].get("/projects/" + id);
        });
    }
    getSearchTexts(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/searchtexts", options);
        });
    }
    getService({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_SERVICE);
            return this[clockodoApi].get("/services/" + id);
        });
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/services");
        });
    }
    getSingleTargetHourSet({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_SINGLE_TARGET_HOUR_SET);
            return this[clockodoApi].get("/targethours/" + id);
        });
    }
    getTargetHours(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/targethours", options);
        });
    }
    getTaskDuration({ taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable, }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { taskCustomerId, taskProjectId, taskServiceId, taskText, taskBillable };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);
            return this[clockodoApi].get("/tasks/duration", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    getTasks(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/tasks", options);
        });
    }
    getUser({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id }, REQUIRED.GET_USER);
            return this[clockodoApi].get("/users/" + id);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this[clockodoApi].get("/users");
        });
    }
    getUserReport({ id, year }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ id, year }, REQUIRED.GET_USER_REPORTS);
            return this[clockodoApi].get("/userreports/" + id, Object.assign({ year }, options));
        });
    }
    getUserReports({ year }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ year }, REQUIRED.GET_USER_REPORTS);
            return this[clockodoApi].get("/userreports", Object.assign({ year }, options));
        });
    }
    changeClockDuration({ entryId, durationBefore, duration }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { durationBefore, duration };
            REQUIRED.checkRequired(Object.assign({ entryId }, requiredArguments), REQUIRED.CHANGE_CLOCK_DURATION);
            return this[clockodoApi].put("/clock/" + entryId, Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    startClock({ customerId, serviceId, billable }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { customerId, serviceId, billable };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);
            return this[clockodoApi].post("/clock", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    addCustomer({ name }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ name }, REQUIRED.ADD_CUSTOMER);
            return this[clockodoApi].post("/customers", Object.assign({ name }, options));
        });
    }
    addProject({ name, customerId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ name, customerId }, REQUIRED.ADD_PROJECT);
            return this[clockodoApi].post("/projects", Object.assign({ name, customerId }, options));
        });
    }
    addService({ name }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ name }, REQUIRED.ADD_SERVICE);
            return this[clockodoApi].post("/services", Object.assign({ name }, options));
        });
    }
    addUser({ name, number, email, role }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { name, number, email, role };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);
            return this[clockodoApi].post("/users", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    addEntry({ customerId, serviceId, billable }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { customerId, serviceId, billable };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ENTRY);
            return this[clockodoApi].post("/entries", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    addAbsence({ dateSince, dateUntil, type }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { dateSince, dateUntil, type };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);
            return this[clockodoApi].post("/absences", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    stopClock({ entryId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ entryId }, REQUIRED.STOP_CLOCK);
            return this[clockodoApi].delete("/clock/" + entryId, options);
        });
    }
    deactivateCustomer({ customerId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ customerId }, REQUIRED.DEACTIVATE_CUSTOMER);
            return this[clockodoApi].delete("/customers/" + customerId, options);
        });
    }
    deactivateProject({ projectId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ projectId }, REQUIRED.DEACTIVATE_PROJECT);
            return this[clockodoApi].delete("/projects/" + projectId, options);
        });
    }
    deactivateService({ serviceId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ serviceId }, REQUIRED.DEACTIVATE_SERVICE);
            return this[clockodoApi].delete("/services/" + serviceId, options);
        });
    }
    deactivateUser({ userId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ userId }, REQUIRED.DEACTIVATE_USER);
            return this[clockodoApi].delete("/users/" + userId, options);
        });
    }
    deleteEntry({ entryId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ entryId }, REQUIRED.DELETE_ENTRY);
            return this[clockodoApi].delete("/entries/" + entryId, options);
        });
    }
    deleteEntryGroup({ timeSince, timeUntil }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { timeSince, timeUntil };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);
            return this[clockodoApi].delete("/entrygroups", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    deleteAbsence({ absenceId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ absenceId }, REQUIRED.DELETE_ABSENCE);
            return this[clockodoApi].delete("/absences/" + absenceId, options);
        });
    }
    editCustomer({ customerId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ customerId }, REQUIRED.EDIT_CUSTOMER);
            return this[clockodoApi].put("/customers/" + customerId, options);
        });
    }
    editProject({ projectId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ projectId }, REQUIRED.EDIT_PROJECT);
            return this[clockodoApi].put("/projects/" + projectId, options);
        });
    }
    editService({ serviceId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ serviceId }, REQUIRED.EDIT_SERVICE);
            return this[clockodoApi].put("/services/" + serviceId, options);
        });
    }
    editUser({ userId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ userId }, REQUIRED.EDIT_USER);
            return this[clockodoApi].put("/users/" + userId, options);
        });
    }
    editEntryGroup({ timeSince, timeUntil }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredArguments = { timeSince, timeUntil };
            REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);
            return this[clockodoApi].put("/entrygroups", Object.assign(Object.assign({}, requiredArguments), options));
        });
    }
    editAbsence({ absenceId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ absenceId }, REQUIRED.EDIT_ABSENCE);
            return this[clockodoApi].put("/absences/" + absenceId, options);
        });
    }
    editEntry({ entryId }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ entryId }, REQUIRED.EDIT_ENTRY);
            return this[clockodoApi].put("/entries/" + entryId, options);
        });
    }
    getLumpSumEntriesByUserId({ lumpSumEntryId, timeUntil, timeSince, userId, }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            REQUIRED.checkRequired({ lumpSumEntryId, timeUntil, timeSince, userId }, REQUIRED.GET_LUMP_SUM);
            return this[clockodoApi].get("/entries/", Object.assign({ filterLumpSumId: lumpSumEntryId, timeSince,
                timeUntil, filterUserId: userId }, options));
        });
    }
    addLumpSumEntry({ customerId, projectId, lumpSumAmount, lumpSumId, text, timeSince, userId, }, options) {
        return __awaiter(this, void 0, void 0, function* () {
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
                projectId,
                userId }, options));
        });
    }
}
exports.Clockodo = Clockodo;
