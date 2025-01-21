import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState("/home");

  const routes = [
    { path: "/home", label: "Home", icon: faHome },
    { path: "/about", label: "About", icon: faInfoCircle },
    { path: "/contact", label: "Contact", icon: faPhone },
  ];

  const handleClick = (path) => {
    setActiveRoute(path);
  };

  const renderLinks = (isOffcanvas) => (
    <ul className="nav flex-column">
      {routes.map((route) => (
        <li className="nav-item" key={route.path}>
          <Link
            className={`pt-3 pb-3 rounded nav-link ${
              isOffcanvas ? "" : "text-white"
            } ${activeRoute === route.path ? "active" : ""}`}
            to={route.path}
            onClick={() => handleClick(route.path)}
            style={{
              backgroundColor: activeRoute === route.path ? "#333" : "",
              transition: "background-color 0.3s ease",
            }}
          >
            <FontAwesomeIcon icon={route.icon} className="me-2" />
            {route.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Sidebar estático */}
      <div
        id="sidebar"
        className="d-none d-lg-block position-fixed bottom-0 top-0 bg-dark z-2"
        style={{ width: "250px", height: "100vh" }}
      >
        <div
          className="w-100 border border-white border-top-0 border-end-0 border-bottom-1 border-start-0 d-flex justify-content-center align-items-center mb-3"
          style={{ height: "60px" }}
        >
          <h5 className="text-white">HOLA</h5>
        </div>
        {renderLinks(false)}
      </div>

      {/* Offcanvas móvil */}
      <div
        className="offcanvas offcanvas-start bg-dark"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header p-0">
          <div
            className="w-100 border border-white border-top-0 border-end-0 border-bottom-1 border-start-0 offcanvas-header mb-3"
            style={{ height: "60px" }}
          >
            <h5 className="offcanvas-title text-white">HOLA</h5>
            <button
              type="button"
              className="btn-close text-reset btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body">{renderLinks(true)}</div>
      </div>
    </>
  );
};

export default Sidebar;
