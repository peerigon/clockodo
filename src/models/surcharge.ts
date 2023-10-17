import { IsoTime } from "./dateTime.js";

export type Surcharge = {
  /** The ID of the surcharge model  */
  id: number;
  /** The name of the surcharge model */
  name: string;
  /**
   * Should night surcharges apply in addition to another surcharge?
   * If `false`, only the surcharge with the higher percent value applies
   */
  accumulation: boolean;
  /** Night surcharge configuration */
  night: NightSurchargeConfiguration | null;
  /** Increased night surcharge configuration */
  nightIncreased: NightSurchargeConfiguration | null;
  /** Nonbusiness surcharge configuration */
  nonbusiness: SurchargeConfiguration | null;
  /** Nonbusiness surcharge configuration for special nonbusiness days */
  nonbusinessSpecial: SurchargeConfiguration | null;
  /** Sunday surcharge configuration */
  sunday: SurchargeConfiguration | null;
  /** Saturday surcharge configuration */
  saturday: SurchargeConfiguration | null;
};

type NightSurchargeConfiguration = {
  /** Percentage of the work time that is added to the work time account */
  percent: number;
  /**
   * Start of the period during which the surcharge applies
   * - Format hh:mm:ss, e.g. 23:00:00
   */
  timeSince: IsoTime;
  /**
   * End of the period during which the surcharge applies
   * - Format hh:mm:ss, e.g. 23:00:00
   */
  timeUntil: IsoTime;
};

export type SurchargeConfiguration = NightSurchargeConfiguration & {
  /**
   * Does the surcharge period start on the previous day?
   * Not for `night` and `nightIncreased`, as these surcharges apply every day
   */
  timeSinceIsPreviousDay: boolean;
  /**
   * Does the surcharge period end on the next day?
   * Not for `night` and `nightIncreased`, as these surcharges apply every day
   */
  timeUntilIsNextDay: boolean;
};
