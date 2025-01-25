import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_URL = `${API_BASE_URL}/visitas`;

export const getVisitas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los visitas:", error);
    return [];
  }
};
