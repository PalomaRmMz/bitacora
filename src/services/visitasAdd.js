import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_URL = `${API_BASE_URL}/visitas/addvisita`;

export const agregarVisita = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar la visita", error);
    throw error;
  }
};
