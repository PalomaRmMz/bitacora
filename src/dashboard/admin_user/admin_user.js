import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faTrash,
  faPenToSquare,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getUsuarios } from "../../services/usuarios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton } from "@mui/material";

const AdminUser = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data || []);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
      },
      {
        accessorKey: "apellido_paterno",
        header: "Apellido Paterno",
      },
      {
        accessorKey: "apellido_materno",
        header: "Apellido Materno",
      },
      {
        accessorKey: "tipo_usuario",
        header: "Rol",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: usuarios,
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
            Usuarios
          </h2>
        </div>
        <div className="card-body">
          <div className="w-100 text-end mt-2 mb-2">
            <button type="button" className="btn btn-success text-end">
              <FontAwesomeIcon icon={faUserPlus} /> Agregar usuario
            </button>
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
