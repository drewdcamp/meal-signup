import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { HashRouter, Routes, Route } from "react-router";
import GroupSelectionView from "./Views/GroupSelectionView";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<GroupSelectionView />} />
          <Route path="/:groupId" element={<App
            spreadsheetId="1KS5qmIoRfjKS6HFTwPtDLpnNym4trJANUXo50Jf4KCw"
            auth={{ apiKey: 'AIzaSyAOCZgY5sn-yn1q8UKP4oiipPLxdSidckU' }} />} />
        </Routes>
      </CookiesProvider>
    </HashRouter>
  </React.StrictMode>
);
