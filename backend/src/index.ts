import express from "express";
import dotenv from "dotenv";
import timezoneRoutes from "./routes/timezoneRoutes";
import timeslotRoutes from "./routes/timezoneSlotRoutes";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import cors from "cors";

const db = drizzle(process.env.DATABASE_URL!);

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/timezones", timezoneRoutes);
app.use("/api/timeslots", timeslotRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
