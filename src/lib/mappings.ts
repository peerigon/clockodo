// On first sight, you might think that the typings in this module could be improved.
// However, we don't have typings for the snake_case models which is why we don't
// gain much more confidence by removing 'any' here

import mapObject from "map-obj";

export const queryParamMapping: Record<string, string> = {
  filterUsersId: "filter[users_id]",
  filterCustomersId: "filter[customers_id]",
  filterProjectsId: "filter[projects_id]",
  filterServicesId: "filter[services_id]",
  filterLumpsumServicesId: "filter[lumpsum_services_id]",
  /** @deprecated Please don't use this anymore, it will be removed someday */
  filterLumpsumsServicesId: "filter[lumpsum_services_id]",
  filterBillable: "filter[billable]",
  filterText: "filter[text]",
  filterTextsId: "filter[texts_id]",
  filterBudgetType: "filter[budget_type]",
  filterLumpsumsId: "filter[lumpsums_id]",
  filterTimeSince: "filter[time_since]",
  filterTimeUntil: "filter[time_until]",
  filterActive: "filter[active]",
  // excludeIds needs to stay in camelCase.
  // This seems to be an inconsistency in the API.
  excludeIds: "excludeIds",
};

export const mapQueryParams = <Result = Record<string, unknown>>(
  queryParams: Record<string, any>
) => {
  return mapObject(
    queryParams,
    (key, value) => {
      const mappedKey =
        key in queryParamMapping
          ? queryParamMapping[key]
          : camelCaseToSnakeCase(key);

      return [mappedKey, value];
    },
    {
      deep: true,
    }
  ) as unknown as Result;
};

export const mapRequestBody = <Result = Record<string, unknown>>(
  requestBody: Record<string, any>
) => {
  return mapObject(
    requestBody,
    (key, value) => {
      const mappedKey = camelCaseToSnakeCase(key);

      return [mappedKey, value];
    },
    {
      deep: true,
    }
  ) as unknown as Result;
};

export const mapResponseBody = <Result = Record<string, unknown>>(
  responseBody: Record<string, any>
) => {
  return mapObject(
    responseBody,
    (key, value) => {
      const mappedKey = snakeCaseToCamelCase(key);

      return [mappedKey, value];
    },
    {
      deep: true,
    }
  ) as unknown as Result;
};

export const snakeCaseToCamelCase = (key: string) => {
  return key.replace(/_+(\d*)([a-z])/gi, (_, $1, $2) => {
    return ($1 + $2.toUpperCase()) as string;
  });
};

export const camelCaseToSnakeCase = (key: string) => {
  return key.replace(/(\d*)([A-Z])/g, (_, $1, $2) => {
    return "_" + $1 + $2.toLowerCase();
  });
};
