import { Request, Response } from "express";
import { fetchTimezones } from "../services/timezoneService";

export const getTimezones = async (_req: Request, res: Response) => {
  const timezones = await fetchTimezones();
  res.json(timezones);
};
