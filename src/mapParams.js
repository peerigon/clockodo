"use strict";

const entries = require("object.entries");

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
    searchCustomerId: "customers_id",
    searchProjectId: "projects_id",
    searchServiceId: "services_id",
    searchTerm: "term",
};

module.exports = function mapParams(userParams) {
    const apiParams = {};

    for (const [userParamName, value] of entries(userParams)) {
        const apiParamName = userParamName in paramMapping ? paramMapping[userParamName] : userParamName;

        apiParams[apiParamName] = value;
    }

    return apiParams;
};
