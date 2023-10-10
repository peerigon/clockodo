import { faker } from "@faker-js/faker";
import { Team } from "./team.js";

export const createTeamMocks = ({ count = 1 }: { count?: number }) =>
  Array.from({ length: count }, (_, index): Team => {
    return {
      id: index,
      name: faker.name.jobArea() + " Team",
    };
  });
