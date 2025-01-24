import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import routesConfig from "./routes";
import "./App.css";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Router>
        <Routes>
          {routesConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.path === "/" ? (
                  route.element
                ) : (
                  <Layout>{route.element}</Layout>
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </LocalizationProvider>
  );
};

export default App;
