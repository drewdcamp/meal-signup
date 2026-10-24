import React from "react";
import { Typography } from "@mui/material";
import "../App.css";

function FoodLine({foodName, personName}) {
  return (
    <div className="dish-entry">
      <Typography variant="h6" className="dish-entry-dash">
        {"•"}
      </Typography>
      <Typography variant="h6" className="dish-entry-title">
        {foodName}
      </Typography>
      <Typography variant="h6" className="dish-entry-person">
        {personName}
      </Typography>
    </div>
  );
}

export default FoodLine;
