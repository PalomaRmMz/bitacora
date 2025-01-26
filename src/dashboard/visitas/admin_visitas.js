import React, { useEffect, useState } from "react";
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
import { visitasColumns } from "../../utilities/columns";

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

  const table = useMaterialReactTable({
    columns: visitasColumns,
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
