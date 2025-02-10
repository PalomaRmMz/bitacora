import axios from "axios";
import { generateUniqueId } from "./generateUniqueId";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CheckIDRegistroVisita = async (id) => {
  try {
    const API_URL = `${API_BASE_URL}/visitas/check/id/${id}`;
    const response = await axios.get(API_URL);
    return response.data.exists;
  } catch (error) {
    console.error("Error al verificar el id_registro_visita", error);
    return false;
  }
};

export const generateUniqueRegistroVisitaId = async (visitanteStatus) => {
  if (visitanteStatus === "existente" || visitanteStatus === "nuevo") {
    return generateUniqueId("RV", CheckIDRegistroVisita);
  } else {
    return null;
  }
};
