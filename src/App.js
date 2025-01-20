import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Home from "./dashboard/home";
import Layout from "./layout/layout";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
];
const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
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
