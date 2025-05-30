import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path="meal-signup/" element={<App />} />
          <Route path="meal-signup/:groupId" element={<App />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
