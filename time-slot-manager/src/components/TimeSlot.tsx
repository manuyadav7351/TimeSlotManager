import React from "react";

interface TimeslotListProps {
  timeslots: string[];
  selectedTimeslot: string | null;
  onTimeslotSelect: (timeslot: string) => void;
  isLoading?: boolean;
}

const TimeslotList: React.FC<TimeslotListProps> = ({timeslots,selectedTimeslot,onTimeslotSelect,isLoading = false,}) => {
  if (isLoading) {
    return (
      <div className="timeslot-container">
      <div className="dots-loader">
        <span />
        <span />
        <span />
      </div>
      </div>
    );
  }

  if (!timeslots.length) {
    return (
      <div className="timeslot-container">
        <h3>Timeslots</h3>
        <p>No timeslots available</p>
      </div>
    );
  }

  return (
    <div className="timeslot-container">
      <h3>TimeSlots</h3>
      <ul className="timeslot-list">
        {timeslots.map((timeslot, index) => (
          <li
            key={index}
            className={`timeslot-item ${
              selectedTimeslot === timeslot ? "selected" : ""
            }`}
            onClick={() => onTimeslotSelect(timeslot)}
          >
            {timeslot}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeslotList;
