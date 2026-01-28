import { db } from "../db/connection";
import { timezones } from "../db/schema";

export const fetchTimezones = async () => {
  return await db.select().from(timezones);
};
