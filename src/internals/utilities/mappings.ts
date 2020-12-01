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

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return snakecaseKeys(apiParams, {
        deep: true,
        exclude: Object.values(queryParamMapping),
    }) as Result;
};

export const mapRequestBody = <Result = any>(
    requestBody: Record<string, any>
) => {
    /* eslint-disable @typescript-eslint/naming-convention */
    const {
        // The following keys are a mixture between camelCase and snake_case.
        // Hence, we need to transform them manually.
        lump_sum,
        lump_sums_amount,
        lump_sums_id,
        ...entryWithoutLumpSums
    } = snakecaseKeys(requestBody, { deep: true });

    return ({
        ...entryWithoutLumpSums,
        lumpSum: lump_sum,
        lumpSums_amount: lump_sums_amount,
        lumpSums_id: lump_sums_id,
    } as any) as Result;
    /* eslint-enable @typescript-eslint/naming-convention */
};

export const mapResponseBody = <Result = any>(
    responseBody: Record<string, any>
) => {
    return camelcaseKeys(responseBody, { deep: true }) as Result;
};
