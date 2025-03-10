import { faker } from "@faker-js/faker";
import { type Team } from "./team.js";

export const createTeamMocks = ({ count = 1 }: { count?: number }) =>
  Array.from({ length: count }, (_, index): Team => {
    return {
      id: index,
      name: faker.person.jobArea() + " Team",
    };
  });
