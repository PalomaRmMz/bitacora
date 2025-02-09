import React from "react";
import PropTypes from "prop-types";

const TextAreaAsuntoObservaciones = ({
  asunto,
  setAsunto,
  observaciones,
  setObservaciones,
}) => (
  <div className="row">
    <div className="col-md-12 mb-3">
      <label htmlFor="asunto" className="form-label fw-bolder fs-7">
        Asunto
      </label>
      <textarea
        id="asunto"
        className="form-control"
        rows="2"
        value={asunto}
        onChange={(e) => setAsunto(e.target.value)}
      />
    </div>
    <div className="col-md-12 mb-3">
      <label htmlFor="observaciones" className="form-label fw-bolder fs-7">
        Observaciones
      </label>
      <textarea
        id="observaciones"
        className="form-control"
        rows="4"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />
    </div>
  </div>
);

TextAreaAsuntoObservaciones.propTypes = {
  asunto: PropTypes.string.isRequired,
  setAsunto: PropTypes.func.isRequired,
  observaciones: PropTypes.string.isRequired,
  setObservaciones: PropTypes.func.isRequired,
};

export default TextAreaAsuntoObservaciones;
