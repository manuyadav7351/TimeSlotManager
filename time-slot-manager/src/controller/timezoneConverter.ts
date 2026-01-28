import { parseISO, format, isValid } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { Timezone } from "@/types";

const TIMEZONE_MAP: Record<string, string> = {
  PT: "America/Los_Angeles",
  MT: "America/Denver",
  CT: "America/Chicago",
  ET: "America/New_York",
  AKT: "America/Anchorage",
  HAT: "Pacific/Honolulu",
  IST: "Asia/Kolkata",
  CST: "Asia/Shanghai"
};


export const convertToTimezone = (
  utcTimeString: string,
  timezone: Timezone
): string => {

  if (!utcTimeString || typeof utcTimeString !== "string") {
    throw new Error("UTC time must be a valid string");
  }

  const utcDate = parseISO(utcTimeString);

  if (!isValid(utcDate)) {
    throw new Error(`Invalid UTC date string: ${utcTimeString}`);
  }

  const ianaTimezone = TIMEZONE_MAP[timezone.id];

  try {
    if (!ianaTimezone) {
      throw new Error(`Unsupported timezone: ${timezone.id}`);
    }
    const zonedDate = toZonedTime(utcDate, ianaTimezone);
    return format(zonedDate, "yyyy-MM-dd HH:mm:ss") + ` ${timezone.id}`;
  } catch (err) {
    throw new Error(
      `Timezone conversion failed for ${utcTimeString} → ${timezone.id}`
    );
  }
};

