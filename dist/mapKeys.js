"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_entries_1 = __importDefault(require("object.entries"));
// ? API for Absences says countDays twice. I am guessing the second time should be their countHours
const paramMapping = {
    begin: "time_since",
    end: "time_until",
    timeSince: "time_since",
    timeUntil: "time_until",
    filterUserId: "filter[users_id]",
    filterCustomerId: "filter[customers_id]",
    filterProjectId: "filter[projects_id]",
    filterServiceId: "filter[services_id]",
    filterBillable: "filter[billable]",
    filterText: "filter[text]",
    filterTextsId: "filter[texts_id]",
    filterBudgetType: "filter[budget_type]",
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
    confirmKey: "confirm_key",
    textsId: "texts_id",
};
function mapKeys(userParams) {
    const apiParams = {};
    for (const [userParamName, value] of object_entries_1.default(userParams)) {
        const apiParamName = userParamName in paramMapping ? paramMapping[userParamName] : userParamName;
        apiParams[apiParamName] = value;
    }
    return apiParams;
}
exports.default = mapKeys;
