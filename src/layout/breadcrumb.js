import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import routesConfig from "../routes";

const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    let currentPath = "";
    let breadcrumbs = [];

    pathnames.forEach((value, index) => {
      currentPath += `/${value}`;
      const route = routesConfig.find((route) => route.path === currentPath);

      if (route) {
        if (route.breadcrumbParent) {
          breadcrumbs.push(
            <span key={route.path + "-parent"}>
              {index > 0 && (
                <FontAwesomeIcon icon={faChevronRight} className="ms-1 me-1" />
              )}
              <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
                {route.breadcrumbParent}
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="ms-1 me-1" />
            </span>
          );
        }
        breadcrumbs.push(
          <span key={route.path + "-child"}>
            <Link to={currentPath}>{route.label}</Link>
          </span>
        );
        if (index < pathnames.length - 1) {
          breadcrumbs.push(
            <FontAwesomeIcon icon={faChevronRight} className="ms-1 me-1" />
          );
        }
      }
    });

    return breadcrumbs;
  };

  return (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {getBreadcrumbs()}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
