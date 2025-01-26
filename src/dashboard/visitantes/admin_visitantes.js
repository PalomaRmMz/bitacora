import React, { useEffect, useState } from "react";
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
import { visitantesColumns } from "../../utilities/columns";

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

  const table = useMaterialReactTable({
    columns: visitantesColumns,
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
