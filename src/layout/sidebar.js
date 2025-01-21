import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* estático */}
      <div
        className="d-none d-lg-block position-fixed bottom-0 top-0 bg-dark z-2"
        style={{ width: "250px", height: "100vh" }}
      >
        <div
          className="w-100 border border-white border-top-0 border-end-0 border-bottom-1 border-start-0 d-flex justify-content-center align-items-center mb-3"
          style={{ height: "60px" }}
        >
          <h5 className="text-white">HOLA</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* offcanvas */}
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
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
