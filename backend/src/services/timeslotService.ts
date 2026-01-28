import { db } from "../db/connection.js";
import { timeslots } from "../db/schema.js";

export const fetchTimeslots = async () => {
  return await db.select().from(timeslots);
};
