import { db } from "../db/connection.js";
import { timezones } from "../db/schema.js";

export const fetchTimezones = async () => {
  return await db.select().from(timezones);
};
