import React from "react";
import { Typography, IconButton, InputLabel, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import ManIcon from "@mui/icons-material/Man";
import BoyIcon from "@mui/icons-material/Boy";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import SignupDish from "./SignupDish";

function SignupForm({ formData, setFormData, themeInfo, rsvps }) {
  const [formCountA, setFormCountA] = React.useState(0);
  const [formCountC, setFormCountC] = React.useState(0);
  const [formName, setFormName] = React.useState("");
  const [tmpEmail, setTmpEmail] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");

  const [dishValueA, setDishValueA] = React.useState("");
  const [dishValueB, setDishValueB] = React.useState("");
  const [dishValueC, setDishValueC] = React.useState("");
  const [dishValueD, setDishValueD] = React.useState("");
  const [dishValueE, setDishValueE] = React.useState("");
  const [dishValueF, setDishValueF] = React.useState("");
  const [dishValueG, setDishValueG] = React.useState("");
  const [dishValueH, setDishValueH] = React.useState("");
  const [dishValueI, setDishValueI] = React.useState("");
  const [dishValueJ, setDishValueJ] = React.useState("");
  const [dishValueK, setDishValueK] = React.useState("");
  const [dishValueL, setDishValueL] = React.useState("");
  const [dishValueM, setDishValueM] = React.useState("");
  const [dishValueN, setDishValueN] = React.useState("");
  const [dishValueO, setDishValueO] = React.useState("");
  const [dishValueP, setDishValueP] = React.useState("");

  const dishStates = React.useMemo(() => {
    return [
      { value: dishValueA, setValue: setDishValueA },
      { value: dishValueB, setValue: setDishValueB },
      { value: dishValueC, setValue: setDishValueC },
      { value: dishValueD, setValue: setDishValueD },
      { value: dishValueE, setValue: setDishValueE },
      { value: dishValueF, setValue: setDishValueF },
      { value: dishValueG, setValue: setDishValueG },
      { value: dishValueH, setValue: setDishValueH },
      { value: dishValueI, setValue: setDishValueI },
      { value: dishValueJ, setValue: setDishValueJ },
      { value: dishValueK, setValue: setDishValueK },
      { value: dishValueL, setValue: setDishValueL },
      { value: dishValueM, setValue: setDishValueM },
      { value: dishValueN, setValue: setDishValueN },
      { value: dishValueO, setValue: setDishValueO },
      { value: dishValueP, setValue: setDishValueP },
    ];
  }, [
    dishValueA,
    dishValueB,
    dishValueC,
    dishValueD,
    dishValueE,
    dishValueF,
    dishValueG,
    dishValueH,
    dishValueI,
    dishValueJ,
    dishValueK,
    dishValueL,
    dishValueM,
    dishValueN,
    dishValueO,
    dishValueP,
  ]);

  const validateEmail = (email) => {
    return /.+@.+\..+/.test(email);
  };

  const allDishes = React.useMemo(() => {
    if (themeInfo?.dishes) {
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
            // TODO: Check current count of dish?
          }
        }
      }

      const dishViews = [];

      for (let i = 0; i < 16; i++) {
        const dish = dishes[i];
        if (dish) {
          dishViews.push(
            <SignupDish
              dishName={dish.name}
              dishSuggestions={dish.description}
              dishValue={dishStates[i].value}
              setDishValue={dishStates[i].setValue}
            />,
          );
        }
      }

      if (dishViews.length > 0) {
        return dishViews;
      }

      return <></>;
    }
    return <></>;
  }, [themeInfo.dishes, rsvps, dishStates]);

  return (
    <div style={{ width: "100%", height: "95%", overflowY: "auto" }}>
      <Typography textAlign="center" variant="h4">
        {"Who's Coming?"}
      </Typography>

      <Typography textAlign="center" variant="body1">
        {"Leave count empty to indicate Not Attending."}
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap-reverse",
          flexDirection: "row-reverse",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled edge="end">
            {<ManIcon edge="end" />}
          </IconButton>
          <FormControl variant="outlined" sx={{ m: 1, width: "10ch" }}>
            <InputLabel htmlFor="count-a-input">Adults</InputLabel>
            <OutlinedInput
              type="number"
              value={formCountA}
              onChange={(e) => {
                setFormCountA(Math.min(Math.max(e.target.value, 0), 10));
              }}
              label="count-a-input"
            />
          </FormControl>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled edge="end">
            {<FamilyRestroomIcon edge="end" />}
          </IconButton>
          <FormControl variant="outlined" sx={{ m: 1, width: "25ch" }}>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <OutlinedInput
              type="text"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
              }}
              label="name-input"
              autoFocus
            />
          </FormControl>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap-reverse",
          flexDirection: "row-reverse",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled edge="end">
            {<BoyIcon edge="end" />}
          </IconButton>
          <FormControl variant="outlined" sx={{ m: 1, width: "10ch" }}>
            <InputLabel htmlFor="count-c-input">Children</InputLabel>
            <OutlinedInput
              type="number"
              value={formCountC}
              onChange={(e) => {
                setFormCountC(Math.min(Math.max(e.target.value, 0), 10));
              }}
              label="count-c-input"
            />
          </FormControl>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled edge="end">
            {<AlternateEmailIcon edge="end" />}
          </IconButton>
          <FormControl variant="outlined" sx={{ m: 1, width: "25ch" }}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              type="text"
              value={tmpEmail}
              onChange={(e) => {
                setTmpEmail(e.target.value);
                if (validateEmail(e.target.value)) {
                  setFormEmail(e.target.value);
                } else {
                  setFormEmail("");
                }
              }}
              label="email-input"
            />
          </FormControl>
        </div>
      </div>
      {allDishes}
    </div>
  );
}

export default SignupForm;
