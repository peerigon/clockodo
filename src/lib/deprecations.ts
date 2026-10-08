const seenDeprecationWarnings = new Set<string>();

export const warnDeprecated = (code: string, message: string): void => {
  const messageWithCode = `[${code}] ${message}`;
  if (seenDeprecationWarnings.has(messageWithCode)) {
    return;
  }
  seenDeprecationWarnings.add(messageWithCode);

  if (typeof process !== "undefined" && typeof process.emitWarning === "function") {
    process.emitWarning(message, {
      type: "DeprecationWarning",
      code,
    });

    return;
  }

  if (typeof console !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (console.warn ?? console.log)(messageWithCode);
  }
};
