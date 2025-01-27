export const userColumns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "ap_usuario",
    header: "Apellido Paterno",
  },
  {
    accessorKey: "am_usuario",
    header: "Apellido Materno",
  },
  {
    accessorKey: "tipo_usuario",
    header: "Rol",
  },
];

export const visitantesColumns = [
  {
    accessorFn: (row) =>
      `${row.nombre_visitante} ${row.ap_visitante} ${row.am_visitante}`,
    id: "visitante",
    header: "Visitante",
  },
  {
    accessorFn: (row) =>
      row.fecha_cumpleanos
        ? new Date(row.fecha_cumpleanos).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
          })
        : "Sin fecha",
    id: "fecha_cumpleanos",
    header: "Cumpleaños",
  },
  {
    accessorFn: (row) => {
      const numeroInterior =
        row.numero_interior && row.numero_interior !== "S/N"
          ? `, Interior: ${row.numero_interior}`
          : "";
      return `${row.calle} No.: ${row.numero_exterior}${numeroInterior}`;
    },
    id: "Calle",
    header: "Calle",
  },
  { accessorKey: "nombre_colonias", header: "Colonia" },
  { accessorKey: "nombre_municipios", header: "Municipio" },
  { accessorKey: "nombre_estado", header: "Estado" },
  { accessorKey: "codigo_postal", header: "C.P." },
  { accessorKey: "nombre_seccion", header: "Sección" },
];

export const visitasColumns = [
  {
    accessorFn: (row) => new Date(row.fecha_visita).toLocaleDateString(),
    id: "fecha_visita",
    header: "Fecha visita",
  },
  {
    Cell: ({ cell }) => {
      const hora = cell.getValue();
      if (hora) {
        const date = new Date(`1970-01-01T${hora}Z`);
        return date.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      }
      return "Hora inválida";
    },
    accessorFn: (row) => row.hora_visita,
    filterVariant: "time",
    id: "hora_visita",
    header: "Hora visita",
  },
  {
    accessorFn: (row) => `${row.nombre_recep} ${row.ap_recep} ${row.am_recep}`,
    id: "recepcionista",
    header: "Recepcionista",
  },
  {
    accessorFn: (row) =>
      `${row.nombre_visitante} ${row.ap_visitante} ${row.am_visitante}`,
    id: "visitante",
    header: "Visitante",
  },
  {
    accessorFn: (row) =>
      row.fecha_cumpleanos
        ? new Date(row.fecha_cumpleanos).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
          })
        : "Sin fecha",
    id: "fecha_cumpleanos",
    header: "Cumpleaños",
  },
  {
    accessorFn: (row) => {
      const numeroInterior =
        row.numero_interior && row.numero_interior !== "S/N"
          ? `, Interior: ${row.numero_interior}`
          : "";
      return `${row.calle} No.: ${row.numero_exterior}${numeroInterior}`;
    },
    id: "Calle",
    header: "Calle",
  },
  { accessorKey: "nombre_colonias", header: "Colonia" },
  { accessorKey: "nombre_municipios", header: "Municipio" },
  { accessorKey: "nombre_estado", header: "Estado" },
  { accessorKey: "codigo_postal", header: "C.P." },
  { accessorKey: "nombre_seccion", header: "Sección" },
  { accessorKey: "asunto", header: "Asunto" },
  { accessorKey: "observaciones", header: "Observaciones" },
];
