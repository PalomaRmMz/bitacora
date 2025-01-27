import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faFilter,
  faFilterCircleXmark,
  faListUl,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { getVisitantes } from "../../services/visitantes";
import { getFilteredVisitantes } from "../../services/visitantesFilter";

import {
  getColonias,
  getMunicipios,
  getEstados,
  getSecciones,
} from "../../services/catalogos";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { applyFilters, clearFilters } from "../../utilities/filterVisitantes";
import { exportToExcel } from "../../utilities/exportToExcel";
import { visitantesColumns } from "../../utilities/columns";

const ReporteVisitantes = () => {
  const [visitantes, setVisitantes] = useState([]);
  const [filteredVisitantes, setFilteredVisitantes] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [filters, setFilters] = useState({
    nombre_visitante: "",
    ap_visitante: "",
    am_visitante: "",
    colonia: "",
    municipio: "",
    estado: "",
    seccion: "",
  });
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          visitantesData,
          coloniasData,
          municipiosData,
          estadosData,
          seccionesData,
        ] = await Promise.all([
          getVisitantes(),
          getColonias(),
          getMunicipios(),
          getEstados(),
          getSecciones(),
        ]);
        setVisitantes(visitantesData || []);
        setFilteredVisitantes(visitantesData || []);
        setColonias(coloniasData || []);
        setMunicipios(municipiosData || []);
        setEstados(estadosData || []);
        setSecciones(seccionesData || []);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const showAllRecords = () => {
    setFilteredVisitantes(visitantes);
    setShowTable(true);
  };

  const formattedVisitantes = filteredVisitantes.map((visitante) => ({
    Visitante: `${visitante.nombre_visitante} ${visitante.ap_visitante} ${visitante.am_visitante}`,
    Cumpleaños: visitante.fecha_cumpleanos
      ? new Date(visitante.fecha_cumpleanos).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
        })
      : "Sin fecha",
    Calle: `${visitante.calle} No.: ${visitante.numero_exterior}${
      visitante.numero_interior && visitante.numero_interior !== "S/N"
        ? `, Interior: ${visitante.numero_interior}`
        : ""
    }`,
    Colonia: visitante.nombre_colonias,
    Municipio: visitante.nombre_municipios,
    Estado: visitante.nombre_estado,
    "Código Postal": visitante.codigo_postal,
    Sección: visitante.nombre_seccion,
  }));

  const table = useMaterialReactTable({
    columns: visitantesColumns,
    data: filteredVisitantes,
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
            <FontAwesomeIcon icon={faFilter} /> Filtrado de Visitantes
          </h3>
        </div>
        <div className="card-body">
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
            {/*  */}
            <div className="col-md-3">
              <label htmlFor="seccion" className="form-label fw-bolder fs-7">
                Sección
              </label>
              <select
                className="form-select"
                id="seccion"
                value={filters.seccion}
                onChange={(e) =>
                  setFilters({ ...filters, seccion: e.target.value })
                }
              >
                <option disabled value="">
                  Seleccione una seccion
                </option>
                {secciones.map((seccion) => (
                  <option
                    key={seccion.id_seccion_electoral}
                    value={seccion.nombre_seccion}
                  >
                    {seccion.nombre_seccion}
                  </option>
                ))}
              </select>
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
                    getFilteredVisitantes,
                    setFilteredVisitantes,
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
                    setFilteredVisitantes,
                    visitantes,
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
              <FontAwesomeIcon icon={faChalkboardUser} /> Reporte de Visitantes
            </h3>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                exportToExcel(
                  formattedVisitantes,
                  "reporte_visitantes",
                  "Reporte de Visitantes"
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

export default ReporteVisitantes;
