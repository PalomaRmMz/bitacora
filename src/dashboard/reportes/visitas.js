import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faFilter,
  faFilterCircleXmark,
  faListUl,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { getVisitas } from "../../services/visitas";
import { getFilteredVisitas } from "../../services/visitasFilter";

import {
  getColonias,
  getMunicipios,
  getEstados,
  getCP,
  getSecciones,
} from "../../services/catalogos";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { applyFilters, clearFilters } from "../../utilities/filterVisitas";
import { exportToExcel } from "../../utilities/exportToExcel";
import { visitasColumns } from "../../utilities/columns";

const ReporteVisitas = () => {
  const [visitas, setVisitas] = useState([]);
  const [filteredVisitas, setFilteredVisitas] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [codigosPostales, setCodigosPostales] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [filters, setFilters] = useState({
    fecha_visita: "",
    nombre_visitante: "",
    ap_visitante: "",
    am_visitante: "",
    colonia: "",
    municipio: "",
    estado: "",
    seccion: "",
    nombre_recep: "",
    ap_recep: "",
    am_recep: "",
  });
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          visitasData,
          coloniasData,
          municipiosData,
          estadosData,
          cpData,
          seccionesData,
        ] = await Promise.all([
          getVisitas(),
          getColonias(),
          getMunicipios(),
          getEstados(),
          getCP(),
          getSecciones(),
        ]);
        setVisitas(visitasData || []);
        setFilteredVisitas(visitasData || []);
        setColonias(coloniasData || []);
        setMunicipios(municipiosData || []);
        setEstados(estadosData || []);
        setCodigosPostales(cpData || []);
        setSecciones(seccionesData || []);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const showAllRecords = () => {
    setFilteredVisitas(visitas);
    setShowTable(true);
  };

  const formattedVisitas = filteredVisitas.map((visita) => ({
    "Fecha Visita": new Date(visita.fecha_visita).toLocaleDateString(),
    "Hora Visita": visita.hora_visita
      ? new Date(`1970-01-01T${visita.hora_visita}Z`).toLocaleTimeString(
          "es-ES",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )
      : "Hora inválida",
    Recepcionista: `${visita.nombre_recep} ${visita.ap_recep} ${visita.am_recep}`,
    Visitante: `${visita.nombre_visitante} ${visita.ap_visitante} ${visita.am_visitante}`,
    Cumpleaños: visita.fecha_cumpleanos
      ? new Date(visita.fecha_cumpleanos).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
        })
      : "Sin fecha",
    Calle: `${visita.calle} No.: ${visita.numero_exterior}${
      visita.numero_interior && visita.numero_interior !== "S/N"
        ? `, Interior: ${visita.numero_interior}`
        : ""
    }`,
    Colonia: visita.nombre_colonias,
    Municipio: visita.nombre_municipios,
    Estado: visita.nombre_estado,
    "Código Postal": visita.codigo_postal,
    Sección: visita.nombre_seccion,
    Asunto: visita.asunto,
    Observaciones: visita.observaciones,
  }));

  const table = useMaterialReactTable({
    columns: visitasColumns,
    data: filteredVisitas,
    enableTopToolbar: false,
    enableHiding: false,
    enableClickToCopy: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    initialState: { density: "compact" },
    localization: {
      ...MRT_Localization_ES,
      pagination: {
        rowsPerPage: "Filas por página",
      },
    },
  });

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>
            <FontAwesomeIcon icon={faFilter} /> Filtrado de Visitas
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-2">
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
                value={filters.fecha_visita}
                onChange={(e) =>
                  setFilters({ ...filters, fecha_visita: e.target.value })
                }
              />
            </div>
          </div>

          <hr className="mt-5 mb-1 border border-3 border-secondary" />
          <h5>Datos del visitante</h5>
          <div className="row">
            <div className="col-md-4">
              <label
                htmlFor="nombre_visitante"
                className="form-label fw-bolder fs-7"
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_visitante"
                value={filters.nombre_visitante}
                onChange={(e) =>
                  setFilters({ ...filters, nombre_visitante: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="ap_visitante"
                className="form-label fw-bolder fs-7"
              >
                Apellido paterno
              </label>
              <input
                type="text"
                className="form-control"
                id="ap_visitante"
                value={filters.ap_visitante}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ap_visitante: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="nombre_visitante"
                className="form-label fw-bolder fs-7"
              >
                Apellido materno
              </label>
              <input
                type="text"
                className="form-control"
                id="am_visitante"
                value={filters.am_visitante}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    am_visitante: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="colonia" className="form-label fw-bolder fs-7">
                Colonia
              </label>
              <select
                className="form-select"
                id="colonia"
                value={filters.colonia}
                onChange={(e) =>
                  setFilters({ ...filters, colonia: e.target.value })
                }
              >
                <option disabled value="">
                  Seleccione una colonia
                </option>
                {colonias.map((colonia) => (
                  <option
                    key={colonia.id_colonia}
                    value={colonia.nombre_colonias}
                  >
                    {colonia.nombre_colonias}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="municipio" className="form-label fw-bolder fs-7">
                Municipio
              </label>
              <select
                className="form-select"
                id="municipio"
                value={filters.municipio}
                onChange={(e) =>
                  setFilters({ ...filters, municipio: e.target.value })
                }
              >
                <option disabled value="">
                  Seleccione un municipio
                </option>
                {municipios.map((municipio) => (
                  <option
                    key={municipio.id_municipio}
                    value={municipio.nombre_municipios}
                  >
                    {municipio.nombre_municipios}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="estado" className="form-label fw-bolder fs-7">
                Estado
              </label>
              <select
                className="form-select"
                id="estado"
                value={filters.estado}
                onChange={(e) =>
                  setFilters({ ...filters, estado: e.target.value })
                }
              >
                <option disabled value="">
                  Seleccione un estado
                </option>
                {estados.map((estado) => (
                  <option key={estado.id_estado} value={estado.nombre_estado}>
                    {estado.nombre_estado}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="seccion" className="form-label fw-bolder fs-7">
                Sección
              </label>
              <input
                type="text"
                className="form-control"
                id="seccion"
                value={filters.seccion}
                onChange={(e) =>
                  setFilters({ ...filters, seccion: e.target.value })
                }
              />
            </div>
          </div>

          <hr className="mt-5 mb-1 border border-3 border-secondary" />
          <h5>Datos del recepcionista</h5>
          <div className="row">
            <div className="col-md-4">
              <label
                htmlFor="nombre_recep"
                className="form-label fw-bolder fs-7"
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_recep"
                value={filters.nombre_recep}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    nombre_recep: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="ap_recep" className="form-label fw-bolder fs-7">
                Apellido paterno
              </label>
              <input
                type="text"
                className="form-control"
                id="ap_recep"
                value={filters.ap_recep}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ap_recep: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="am_recep" className="form-label fw-bolder fs-7">
                Apellido materno
              </label>
              <input
                type="text"
                className="form-control"
                id="am_recep"
                value={filters.am_recep}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    am_recep: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <div className="mt-5 mb-2">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() =>
                  applyFilters(
                    filters,
                    getFilteredVisitas,
                    setFilteredVisitas,
                    setShowTable
                  )
                }
              >
                <FontAwesomeIcon icon={faFilter} /> Filtrar
              </button>
            </div>
            <div className="mt-5 mb-2">
              <button
                type="button"
                className="btn btn-danger mt-4 mb-2"
                onClick={() =>
                  clearFilters(
                    setFilters,
                    setFilteredVisitas,
                    visitas,
                    setShowTable
                  )
                }
              >
                <FontAwesomeIcon icon={faFilterCircleXmark} /> Limpiar
              </button>
            </div>
            <div className="mt-5 mb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={showAllRecords}
              >
                <FontAwesomeIcon icon={faListUl} /> Todos
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTable && (
        <div className="card mt-3">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faChalkboardUser} /> Reporte de Visitas
            </h3>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                exportToExcel(
                  formattedVisitas,
                  "reporte_visitas",
                  "Reporte de Visitas"
                )
              }
            >
              <FontAwesomeIcon icon={faFileExcel} /> Exportar
            </button>
            <MaterialReactTable table={table} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReporteVisitas;
