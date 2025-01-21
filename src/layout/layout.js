import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Breadcrumb from "./breadcrumb";
import "./layout.css";

const Layout = ({ children }) => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    return pathnames.map((path, index) => {
      const linkPath = `/${pathnames.slice(0, index + 1).join("/")}`;
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        path: linkPath,
      };
    });
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    ...getBreadcrumbItems(),
  ];

  return (
    <div
      className="d-flex flex-column bg-body-secondary"
      style={{ height: "100vh" }}
    >
      <Topbar />
      <div className="d-flex sidebar-and-content">
        <Sidebar />
        <div className="overflow-y-auto p-4 content">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
