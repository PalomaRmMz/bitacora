import React from "react";
import PropTypes from "prop-types";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Breadcrumb from "./breadcrumb";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div
      className="d-flex flex-column bg-body-secondary"
      style={{ height: "100vh" }}
    >
      <Topbar />
      <div className="d-flex sidebar-and-content">
        <Sidebar />
        <div className="overflow-y-auto p-4 content">
          <Breadcrumb />
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
