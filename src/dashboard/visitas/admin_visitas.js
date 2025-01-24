import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faTrash,
  faEye,
  faPenToSquare,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getVisitas } from "../../services/visitas";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton } from "@mui/material";

const AdminVisitas = () => {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const data = await getVisitas();
        setVisitas(data || []);
      } catch (error) {
        console.error("Error al cargar las visitas:", error);
      }
    };

    fetchVisitas();
  }, []);

  const columns = useMemo(
    () => [
      {
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
        accessorFn: (row) => new Date(row.fecha_visita),
        filterFn: "lessThan",
        filterVariant: "date",
        id: "fecha_visita",
        header: "Fecha visita",
      },
      {
        Cell: ({ cell }) => {
          const hora = cell.getValue();
          if (hora) {
            return hora.substring(0, 5);
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
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
              })
            : "Sin fecha",
        accessorFn: (row) =>
          row.fecha_cumpleanos ? new Date(row.fecha_cumpleanos) : null,
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
      {
        accessorKey: "nombre_colonias",
        header: "Colonia",
      },
      {
        accessorKey: "nombre_municipios",
        header: "Municipio",
      },
      {
        accessorKey: "nombre_estado",
        header: "Estado",
      },
      {
        accessorKey: "codigo_postal",
        header: "C.P.",
      },
      {
        accessorKey: "nombre_seccion",
        header: "Sección",
      },
      {
        accessorKey: "asunto",
        header: "Asunto",
      },
      {
        accessorKey: "observaciones",
        header: "Observaciones",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: visitas,
    enableHiding: false,
    enableClickToCopy: true,
    enableColumnActions: false,
    enableRowActions: true,
    renderRowActions: ({ row, table }) => (
      <Box>
        <IconButton color="success">
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
        <IconButton color="error">
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
        <IconButton color="warning">
          <FontAwesomeIcon icon={faEye} />
        </IconButton>
      </Box>
    ),
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
            <FontAwesomeIcon icon={faChalkboardUser} /> Administrador de Visitas
          </h2>
        </div>
        <div className="card-body">
          <div className="w-100 text-end mt-2 mb-2">
            <button type="button" className="btn btn-success text-end">
              <FontAwesomeIcon icon={faUserPlus} /> Agregar visita
            </button>
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default AdminVisitas;
