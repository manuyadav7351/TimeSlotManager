import React from "react";
import { Timezone } from "@/types";

interface TimezoneDropdownProps {
  timezones: Timezone[];
  selectedTimezone: Timezone | null;
  onTimezoneChange: (timezone: Timezone) => void;
  isLoading?: boolean;
}

const TimezoneDropdown: React.FC<TimezoneDropdownProps> = ({
  timezones,
  selectedTimezone,
  onTimezoneChange,
  isLoading = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tz = timezones.find((t) => t.id === e.target.value);
    if (tz) onTimezoneChange(tz);
  };

  return (
    <div className="timezone-container">
      <label className="timezone-label" htmlFor="timezone-select">
        Select Timezone
      </label>

      <select
        id="timezone-select"
        value={selectedTimezone?.id || ""}
        onChange={handleChange}
        disabled={isLoading || !timezones.length}
        className="timezone-select"
      >
        <option className="timezone-select-bg" value="">-- Select a timezone --</option>
        {timezones.map((tz) => (
          <option className="timezone-select-bg" key={tz.id} value={tz.id}>
            {tz.name} ({tz.id})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneDropdown;
