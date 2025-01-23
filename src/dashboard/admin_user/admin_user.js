import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { getUsuarios } from "../../services/usuarios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

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
        header: "Tipo de Usuario",
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
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
