import express from "express";
import { getTimezones } from "../controllers/timezoneController";

const router = express.Router();
router.get("/", getTimezones);

export default router;
