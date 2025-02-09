import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCheck,
  faFilterCircleXmark,
  faFileCirclePlus,
  faXmark,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import {
  getColonias,
  getMunicipios,
  getEstados,
  getSecciones,
  getCP,
} from "../../services/catalogos";
import { generateID } from "../../utilities/generateID";
import { agregarVisita } from "../../services/visitasAdd";
import { getFilteredVisitas } from "../../services/visitasFilter";
import FechaHora from "../../utilities/fechaHora";

const AddVisitas = () => {
  const [listas, setListas] = useState({
    colonias: [],
    municipios: [],
    estados: [],
    codigosPostales: [],
    secciones: [],
  });
  const [filteredVisitas, setFilteredVisitas] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [filters, setFilters] = useState({
    nombre_visitante: "",
    ap_visitante: "",
    am_visitante: "",
  });
  const [visitanteData, setVisitanteData] = useState({
    id_visitante: generateID("DV"),
    nombre: "",
    a_paterno: "",
    a_materno: "",
    fecha_cumpleanos: "",
    calle: "",
    numero_interior: "",
    numero_exterior: "",
    id_colonia: "",
    id_municipio: "",
    id_estado: "",
    id_cp: "",
    id_seccion_electoral: "",
    correo: "",
    numero_celular: "",
  });

  const [visitaData, setVisitaData] = useState({
    id_registro_visita: generateID("RV"),
    id_recepcionista: "RU00001",
    fecha_visita: "",
    hora_visita: "",
    id_visitante: "",
    asunto: "",
    observaciones: "",
  });

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [colonias, municipios, estados, codigosPostales, secciones] =
          await Promise.all([
            getColonias(),
            getMunicipios(),
            getEstados(),
            getCP(),
            getSecciones(),
          ]);
        setListas({
          colonias,
          municipios,
          estados,
          codigosPostales,
          secciones,
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    cargarDatosIniciales();

    const now = new Date();
    setVisitaData((prev) => ({
      ...prev,
      fecha_visita: now.toISOString().split("T")[0],
      hora_visita: now.toTimeString().slice(0, 5),
    }));
  }, []);

  const buscarVisitante = async () => {
    try {
      const response = await getFilteredVisitas(filters);
      setFilteredVisitas(response || []);
      setShowTable(true);
    } catch (error) {
      console.error("Error al buscar el visitante", error);
    }
  };

  const guardarVisita = async () => {
    try {
      await agregarVisita(visitanteData, visitaData);
      console.log("Visita agregada exitosamente");
    } catch (error) {
      console.error("Error al agregar la visita", error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>
            <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar visita
          </h3>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">ID Recepcionista</span>
            <input
              type="text"
              className="form-control"
              value={visitaData.id_recepcionista}
              readOnly
            />
          </div>

          <div className="row">
            <div className="col-md-2 mb-3">
              <label
                className="form-label fw-bolder fs-7"
                htmlFor="fecha_visita"
              >
                Fecha de visita
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_visita"
                value={visitaData.fecha_visita}
                readOnly
              />
            </div>
            <div className="col-md-2 mb-3">
              <label
                className="form-label fw-bolder fs-7"
                htmlFor="hora_visita"
              >
                Hora de visita
              </label>
              <input
                type="time"
                className="form-control"
                id="hora_visita"
                value={visitaData.hora_visita}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            {Object.keys(filters).map((key, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <label className="form-label fw-bolder fs-7">
                  {key.replace(/_/g, " ")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={filters[key]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <button
              type="button"
              className="btn btn-info"
              onClick={buscarVisitante}
            >
              <FontAwesomeIcon icon={faSearch} /> Buscar visitante
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                setFilters({
                  nombre_visitante: "",
                  ap_visitante: "",
                  am_visitante: "",
                })
              }
            >
              <FontAwesomeIcon icon={faFilterCircleXmark} /> Limpiar
            </button>
          </div>
        </div>
      </div>

      {showTable && (
        <div className="card mt-4">
          <div className="card-header">
            <h5 className="fw-bolder">Registro de visitas</h5>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Asunto</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitas.map((visita) => (
                  <tr key={visita.id_registro_visita}>
                    <td>
                      <FechaHora valor={visita.fecha_visita} tipo="fecha" />
                    </td>
                    <td>
                      <FechaHora valor={visita.hora_visita} tipo="hora" />
                    </td>
                    <td>{visita.asunto}</td>
                    <td>{visita.observaciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVisitas;
