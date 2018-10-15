"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var camelcase_1 = __importDefault(require("camelcase"));
var deep_map_keys_1 = __importDefault(require("deep-map-keys"));
var qs_1 = __importDefault(require("qs"));
var mapKeys_1 = __importDefault(require("./mapKeys"));
var ENDPOINT = "https://my.clockodo.com/api";
var axiosClient = Symbol("axiosClient");
var ClockodoLib = /** @class */ (function () {
    function ClockodoLib(user, apiKey) {
        this[axiosClient] = axios_1["default"].create({
            baseURL: ENDPOINT,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey
            }
        });
    }
    ClockodoLib.prototype.get = function (resource, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this[axiosClient].get(resource, {
                            params: mapKeys_1["default"](params),
                            paramsSerializer: function (params) {
                                return qs_1["default"].stringify(params, { arrayFormat: "brackets" });
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, deep_map_keys_1["default"](response.data, function (key) { return camelcase_1["default"](key); })];
                }
            });
        });
    };
    ClockodoLib.prototype.post = function (resource, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var mappedObj, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mappedObj = mapKeys_1["default"](params);
                        return [4 /*yield*/, this[axiosClient].post(resource, mappedObj)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, deep_map_keys_1["default"](response.data, function (key) { return camelcase_1["default"](key); })];
                }
            });
        });
    };
    ClockodoLib.prototype.put = function (resource, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var mappedObj, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mappedObj = mapKeys_1["default"](params);
                        return [4 /*yield*/, this[axiosClient].put(resource, qs_1["default"].stringify(mappedObj), {
                                headers: { "Content-Type": "application/x-www-form-urlencoded" }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, deep_map_keys_1["default"](response.data, function (key) { return camelcase_1["default"](key); })];
                }
            });
        });
    };
    ClockodoLib.prototype["delete"] = function (resource, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var mappedObj, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mappedObj = mapKeys_1["default"](params);
                        return [4 /*yield*/, this[axiosClient]["delete"](resource, { data: mappedObj })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, deep_map_keys_1["default"](response.data, function (key) { return camelcase_1["default"](key); })];
                }
            });
        });
    };
    return ClockodoLib;
}());
exports.ClockodoLib = ClockodoLib;
