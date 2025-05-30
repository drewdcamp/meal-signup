import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { HashRouter, Routes, Route } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:groupId" element={<App />} />
        </Routes>
      </CookiesProvider>
    </HashRouter>
  </React.StrictMode>
);
