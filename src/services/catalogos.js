import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_URLS = {
  colonias: `${API_BASE_URL}/catalogos/colonias`,
  municipios: `${API_BASE_URL}/catalogos/municipios`,
  estados: `${API_BASE_URL}/catalogos/estados`,
  secciones: `${API_BASE_URL}/catalogos/secciones`,
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los datos desde ${url}:`, error);
    return [];
  }
};

export const getColonias = () => fetchData(API_URLS.colonias);
export const getMunicipios = () => fetchData(API_URLS.municipios);
export const getEstados = () => fetchData(API_URLS.estados);
export const getSecciones = () => fetchData(API_URLS.secciones);
