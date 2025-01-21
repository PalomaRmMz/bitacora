import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import routesConfig from "./routes";
import "./App.css";

const App = () => {
  return (
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
  );
};

export default App;
