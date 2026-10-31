import React from "react";
import { Typography } from "@mui/material";
import "../App.css";

function AttendeeLine({ name, adultCount, childCount, comment }) {
  return (
    <div>
      <div className="attendee-entry">
        <Typography variant="h5" className="attendee-name">
          {name}
        </Typography>
        <Typography variant="h5" className="attendee-count">
          {adultCount}
        </Typography>
        <Typography variant="h5" className="attendee-count">
          {childCount}
        </Typography>
      </div>
      <Typography variant="body1">{comment}</Typography>
    </div>
  );
}

export default AttendeeLine;
