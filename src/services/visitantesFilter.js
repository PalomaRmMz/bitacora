import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_FILTER_URL = `${API_BASE_URL}/visitantes/filtro`;

export const getFilteredVisitantes = async (filters) => {
  try {
    const response = await axios.get(API_FILTER_URL, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los visitantes filtrados:", error);
    return [];
  }
};
