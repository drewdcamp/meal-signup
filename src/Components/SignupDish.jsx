import React from "react";
import { OutlinedInput, IconButton, InputLabel, FormControl } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function SignupDish({ dishName, dishSuggestions, dishValue, setDishValue }) {
  const [hasValue, setHasValue] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    console.log(dishValue);
    setHasValue(!!dishValue);
  }, [dishValue]);

  return (
    <div style={{ display: "flex", alignItems: "center", maxWidth: "100%" }}>
      <IconButton
        onClick={() => {
          if (hasValue) {
            setHasValue(false);
            setDishValue("");
          } else {
            setHasValue(true);
            inputRef.current.focus();
          }
        }}
        edge="end"
      >
        {hasValue ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </IconButton>
      <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
        <InputLabel htmlFor="side-dish-input">{dishName}</InputLabel>
        <OutlinedInput
          type="text"
          value={dishValue}
          onChange={(e) => setDishValue(e.target.value)}
          label="side-dish-input"
          inputRef={inputRef}
          placeholder={dishSuggestions}
        />
      </FormControl>
    </div>
  );
}

export default SignupDish;
