import { WorktimeRegulation } from "./worktimeRegulation.js";

export const worktimeRegulationCountryPresets: Record<
  "Germany" | "Austria" | "Switzerland" | "Netherlands" | "Greece" | "France",
  WorktimeRegulation
> = {
  Germany: {
    id: -1,
    name: "Germany",
    addToWorktime: false,
    dailyMax: 10,
    weeklyMax: 60,
    intervalMax: 6,
    rules: [
      {
        worktime: 9,
        breakSum: 45,
        splitting: {
          "2": 15,
          "3": 15,
        },
      },
      {
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
    name: "Austria",
    addToWorktime: false,
    dailyMax: 12,
    weeklyMax: 48,
    intervalMax: null,
    rules: [
      {
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
    name: "Switzerland",
    addToWorktime: false,
    dailyMax: 12.5,
    weeklyMax: 50,
    intervalMax: null,
    rules: [
      {
        worktime: 9,
        breakSum: 60,
        splitting: {
          "1+": 30,
        },
      },
      {
        worktime: 7,
        breakSum: 30,
        splitting: {},
      },
      {
        worktime: 5.5,
        breakSum: 15,
        splitting: {},
      },
    ],
  },
  Netherlands: {
    id: -4,
    name: "Netherlands",
    addToWorktime: false,
    dailyMax: 12,
    weeklyMax: 60,
    intervalMax: null,
    rules: [
      {
        worktime: 10,
        breakSum: 45,
        splitting: {
          "2": 15,
          "3": 15,
        },
      },
      {
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
    name: "Greece",
    addToWorktime: false,
    dailyMax: null,
    weeklyMax: 48,
    intervalMax: null,
    rules: [
      {
        worktime: 6,
        breakSum: 15,
        splitting: {},
      },
    ],
  },
  France: {
    id: -7,
    name: "France",
    addToWorktime: false,
    dailyMax: null,
    weeklyMax: null,
    intervalMax: null,
    rules: [
      {
        worktime: 6,
        breakSum: 20,
        splitting: {},
      },
    ],
  },
};
