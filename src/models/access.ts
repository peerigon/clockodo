export type AccessToCustomersProjects =
  | boolean
  | Record<string, true | { projects: Record<string, true> }>;

export type AccessToServices = boolean | Record<string, true>;
