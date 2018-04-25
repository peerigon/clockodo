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
    customerId: "customers_id",
    projectId: "projects_id",
    serviceId: "services_id",
    userId: "users_id",
    searchTerm: "term",
    durationBefore: "duration_before",
    offsetBefore: "offset_before",
};

module.exports = function mapKeys(userParams) {
    const apiParams = {};

    for (const [userParamName, value] of entries(userParams)) {
        const apiParamName = userParamName in paramMapping ? paramMapping[userParamName] : userParamName;

        apiParams[apiParamName] = value;
    }

    return apiParams;
};
