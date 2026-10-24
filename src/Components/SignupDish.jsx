import React from "react";
import {OutlinedInput, IconButton, InputLabel, FormControl} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function SignupDish({ dishName, dishSuggestions, dishInput, setDishInput }) {
  const [hasValue, setHasValue] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setHasValue(!!dishInput);
  }, [dishInput])

  return (
    <div style={{ display: "flex", alignItems: "center", maxWidth: "100%" }}>
      <IconButton
        onClick={() => {
          if (hasValue) {
            setHasValue(false);
            setDishInput("");
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
          value={dishInput}
          onChange={(e) => {
            setDishInput(e.target.value);
          }}
          label="side-dish-input"
          inputRef={inputRef}
          placeholder={dishSuggestions}
        />
      </FormControl>
    </div>
  );
}

export default SignupDish;
