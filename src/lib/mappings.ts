// On first sight, you might think that the typings in this module could be improved.
// However, we don't have typings for the snake_case models which is why we don't
// gain much more confidence by removing 'any' here

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

const queryParamMapping: Record<string, string> = {
  filterUsersId: "filter[users_id]",
  filterCustomersId: "filter[customers_id]",
  filterProjectsId: "filter[projects_id]",
  filterServicesId: "filter[services_id]",
  filterBillable: "filter[billable]",
  filterText: "filter[text]",
  filterTextsId: "filter[texts_id]",
  filterBudgetType: "filter[budget_type]",
  filterLumpsumsId: "filter[lumpsums_id]",
  taskCustomersId: "task[customers_id]",
  taskProjectsId: "task[projects_id]",
  taskServicesId: "task[services_id]",
  taskBillable: "task[billable]",
  taskText: "task[text]",
  // excludeIds needs to stay in camelCase.
  // This seems to be an inconsistency in the API.
  excludeIds: "excludeIds",
};

export const mapQueryParams = <Result = any>(
  userParams: Record<string, any>
) => {
  const apiParams: Record<string, any> = {};

  for (const [userParamName, value] of Object.entries(userParams)) {
    const apiParamName =
      userParamName in queryParamMapping
        ? queryParamMapping[userParamName]
        : userParamName;

    apiParams[apiParamName] = value;
  }

  return snakecaseKeys(apiParams as any, {
    deep: true,
    exclude: Object.values(queryParamMapping),
  }) as Result;
};

export const mapRequestBody = <Result = any>(
  requestBody: Record<string, any>
) => {
  return snakecaseKeys(requestBody as any, { deep: true }) as Result;
};

export const mapResponseBody = <Result = any>(
  responseBody: Record<string, any>
) => {
  return camelcaseKeys(responseBody as any, { deep: true }) as Result;
};
