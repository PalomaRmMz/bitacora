import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faFilter,
  faFilterCircleXmark,
  faListUl,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { getVisitas } from "../../services/visitas";
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
import * as XLSX from "xlsx";

const ReporteGeneral = () => {
  const [visitas, setVisitas] = useState([]);
  const [filteredVisitas, setFilteredVisitas] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [codigosPostales, setCodigosPostales] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [filters, setFilters] = useState({
    fecha_visita: "",
    recepcionista: "",
    visitante_nombre: "",
    visitante_apellido_paterno: "",
    visitante_apellido_materno: "",
    recepcionista_apellido_paterno: "",
    recepcionista_apellido_materno: "",
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

  const applyFilters = () => {
    let filteredData = visitas;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filteredData = filteredData.filter((visita) => {
          const fieldValue =
            key === "fecha_visita"
              ? new Date(visita[key]).toLocaleDateString()
              : visita[key]?.toLowerCase() || "";
          return fieldValue.includes(filters[key].toLowerCase());
        });
      }
    });
    setFilteredVisitas(filteredData);
    setShowTable(true);
  };

  const clearFilters = () => {
    setFilters({
      fecha_visita: "",
      recepcionista: "",
      visitante_nombre: "",
      visitante_apellido_paterno: "",
      visitante_apellido_materno: "",
      recepcionista_apellido_paterno: "",
      recepcionista_apellido_materno: "",
      colonia: "",
      municipio: "",
      estado: "",
      seccion: "",
    });
    setFilteredVisitas(visitas);
    setShowTable(false);
  };

  const showAllRecords = () => {
    setFilteredVisitas(visitas);
    setShowTable(true);
  };

  const exportToExcel = () => {
    const dataToExport = filteredVisitas.map((visita) => ({
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
      Recepcionista: `${visita.recepcionista_nombre} ${visita.recepcionista_apellido_paterno} ${visita.recepcionista_apellido_materno}`,
      Visitante: `${visita.visitante_nombre} ${visita.visitante_apellido_paterno} ${visita.visitante_apellido_materno}`,
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

    const now = new Date();
    const formattedDate = now.toLocaleDateString("es-ES").replace(/\//g, "-");
    const formattedTime = now
      .toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/:/g, "-");

    const fileName = `reporte_visitas_${formattedDate}_${formattedTime}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Visitas");
    XLSX.writeFile(workbook, fileName);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => new Date(row.fecha_visita).toLocaleDateString(),
        id: "fecha_visita",
        header: "Fecha visita",
      },
      {
        Cell: ({ cell }) => {
          const hora = cell.getValue();
          if (hora) {
            const date = new Date(`1970-01-01T${hora}Z`);
            return date.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          }
          return "Hora inválida";
        },
        accessorFn: (row) => row.hora_visita,
        filterVariant: "time",
        id: "hora_visita",
        header: "Hora visita",
      },
      {
        accessorFn: (row) =>
          `${row.recepcionista_nombre} ${row.recepcionista_apellido_paterno} ${row.recepcionista_apellido_materno}`,
        id: "recepcionista",
        header: "Recepcionista",
      },
      {
        accessorFn: (row) =>
          `${row.visitante_nombre} ${row.visitante_apellido_paterno} ${row.visitante_apellido_materno}`,
        id: "visitante",
        header: "Visitante",
      },
      {
        accessorFn: (row) =>
          row.fecha_cumpleanos
            ? new Date(row.fecha_cumpleanos).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
              })
            : "Sin fecha",
        id: "fecha_cumpleanos",
        header: "Cumpleaños",
      },
      {
        accessorFn: (row) => {
          const numeroInterior =
            row.numero_interior && row.numero_interior !== "S/N"
              ? `, Interior: ${row.numero_interior}`
              : "";
          return `${row.calle} No.: ${row.numero_exterior}${numeroInterior}`;
        },
        id: "Calle",
        header: "Calle",
      },
      { accessorKey: "nombre_colonias", header: "Colonia" },
      { accessorKey: "nombre_municipios", header: "Municipio" },
      { accessorKey: "nombre_estado", header: "Estado" },
      { accessorKey: "codigo_postal", header: "C.P." },
      { accessorKey: "nombre_seccion", header: "Sección" },
      { accessorKey: "asunto", header: "Asunto" },
      { accessorKey: "observaciones", header: "Observaciones" },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
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
          <h2>
            <FontAwesomeIcon icon={faFilter} /> Filtrado de Visitas
          </h2>
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
          <h4>Datos del visitante</h4>
          <div className="row">
            <div className="col-md-4">
              <label
                htmlFor="visitante_nombre"
                className="form-label fw-bolder fs-7"
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="visitante_nombre"
                value={filters.visitante_nombre}
                onChange={(e) =>
                  setFilters({ ...filters, visitante_nombre: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="visitante_apellido_paterno"
                className="form-label fw-bolder fs-7"
              >
                Apellido paterno
              </label>
              <input
                type="text"
                className="form-control"
                id="visitante_apellido_paterno"
                value={filters.visitante_apellido_paterno}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    visitante_apellido_paterno: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="visitante_nombre"
                className="form-label fw-bolder fs-7"
              >
                Apellido materno
              </label>
              <input
                type="text"
                className="form-control"
                id="visitante_apellido_materno"
                value={filters.visitante_apellido_materno}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    visitante_apellido_materno: e.target.value,
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
          <h4>Datos del recepcionista</h4>
          <div className="row">
            <div className="col-md-4">
              <label
                htmlFor="recepcionista_nombre"
                className="form-label fw-bolder fs-7"
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="recepcionista_nombre"
                value={filters.recepcionista_nombre}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    recepcionista_nombre: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="recepcionista_apellido_paterno"
                className="form-label fw-bolder fs-7"
              >
                Apellido paterno
              </label>
              <input
                type="text"
                className="form-control"
                id="recepcionista_apellido_paterno"
                value={filters.recepcionista_apellido_paterno}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    recepcionista_apellido_paterno: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="recepcionista_apellido_materno"
                className="form-label fw-bolder fs-7"
              >
                Apellido materno
              </label>
              <input
                type="text"
                className="form-control"
                id="recepcionista_apellido_materno"
                value={filters.recepcionista_apellido_materno}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    recepcionista_apellido_materno: e.target.value,
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
                onClick={applyFilters}
              >
                <FontAwesomeIcon icon={faFilter} /> Filtrar
              </button>
            </div>
            <div className="mt-5 mb-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={clearFilters}
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
            <h2>
              <FontAwesomeIcon icon={faChalkboardUser} /> Reporte de Visitas
            </h2>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={exportToExcel}
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

export default ReporteGeneral;
