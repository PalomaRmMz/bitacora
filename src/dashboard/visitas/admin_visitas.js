import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faTrash,
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
        accessorKey: "fecha_visita",
        header: "Fecha",
      },
      {
        accessorKey: "hora_visita",
        header: "Hora",
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
        accessorKey: "fecha_cumpleanos",
        header: "Cumpleaños",
      },
      {
        accessorFn: (row) =>
          `${row.calle} No. Exterior.:${row.numero_exterior} ${row.numero_interior}`,
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
    positionActionsColumn: "last",
    renderRowActions: ({ row, table }) => (
      <Box>
        <IconButton color="success">
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
        <IconButton color="error">
          <FontAwesomeIcon icon={faTrash} />
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
