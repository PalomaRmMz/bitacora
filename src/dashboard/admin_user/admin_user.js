import React, { useEffect, useState } from "react";
import { getUsuarios } from "../../services/usuarios";

const AdminUser = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getUsuarios();
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Bitácora de Visitas</h1>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>A. Paterno</th>
            <th>A. Materno</th>
            <th>Tipo Uusuario</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.usuario}>
              <td>{usuario.usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido_paterno}</td>
              <td>{usuario.apellido_materno}</td>
              <td>{usuario.tipo_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
