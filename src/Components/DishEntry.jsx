import React from "react";
import { Typography } from "@mui/material";
import FoodLine from "./FoodLine";
import "../App.css";

function DishEntry({ dishName, dishDesc, dishCount, foodEntries }) {
  const currentDishes = React.useMemo(() => {
    const dishes = [];
    if (foodEntries) {
      for (let i = 0; i < foodEntries.length; i++) {
        dishes.push(
          <FoodLine
            key={`${i}`}
            foodName={foodEntries[i].foodName}
            personName={foodEntries[i].personName}
          />,
        );
      }
    }
    return dishes;
  }, [foodEntries]);

  const dishCountString = React.useMemo(() => {
    if (!dishCount || !foodEntries)
      return <Typography variant="h4"></Typography>;
    return (
      <Typography variant="h4">{`(${foodEntries.length}/${dishCount})`}</Typography>
    );
  }, [dishCount, foodEntries]);

  return (
    <div className="dish">
      <div className="dish-title-row">
        <Typography variant="h4">{dishName}</Typography>
        {dishCountString}
      </div>
      <Typography variant="subtitle1">{dishDesc}</Typography>
      <div className="divider-light" />
      {currentDishes}
      <div className="spacer" />
      <div className="divider-heavy" />
      <div style={{ height: "32px" }} />
    </div>
  );
}

export default DishEntry;
