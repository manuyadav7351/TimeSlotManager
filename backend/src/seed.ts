import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

import { timezones, timeslots } from "./db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const timezoneData = [
  { id: "PT", name: "Pacific Time", offset: -8 },
  { id: "MT", name: "Mountain Time", offset: -7 },
  { id: "CT", name: "Central Time", offset: -6 },
  { id: "ET", name: "Eastern Time", offset: -5 },
  { id: "AKT", name: "Alaska Time", offset: -9 },
  { id: "HAT", name: "Hawaii-Aleutian Time", offset: -10 },
  { id: "IST", name: "India Standard Time", offset: 5.5 },
  { id: "CST", name: "China Standard Time", offset: 8 },
];

const timeslotData = [
  "2025-01-23T00:00:00Z",
  "2025-01-23T02:00:00Z",
  "2025-01-23T04:00:00Z",
  "2025-01-23T06:00:00Z",
  "2025-01-23T08:00:00Z",
  "2025-01-23T10:00:00Z",
  "2025-01-23T12:00:00Z",
  "2025-01-23T14:00:00Z",
  "2025-01-23T16:00:00Z",
  "2025-01-23T18:00:00Z",
  "2025-01-23T20:00:00Z",
  "2025-01-23T22:00:00Z",
  "2025-01-24T00:00:00Z",
  "2025-01-24T02:00:00Z",
  "2025-01-24T04:00:00Z",
  "2025-01-24T06:00:00Z",
  "2025-01-24T08:00:00Z",
  "2025-01-24T10:00:00Z",
  "2025-01-24T12:00:00Z",
  "2025-01-24T14:00:00Z",
];

async function seed() {
  try {
    await db.execute(`TRUNCATE TABLE timezones RESTART IDENTITY CASCADE`);
    await db.execute(`TRUNCATE TABLE timeslots RESTART IDENTITY CASCADE`);

    await db.insert(timezones).values(timezoneData);
    await db.insert(timeslots).values(
      timeslotData.map((t) => ({ time: new Date(t) }))
    );

    console.log("Seeding completed!");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

seed();
