"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var lib_1 = require("./utilities/lib");
var REQUIRED = __importStar(require("./utilities/requiredParams"));
var clockodoApi = Symbol("api");
exports.ENTRY_UNBILLABLE = 0;
exports.ENTRY_BILLABLE = 1;
exports.ENTRY_BILLED = 2;
exports.ABSENCE_TYPE_REGULAR_HOLIDAY = 1;
exports.ABSENCE_TYPE_SPECIAL_LEAVE = 2;
exports.ABSENCE_TYPE_REDUCTION_OF_OVERTIME = 3;
exports.ABSENCE_TYPE_SICK_DAY = 4;
exports.ABSENCE_STATUS_APPROVED = 0;
exports.ABSENCE_STATUS_DECLINED = 1;
exports.ABSENCE_STATUS_APPROVAL_CANCELLED = 3;
exports.ABSENCE_STATUS_REQUEST_CANCELLED = 4;
/* eslint-disable max-len */
var Clockodo = /** @class */ (function () {
    function Clockodo(_a) {
        var user = _a.user, apiKey = _a.apiKey;
        if (typeof user !== "string") {
            throw new Error("Clockodo user expected to be a string, is typeof: " + typeof user);
        }
        if (typeof apiKey !== "string") {
            throw new Error("Clockodo apikey expected to be a string, is typeof: " + typeof apiKey);
        }
        this[clockodoApi] = new lib_1.ClockodoLib(user, apiKey);
    }
    Clockodo.prototype.getAbsence = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id }, REQUIRED.GET_ABSENCE);
                return [2 /*return*/, this[clockodoApi].get("/absences/" + id)];
            });
        });
    };
    Clockodo.prototype.getAbsences = function (_a) {
        var year = _a.year;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ year: year }, REQUIRED.GET_ABSENCES);
                return [2 /*return*/, this[clockodoApi].get("/absences", { year: year })];
            });
        });
    };
    Clockodo.prototype.getClock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/clock")];
            });
        });
    };
    Clockodo.prototype.getClockUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/clock/update")];
            });
        });
    };
    Clockodo.prototype.getCustomer = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id }, REQUIRED.GET_CUSTOMER);
                return [2 /*return*/, this[clockodoApi].get("/customers/" + id)];
            });
        });
    };
    Clockodo.prototype.getCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/customers")];
            });
        });
    };
    Clockodo.prototype.getEntry = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id }, REQUIRED.GET_ENTRY);
                return [2 /*return*/, this[clockodoApi].get("/entries/" + id)];
            });
        });
    };
    Clockodo.prototype.getEntries = function (_a, options) {
        var timeSince = _a.timeSince, timeUntil = _a.timeUntil;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { timeSince: timeSince, timeUntil: timeUntil };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRIES);
                return [2 /*return*/, this[clockodoApi].get("/entries", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.getEntryGroups = function (_a, options) {
        var timeSince = _a.timeSince, timeUntil = _a.timeUntil, grouping = _a.grouping;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { timeSince: timeSince, timeUntil: timeUntil, grouping: grouping };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_ENTRY_GROUPS);
                return [2 /*return*/, this[clockodoApi].get("/entrygroups", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.getProject = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id }, REQUIRED.GET_PROJECT);
                return [2 /*return*/, this[clockodoApi].get("/projects/" + id)];
            });
        });
    };
    Clockodo.prototype.getSearchTexts = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/searchtexts", options)];
            });
        });
    };
    Clockodo.prototype.getService = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id }, REQUIRED.GET_SERVICE);
                return [2 /*return*/, this[clockodoApi].get("/services/" + id)];
            });
        });
    };
    Clockodo.prototype.getServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/services")];
            });
        });
    };
    Clockodo.prototype.getTaskDuration = function (_a, options) {
        var taskCustomerId = _a.taskCustomerId, taskProjectId = _a.taskProjectId, taskServiceId = _a.taskServiceId, taskText = _a.taskText, taskBillable = _a.taskBillable;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { taskCustomerId: taskCustomerId, taskProjectId: taskProjectId, taskServiceId: taskServiceId, taskText: taskText, taskBillable: taskBillable };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.GET_TASK_DURATION);
                return [2 /*return*/, this[clockodoApi].get("/tasks/duration", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.getTasks = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/tasks", options)];
            });
        });
    };
    Clockodo.prototype.getUser = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id }, REQUIRED.GET_USER);
                return [2 /*return*/, this[clockodoApi].get("/users/" + id)];
            });
        });
    };
    Clockodo.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this[clockodoApi].get("/users")];
            });
        });
    };
    Clockodo.prototype.getUserReport = function (_a, options) {
        var id = _a.id, year = _a.year;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ id: id, year: year }, REQUIRED.GET_USER_REPORTS);
                return [2 /*return*/, this[clockodoApi].get("/userreports/" + id, __assign({ year: year }, options))];
            });
        });
    };
    Clockodo.prototype.getUserReports = function (_a, options) {
        var year = _a.year;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ year: year }, REQUIRED.GET_USER_REPORTS);
                return [2 /*return*/, this[clockodoApi].get("/userreports", __assign({ year: year }, options))];
            });
        });
    };
    Clockodo.prototype.changeClockDuration = function (_a, options) {
        var entryId = _a.entryId, durationBefore = _a.durationBefore, duration = _a.duration;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { durationBefore: durationBefore, duration: duration };
                REQUIRED.checkRequired(__assign({ entryId: entryId }, requiredArguments), REQUIRED.CHANGE_CLOCK_DURATION);
                return [2 /*return*/, this[clockodoApi].put("/clock/" + entryId, __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.startClock = function (_a, options) {
        var customerId = _a.customerId, serviceId = _a.serviceId, billable = _a.billable;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { customerId: customerId, serviceId: serviceId, billable: billable };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.START_CLOCK);
                return [2 /*return*/, this[clockodoApi].post("/clock", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.addCustomer = function (_a, options) {
        var name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ name: name }, REQUIRED.ADD_CUSTOMER);
                return [2 /*return*/, this[clockodoApi].post("/customers", __assign({ name: name }, options))];
            });
        });
    };
    Clockodo.prototype.addProject = function (_a, options) {
        var name = _a.name, customerId = _a.customerId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ name: name, customerId: customerId }, REQUIRED.ADD_PROJECT);
                return [2 /*return*/, this[clockodoApi].post("/projects", __assign({ name: name, customerId: customerId }, options))];
            });
        });
    };
    Clockodo.prototype.addService = function (_a, options) {
        var name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ name: name }, REQUIRED.ADD_SERVICE);
                return [2 /*return*/, this[clockodoApi].post("/services", __assign({ name: name }, options))];
            });
        });
    };
    Clockodo.prototype.addUser = function (_a, options) {
        var name = _a.name, number = _a.number, email = _a.email, role = _a.role;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { name: name, number: number, email: email, role: role };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_USER);
                return [2 /*return*/, this[clockodoApi].post("/users", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.addEntry = function (_a, options) {
        var customerId = _a.customerId, serviceId = _a.serviceId, billable = _a.billable;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { customerId: customerId, serviceId: serviceId, billable: billable };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ENTRY);
                return [2 /*return*/, this[clockodoApi].post("/entries", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.addAbsence = function (_a, options) {
        var dateSince = _a.dateSince, dateUntil = _a.dateUntil, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { dateSince: dateSince, dateUntil: dateUntil, type: type };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.ADD_ABSENCE);
                return [2 /*return*/, this[clockodoApi].post("/absences", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.stopClock = function (_a, options) {
        var entryId = _a.entryId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ entryId: entryId }, REQUIRED.STOP_CLOCK);
                return [2 /*return*/, this[clockodoApi]["delete"]("/clock/" + entryId, options)];
            });
        });
    };
    Clockodo.prototype.deactivateCustomer = function (_a, options) {
        var customerId = _a.customerId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ customerId: customerId }, REQUIRED.DEACTIVATE_CUSTOMER);
                return [2 /*return*/, this[clockodoApi]["delete"]("/customers/" + customerId, options)];
            });
        });
    };
    Clockodo.prototype.deactivateProject = function (_a, options) {
        var projectId = _a.projectId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ projectId: projectId }, REQUIRED.DEACTIVATE_PROJECT);
                return [2 /*return*/, this[clockodoApi]["delete"]("/projects/" + projectId, options)];
            });
        });
    };
    Clockodo.prototype.deactivateService = function (_a, options) {
        var serviceId = _a.serviceId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ serviceId: serviceId }, REQUIRED.DEACTIVATE_SERVICE);
                return [2 /*return*/, this[clockodoApi]["delete"]("/services/" + serviceId, options)];
            });
        });
    };
    Clockodo.prototype.deactivateUser = function (_a, options) {
        var userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ userId: userId }, REQUIRED.DEACTIVATE_USER);
                return [2 /*return*/, this[clockodoApi]["delete"]("/users/" + userId, options)];
            });
        });
    };
    Clockodo.prototype.deleteEntry = function (_a, options) {
        var entryId = _a.entryId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ entryId: entryId }, REQUIRED.DELETE_ENTRY);
                return [2 /*return*/, this[clockodoApi]["delete"]("/entries/" + entryId, options)];
            });
        });
    };
    Clockodo.prototype.deleteEntryGroup = function (_a, options) {
        var timeSince = _a.timeSince, timeUntil = _a.timeUntil;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { timeSince: timeSince, timeUntil: timeUntil };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.DELETE_ENTRY_GROUP);
                return [2 /*return*/, this[clockodoApi]["delete"]("/entrygroups", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.deleteAbsence = function (_a, options) {
        var absenceId = _a.absenceId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ absenceId: absenceId }, REQUIRED.DELETE_ABSENCE);
                return [2 /*return*/, this[clockodoApi]["delete"]("/absences/" + absenceId, options)];
            });
        });
    };
    Clockodo.prototype.editCustomer = function (_a, options) {
        var customerId = _a.customerId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ customerId: customerId }, REQUIRED.EDIT_CUSTOMER);
                return [2 /*return*/, this[clockodoApi].put("/customers/" + customerId, options)];
            });
        });
    };
    Clockodo.prototype.editProject = function (_a, options) {
        var projectId = _a.projectId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ projectId: projectId }, REQUIRED.EDIT_PROJECT);
                return [2 /*return*/, this[clockodoApi].put("/projects/" + projectId, options)];
            });
        });
    };
    Clockodo.prototype.editService = function (_a, options) {
        var serviceId = _a.serviceId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ serviceId: serviceId }, REQUIRED.EDIT_SERVICE);
                return [2 /*return*/, this[clockodoApi].put("/services/" + serviceId, options)];
            });
        });
    };
    Clockodo.prototype.editUser = function (_a, options) {
        var userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ userId: userId }, REQUIRED.EDIT_USER);
                return [2 /*return*/, this[clockodoApi].put("/users/" + userId, options)];
            });
        });
    };
    Clockodo.prototype.editEntryGroup = function (_a, options) {
        var timeSince = _a.timeSince, timeUntil = _a.timeUntil;
        return __awaiter(this, void 0, void 0, function () {
            var requiredArguments;
            return __generator(this, function (_b) {
                requiredArguments = { timeSince: timeSince, timeUntil: timeUntil };
                REQUIRED.checkRequired(requiredArguments, REQUIRED.EDIT_ENTRY_GROUP);
                return [2 /*return*/, this[clockodoApi].put("/entrygroups", __assign({}, requiredArguments, options))];
            });
        });
    };
    Clockodo.prototype.editAbsence = function (_a, options) {
        var absenceId = _a.absenceId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ absenceId: absenceId }, REQUIRED.EDIT_ABSENCE);
                return [2 /*return*/, this[clockodoApi].put("/absences/" + absenceId, options)];
            });
        });
    };
    Clockodo.prototype.editEntry = function (_a, options) {
        var entryId = _a.entryId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                REQUIRED.checkRequired({ entryId: entryId }, REQUIRED.EDIT_ENTRY);
                return [2 /*return*/, this[clockodoApi].put("/entries/" + entryId, options)];
            });
        });
    };
    return Clockodo;
}());
exports.Clockodo = Clockodo;
