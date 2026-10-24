import React from "react";
import DishEntry from "./DishEntry";
import "../App.css";

function DishList({ rsvps, themeInfo }) {
  
  const Dishes = React.useMemo(() => {
    if (themeInfo?.dishes && rsvps) {
      const dishes = [...themeInfo.dishes];

      for (let i = 0; i < 16; i++) {
        if (dishes[i]) {
          dishes[i].foodEntries = [];
        }
      }

      for (let i = 0; i < rsvps.length; i++) {
        const rsvp = rsvps[i];

        for (let j = 0; j < 16; j++) {
          if (dishes[j] && rsvp.dishes[j]) {
            dishes[j].foodEntries.push({
              foodName: rsvp.dishes[j],
              personName: rsvp.name,
            });
          }
        }
      }

      console.log(dishes);
      const dishViews = [];

      for (let i = 0; i < 16; i++) {
        const dish = dishes[i];
        if (dish) {
          dishViews.push(
            <DishEntry
              dishName={dish.name}
              dishDesc={dish.description}
              dishCount={dish.maxCount}
              foodEntries={dish.foodEntries}
            />,
          );
        }
      }

      return dishViews;
    }
    return null;
  }, [rsvps, themeInfo.dishes]);

  return Dishes;
}

export default DishList;
