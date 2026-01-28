import express from "express";
import { getTimeslots } from "../controllers/timeslotController";

const router = express.Router();
router.get("/", getTimeslots);

export default router;
