import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={item.path}
            className={`breadcrumb-item ${
              index === items.length - 1 ? "active" : ""
            }`}
          >
            {index === 0 || index === items.length - 1 ? (
              // Only Home (index 0) and the last breadcrumb are links
              <Link to={item.path}>{item.label}</Link>
            ) : (
              // Other breadcrumbs are just text
              item.label
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumb;
