export const applyFilters = async (
  filters,
  getFilteredVisitantes,
  setFilteredVisitantes,
  setShowTable
) => {
  try {
    const response = await getFilteredVisitantes(filters);
    setFilteredVisitantes(response || []);
    setShowTable(true);
  } catch (error) {
    console.error("Error al aplicar filtros desde el backend:", error);
    alert("Hubo un problema al aplicar los filtros. Intente de nuevo.");
  }
};

export const clearFilters = (
  setFilters,
  setFilteredVisitantes,
  visitantes,
  setShowTable
) => {
  setFilters({
    nombre_visitante: "",
    ap_visitante: "",
    am_visitante: "",
    colonia: "",
    municipio: "",
    estado: "",
    seccion: "",
  });
  setFilteredVisitantes(visitantes);
  setShowTable(false);
};
