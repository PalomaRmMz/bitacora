export const applyFilters = async (
  filters,
  getFilteredVisitas,
  setFilteredVisitas,
  setShowTable
) => {
  try {
    const response = await getFilteredVisitas(filters);
    setFilteredVisitas(response || []);
    setShowTable(true);
  } catch (error) {
    console.error("Error al aplicar filtros desde el backend:", error);
    alert("Hubo un problema al aplicar los filtros. Intente de nuevo.");
  }
};

export const clearFilters = (
  setFilters,
  setFilteredVisitas,
  visitas,
  setShowTable
) => {
  setFilters({
    fecha_visita: "",
    nombre_visitante: "",
    ap_visitante: "",
    am_visitante: "",
    colonia: "",
    municipio: "",
    estado: "",
    seccion: "",
    nombre_recep: "",
    ap_recep: "",
    am_recep: "",
  });
  setFilteredVisitas(visitas);
  setShowTable(false);
};
