export const assertExists = <Type>(value: Type | null | undefined): Type => {
  if (value === undefined || value === null) {
    throw new TypeError(`Expected value to exist, but received ${value}`);
  }
  return value;
};
