"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require("axios");
const camelCase = require("camelcase");
const deepMapKeys = require("deep-map-keys");
const qs = require("qs");
const mapParams = require("./mapParams");

const ENDPOINT = "https://my.clockodo.com/api";
const axiosClient = Symbol("axiosClient");

class ClockodoLib {
    constructor(user, apiKey) {
        this[axiosClient] = axios.create({
            baseURL: ENDPOINT,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey
            }
        });
    }
    get(resource, params = {}) {
        var _this = this;

        return _asyncToGenerator(function* () {
            const response = yield _this[axiosClient].get(resource, {
                params: mapParams(params),
                paramsSerializer(params) {
                    return qs.stringify(params, { arrayFormat: "brackets" });
                }
            });

            return deepMapKeys(response.data, function (key) {
                return camelCase(key);
            });
        })();
    }
}

module.exports = {
    ClockodoLib
};