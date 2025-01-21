import React from "react";
import { Link, useLocation } from "react-router-dom";
import routesConfig from "../routesConfig";

const Breadcrumb = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((_, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return routesConfig.find((route) => route.path === path);
  });

  const breadcrumbs = [
    routesConfig.find((route) => route.path === "/home"),
    ...breadcrumbItems,
  ].filter(Boolean);

  console.log("Location:", location.pathname);
  console.log("Path segments:", pathSegments);
  console.log("Breadcrumb items:", breadcrumbItems);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((item, index) => (
          <li
            key={item.path}
            className={`breadcrumb-item ${
              index === breadcrumbs.length - 1 ? "active" : ""
            }`}
          >
            {index === breadcrumbs.length - 1 ? (
              item.label
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
