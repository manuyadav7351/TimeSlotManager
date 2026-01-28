import { db } from "../db/connection";
import { timeslots } from "../db/schema";

export const fetchTimeslots = async () => {
  return await db.select().from(timeslots);
};
