// On first sight, you might think that the typings in this module could be improved.
// However, we don't have typings for the snake_case models which is why we don't
// gain much more confidence by removing 'any' here

import mapObject, { mapObjectSkip } from "map-obj";
import { warnDeprecated } from "./deprecations.js";

export const queryParamMapping: Record<string, string> = {
  filterId: "filter[id]",
  filterUsersId: "filter[users_id]",
  filterYear: "filter[year]",
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
  filterTeamsId: "filter[teams_id]",
  filterActive: "filter[active]",
  filterFulltext: "filter[fulltext]",

  // these params needs to stay in camelCase.
  // This seems to be an inconsistency in the API.
  excludeIds: "excludeIds",
};

// The purpose of the type parameter is to provide an easy way to specify the type of the result.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const mapQueryParams = <Result = Record<string, unknown>>(
  queryParams: Record<string, any>,
): Result => {
  return mapObject(
    queryParams,
    (key, value) => {
      if (value === undefined || value === null) {
        return mapObjectSkip;
      }

      if (value === "") {
        return mapObjectSkip;
      }

      const mappedKey =
        key in queryParamMapping
          ? queryParamMapping[key]!
          : camelCaseToSnakeCase(key);

      if (key.startsWith("filter") && key in queryParamMapping) {
        warnDeprecated(
          "CLOCKODO_DEPRECATED_FILTER_QUERY_PARAM",
          `Query parameter "${key}" is deprecated. Use the "filter" object instead.`,
        );
      }

      if (mappedKey === "include" && Array.isArray(value)) {
        return [mappedKey, value.join(",")];
      }

      return [mappedKey, value];
    },
    {
      deep: true,
    },
  ) as unknown as Result;
};

// The purpose of the type parameter is to provide an easy way to specify the type of the result.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const mapRequestBody = <Result = Record<string, unknown>>(
  requestBody: Record<string, any>,
): Result => {
  return mapObject(
    requestBody,
    (key, value) => {
      const mappedKey = camelCaseToSnakeCase(key);

      return [mappedKey, value];
    },
    {
      deep: true,
    },
  ) as unknown as Result;
};

// The purpose of the type parameter is to provide an easy way to specify the type of the result.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const mapResponseBody = <Result = Record<string, unknown>>(
  responseBody: Record<string, any>,
): Result => {
  return mapObject(
    responseBody,
    (key, value) => {
      const mappedKey = snakeCaseToCamelCase(key);

      return [mappedKey, value];
    },
    {
      deep: true,
    },
  ) as unknown as Result;
};

export const snakeCaseToCamelCase = (key: string): string => {
  return key.replaceAll(/_+(\d*)([a-z])/gi, (_, $1, $2) => {
    return ($1 + $2.toUpperCase()) as string;
  });
};

export const camelCaseToSnakeCase = (key: string): string => {
  return key.replaceAll(/(\d*)([A-Z])/g, (_, $1, $2) => {
    return "_" + $1 + $2.toLowerCase();
  });
};
