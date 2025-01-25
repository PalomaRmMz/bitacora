import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronDown,
  faChevronUp,
  faCog,
  faUser,
  faBook,
  faIdCard,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState("/home");
  const [isOpen, setIsOpen] = useState(null);

  const routes = [
    { path: "/home", label: "Home", icon: faHome },
    {
      path: "/visitantes",
      label: "Visitantes",
      icon: faIdCard,
      hasSubMenu: true,
      subRoutes: [
        { path: "/visitantes/admin_visitantes", label: "Administrar" },
        // { path: "/visitantes/add_visitantes", label: "Agregar" },
        // { path: "/visitantes/edit_visitantes", label: "Editar" },
      ],
    },
    {
      path: "/visitas",
      label: "Visitas",
      icon: faBook,
      hasSubMenu: true,
      subRoutes: [
        { path: "/visitas/admin_visitas", label: "Administrar" },
        { path: "/visitas/add_visitas", label: "Agregar" },
        { path: "/visitas/edit_visitas", label: "Editar" },
      ],
    },
    {
      path: "/reportes",
      label: "Reportes",
      icon: faFileSignature,
      hasSubMenu: true,
      subRoutes: [{ path: "/reportes/visitas", label: "Visitas" }],
    },
    {
      path: "/admin",
      label: "Usuarios",
      icon: faUser,
      hasSubMenu: true,
      subRoutes: [
        { path: "/admin/admin_user", label: "Administrar" },
        { path: "/admin/add_user", label: "Agregar" },
        { path: "/admin/edit_user", label: "Editar" },
      ],
    },
    {
      path: "/settings",
      label: "Configuración",
      icon: faCog,
      hasSubMenu: true,
      subRoutes: [
        { path: "/settings/config1", label: "Configuración 1" },
        { path: "/settings/config2", label: "Configuración 2" },
      ],
    },
  ];

  const handleClick = (path) => {
    setActiveRoute(path);
  };

  const toggleSubMenu = (menu) => {
    setIsOpen((prevState) => (prevState === menu ? null : menu));
  };

  const renderLink = (route, isOffcanvas) => (
    <li className="nav-item" key={route.path}>
      {!route.hasSubMenu ? (
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
      ) : (
        <SubMenu
          route={route}
          isOpen={isOpen}
          toggleSubMenu={toggleSubMenu}
          activeRoute={activeRoute}
          handleClick={handleClick}
        />
      )}
    </li>
  );

  const renderLinks = (isOffcanvas) => (
    <ul className="nav flex-column">
      {routes.map((route) => renderLink(route, isOffcanvas))}
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

const SubMenu = ({
  route,
  isOpen,
  toggleSubMenu,
  activeRoute,
  handleClick,
}) => (
  <>
    <button
      className={`nav-link pt-3 pb-3 rounded d-flex align-items-center w-100 ${
        activeRoute === route.path ? "active" : ""
      }`}
      style={{
        backgroundColor: activeRoute === route.path ? "#333" : "",
        transition: "background-color 0.3s ease",
      }}
      tabIndex={0}
      onClick={() => toggleSubMenu(route.label.toLowerCase())}
    >
      <FontAwesomeIcon icon={route.icon} className="me-2" />
      {route.label}
      <FontAwesomeIcon
        icon={
          isOpen === route.label.toLowerCase() ? faChevronUp : faChevronDown
        }
        className="ms-auto"
      />
    </button>

    {/* Submenú expandible */}
    <div
      style={{
        display: isOpen === route.label.toLowerCase() ? "block" : "none",
        paddingLeft: "20px",
      }}
    >
      <ul className="nav flex-column">
        {route.subRoutes.map((subRoute) => (
          <li className="nav-item" key={subRoute.path}>
            <Link
              className={`nav-link ${
                activeRoute === subRoute.path ? "active" : ""
              }`}
              to={subRoute.path}
              onClick={() => handleClick(subRoute.path)}
            >
              {subRoute.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
);

SubMenu.propTypes = {
  route: PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    subRoutes: PropTypes.array,
  }).isRequired,
  isOpen: PropTypes.string,
  toggleSubMenu: PropTypes.func.isRequired,
  activeRoute: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Sidebar;
