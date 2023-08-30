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
};
