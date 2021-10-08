/**
 * Returns the ISO string representation of that date
 * that is most commonly used in Clockodo, which is:
 * - normalized to UTC
 * - without milliseconds
 */
export const dateToClockodoIsoString = (date: Date) => {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
};
