"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ? API for Absences says countDays twice. I am guessing the second time should be their countHours
const paramMapping = {
    timeSince: "time_since",
    timeUntil: "time_until",
    filterUsersId: "filter[users_id]",
    filterCustomersId: "filter[customers_id]",
    filterProjectsId: "filter[projects_id]",
    filterServicesId: "filter[services_id]",
    filterBillable: "filter[billable]",
    filterText: "filter[text]",
    filterTextsId: "filter[texts_id]",
    filterBudgetType: "filter[budget_type]",
    taskCustomersId: "task[customers_id]",
    taskProjectsId: "task[projects_id]",
    taskServicesId: "task[services_id]",
    taskBillable: "task[billable]",
    taskText: "task[text]",
    roundToMinutes: "round_to_minutes",
    prependCustomerToProjectName: "prepend_customer_to_project_name",
    calcAlsoRevenuesForProjectsWithHardBudget: "calc_also_revenues_for_projects_with_hard_budget",
    customersId: "customers_id",
    projectsId: "projects_id",
    servicesId: "services_id",
    usersId: "users_id",
    term: "term",
    durationBefore: "duration_before",
    offsetBefore: "offset_before",
    hourlyRate: "hourly_rate",
    billableDefault: "billable_default",
    budgetMoney: "budget_money",
    budgetIsHours: "budgetIsHours",
    budgetIsNotStrict: "budget_is_not_strict",
    dateSince: "date_since",
    dateUntil: "date_until",
    countDays: "count_days",
    countHours: "count_hours",
    billedMoney: "billed_money",
    billedCompletely: "billed_completely",
    revenueFactor: "revenue_factor",
    confirmKey: "confirm_key",
    editLock: "edit_lock",
    textsId: "texts_id",
    filterLumpSumsId: "filter[lumpSums_id]",
    lumpSumsAmount: "lumpSums_amount",
    lumpSumsId: "lumpSums_id",
};
const mapKeys = (userParams) => {
    const apiParams = {};
    for (const [userParamName, value] of Object.entries(userParams)) {
        const apiParamName = userParamName in paramMapping ? paramMapping[userParamName] : userParamName;
        apiParams[apiParamName] = value;
    }
    return apiParams;
};
exports.default = mapKeys;
