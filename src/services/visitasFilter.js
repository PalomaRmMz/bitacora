import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_FILTER_URL = `${API_BASE_URL}/visitas/filtro`;

export const getFilteredVisitas = async (filters) => {
  try {
    const response = await axios.get(API_FILTER_URL, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las visitas filtradas:", error);
    return [];
  }
};
