export const axiosClient = Symbol("axiosClient");

/**
 * Date and Time as ISO8601 with "second" precision, normalized to UTC.
 * Example: 2020-05-22T09:00:41Z
 *
 * Represents a time point independent of its timezone
 **/
export type IsoUtcDateTime = string & {
    readonly __type__: typeof IsoUtcDateTimeSymbol;
};
declare const IsoUtcDateTimeSymbol: unique symbol;


export const isIsoUtcDateTime = (input: unknown): input is IsoUtcDateTime => {
    return (
        typeof input === "string" &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(input)
    );
};
