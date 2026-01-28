import { Request, Response } from "express";
import { fetchTimezones } from "../services/timezoneService.js";

export const getTimezones = async (_req: Request, res: Response) => {
  const timezones = await fetchTimezones();
  res.json(timezones);
};
