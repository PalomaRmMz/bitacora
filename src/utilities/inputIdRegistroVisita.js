import React from "react";
import PropTypes from "prop-types";

const InputIdRegistroVisita = ({ id_registro_visita }) => (
  <div className="input-group mb-3">
    <span className="input-group-text">id_registro_visita</span>
    <input
      type="text"
      className="form-control"
      value={id_registro_visita}
      readOnly
    />
  </div>
);

InputIdRegistroVisita.propTypes = {
  id_registro_visita: PropTypes.string.isRequired,
};

export default InputIdRegistroVisita;
