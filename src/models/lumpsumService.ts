export type LumpsumService = {
  /** ID of the lump sum service */
  id: number;
  /** Name of the lump sum service */
  name: string;
  /** Price of the lump sum service */
  price: number;
  /** Unit of the lump sum service */
  unit: string | null;
  /** Lump sum service number */
  number: string | null;
  /** Is the lump sum service active? */
  active: boolean;
  /** Note about the lump sum service */
  note: string | null;
};
