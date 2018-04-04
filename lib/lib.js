"use strict";

const axios = require("axios");
const camelCase = require("camelcase");
const deepMapKeys = require("deep-map-keys");
const qs = require("qs");

const ENDPOINT = "https://my.clockodo.com/api";
const axiosClient = Symbol("axiosClient");
const paramMapping = {
    begin: "time_since",
    end: "time_until",
    filterUserId: "filter[users_id]",
    filterCustomerId: "filter[customers_id]",
    filterProjectId: "filter[projects_id]",
    filterServiceId: "filter[services_id]",
    filterBillable: "filter[billable]",
    filterText: "filter[text]",
    taskCustomerId: "task[customers_id]",
    taskProjectId: "task[projects_id]",
    taskServiceId: "task[services_id]",
    taskBillable: "task[billable]",
    taskText: "task[text]",
    roundBy: "round_to_minutes",
    prependCustomer: "prepend_customer_to_project_name",
    calcHardBudgetRevenues: "calc_also_revenues_for_projects_with_hard_budget",
};

class ClockodoApi {
    constructor(user, apiKey) {
        this[axiosClient] = axios.create({
            baseURL: ENDPOINT,
            headers: {
                "X-ClockodoApiUser": user,
                "X-ClockodoApiKey": apiKey,
            },
        });
    }
    async get(resource, params = {}) {
        const response = await this[axiosClient].get(resource, {
            params: mapParams(params),
            paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
            },
        });

        return deepMapKeys(response.data, _camelize);
    }
}

function mapParams(userParams) {
    const apiParams = {};

    for (const [userParamName, value] of Object.entries(userParams)) {
        const apiParamName = userParamName in paramMapping ? paramMapping[userParamName] : userParamName;

        apiParams[apiParamName] = value;
    }

    return apiParams;
}

function _camelize(key) {
    return camelCase(key);
}

module.exports = {
    ClockodoApi,
};
