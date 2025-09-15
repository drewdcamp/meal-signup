/* eslint-disable react-hooks/exhaustive-deps */
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
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ManIcon from "@mui/icons-material/Man";
import BoyIcon from "@mui/icons-material/Boy";

import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

import { useCookies } from "react-cookie";
import { useParams } from "react-router";

import TextLoader from "./ComponentLoaders/TextLoader";
import DishLoader from "./ComponentLoaders/DishLoader";
import CountLoader from "./ComponentLoaders/CountLoader";
import ResponseLoader from "./ComponentLoaders/ResponseLoader";

import "./App.css";

function App() {
  const [mealData, setMealData] = React.useState({});
  const [responses, setResponses] = React.useState({});

  const [attendeeEntries, setAttendeeEntries] = React.useState();

  const [primaryEntries, setPrimaryEntries] = React.useState();
  const [secondaryEntries, setSecondaryEntries] = React.useState();
  const [sideEntries, setSideEntries] = React.useState();
  const [dessertEntries, setDessertEntries] = React.useState();
  const [beverageEntries, setBeverageEntries] = React.useState();

  const [emailVisible, setEmailVisible] = React.useState();
  const [formVisible, setFormVisible] = React.useState();
  const [formHasPrimary, setFormHasPrimary] = React.useState(false);
  const [formHasSecondary, setFormHasSecondary] = React.useState(false);
  const [formHasSide, setFormHasSide] = React.useState(false);
  const [formHasDessert, setFormHasDessert] = React.useState(false);
  const [formHasBeverage, setFormHasBeverage] = React.useState(false);

  const [formName, setFormName] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
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

  const primaryRef = React.useRef(null);
  const secondaryRef = React.useRef(null);
  const sideRef = React.useRef(null);
  const dessertRef = React.useRef(null);
  const beverageRef = React.useRef(null);

  const [cookies, setCookie] = useCookies(["email"]);
  const [userEmail, setUserEmail] = React.useState("");
  const [rsvpExists, setRsvpExists] = React.useState(false);

  const [groupExists, setGroupExists] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");
  const [groupURL, setGroupUrl] = React.useState("");

  const params = useParams();

  React.useEffect(() => {
    if (cookies.email) {
      setUserEmail(cookies.email);
    }
  }, []);

  React.useEffect(() => {
    if (params.groupId) {
      const sanitized = params.groupId.toLowerCase();
      if (sanitized === "sagert") {
        setGroupUrl(
          "https://script.google.com/macros/s/AKfycbzKRTMRRNR558b-XWa6uhvmnfbnGK9g3DX9lE1k0Sy2iqnqsu6gediiSoWM-cCtfNPQ/exec"
        );
        setGroupName("Sagert");
        setGroupExists(true);
      }
    }
  }, [params.groupId]);

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

  const fetchData = React.useCallback(() => {
    const fetchAsync = async () => {
      setIsLoading(true);

      const currentData = await axios.get(groupURL);

      setMealData(currentData.data.meal);
      setResponses(currentData.data.responses);
      setIsSending(false);
      setIsLoading(false);
    };

    if (groupExists) {
      fetchAsync();
    }
  }, [groupURL, groupExists]);

  const rsvps = React.useMemo(() => {
    const tmpRSVP = {};

    for (let i = 0; i < responses.length; i++) {
      const email = responses[i].Email;
      tmpRSVP[email] = responses[i];
    }

    return Object.values(tmpRSVP);
  }, [responses]);

  const sendData = React.useCallback(() => {
    setIsSending(true);

    const attending = formCountA > 0;

    setCookie("email", formEmail);

    const formData = {
      Date: meetingDateText,
      Timestamp: new Date(),
      Name: formName,
      Email: userEmail,
      Attending: attending,
      AdultCount: attending ? formCountA : 0,
      ChildCount: attending ? formCountC : 0,
      Note: formNote,
      HasPrimary: attending ? formHasPrimary : false,
      PrimaryName: attending ? formPrimary : "",
      HasSecondary: attending ? formHasSecondary : false,
      SecondaryName: attending ? formSecondary : "",
      HasSide: attending ? formHasSide : false,
      SideName: attending ? formSide : "",
      HasDessert: attending ? formHasDessert : false,
      DessertName: attending ? formDessert : "",
      HasBeverage: attending ? formHasBeverage : false,
      BeverageName: attending ? formBeverage : "",
    };

    const sendAsync = async () => {
      await axios.post(groupURL, formData, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });

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
    formEmail,
    formNote,
    formPrimary,
    formSecondary,
    formSide,
    meetingDateText,
    groupURL,
  ]);

  const updateEmail = React.useCallback(() => {
    setUserEmail(formEmail);
    setEmailVisible(false);
    setFormVisible(true);
  }, [formEmail]);

  React.useEffect(() => {
    if (groupExists) {
      fetchData();
    }
  }, [groupExists]);

  const dishEntry = React.useCallback((dishName, personName) => {
    return (
      <div className="dish-entry">
        <Typography variant="h6" className="dish-entry-dash">
          {"•"} 
        </Typography>
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

  const prefillForm = React.useCallback((rsvp) => {
    setRsvpExists(true);
    setFormName(rsvp.Name);
    setFormEmail(rsvp.Email);
    setFormCountA(rsvp.AdultCount ?? 0);
    setFormCountC(rsvp.ChildCount ?? 0);
    setFormNote(rsvp.Note ?? "");
    setFormHasPrimary(rsvp.HasPrimary);
    setFormPrimary(rsvp.PrimaryName ?? "");
    setFormHasSecondary(rsvp.HasSecondary);
    setFormSecondary(rsvp.SecondaryName ?? "");
    setFormHasSide(rsvp.HasSide);
    setFormSide(rsvp.SideName ?? "");
    setFormHasDessert(rsvp.HasDessert);
    setFormDessert(rsvp.DessertName ?? "");
    setFormHasBeverage(rsvp.HasBeverage);
    setFormBeverage(rsvp.BeverageName ?? "");
  }, []);

  React.useEffect(() => {
    const attendees = [];
    const nonAttendees = [];
    const primaryList = [];
    const secondaryList = [];
    const sideList = [];
    const dessertList = [];
    const beverageList = [];

    let adultCount = 0;
    let childCount = 0;

    if (rsvps.length > 0) {
      for (var rsvp of rsvps) {
        console.log(rsvp.Email);
        if (rsvp.Email && rsvp.Email === userEmail) {
          prefillForm(rsvp);
        }

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
            const primaryEntries = rsvp.PrimaryName.split(";");
            for (let i = 0; i < primaryEntries.length; i++) {
              primaryList.push(dishEntry(primaryEntries[i], rsvp.Name));
            }
          }

          if (rsvp.HasSecondary) {
            const secondaryEntries = rsvp.SecondaryName.split(";");
            for (let i = 0; i < secondaryEntries.length; i++) {
              secondaryList.push(dishEntry(secondaryEntries[i], rsvp.Name));
            }
          }

          if (rsvp.HasSide) {
            const sideEntries = rsvp.SideName.split(";");
            for (let i = 0; i < sideEntries.length; i++) {
              sideList.push(dishEntry(sideEntries[i], rsvp.Name));
            }
          }

          if (rsvp.HasDessert) {
            const dessertEntries = rsvp.DessertName.split(";");
            for (let i = 0; i < dessertEntries.length; i++) {
              dessertList.push(dishEntry(dessertEntries[i], rsvp.Name));
            }
          }

          if (rsvp.HasBeverage) {
            const beverageEntries = rsvp.BeverageName.split(";");
            for (let i = 0; i < beverageEntries.length; i++) {
              beverageList.push(dishEntry(beverageEntries[i], rsvp.Name));
            }
          }
        } else {
          nonAttendees.push(attendeeEntry(rsvp.Name, "", "", rsvp.Note));
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
      attendees.push(
        attendeeEntry("", "", "", <div style={{ height: "32px" }} />)
      );
      attendees.push(
        attendeeEntry(
          "Not Attending:",
          "",
          "",
          <div className="divider-heavy" />
        )
      );
      for (let i = 0; i < nonAttendees.length; i++) {
        attendees.push(nonAttendees[i]);
      }
    }

    setAttendeeEntries(attendees);

    if (primaryList.length > 0) {
      setPrimaryEntries(primaryList);
    } else {
      setPrimaryEntries(blankEntry);
    }

    if (secondaryList.length > 0) {
      setSecondaryEntries(secondaryList);
    } else {
      setSecondaryEntries(blankEntry);
    }

    if (sideList.length > 0) {
      setSideEntries(sideList);
    } else {
      setSideEntries(blankEntry);
    }

    if (dessertList.length > 0) {
      setDessertEntries(dessertList);
    } else {
      setDessertEntries(blankEntry);
    }

    if (beverageList.length > 0) {
      setBeverageEntries(beverageList);
    } else {
      setBeverageEntries(blankEntry);
    }
  }, [attendeeEntry, blankEntry, dishEntry, rsvps, userEmail]);

  const canSubmit = React.useMemo(() => {
    return !!formName && !!formEmail;
  }, [formName, formEmail]);

  const canSubmitEmail = React.useMemo(() => {
    return !!formEmail;
  }, [formEmail]);

  return (
    <div className="app">
      <div className="runner">
        {groupExists ? (
          <>
            <Typography textAlign="center" variant="h2">
              Meal Signup
            </Typography>
            <Typography textAlign="center" variant="h3">
              {groupName} Discipleship Community
            </Typography>
            {isLoading ? (
              <TextLoader style={{ maxWidth: "80%" }} />
            ) : (
              <>
                <Typography textAlign="center" variant="h6">
                  Our next meeting is on{" "}
                  <u>
                    <b>{meetingDateText}</b>
                  </u>{" "}
                  at 6:00pm. <br />
                  The theme for this week is{" "}
                  <u>
                    <b>{mealData.Theme}</b>
                  </u>
                  . <br />
                  {mealData.Description}
                </Typography>
                <div style={{ height: "8px" }}></div>

                <Button
                  onClick={() => {
                    setFormVisible(true);
                  }}
                  variant="outlined"
                  color="white"
                  sx={{ width: "50ch", maxWidth: "90vw" }}
                >
                  <Typography textAlign="center" variant="h5">
                    {rsvpExists ? "Edit RSVP" : "New RSVP"}
                  </Typography>
                </Button>

                {!rsvpExists && (
                  <Button
                    onClick={() => {
                      setEmailVisible(true);
                    }}
                  >
                    Edit Existing RSVP
                  </Button>
                )}
              </>
            )}

            <div className="gap" />

            <Dialog
              open={emailVisible}
              onClose={() => {
                setEmailVisible(false);
              }}
            >
              <>
                <div
                  style={{ width: "100%", height: "95%", overflowY: "auto" }}
                >
                  <Typography textAlign="center" variant="h4">
                    {"Enter Email"}
                  </Typography>

                  <Typography textAlign="center" variant="body1">
                    {"We'll check if your email has an existing RSVP."}
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
                        {<AlternateEmailIcon edge="end" />}
                      </IconButton>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "25ch" }}
                      >
                        <InputLabel htmlFor="email-input">Email</InputLabel>
                        <OutlinedInput
                          type="text"
                          value={formEmail}
                          onChange={(e) => {
                            setFormEmail(e.target.value);
                          }}
                          label="email-input"
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "100%",
                    height: "5%",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ m: 1, width: "64ch" }}
                    disabled={!canSubmitEmail}
                    onClick={updateEmail}
                    color="success"
                  >
                    {canSubmitEmail ? "Edit RSVP" : "Please enter an Email"}
                  </Button>
                </div>
              </>
            </Dialog>

            <Dialog
              open={formVisible}
              onClose={() => {
                setFormVisible(false);
              }}
            >
              {isSending ? (
                <div>
                  <ResponseLoader />
                  <Button
                    variant="outlined"
                    sx={{ m: 1, width: "64ch" }}
                    disabled
                  >
                    Sending Response...
                  </Button>
                </div>
              ) : (
                <>
                  <div
                    style={{ width: "100%", height: "95%", overflowY: "auto" }}
                  >
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
                        <FormControl
                          variant="outlined"
                          sx={{ m: 1, width: "10ch" }}
                        >
                          <InputLabel htmlFor="count-a-input">
                            Adults
                          </InputLabel>
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
                          {<FamilyRestroomIcon edge="end" />}
                        </IconButton>
                        <FormControl
                          variant="outlined"
                          sx={{ m: 1, width: "25ch" }}
                        >
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
                        <FormControl
                          variant="outlined"
                          sx={{ m: 1, width: "10ch" }}
                        >
                          <InputLabel htmlFor="count-c-input">
                            Children
                          </InputLabel>
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

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton disabled edge="end">
                          {<AlternateEmailIcon edge="end" />}
                        </IconButton>
                        <FormControl
                          variant="outlined"
                          sx={{ m: 1, width: "25ch" }}
                        >
                          <InputLabel htmlFor="email-input">Email</InputLabel>
                          <OutlinedInput
                            type="text"
                            value={formEmail}
                            onChange={(e) => {
                              setFormEmail(e.target.value);
                            }}
                            label="email-input"
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
                    <Typography textAlign="center" variant="body1">
                      {
                        "Use a semicolon to separate multiple items in the same category."
                      }
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (formHasPrimary) {
                            setFormHasPrimary(false);
                            setFormPrimary("");
                          } else {
                            setFormHasPrimary(true);
                            primaryRef.current.focus();
                          }
                        }}
                        edge="end"
                      >
                        {formHasPrimary ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "55ch" }}
                      >
                        <InputLabel htmlFor="primary-dish-input">
                          {mealData.PrimaryName}
                        </InputLabel>
                        <OutlinedInput
                          type="text"
                          value={formPrimary}
                          onChange={(e) => {
                            setFormPrimary(e.target.value);
                            setFormHasPrimary(!!e.target.value);
                          }}
                          label="primary-dish-input"
                          inputRef={primaryRef}
                          placeholder={mealData.PrimaryDescription}
                        />
                      </FormControl>
                    </div>

                    {mealData.SecondaryName &&
                    mealData.SecondaryDescription !== "N/A" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "100%",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (formHasSecondary) {
                              setFormHasSecondary(false);
                              setFormSecondary("");
                            } else {
                              setFormHasSecondary(true);
                              secondaryRef.current.focus();
                            }
                          }}
                          edge="end"
                        >
                          {formHasSecondary ? (
                            <CheckBoxIcon />
                          ) : (
                            <CheckBoxOutlineBlankIcon />
                          )}
                        </IconButton>
                        <FormControl
                          variant="outlined"
                          sx={{ m: 1, width: "55ch" }}
                        >
                          <InputLabel htmlFor="secondary-dish-input">
                            {mealData.SecondaryName}
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            value={formSecondary}
                            onChange={(e) => {
                              setFormSecondary(e.target.value);
                              setFormHasSecondary(!!e.target.value);
                            }}
                            label="secondary-dish-input"
                            inputRef={secondaryRef}
                            placeholder={mealData.SecondaryDescription}
                          />
                        </FormControl>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (formHasSide) {
                            setFormHasSide(false);
                            setFormSide("");
                          } else {
                            setFormHasSide(true);
                            sideRef.current.focus();
                          }
                        }}
                        edge="end"
                      >
                        {formHasSide ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "55ch" }}
                      >
                        <InputLabel htmlFor="side-dish-input">Side</InputLabel>
                        <OutlinedInput
                          type="text"
                          value={formSide}
                          onChange={(e) => {
                            setFormSide(e.target.value);
                            setFormHasSide(!!e.target.value);
                          }}
                          label="side-dish-input"
                          inputRef={sideRef}
                          placeholder={mealData.SideDescription}
                        />
                      </FormControl>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (formHasDessert) {
                            setFormHasDessert(false);
                            setFormDessert("");
                          } else {
                            setFormHasDessert(true);
                            dessertRef.current.focus();
                          }
                        }}
                        edge="end"
                      >
                        {formHasDessert ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "55ch" }}
                      >
                        <InputLabel htmlFor="dessert-dish-input">
                          Dessert
                        </InputLabel>
                        <OutlinedInput
                          type="text"
                          value={formDessert}
                          onChange={(e) => {
                            setFormDessert(e.target.value);
                            setFormHasDessert(!!e.target.value);
                          }}
                          label="dessert-dish-input"
                          inputRef={dessertRef}
                          placeholder={mealData.DessertDescription}
                        />
                      </FormControl>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (formHasBeverage) {
                            setFormHasBeverage(false);
                            setFormBeverage("");
                          } else {
                            setFormHasBeverage(true);
                            beverageRef.current.focus();
                          }
                        }}
                        edge="end"
                      >
                        {formHasBeverage ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "55ch" }}
                      >
                        <InputLabel htmlFor="beverage-dish-input">
                          Beverage
                        </InputLabel>
                        <OutlinedInput
                          type="text"
                          value={formBeverage}
                          onChange={(e) => {
                            setFormBeverage(e.target.value);
                            setFormHasBeverage(!!e.target.value);
                          }}
                          label="beverage-dish-input"
                          inputRef={beverageRef}
                          placeholder={mealData.BeverageDescription}
                        />
                      </FormControl>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <IconButton disabled edge="end">
                        {<EditNoteIcon edge="end" />}
                      </IconButton>
                      <FormControl
                        variant="outlined"
                        sx={{ m: 1, width: "55ch" }}
                      >
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
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "100%",
                      height: "5%",
                    }}
                  >
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
                        : "Please Enter a Name and Email"}
                    </Button>
                  </div>
                </>
              )}
            </Dialog>

            <div className="column-holder">
              <div className="column">
                <Typography
                  variant="h3"
                  textAlign="center"
                  sx={{ width: "100%" }}
                >
                  Dishes
                </Typography>
                {isLoading ? (
                  <DishLoader style={{ width: "100%" }} />
                ) : (
                  <>
                    <div className="dish">
                      <Typography variant="h4">
                        {mealData.PrimaryName}
                      </Typography>
                      <Typography variant="subtitle1">
                        {mealData.PrimaryDescription}
                      </Typography>
                      <div className="divider-light" />
                      {primaryEntries}
                      <div className="spacer" />
                      <div className="divider-heavy" />
                      <div style={{ height: "32px" }} />
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
                        <div style={{ height: "32px" }} />
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
                      <div style={{ height: "32px" }} />
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
                      <div style={{ height: "32px" }} />
                    </div>

                    <div className="dish">
                      <Typography variant="h4">Beverages</Typography>
                      <Typography variant="subtitle1">
                        {mealData.BeverageDescription}
                      </Typography>
                      <div className="divider-light" />
                      {beverageEntries}
                      <div className="spacer" />
                      <div className="divider-heavy" />
                      <div style={{ height: "32px" }} />
                    </div>
                  </>
                )}
              </div>

              <div className="column">
                <Typography
                  variant="h3"
                  textAlign="center"
                  sx={{ width: "100%" }}
                >
                  RSVPs
                </Typography>
                {isLoading ? (
                  <CountLoader style={{ width: "100%" }} />
                ) : (
                  <>
                    <div className="dish">{attendeeEntries}</div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Typography textAlign="center" variant="h2">
                Discipleship Community <span>Meal Signup</span>
              </Typography>
              <Typography textAlign="center" variant="h4">
                Please select your discipleship community:
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="outlined"
                  color="white"
                  sx={{ width: "30ch", maxWidth: "90vw" }}
                  href="#/sagert"
                >
                  <Typography textAlign="center" variant="h5">
                    Sagert
                  </Typography>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
