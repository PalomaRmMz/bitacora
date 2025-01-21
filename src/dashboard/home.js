import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [bitacora, setBitacora] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bitacora")
      .then((response) => {
        setBitacora(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Bitácora de Visitas</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {bitacora.map((registro) => (
            <tr key={registro.id}>
              <td>{new Date(registro.fecha).toLocaleString()}</td>
              <td>{registro.usuario}</td>
              <td>{registro.accion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
