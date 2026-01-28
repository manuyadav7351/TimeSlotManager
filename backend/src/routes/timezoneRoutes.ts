import express from "express";
import { getTimezones } from "../controllers/timezoneController.js";

const router = express.Router();
router.get("/", getTimezones);

export default router;
