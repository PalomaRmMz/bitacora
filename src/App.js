import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Layout from "./layout/layout";
import Home from "./dashboard/home";

import AdminVisitas from "./dashboard/visitas/admin_visitas";
import AddVisitas from "./dashboard/visitas/add_visitas";
import EditVisitas from "./dashboard/visitas/edit_visitas";

import AdminUser from "./dashboard/admin_user/admin_user";
import AddUser from "./dashboard/admin_user/add_user";
import EditUser from "./dashboard/admin_user/edit_user";

import ReporteGeneral from "./dashboard/reportes/reporte_general";
import "./App.css";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },

  // Administrador de visitas
  { path: "/visitas/admin_visitas", element: <AdminVisitas /> },
  { path: "/visitas/add_visitas", element: <AddVisitas /> },
  { path: "/visitas/edit_visitas", element: <EditVisitas /> },

  // Generar reportes
  { path: "/reportes/reporte_general", element: <ReporteGeneral /> },

  // Administración de usuarios
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
