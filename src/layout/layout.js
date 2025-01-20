import React from "react";
import PropTypes from "prop-types";
import Topbar from "./topbar";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
