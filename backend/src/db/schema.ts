import { pgTable, text, numeric, serial, timestamp, doublePrecision } from "drizzle-orm/pg-core";

export const timezones = pgTable("timezones", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  offset: doublePrecision("offset").notNull(),
});

export const timeslots = pgTable("timeslots", {
  time: timestamp("time", { mode: "date", withTimezone: true }).notNull(),
});
