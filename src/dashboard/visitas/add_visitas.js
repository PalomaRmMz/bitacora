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
import { applyFilters, clearFilters } from "../../utilities/filterVisitas";

const AddVisitas = () => {
  const [listas, setListas] = useState({
    colonias: [],
    municipios: [],
    estados: [],
    codigosPostales: [],
    secciones: [],
  });

  const [filteredVisitas, setFilteredVisitas] = useState([]);
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

  const [showTable, setShowTable] = useState(false);

  const cargarDatosIniciales = async () => {
    try {
      const [
        coloniasData,
        municipiosData,
        estadosData,
        codigosPostalesData,
        seccionesData,
        visitasData,
      ] = await Promise.all([
        getColonias(),
        getMunicipios(),
        getEstados(),
        getCP(),
        getSecciones(),
      ]);
      setListas({
        colonias: coloniasData || [],
        municipios: municipiosData || [],
        estados: estadosData || [],
        codigosPostales: codigosPostalesData || [],
        secciones: seccionesData || [],
      });
      setFilteredVisitas(visitasData || []);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, "0");
    const mes = String(now.getMonth() + 1).padStart(2, "0");
    const anio = now.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    const hora = now.toTimeString().split(" ")[0].slice(0, 5);

    setVisitaData((prev) => ({
      ...prev,
      fecha_visita: fechaFormateada,
      hora_visita: hora,
    }));
  }, []);

  const buscarVisitante = async () => {
    try {
      const response = await getFilteredVisitas(filters);
      const jsonResponse = JSON.parse(JSON.stringify(response));
      setFilteredVisitas(jsonResponse || []);
      setShowTable(true);
    } catch (error) {
      console.error("Error al buscar el visitante", error);
    }
  };

  const guardarVisita = async () => {
    const data = {
      ...visitanteData,
      ...visitaData,
    };
    console.log("Guardando visita con los siguientes datos:", data);
    try {
      const respuesta = await agregarVisita(visitanteData, visitaData);
      console.log("Visita agregada exitosamente", respuesta);
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
            <span className="input-group-text">id_rg_usuarios</span>
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
                htmlFor="fecha_visita"
                className="form-label fw-bolder fs-7"
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
                htmlFor="hora_visita"
                className="form-label fw-bolder fs-7"
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
            <div className="col-md-4 mb-3">
              <label
                htmlFor="nombre_visit_search"
                className="form-label fw-bolder fs-7"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre_visit_search"
                className="form-control"
                value={filters.nombre_visitante}
                onChange={(e) =>
                  setFilters({ ...filters, nombre_visitante: e.target.value })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              <label
                htmlFor="ap_visit_search"
                className="form-label fw-bolder fs-7"
              >
                Apellido paterno
              </label>
              <input
                type="text"
                id="ap_visit_search"
                className="form-control"
                value={filters.ap_visitante}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ap_visitante: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              <label
                htmlFor="am_visit_search"
                className="form-label fw-bolder fs-7"
              >
                Apellido materno
              </label>
              <input
                type="text"
                id="am_visit_search"
                className="form-control"
                value={filters.am_visitante}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    am_visitante: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <div className="mt-4 mb-4">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  applyFilters(
                    filters,
                    getFilteredVisitas,
                    setFilteredVisitas,
                    setShowTable
                  );
                }}
              >
                <FontAwesomeIcon icon={faSearch} /> Buscar visitante
              </button>
            </div>
            <div className="mt-4 mb-4">
              <button type="button" className="btn btn-danger mt-4 mb-2">
                <FontAwesomeIcon icon={faFilterCircleXmark} /> Limpiar
              </button>
            </div>
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
                    <td>{visita.fecha_visita}</td>
                    <td>{visita.hora_visita}</td>
                    <td>{visita.asunto}</td>
                    <td>{visita.observaciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-around align-items-center">
            <div className="mt-4 mb-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={guardarVisita}
              >
                <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
              </button>
            </div>
            <div className="mt-4 mb-2">
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon={faXmark} /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVisitas;
