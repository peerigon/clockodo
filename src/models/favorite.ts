import { Billability } from "./entry.js";

export enum FavoriteColor {
  BloodOrange = 1,
  Sunflower = 2,
  LightGreen = 3,
  Caribbean = 4,
  Sky = 5,
  BrandBlue = 6,
  BluePurple = 7,
  Magenta = 8,
  ChewingGum = 9,
}

export type Favorite = {
  id: number;
  customersId: number;
  projectsId: number | null;
  subprojectsId: number | null;
  servicesId: number;
  billable: Billability.NotBillable | Billability.Billable;
  text: string | null;
  color: FavoriteColor;
  position: number;
  name: string;
};
