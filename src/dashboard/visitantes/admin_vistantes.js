import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faTrash,
  faEye,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { getVisitantes } from "../../services/visitantes";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton } from "@mui/material";

const AdminVisitantes = () => {
  const [visitantes, setVisitantes] = useState([]);

  useEffect(() => {
    const fetchVisitantes = async () => {
      try {
        const data = await getVisitantes();
        setVisitantes(data || []);
      } catch (error) {
        console.error("Error al cargar los visitantes:", error);
      }
    };

    fetchVisitantes();
  }, []);

  const columns = useMemo(
    () => [
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
        accessorFn: (row) => (row.cumpleanos ? new Date(row.cumpleanos) : null),
        id: "cumpleanos",
        header: "Cumpleaños",
      },
      {
        accessorFn: (row) => {
          const numeroInterior =
            row.num_int && row.num_int !== "S/N"
              ? `, Interior: ${row.num_int}`
              : "";
          return `${row.calle} No.: ${row.num_ext}${numeroInterior}`;
        },
        id: "Calle",
        header: "Calle",
      },
      {
        accessorKey: "colonia",
        header: "Colonia",
      },
      {
        accessorKey: "municipio",
        header: "Municipio",
      },
      {
        accessorKey: "estado",
        header: "Estado",
      },
      {
        accessorKey: "cp",
        header: "C.P.",
      },
      {
        accessorKey: "seccion",
        header: "Sección",
      },
      {
        accessorKey: "correo",
        header: "Correo",
      },
      {
        accessorKey: "celular",
        header: "celular",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: visitantes,
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
            <FontAwesomeIcon icon={faChalkboardUser} /> Administrador de
            Visitantes
          </h2>
        </div>
        <div className="card-body">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default AdminVisitantes;
