import { type IsoDate, type IsoUtcDateTime } from "../models/dateTime.js";

export const isoDateFromDateTime = (dateTime: Date): IsoDate => {
  return [
    dateTime.getFullYear(),
    String(dateTime.getMonth() + 1).padStart(2, "0"),
    String(dateTime.getDate()).padStart(2, "0"),
  ].join("-") as IsoDate;
};

export const isoDateFromTimestamp = (timestamp: number): IsoDate => {
  return isoDateFromDateTime(new Date(timestamp));
};

export const isoUtcDateTimeFromDateTime = (dateTime: Date): IsoUtcDateTime => {
  return dateTime.toJSON().replace(/\.\d{3}Z$/, "Z") as IsoUtcDateTime;
};

export const isoUtcDateTimeFromTimestamp = (timestamp: number): IsoUtcDateTime => {
  return isoUtcDateTimeFromDateTime(new Date(timestamp));
};
