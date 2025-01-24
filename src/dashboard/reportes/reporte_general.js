import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
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
    visitante: "",
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
      visitante: "",
      colonia: "",
      municipio: "",
      estado: "",
      seccion: "",
    });
    setFilteredVisitas(visitas);
    setShowTable(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => new Date(row.fecha_visita).toLocaleDateString(),
        id: "fecha_visita",
        header: "Fecha visita",
      },
      {
        accessorFn: (row) =>
          row.hora_visita?.substring(0, 5) || "Hora inválida",
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
            <FontAwesomeIcon icon={faChalkboardUser} /> Reporte de Visitas
          </h2>
        </div>
        <div className="card-body">
          <div>
            <div>
              <label htmlFor="fecha_visita" className="form-label">
                Fecha de visita
              </label>
              <input
                type="text"
                className="form-control"
                id="fecha_visita"
                value={filters.fecha_visita}
                onChange={(e) =>
                  setFilters({ ...filters, fecha_visita: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="recepcionista" className="form-label">
                Recepcionista
              </label>
              <input
                type="text"
                className="form-control"
                id="recepcionista"
                value={filters.recepcionista}
                onChange={(e) =>
                  setFilters({ ...filters, recepcionista: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="visitante" className="form-label">
                Visitante
              </label>
              <input
                type="text"
                className="form-control"
                id="visitante"
                value={filters.visitante}
                onChange={(e) =>
                  setFilters({ ...filters, visitante: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="colonia" className="form-label">
                Colonia
              </label>
              <select
                className="form-control"
                id="colonia"
                value={filters.colonia}
                onChange={(e) =>
                  setFilters({ ...filters, colonia: e.target.value })
                }
              >
                <option selected disabled value="">
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

            <div>
              <label htmlFor="municipio" className="form-label">
                Municipio
              </label>
              <select
                className="form-control"
                id="municipio"
                value={filters.municipio}
                onChange={(e) =>
                  setFilters({ ...filters, municipio: e.target.value })
                }
              >
                <option selected disabled value="">
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

            <div>
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <select
                className="form-control"
                id="estado"
                value={filters.estado}
                onChange={(e) =>
                  setFilters({ ...filters, estado: e.target.value })
                }
              >
                <option selected disabled value="">
                  Seleccione un estado
                </option>
                {estados.map((estado) => (
                  <option key={estado.id_estado} value={estado.nombre_estado}>
                    {estado.nombre_estado}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="seccion" className="form-label">
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
            <button
              type="button"
              className="btn btn-success"
              onClick={applyFilters}
            >
              Filtrar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearFilters}
            >
              Limpiar
            </button>
          </div>

          {showTable && <MaterialReactTable table={table} />}
        </div>
      </div>
    </div>
  );
};

export default ReporteGeneral;
