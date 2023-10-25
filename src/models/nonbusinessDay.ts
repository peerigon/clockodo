export type NonbusinessDay = {
  /** The date of the nonbusiness day */
  date: string;
  /** The ID of the nonbusiness day */
  id: number;
  /** The ID of the corresponding nonbusiness group */
  nonbusinessgroupsId: number;
  /** The name of the nonbusiness day */
  name: string;
  /** It is half a nonbusiness day */
  halfDay: boolean;
  /** It is a special nonbusiness day */
  surchargeSpecial: boolean;
  /** It is a recurring nonbusiness day */
  periodic: boolean;
  /** Varies from year per year */
  differentPerYear: boolean;
};
