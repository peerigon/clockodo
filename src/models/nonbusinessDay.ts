import type { IsoDate } from "./dateTime.ts";

export type NonbusinessDay = {
  /** The ID of the nonbusiness day */
  id: number;
  /** The ID of the corresponding nonbusiness group */
  nonbusinessGroupId: number;
  /** The name of the nonbusiness day */
  name: string;
  /** It is half a nonbusiness day */
  halfDay: boolean;
  /** Nonbusiness day type */
  type: "SPECIAL" | "DISTINCT_ONCE" | "DISTINCT_RECURRING";
  /** Special surcharge marker */
  surchargeSpecial: boolean;
  /** Evaluated date for the requested year */
  evaluatedDate: IsoDate;
  /** Optional special id for type SPECIAL */
  specialId?: number;
  day?: number;
  month?: number;
  year?: number;
};
