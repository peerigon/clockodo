export type AccessToCustomersProjects =
  | boolean
  | Record<string, true | Record<string, true>>;

export type AccessToServices = boolean | Record<string, true>;
