import express from "express";
import { getTimeslots } from "../controllers/timeslotController.js";

const router = express.Router();
router.get("/", getTimeslots);

export default router;
