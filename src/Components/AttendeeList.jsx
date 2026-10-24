import React from "react";
import { Typography } from "@mui/material";
import AttendeeLine from "./AttendeeLine";
import "../App.css";

function AttendeeList({ rsvps }) {
  const attendees = [];
  const nonAttendees = [];

  let adultCount = 0;
  let childCount = 0;

  for (let i = 0; i < rsvps.length; i++) {
    const rsvp = rsvps[i];

    if (rsvp.attending) {
      adultCount += rsvp?.adultCount ?? 0;
      childCount += rsvp?.childCount ?? 0;

      attendees.push(
        <AttendeeLine
          name={rsvp.Name}
          adultCount={rsvp?.AdultCount ?? 0}
          childCount={rsvp?.ChildCount ?? 0}
          comment={rsvp.Note}
        />,
      );
    } else {
      nonAttendees.push(
        <AttendeeLine
          name={rsvp.Name}
          adultCount={""}
          childCount={""}
          comment={""}
        />,
      );
    }

    if (attendees.length > 0) {
      attendees.unshift(
        <AttendeeLine
          name={"Total"}
          adultCount={adultCount}
          childCount={childCount}
          comment={<div className="divider-light" />}
        />,
      );
      attendees.unshift(
        <AttendeeLine
          name={"Attending"}
          adultCount={"Adults"}
          childCount={"Children"}
          comment={<div className="divider-heavy" />}
        />,
      );
    }

    if (nonAttendees.length > 0) {
      attendees.push(
        <AttendeeLine
          name={""}
          adultCount={""}
          childCount={""}
          comment={<div style={{ height: "32px" }} />}
        />,
      );
      attendees.push(
        <AttendeeLine
          name={"Not Attending:"}
          adultCount={""}
          childCount={""}
          comment={<div className="divider-heavy" />}
        />,
      );
      for (let i = 0; i < nonAttendees.length; i++) {
        attendees.push(nonAttendees[i]);
      }
    }
  }

  return (
    <div className="dish">
      {attendees.length ? (
        attendees
      ) : (
        <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
          No Signups Yet!
        </Typography>
      )}
    </div>
  );
}

export default AttendeeList;
