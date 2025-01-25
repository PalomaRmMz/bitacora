import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avatar from "../assets/img/avatar.jpg";

const Topbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 w-100 z-1 border border-gray border-top-0 border-end-0 border-bottom-3 border-start-0"
      style={{ height: "60px" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Botón para móviles */}
        <button
          className="btn border-0 d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          ☰
        </button>

        <div className="flex-grow-1"></div>

        <div className="btn-group">
          <button
            type="button"
            className="btn p-0 rounded-circle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: "50px", height: "50px" }}
          >
            <img
              src={avatar}
              alt="Dropdown"
              className="img-fluid p-0 m-0 rounded-circle"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">
                Action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Another action
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" type="button">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="fw-bolder me-2 "
                />{" "}
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
