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
    filterLumpSumsId: "filter[lumpSums_id]",
    taskCustomersId: "task[customers_id]",
    taskProjectsId: "task[projects_id]",
    taskServicesId: "task[services_id]",
    taskBillable: "task[billable]",
    taskText: "task[text]",
    // excludeIds needs to stay in camelCase.
    // This seems to be an inconsistency in the API.
    excludeIds: "excludeIds",
};

export const mapQueryParams = <Value>(userParams: Record<string, Value>) => {
    const apiParams: Record<string, Value> = {};

    for (const [userParamName, value] of Object.entries(userParams)) {
        const apiParamName =
            userParamName in queryParamMapping
                ? queryParamMapping[userParamName]
                : userParamName;

        apiParams[apiParamName] = value;
    }

    return snakecaseKeys(apiParams, {
        deep: true,
        exclude: Object.values(queryParamMapping),
    });
};

export const mapRequestBody = <Value>(requestBody: Record<string, Value>) => {
    /* eslint-disable @typescript-eslint/naming-convention */
    const {
        // The following keys are a mixture between camelCase and snake_case.
        // Hence, we need to transform them manually.
        lump_sum,
        lump_sums_amount,
        lump_sums_id,
        ...entryWithoutLumpSums
    } = snakecaseKeys(requestBody, { deep: true });

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
        ...entryWithoutLumpSums,
        lumpSum: lump_sum,
        lumpSums_amount: lump_sums_amount,
        lumpSums_id: lump_sums_id,
    } as Record<string, Value>;
    /* eslint-enable @typescript-eslint/naming-convention */
};

export const mapResponseBody = <Value>(responseBody: Record<string, Value>) => {
    return camelcaseKeys(responseBody, { deep: true });
};
