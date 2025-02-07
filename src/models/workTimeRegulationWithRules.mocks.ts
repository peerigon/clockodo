import { WorkTimeRegulationWithRules } from "./workTimeRegulationWithRules.js";

export const workTimeRegulationWithRulesCountryPresets: Record<
  "Germany" | "Austria" | "Switzerland" | "Netherlands" | "Greece" | "France",
  WorkTimeRegulationWithRules
> = {
  Germany: {
    id: -1,
    addToWorktime: false,
    dailyMax: 10,
    weeklyMax: 60,
    intervalMax: 6,
    rules: [
      {
        workTime: 9,
        breakSum: 45,
        splittingOptions: [
          {
            breaks: 2,
            minLength: 15,
          },
          { breaks: 3, minLength: 15 },
        ],
      },
      {
        workTime: 6,
        breakSum: 30,
        splittingOptions: [
          {
            breaks: 2,
            minLength: 15,
          },
        ],
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
        workTime: 6,
        breakSum: 30,
        splittingOptions: [
          {
            breaks: 2,
            minLength: 15,
          },
          { breaks: 3, minLength: 10 },
        ],
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
        workTime: 9,
        breakSum: 60,
        splittingOptions: [
          {
            breaks: "1+",
            minLength: 30,
          },
        ],
      },
      {
        workTime: 7,
        breakSum: 30,
        splittingOptions: [],
      },
      {
        workTime: 5.5,
        breakSum: 15,
        splittingOptions: [],
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
        workTime: 10,
        breakSum: 45,
        splittingOptions: [
          {
            breaks: 2,
            minLength: 15,
          },
          {
            breaks: 3,
            minLength: 15,
          },
        ],
      },
      {
        workTime: 5.5,
        breakSum: 30,
        splittingOptions: [
          {
            breaks: 2,
            minLength: 15,
          },
        ],
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
        workTime: 6,
        breakSum: 15,
        splittingOptions: [],
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
        workTime: 6,
        breakSum: 20,
        splittingOptions: [],
      },
    ],
  },
};
