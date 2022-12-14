export type AccessToCustomersProjects =
  | true
  | Record<string, true | { projects: Record<string, true> }>;

export type AccessToServices = boolean | Record<string, true>;
