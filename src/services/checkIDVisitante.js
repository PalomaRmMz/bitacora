import axios from "axios";
import { generateUniqueId } from "./generateUniqueId";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CheckIDVisitante = async (id) => {
  try {
    const API_URL = `${API_BASE_URL}/visitantes/check/id/${id}`;
    const response = await axios.get(API_URL);
    return response.data.exists;
  } catch (error) {
    console.error("Error al verificar el id_visitante", error);
    return false;
  }
};

export const generateUniqueVisitanteId = async (visitanteStatus) => {
  if (visitanteStatus === "existente" || visitanteStatus === "nuevo") {
    return generateUniqueId("DV", CheckIDVisitante);
  } else {
    return null;
  }
};
