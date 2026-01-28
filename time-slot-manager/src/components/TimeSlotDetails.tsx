import React from "react";
import type { TimeslotDetails as TimeslotDetailsType } from "@/types";

interface TimeslotDetailsProps {
  details: TimeslotDetailsType | null;
  onShowDetails: () => void;
  isVisible: boolean;
}

const TimeslotDetails: React.FC<TimeslotDetailsProps> = ({details,onShowDetails,isVisible,}) => {
  if (!details) return null;

  return (
    <div className="timeslot-details-container">
      <button className="show-details-button" type="button" onClick={onShowDetails}>
        {isVisible ? "Hide Details" : "Show Timeslot Details"}
      </button>

      {isVisible && (
        <div className="details-content">
          <div className="detail-item">
            <strong>Original Timeslot :</strong>
            <span>{details.originalUTC}</span>
          </div>

          <div className="detail-item">
            <strong>Converted Timeslot : ({details.timezoneName}):</strong>
            <span>{details.converted}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeslotDetails;
