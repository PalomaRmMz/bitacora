import React from "react";
import PropTypes from "prop-types";

const FechaHoraActual = ({ fecha, hora }) => {
  return (
    <div className="row">
      <div className="col-md-2 mb-3">
        <label className="form-label fw-bolder fs-7" htmlFor="fecha_visita">
          Fecha de visita
        </label>
        <input
          type="date"
          className="form-control"
          id="fecha_visita"
          value={fecha}
          readOnly
        />
      </div>
      <div className="col-md-2 mb-3">
        <label className="form-label fw-bolder fs-7" htmlFor="hora_visita">
          Hora de visita
        </label>
        <input
          type="time"
          className="form-control"
          id="hora_visita"
          value={hora}
          readOnly
        />
      </div>
    </div>
  );
};

FechaHoraActual.propTypes = {
  fecha: PropTypes.string.isRequired,
  hora: PropTypes.string.isRequired,
};

export default FechaHoraActual;
