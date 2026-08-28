export type Rate = {
  id: number | null;
  parentRateId: number | null;
  customerIds: Array<number>;
  projectIds: Array<number>;
  serviceIds: Array<number>;
  userIds: Array<number>;
  hourlyRate: number;
  testData: boolean;
  position: number;
};

export type DefaultRate = {
  hourlyRate: number;
};
