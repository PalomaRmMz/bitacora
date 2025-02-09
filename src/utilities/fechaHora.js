import React from "react";
import PropTypes from "prop-types";

const FechaHora = ({ valor, tipo = "fecha", opciones = {} }) => {
  if (!valor) return "--";

  let opcionesDefecto =
    tipo === "fecha"
      ? { day: "2-digit", month: "2-digit", year: "numeric" }
      : { hour: "2-digit", minute: "2-digit", hour12: true };

  return (
    <span>
      {new Date(
        tipo === "fecha" ? valor : `1970-01-01T${valor}`
      ).toLocaleString("es-MX", { ...opcionesDefecto, ...opciones })}
    </span>
  );
};

FechaHora.propTypes = {
  valor: PropTypes.string.isRequired,
  tipo: PropTypes.oneOf(["fecha", "hora"]),
  opciones: PropTypes.object,
};

export default FechaHora;
