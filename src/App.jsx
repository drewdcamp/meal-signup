import "./App.css";

import React from "react";
import { useParams } from "react-router";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { Typography, Button, Dialog } from "@mui/material";

import DishList from "./Components/DishList";
import useCookiedState from "./Hooks/useCookiedState";
import AttendeeList from "./Components/AttendeeList";
import SignupForm from "./Components/SignupForm";

function App({ spreadsheetId, auth }) {
  const params = useParams();
  const [docLoaded, setDocLoaded] = React.useState(false);
  const [fullName, setFullName] = React.useState();
  const [themeInfo, setThemeInfo] = React.useState({date:null,time:null,name:null,dishes:[]});
  const [rsvps, setRsvps] = React.useState([]);
  const [rsvpFormVisible, setRsvpFormVisible] = React.useState(true);
  const [userEmail, setUserEmail] = useCookiedState("email");
  const [formData, setFormData] = React.useState({});

  const sanitizedName = React.useMemo(() => {
    console.log(params.groupId.charAt(0).toUpperCase() + params.groupId.slice(1).toLowerCase());
    return params.groupId.charAt(0).toUpperCase() + params.groupId.slice(1).toLowerCase();
  }, [params.groupId]);

  const spreadsheetDoc = React.useMemo(() => {
    return new GoogleSpreadsheet(spreadsheetId, auth);
  }, [spreadsheetId, auth]);

  // Once the spreadsheet document is initialized, load it
  React.useEffect(() => {
    const loadDoc = async () => {
      await spreadsheetDoc.loadInfo(); // loads document properties and worksheets
      setDocLoaded(true);
    };
    loadDoc();
  }, [spreadsheetDoc]);

  // Once the spreadsheet document is loaded, load each sheet
  const [currentThemeSheet, currentResponseSheet, allResponseSheet] = React.useMemo(() => {
    if (docLoaded && sanitizedName) {
      return [
        spreadsheetDoc.sheetsByTitle[`CurrentTheme${sanitizedName}`],
        spreadsheetDoc.sheetsByTitle[`CurrentResponses${sanitizedName}`],
        spreadsheetDoc.sheetsByTitle[`AllResponses${sanitizedName}`],
      ];
    }
    return [null, null, null];
  }, [spreadsheetDoc, docLoaded, sanitizedName]);

  // Once the theme sheet is loaded, get the information from it (Date, Type, Dishes etc.)
  React.useEffect(() => {
    const readThemeInfo = async () => {
      await currentThemeSheet.loadCells("A1:C24");

      const dishInfo = [];

      for (let i = 0; i < 16; i++) {
        const row = 8 + i;
        const dishName = currentThemeSheet.getCell(row, 0).value;

        console.log(typeof(dishName));

        if (dishName && typeof(dishName) === "string") {
          const dishDesc = currentThemeSheet.getCell(row, 1).value;
          const dishCount = currentThemeSheet.getCell(row, 2).value;
          dishInfo[i] = { name: dishName, description: dishDesc, maxCount: dishCount, foodEntries: [] };
        } else {
          dishInfo[i] = null;
        }
      }

      setFullName(currentThemeSheet.getCellByA1("B2").formattedValue);

      const tmpThemeInfo = {
        date: currentThemeSheet.getCellByA1("B3").formattedValue,
        time: currentThemeSheet.getCellByA1("B4").formattedValue,
        name: currentThemeSheet.getCellByA1("B5").value,
        description: currentThemeSheet.getCellByA1("B6").value,
        dishes: dishInfo,
      };

      console.log(tmpThemeInfo);
      setThemeInfo(tmpThemeInfo);
    };

    if (currentThemeSheet) {
      readThemeInfo();
    }
  }, [currentThemeSheet]);

  // Once the rsvp sheet is loaded, get the current attendees
  React.useEffect(() => {
    const readRsvpList = async () => {
      await currentResponseSheet.loadCells(`A1:Y${currentResponseSheet.rowCount + 1}`);
      const entryCount = currentResponseSheet.rowCount - 2;

      const newRsvps = [];

      for (let i = 0; i < entryCount; i++) {
        const rsvpName = currentResponseSheet.getCell(2 + i, 4).value;
        const rsvpEmail = currentResponseSheet.getCell(2 + i, 2).value;

        if (rsvpName) {
          const rsvpAttending = currentResponseSheet.getCell(2 + i, 5).value;
          const rsvpAdult = currentResponseSheet.getCell(2 + i, 6).value ?? 0;
          const rsvpChild = currentResponseSheet.getCell(2 + i, 7).value ?? 0;
          const rsvpComment = currentResponseSheet.getCell(2 + i, 8).value;
          const rsvpDishes = [];

          for (let j = 0; j < 16; j++) {
            rsvpDishes[j] = currentResponseSheet.getCell(2 + i, 9 + j).value;
          }

          newRsvps.push({
            name: rsvpName,
            email: rsvpEmail,
            attending: rsvpAttending,
            adultCount: rsvpAdult,
            childCount: rsvpChild,
            comment: rsvpComment,
            dishes: rsvpDishes,
          });
        } else {
          break;
        }
      }

      console.log(newRsvps);
      setRsvps(newRsvps);
    };

    if (currentResponseSheet) {
      readRsvpList();
    }
  }, [currentResponseSheet]);

  React.useEffect(() => {
    setFormData(rsvps.find((rsvp) => rsvp.email === userEmail));
  }, [userEmail, rsvps]);

  return (
    <div className="app">
      <Typography textAlign="center" variant="h2">
        Meal Signup
      </Typography>

      <Typography textAlign="center" variant="h3">
        {fullName}
      </Typography>

      <Typography textAlign="center" variant="h6">
        Our next meeting is on <span className="variable-text">{themeInfo.date}</span> at{" "}
        <span className="variable-text">{themeInfo.time}</span>.<br />
        The theme for this meal is <span className="variable-text">{themeInfo.name}</span>.<br />
        {themeInfo.description}
      </Typography>
      <div style={{ height: "8px" }}></div>

      <Button href="/meal-signup">Select a Different Group</Button>

      <div className="column-holder">
        <div className="column">
          <Typography variant="h3" textAlign="center" sx={{ width: "100%" }}>
            Dishes
          </Typography>
          <DishList rsvps={rsvps} themeInfo={themeInfo} />
        </div>
        <div className="column">
          <Typography variant="h3" textAlign="center" sx={{ width: "100%" }}>
            RSVPs
          </Typography>
          <AttendeeList rsvps={rsvps} />
        </div>
      </div>
      
      <Dialog
        open={rsvpFormVisible}
        onClose={() => {
          setRsvpFormVisible(false);
        }}
      >
        <SignupForm formData={formData} setFormData={setFormData} themeInfo={themeInfo} rsvps={rsvps} />
      </Dialog>
    </div>
  );
}

export default App;
