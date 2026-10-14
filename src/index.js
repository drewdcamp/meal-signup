import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { HashRouter, Routes, Route } from "react-router";
import GroupSelectionView from "./Views/GroupSelectionView";
import "dotenv/config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
    <HashRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<GroupSelectionView />} />
          <Route
            path="/:groupId"
            element={
              <App
                spreadsheetId={process.env.REACT_APP_SHEET_ID}
                auth={{ apiKey: process.env.REACT_APP_API_KEY }}
              />
            }
          />
        </Routes>
      </CookiesProvider>
    </HashRouter>
  </React.StrictMode>,
);
