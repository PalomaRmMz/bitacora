import React from "react";
import { Link, useLocation } from "react-router-dom";
import routesConfig from "../routes";

const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    let currentPath = "";
    let breadcrumbs = [];

    if (location.pathname !== "/") {
      breadcrumbs.push(
        <li key="home" className="breadcrumb-item">
          <Link to="/home">Home</Link>
        </li>
      );
    }

    pathnames.forEach((value, index) => {
      currentPath += `/${value}`;
      const route = routesConfig.find((route) => route.path === currentPath);

      if (route) {
        if (route.breadcrumbParent) {
          breadcrumbs.push(
            <li key={route.path + "-parent"} className="breadcrumb-item">
              <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
                {route.breadcrumbParent}
              </Link>
            </li>
          );
        }

        breadcrumbs.push(
          <li
            key={route.path + "-child"}
            className="breadcrumb-item active"
            aria-current="page"
          >
            {route.label}
          </li>
        );
      }
    });

    return breadcrumbs;
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{getBreadcrumbs()}</ol>
    </nav>
  );
};

export default Breadcrumb;
