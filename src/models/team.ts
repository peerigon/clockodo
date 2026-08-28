export type Team = {
  id: number;
  name: string;
  /** The user ID of the team leader */
  leader: number | null;
  /** IDs of the users that are members of this team */
  userIds: Array<number>;
};
