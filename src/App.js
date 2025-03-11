import axios from "axios";
import React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ManIcon from "@mui/icons-material/Man";
import BoyIcon from "@mui/icons-material/Boy";

import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

import "./App.css";

import TextLoader from "./TextLoader";
import DishLoader from "./DishLoader";
import CountLoader from "./CountLoader";
import ResponseLoader from "./ResponseLoader";

function App() {
  const [mealData, setMealData] = React.useState({});
  const [rsvps, setRSVPs] = React.useState([]);

  const [attendeeEntries, setAttendeeEntries] = React.useState();

  const [primaryEntries, setPrimaryEntries] = React.useState();
  const [secondaryEntries, setSecondaryEntries] = React.useState();
  const [sideEntries, setSideEntries] = React.useState();
  const [dessertEntries, setDessertEntries] = React.useState();
  const [beverageEntries, setBeverageEntries] = React.useState();

  const [formVisible, setFormVisible] = React.useState();
  const [formHasPrimary, setFormHasPrimary] = React.useState(false);
  const [formHasSecondary, setFormHasSecondary] = React.useState(false);
  const [formHasSide, setFormHasSide] = React.useState(false);
  const [formHasDessert, setFormHasDessert] = React.useState(false);
  const [formHasBeverage, setFormHasBeverage] = React.useState(false);

  const [formName, setFormName] = React.useState("");
  const [formCountA, setFormCountA] = React.useState(0);
  const [formCountC, setFormCountC] = React.useState(0);
  const [formPrimary, setFormPrimary] = React.useState("");
  const [formSecondary, setFormSecondary] = React.useState("");
  const [formSide, setFormSide] = React.useState("");
  const [formDessert, setFormDessert] = React.useState("");
  const [formBeverage, setFormBeverage] = React.useState("");
  const [formNote, setFormNote] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSending, setIsSending] = React.useState(false);

  const meetingDateText = React.useMemo(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (mealData?.MeetingDate)
      return new Date(mealData.MeetingDate).toLocaleDateString(
        "en-US",
        options
      );
  }, [mealData]);

  const fetchData = async () => {
    setIsLoading(true);

    const currentData = await axios.get(
      "https://script.google.com/macros/s/AKfycbzKRTMRRNR558b-XWa6uhvmnfbnGK9g3DX9lE1k0Sy2iqnqsu6gediiSoWM-cCtfNPQ/exec"
    );

    setMealData(currentData.data.meal);
    setRSVPs(currentData.data.responses);
    setIsSending(false);
    setIsLoading(false);
  };

  const sendData = React.useCallback(() => {
    setIsSending(true);

    const formData = {
      Date: meetingDateText,
      Timestamp: new Date(),
      Name: formName,
      Attending: formCountA > 0,
      AdultCount: formCountA,
      ChildCount: formCountC,
      Note: formNote,
      HasPrimary: formHasPrimary,
      PrimaryName: formPrimary,
      HasSecondary: formHasSecondary,
      SecondaryName: formSecondary,
      HasSide: formHasSide,
      SideName: formSide,
      HasDessert: formHasDessert,
      DessertName: formDessert,
      HasBeverage: formHasBeverage,
      BeverageName: formBeverage,
    };

    const sendAsync = async () => {
      await axios.post(
        "https://script.google.com/macros/s/AKfycbzKRTMRRNR558b-XWa6uhvmnfbnGK9g3DX9lE1k0Sy2iqnqsu6gediiSoWM-cCtfNPQ/exec",
        formData,
        {
          redirect: "follow",
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      );

      setFormVisible(false);
      fetchData();
    };

    sendAsync();
  }, [
    formBeverage,
    formCountA,
    formCountC,
    formDessert,
    formHasBeverage,
    formHasDessert,
    formHasPrimary,
    formHasSecondary,
    formHasSide,
    formName,
    formNote,
    formPrimary,
    formSecondary,
    formSide,
    meetingDateText,
  ]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const dishEntry = React.useCallback((dishName, personName) => {
    return (
      <div className="dish-entry">
        <Typography variant="h6" className="dish-entry-title">
          {dishName}
        </Typography>
        <Typography variant="h6" className="dish-entry-person">
          {personName}
        </Typography>
      </div>
    );
  }, []);

  const blankEntry = React.useMemo(() => {
    return (
      <Typography variant="subtitle1" textAlign="center">
        Nobody has signed up for this yet!
      </Typography>
    );
  }, []);

  const attendeeEntry = React.useCallback(
    (personName, adultCount, childCount, comment) => {
      return (
        <div>
          <div className="attendee-entry">
            <Typography variant="h5" className="attendee-name">
              {personName}
            </Typography>
            <Typography variant="h5" className="attendee-count">
              {adultCount}
            </Typography>
            <Typography variant="h5" className="attendee-count">
              {childCount}
            </Typography>
          </div>
          {typeof comment === "string" || comment instanceof String ? (
            <Typography variant="body1">{comment}</Typography>
          ) : (
            <div>{comment}</div>
          )}
        </div>
      );
    },
    []
  );

  React.useEffect(() => {
    const attendees = [];
    const nonAttendees = [];
    const primaryDishes = [];
    const secondaryDishes = [];
    const sideDishes = [];
    const desserts = [];
    const beverages = [];

    let adultCount = 0;
    let childCount = 0;

    if (rsvps.length > 0) {
      for (var rsvp of rsvps) {
        if (rsvp.Attending) {
          attendees.push(
            attendeeEntry(
              rsvp.Name,
              rsvp?.AdultCount ?? 0,
              rsvp?.ChildCount ?? 0,
              rsvp.Note
            )
          );

          adultCount += rsvp?.AdultCount ?? 0;
          childCount += rsvp?.ChildCount ?? 0;

          if (rsvp.HasPrimary) {
            primaryDishes.push(dishEntry(rsvp.PrimaryName, rsvp.Name));
          }
          if (rsvp.HasSecondary) {
            secondaryDishes.push(dishEntry(rsvp.SecondaryName, rsvp.Name));
          }
          if (rsvp.HasSide) {
            sideDishes.push(dishEntry(rsvp.SideName, rsvp.Name));
          }
          if (rsvp.HasDessert) {
            desserts.push(dishEntry(rsvp.DessertName, rsvp.Name));
          }
          if (rsvp.HasBeverage) {
            beverages.push(dishEntry(rsvp.BeverageName, rsvp.Name));
          }
        } else {
          nonAttendees.push(attendeeEntry(rsvp.Name, "-", "-", rsvp.Note));
        }
      }
    }

    if (attendees.length > 0) {
      attendees.unshift(
        attendeeEntry(
          "Total",
          adultCount,
          childCount,
          <div className="divider-light" />
        )
      );
      attendees.unshift(
        attendeeEntry(
          "Attending:",
          "Adults",
          "Children",
          <div className="divider-heavy" />
        )
      );
    }
    if (nonAttendees.length > 0) {
      attendees.push(attendeeEntry("","","",<div className="divider-heavy" />));
      attendees.push(attendeeEntry("Not Attending:","","",<div className="divider-light" />));
      for (let i = 0; i < nonAttendees.length; i++)
      {
        attendees.push(nonAttendees[i]);
      }
    }
    
    setAttendeeEntries(attendees);

    if (primaryDishes.length > 0) {
      setPrimaryEntries(primaryDishes);
    } else {
      setPrimaryEntries(blankEntry);
    }

    if (secondaryDishes.length > 0) {
      setSecondaryEntries(secondaryDishes);
    } else {
      setSecondaryEntries(blankEntry);
    }

    if (sideDishes.length > 0) {
      setSideEntries(sideDishes);
    } else {
      setSideEntries(blankEntry);
    }

    if (desserts.length > 0) {
      setDessertEntries(desserts);
    } else {
      setDessertEntries(blankEntry);
    }

    if (beverages.length > 0) {
      setBeverageEntries(beverages);
    } else {
      setBeverageEntries(blankEntry);
    }
  }, [attendeeEntry, blankEntry, dishEntry, rsvps]);

  const canSubmit = React.useMemo(() => {
    return formName;
  }, [formName]);

  return (
    <div className="app">
      <div className="runner">
        <Typography textAlign="center" variant="h2">
          Discipleship Community <span>Meal Signup</span>
        </Typography>

        {isLoading ? (
          <TextLoader />
        ) : (
          <>
            <Typography textAlign="center" variant="h6">
              Our next meeting is on <b>{meetingDateText}</b> at 6:00pm. The
              theme for this week is <b>{mealData.Theme}</b>. <br />
              {mealData.Description}
            </Typography>

            <Button
              onClick={() => {
                setFormVisible(true);
              }}
              variant="outlined"
              color=""
            >
              <Typography textAlign="center" variant="h5">
                Click Here to RSVP
              </Typography>
            </Button>
          </>
        )}

        <div className="gap" />

        <Dialog
          open={formVisible}
          onClose={() => {
            setFormVisible(false);
          }}
        >
          {isSending ? (
            <>
              <ResponseLoader />
              <Button variant="outlined" sx={{ m: 1, width: "64ch" }} disabled>
                Sending Response...
              </Button>
            </>
          ) : (
            <>
              <Typography textAlign="center" variant="h4">
                {"Who's Coming?"}
              </Typography>
              <Typography textAlign="center" variant="body1">
                {"Leave count empty to respond Not Attending."}
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
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
                    />
                  </FormControl>
                </div>

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
                        setFormCountA(
                          Math.min(Math.max(e.target.value, 0), 10)
                        );
                      }}
                      label="count-a-input"
                    />
                  </FormControl>
                </div>

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
                        setFormCountC(
                          Math.min(Math.max(e.target.value, 0), 10)
                        );
                      }}
                      label="count-c-input"
                    />
                  </FormControl>
                </div>
              </div>

              <Typography textAlign="center" variant="h4">
                {"What are you bringing?"}
              </Typography>
              <Typography textAlign="center" variant="body1">
                {
                  "Check each item you're bringing and provide a brief description."
                }
              </Typography>

              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    setFormHasPrimary(!formHasPrimary);
                  }}
                  edge="end"
                  disabled={!canSubmit || formCountA === 0}
                >
                  {formHasPrimary ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </IconButton>
                <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
                  <InputLabel htmlFor="primary-dish-input">
                    {mealData.PrimaryName}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    disabled={!formHasPrimary}
                    value={formPrimary}
                    onChange={(e) => {
                      setFormPrimary(e.target.value);
                    }}
                    label="primary-dish-input"
                  />
                </FormControl>
              </div>

              {mealData.SecondaryName &&
              mealData.SecondaryDescription !== "N/A" ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => {
                      setFormHasSecondary(!formHasSecondary);
                    }}
                    edge="end"
                    disabled={!canSubmit || formCountA === 0}
                  >
                    {formHasSecondary ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </IconButton>
                  <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
                    <InputLabel htmlFor="secondary-dish-input">
                      {mealData.SecondaryName}
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      disabled={!formHasSecondary}
                      value={formSecondary}
                      onChange={(e) => {
                        setFormSecondary(e.target.value);
                      }}
                      label="secondary-dish-input"
                    />
                  </FormControl>
                </div>
              ) : (
                <></>
              )}

              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    setFormHasSide(!formHasSide);
                  }}
                  edge="end"
                  disabled={!canSubmit || formCountA === 0}
                >
                  {formHasSide ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </IconButton>
                <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
                  <InputLabel htmlFor="side-dish-input">Side</InputLabel>
                  <OutlinedInput
                    type="text"
                    disabled={!formHasSide}
                    value={formSide}
                    onChange={(e) => {
                      setFormSide(e.target.value);
                    }}
                    label="side-dish-input"
                  />
                </FormControl>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    setFormHasDessert(!formHasDessert);
                  }}
                  edge="end"
                  disabled={!canSubmit || formCountA === 0}
                >
                  {formHasDessert ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </IconButton>
                <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
                  <InputLabel htmlFor="dessert-dish-input">Dessert</InputLabel>
                  <OutlinedInput
                    type="text"
                    disabled={!formHasDessert}
                    value={formDessert}
                    onChange={(e) => {
                      setFormDessert(e.target.value);
                    }}
                    label="dessert-dish-input"
                  />
                </FormControl>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    setFormHasBeverage(!formHasBeverage);
                  }}
                  edge="end"
                  disabled={!canSubmit || formCountA === 0}
                >
                  {formHasBeverage ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </IconButton>
                <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
                  <InputLabel htmlFor="beverage-dish-input">
                    Beverage
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    disabled={!formHasBeverage}
                    value={formBeverage}
                    onChange={(e) => {
                      setFormBeverage(e.target.value);
                    }}
                    label="beverage-dish-input"
                  />
                </FormControl>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton disabled edge="end">
                  {<EditNoteIcon edge="end" />}
                </IconButton>
                <FormControl variant="outlined" sx={{ m: 1, width: "55ch" }}>
                  <InputLabel htmlFor="note-input">Notes</InputLabel>
                  <OutlinedInput
                    type="text"
                    value={formNote}
                    onChange={(e) => {
                      setFormNote(e.target.value);
                    }}
                    label="note-input"
                  />
                </FormControl>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ m: 1, width: "64ch" }}
                  disabled={!canSubmit}
                  onClick={sendData}
                  color={formCountA > 0 ? "success" : "error"}
                >
                  {canSubmit
                    ? formCountA > 0
                      ? "Submit RSVP - Attending"
                      : "Submit RSVP - Not Attending"
                    : "Please Enter a Name"}
                </Button>
              </div>
            </>
          )}
        </Dialog>

        <div className="body">
          <div className="column">
            <Typography variant="h3" textAlign="center" sx={{ width: "100%" }}>
              Dishes
            </Typography>
            {isLoading ? (
              <DishLoader />
            ) : (
              <>
                <div className="dish">
                  <Typography variant="h4">{mealData.PrimaryName}</Typography>
                  <Typography variant="subtitle1">
                    {mealData.PrimaryDescription}
                  </Typography>
                  <div className="divider-light" />
                  {primaryEntries}
                  <div className="spacer" />
                  <div className="divider-heavy" />
                </div>

                {mealData.SecondaryName &&
                mealData.SecondaryDescription !== "N/A" ? (
                  <div className="dish">
                    <Typography variant="h4">
                      {mealData.SecondaryName}
                    </Typography>
                    <Typography variant="subtitle1">
                      {mealData?.SecondaryDescription}
                    </Typography>
                    <div className="divider-light" />
                    {secondaryEntries}
                    <div className="spacer" />
                    <div className="divider-heavy" />
                  </div>
                ) : (
                  <></>
                )}

                <div className="dish">
                  <Typography variant="h4">Sides</Typography>
                  <Typography variant="subtitle1">
                    {mealData.SideDescription}
                  </Typography>
                  <div className="divider-light" />
                  {sideEntries}
                  <div className="spacer" />
                  <div className="divider-heavy" />
                </div>

                <div className="dish">
                  <Typography variant="h4">Dessert</Typography>
                  <Typography variant="subtitle1">
                    {mealData.DessertDescription}
                  </Typography>
                  <div className="divider-light" />
                  {dessertEntries}
                  <div className="spacer" />
                  <div className="divider-heavy" />
                </div>

                <div className="dish">
                  <Typography variant="h4">Beverages</Typography>
                  <Typography variant="subtitle1">
                    {mealData.BeverageDescription}
                  </Typography>
                  <div className="divider-light" />
                  {beverageEntries}
                  <div className="spacer" />
                </div>
              </>
            )}
          </div>

          <div className="column">
            <Typography variant="h3" textAlign="center" sx={{ width: "100%" }}>
              RSVPs
            </Typography>
            {isLoading ? (
              <CountLoader />
            ) : (
              <>
                <div className="dish">{attendeeEntries}</div>
              </>
            )}
          </div>
        </div>

        <div className="footer">
          <p>If you have any questions, please contact <a href="mailto:drewdcamp@gmail.com?subject=Sagert DC">Drew Camp</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
