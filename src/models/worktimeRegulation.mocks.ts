import { type WorktimeRegulation } from "./worktimeRegulation.js";

export const worktimeRegulationCountryPresets: Record<
  "Germany" | "Austria" | "Switzerland" | "Netherlands" | "Greece" | "France",
  WorktimeRegulation
> = {
  Germany: {
    id: -1,
    addToWorktime: false,
    dailyMax: 10,
    weeklyMax: 60,
    intervalMax: 6,
    rules: [
      {
        id: 1,
        worktime: 9,
        breakSum: 45,
        splitting: {
          "2": 15,
          "3": 15,
        },
      },
      {
        id: 2,
        worktime: 6,
        breakSum: 30,
        splitting: {
          "2": 15,
        },
      },
    ],
  },
  Austria: {
    id: -2,
    addToWorktime: false,
    dailyMax: 12,
    weeklyMax: 48,
    intervalMax: null,
    rules: [
      {
        id: 3,
        worktime: 6,
        breakSum: 30,
        splitting: {
          "2": 15,
          "3": 10,
        },
      },
    ],
  },
  Switzerland: {
    id: -3,
    addToWorktime: false,
    dailyMax: 12.5,
    weeklyMax: 50,
    intervalMax: null,
    rules: [
      {
        id: 4,
        worktime: 9,
        breakSum: 60,
        splitting: {
          "1+": 30,
        },
      },
      {
        id: 5,
        worktime: 7,
        breakSum: 30,
        splitting: {},
      },
      {
        id: 6,
        worktime: 5.5,
        breakSum: 15,
        splitting: {},
      },
    ],
  },
  Netherlands: {
    id: -4,
    addToWorktime: false,
    dailyMax: 12,
    weeklyMax: 60,
    intervalMax: null,
    rules: [
      {
        id: 7,
        worktime: 10,
        breakSum: 45,
        splitting: {
          "2": 15,
          "3": 15,
        },
      },
      {
        id: 8,
        worktime: 5.5,
        breakSum: 30,
        splitting: {
          "2": 15,
        },
      },
    ],
  },
  Greece: {
    id: -6,
    addToWorktime: false,
    dailyMax: null,
    weeklyMax: 48,
    intervalMax: null,
    rules: [
      {
        id: 9,
        worktime: 6,
        breakSum: 15,
        splitting: {},
      },
    ],
  },
  France: {
    id: -7,
    addToWorktime: false,
    dailyMax: null,
    weeklyMax: null,
    intervalMax: null,
    rules: [
      {
        id: 10,
        worktime: 6,
        breakSum: 20,
        splitting: {},
      },
    ],
  },
};
