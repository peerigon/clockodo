import { type IsoDate } from "./dateTime.js";

export type SubscriptionPlan = {
  planId: number;
  planName: string;
  numberOfLicences: number | null;
  interval: string | null;
};

export type Subscription = {
  currentUntil: IsoDate;
  current: SubscriptionPlan;
  upcoming: SubscriptionPlan;
  cancelDate: IsoDate | null;
};
