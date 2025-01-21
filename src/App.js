import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Layout from "./layout/layout";
import Home from "./dashboard/home";

import AdminUser from "./dashboard/admin_user/admin_user";
import AddUser from "./dashboard/admin_user/add_user";
import EditUser from "./dashboard/admin_user/edit_user";

import { element } from "prop-types";
import "./App.css";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/admin/admin_user", element: <AdminUser /> },
  { path: "/admin/add_user", element: <AddUser /> },
  { path: "/admin/edit_user", element: <EditUser /> },
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
