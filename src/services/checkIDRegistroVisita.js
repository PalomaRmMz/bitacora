import axios from "axios";
import { generateID } from "../utilities/generateID";

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

export const generateUniqueId = async (visitanteStatus) => {
  if (visitanteStatus === "existente" || visitanteStatus === "nuevo") {
    let id = generateID("RV");
    let exists = await CheckIDRegistroVisita(id);
    while (exists) {
      id = generateID("RV");
      exists = await CheckIDRegistroVisita(id);
    }
    return id;
  } else {
    return null;
  }
};
