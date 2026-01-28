import express from "express";
import dotenv from "dotenv";
import timezoneRoutes from "./routes/timezoneRoutes.js";
import timeslotRoutes from "./routes/timezoneSlotRoutes.js";
import { drizzle } from "drizzle-orm/node-postgres";
import cors from "cors";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is alive!"));
app.use("/timezones", timezoneRoutes);
app.use("/timeslots", timeslotRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
