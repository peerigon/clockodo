/**
 * An ISO 8601 date format.
 *
 * Please note: This date format can only be interpreted in the context of a
 * time zone.
 *
 * Example: 2023-02-20
 */
export type IsoDate =
  // This type is not 100% correct but enough for our use-case
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

/**
 * An ISO 8601 time stamp:
 *
 * - Normalized to UTC
 * - Without milliseconds
 *
 * Example: 2023-02-20T13:06:33Z
 */
export type IsoUtcDateTime =
  // This type is not 100% correct but enough for our use-case
  `${IsoDate}T${number}${number}:${number}${number}:${number}${number}Z`;

/**
 * An ISO 8601 time format.
 *
 * Example: 23:00:00 (hh:mm:ss)
 */
export type IsoTime =
  `${number}${number}:${number}${number}:${number}${number}`;
