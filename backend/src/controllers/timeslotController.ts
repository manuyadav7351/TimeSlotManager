import { Request, Response } from "express";
import { fetchTimeslots } from "../services/timeslotService.js";

export const getTimeslots = async (_req: Request, res: Response) => {
  const timeslots = await fetchTimeslots();
  res.json(timeslots);
};
