export type Service = {
  /** ID of the service */
  id: number;
  /** Name of the service */
  name: string;
  /** Service number */
  number: string | null;
  /** Is the service active? */
  active: boolean;
  /** Note about the service */
  note: string | null;
};
